/**
 * POST /api/videos/[id]/analyze
 *
 * Analyzes a video using AI to understand why it went viral.
 * Checks usage limits and stores the analysis in the database.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { analyzeVideo } from '@/lib/openai/analyze';
import { canAnalyzeVideo, trackAnalysis } from '@/lib/usage/track';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Check usage limits
    const usageStatus = await canAnalyzeVideo(user.id);
    if (!usageStatus.canUse) {
      return NextResponse.json(
        {
          error: 'Analysis limit reached',
          message: `You've used ${usageStatus.used}/${usageStatus.limit} analyses this month.`,
          remaining: usageStatus.remaining,
          planType: usageStatus.planType
        },
        { status: 403 }
      );
    }

    // 3. Get video from database
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select(`
        *,
        channels (
          id,
          channel_name,
          user_id
        )
      `)
      .eq('id', id)
      .single();

    if (videoError || !video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // 4. Verify user owns this video's channel
    if (video.channels?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 5. Check if video has transcript
    if (!video.transcript) {
      return NextResponse.json(
        { error: 'Video transcript not available. Please sync the channel first.' },
        { status: 400 }
      );
    }

    // 6. Check if analysis already exists
    const { data: existingAnalysis } = await supabase
      .from('video_analyses')
      .select('*')
      .eq('video_id', id)
      .single();

    if (existingAnalysis) {
      return NextResponse.json({
        analysis: existingAnalysis,
        fromCache: true,
        remaining: usageStatus.remaining
      });
    }

    // 7. Perform AI analysis
    const analysisResult = await analyzeVideo({
      title: video.title,
      description: video.description || '',
      transcript: video.transcript,
      views: video.view_count || 0,
      likes: video.like_count || 0,
      comments: video.comment_count || 0
    });

    // 8. Store analysis in database
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('video_analyses')
      .insert({
        video_id: id,
        user_id: user.id,
        hook_analysis: analysisResult.hookAnalysis,
        storytelling_analysis: analysisResult.storytellingAnalysis,
        emotional_triggers: analysisResult.emotionalTriggers,
        visual_format: analysisResult.visualFormat,
        cta_analysis: analysisResult.ctaAnalysis,
        key_takeaways: analysisResult.keyTakeaways,
        full_analysis: analysisResult.fullAnalysis,
        tokens_used: analysisResult.tokensUsed,
        analyzed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving analysis:', saveError);
      return NextResponse.json(
        { error: 'Failed to save analysis' },
        { status: 500 }
      );
    }

    // 9. Track usage
    await trackAnalysis(user.id);

    // 10. Return success
    return NextResponse.json({
      success: true,
      analysis: savedAnalysis,
      tokensUsed: analysisResult.tokensUsed,
      remaining: usageStatus.remaining - 1,
      fromCache: false
    });

  } catch (error) {
    console.error('Error analyzing video:', error);

    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/videos/[id]/analyze
 *
 * Get existing analysis for a video (if available)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get analysis
    const { data: analysis, error } = await supabase
      .from('video_analyses')
      .select('*')
      .eq('video_id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
