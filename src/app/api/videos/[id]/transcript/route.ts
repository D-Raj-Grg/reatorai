/**
 * POST /api/videos/[id]/transcript
 *
 * Manually fetches a transcript for a video
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { fetchTranscript } from '@/lib/youtube/transcript';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get video from database
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select(`
        *,
        channels (
          id,
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

    // 3. Verify user owns this video's channel
    if (video.channels?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 4. Check if transcript already exists
    if (video.transcript && video.transcript_fetched_at) {
      return NextResponse.json({
        success: true,
        transcript: video.transcript,
        fromCache: true,
        message: 'Transcript already exists'
      });
    }

    // 5. Check if video has a video_id
    if (!video.video_id) {
      return NextResponse.json(
        { error: 'Video ID not available' },
        { status: 400 }
      );
    }

    // 6. Fetch transcript from YouTube
    let transcript: string;
    try {
      const result = await fetchTranscript(video.video_id);
      if (!result) {
        return NextResponse.json(
          { error: 'No transcript data returned' },
          { status: 400 }
        );
      }
      transcript = result;
    } catch (error) {
      console.error(`Error fetching transcript for video ${video.video_id}:`, error);
      return NextResponse.json(
        {
          error: 'Failed to fetch transcript',
          message: error instanceof Error ? error.message : 'Transcript may not be available for this video'
        },
        { status: 400 }
      );
    }

    // 7. Update video with transcript
    const { error: updateError } = await supabase
      .from('videos')
      .update({
        transcript,
        transcript_fetched_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error saving transcript:', updateError);
      return NextResponse.json(
        { error: 'Failed to save transcript' },
        { status: 500 }
      );
    }

    // 8. Return success
    return NextResponse.json({
      success: true,
      transcript,
      fromCache: false,
      message: 'Transcript fetched successfully'
    });

  } catch (error) {
    console.error('Error in transcript endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
