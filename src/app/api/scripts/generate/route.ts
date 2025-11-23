/**
 * POST /api/scripts/generate
 *
 * Generates a custom video script using AI based on viral video insights.
 * Checks usage limits and stores the script in the database.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  generateScript,
  type GenerateScriptParams
} from '@/lib/openai/generate';
import { canGenerateScript, trackScriptGeneration } from '@/lib/usage/track';

interface VideoWithChannelAndAnalysis {
  id: string;
  video_id: string;
  title: string;
  description: string | null;
  transcript: string | null;
  view_count: number | null;
  like_count: number | null;
  comment_count: number | null;
  channels: {
    id: string;
    channel_name: string;
    user_id: string;
  } | null;
  video_analyses: {
    hook_analysis: string | null;
    storytelling_analysis: string | null;
    emotional_triggers: string | null;
    visual_format: string | null;
    cta_analysis: string | null;
    key_takeaways: string | null;
  } | null;
}

interface GenerateScriptRequest {
  videoId: string;
  hookFormat: string;
  framework: string;
  tone?: string;
  vocabularyLevel?: string;
  customTopic?: string;
  targetDuration?: number;
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Check usage limits
    const usageStatus = await canGenerateScript(user.id);
    if (!usageStatus.canUse) {
      return NextResponse.json(
        {
          error: 'Script generation limit reached',
          message: `You've used ${usageStatus.used}/${usageStatus.limit} scripts this month.`,
          remaining: usageStatus.remaining,
          planType: usageStatus.planType
        },
        { status: 403 }
      );
    }

    // 3. Parse request body
    const body: GenerateScriptRequest = await request.json();
    const {
      videoId,
      hookFormat,
      framework,
      tone,
      vocabularyLevel,
      customTopic,
      targetDuration
    } = body;

    // Validate required fields
    if (!videoId || !hookFormat || !framework) {
      return NextResponse.json(
        { error: 'Missing required fields: videoId, hookFormat, framework' },
        { status: 400 }
      );
    }

    // 4. Get video from database (with analysis if available)
    const { data, error: videoError } = await supabase
      .from('videos')
      .select(`
        *,
        channels (
          id,
          channel_name,
          user_id
        ),
        video_analyses (
          hook_analysis,
          storytelling_analysis,
          emotional_triggers,
          visual_format,
          cta_analysis,
          key_takeaways
        )
      `)
      .eq('id', videoId)
      .single();

    if (videoError || !data) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    const video = data as VideoWithChannelAndAnalysis;

    // 5. Verify user owns this video's channel
    if (video.channels?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 6. Check if video has transcript
    if (!video.transcript) {
      return NextResponse.json(
        { error: 'Video transcript not available. Please fetch the transcript first.' },
        { status: 400 }
      );
    }

    // 7. Prepare generation parameters
    const analysis = video.video_analyses;
    const generationParams: GenerateScriptParams = {
      videoTitle: video.title,
      videoDescription: video.description || undefined,
      videoTranscript: video.transcript,
      videoAnalysis: analysis ? {
        hookAnalysis: analysis.hook_analysis || undefined,
        storytellingAnalysis: analysis.storytelling_analysis || undefined,
        emotionalTriggers: analysis.emotional_triggers || undefined,
        visualFormat: analysis.visual_format || undefined,
        ctaAnalysis: analysis.cta_analysis || undefined,
        keyTakeaways: analysis.key_takeaways || undefined
      } : undefined,
      videoStats: {
        views: video.view_count || 0,
        likes: video.like_count || 0,
        comments: video.comment_count || 0
      },
      hookFormat: hookFormat.toLowerCase() as GenerateScriptParams['hookFormat'],
      framework: framework.toLowerCase() as GenerateScriptParams['framework'],
      tone: tone?.toLowerCase() as GenerateScriptParams['tone'],
      vocabularyLevel: vocabularyLevel?.toLowerCase() as GenerateScriptParams['vocabularyLevel'],
      customTopic,
      targetDuration
    };

    // 8. Generate script using AI
    const generatedScript = await generateScript(generationParams);

    // 9. Store script in database
    const { data: savedScript, error: saveError } = await supabase
      .from('scripts')
      .insert({
        user_id: user.id,
        source_video_id: videoId,
        hook_format: generatedScript.hookFormat,
        storytelling_framework: generatedScript.framework,
        topic: generatedScript.topic,
        hook_text: generatedScript.hook,
        body_text: generatedScript.body,
        cta_text: generatedScript.callToAction,
        visual_suggestions: generatedScript.visualSuggestions.join('\n\n'),
        full_script: `${generatedScript.hook}\n\n${generatedScript.body}\n\n${generatedScript.callToAction}`,
        estimated_duration: generatedScript.estimatedDuration,
        word_count: generatedScript.wordCount,
        tokens_used: generatedScript.tokensUsed,
        is_favorite: false
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving script:', saveError);
      return NextResponse.json(
        { error: 'Failed to save script' },
        { status: 500 }
      );
    }

    // 10. Track usage
    await trackScriptGeneration(user.id);

    // 11. Return success
    return NextResponse.json({
      success: true,
      script: savedScript,
      metadata: {
        hookFormat: generatedScript.hookFormat,
        framework: generatedScript.framework,
        tone: generatedScript.tone,
        keyPoints: generatedScript.keyPoints,
        pacing: generatedScript.pacing,
        voiceoverNotes: generatedScript.voiceoverNotes,
        visualSuggestions: generatedScript.visualSuggestions
      },
      tokensUsed: generatedScript.tokensUsed,
      remaining: usageStatus.remaining - 1
    });

  } catch (error) {
    console.error('Error generating script:', error);

    if (error instanceof Error) {
      // Handle specific errors
      if (error.message.includes('Unknown hook format') || error.message.includes('Unknown framework')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API not configured' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
