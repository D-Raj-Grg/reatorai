import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const channelId = searchParams.get('channelId');
    const watchlistId = searchParams.get('watchlistId');
    const isOutlier = searchParams.get('isOutlier') === 'true';
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Get user's tracked channels to filter videos
    let userChannelIds: string[] = [];

    if (watchlistId) {
      // If watchlistId is provided, verify it belongs to user and get its channels
      const { data: watchlist } = await supabase
        .from('watchlists')
        .select('id')
        .eq('id', watchlistId)
        .eq('user_id', user.id)
        .single();

      if (!watchlist) {
        return NextResponse.json(
          { success: false, error: 'Watchlist not found or unauthorized' },
          { status: 404 }
        );
      }

      const { data: watchlistChannels } = await supabase
        .from('watchlist_channels')
        .select('channel_id')
        .eq('watchlist_id', watchlistId);

      userChannelIds = (watchlistChannels || [])
        .map((wc: { channel_id: string | null }) => wc.channel_id)
        .filter((id): id is string => id !== null);
    } else if (channelId) {
      // If channelId is provided, verify it belongs to user
      const { data: channel } = await supabase
        .from('channels')
        .select('id')
        .eq('id', channelId)
        .eq('user_id', user.id)
        .single();

      if (!channel) {
        return NextResponse.json(
          { success: false, error: 'Channel not found or unauthorized' },
          { status: 404 }
        );
      }

      userChannelIds = [channelId];
    } else {
      // Get all user's channels
      const { data: userChannels } = await supabase
        .from('channels')
        .select('id')
        .eq('user_id', user.id);

      userChannelIds = (userChannels || []).map((c: { id: string }) => c.id);
    }

    // If no channels found, return empty result
    if (userChannelIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          videos: [],
          total: 0,
          page,
          hasMore: false,
        },
        { status: 200 }
      );
    }

    // Build query for videos
    let query = supabase
      .from('videos')
      .select(
        `
        *,
        channels (
          id,
          channel_name,
          channel_handle,
          thumbnail_url
        ),
        video_analyses (
          id
        )
      `,
        { count: 'exact' }
      )
      .in('channel_id', userChannelIds);

    // Apply search filter (search in title and description)
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filter by outlier if requested
    if (isOutlier) {
      query = query.eq('is_outlier', true);
    }

    // Sort
    const ascending = sortOrder === 'asc';
    if (sortBy === 'views') {
      query = query.order('view_count', { ascending, nullsFirst: false });
    } else if (sortBy === 'engagement') {
      query = query.order('engagement_rate', { ascending, nullsFirst: false });
    } else {
      // Default: sort by date (published_at)
      query = query.order('published_at', { ascending, nullsFirst: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: videos, error, count } = await query;

    if (error) {
      console.error('Error fetching videos:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch videos' }, { status: 500 });
    }

    // Transform data to match VideoData interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedVideos = (videos || []).map((video: any) => ({
      id: video.id,
      videoId: video.video_id,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail_url,
      publishedAt: video.published_at,
      duration: video.duration || 0,
      viewCount: video.view_count || 0,
      likeCount: video.like_count || 0,
      commentCount: video.comment_count || 0,
      engagementRate: video.engagement_rate || 0,
      isOutlier: video.is_outlier || false,
      outlierScore: video.outlier_score,
      hasTranscript: !!video.transcript,
      hasAnalysis: video.video_analyses && video.video_analyses.length > 0,
      channel: {
        id: video.channels?.id || '',
        name: video.channels?.channel_name || '',
        thumbnailUrl: video.channels?.thumbnail_url || '',
      },
    }));

    return NextResponse.json(
      {
        success: true,
        videos: transformedVideos,
        total: count || 0,
        page,
        hasMore: offset + limit < (count || 0),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get videos error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
