import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: watchlistId } = await params;
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
    const isOutlier = searchParams.get('isOutlier') === 'true';
    const sortBy = searchParams.get('sortBy') || 'published_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Verify watchlist belongs to user
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

    // Get all channel IDs in this watchlist
    const { data: watchlistChannels } = await supabase
      .from('watchlist_channels')
      .select('channel_id')
      .eq('watchlist_id', watchlistId);

    if (!watchlistChannels || watchlistChannels.length === 0) {
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

    const channelIds = (watchlistChannels as Array<{ channel_id: string }>).map((wc) => wc.channel_id);

    // Build query for videos
    let query = supabase
      .from('videos')
      .select(`
        *,
        channels (
          id,
          channel_name,
          channel_handle,
          thumbnail_url
        )
      `, { count: 'exact' })
      .in('channel_id', channelIds);

    // Filter by outlier if requested
    if (isOutlier) {
      query = query.eq('is_outlier', true);
    }

    // Sort
    const ascending = sortOrder === 'asc';
    if (sortBy === 'views') {
      query = query.order('view_count', { ascending });
    } else if (sortBy === 'engagement') {
      query = query.order('engagement_rate', { ascending });
    } else {
      query = query.order('published_at', { ascending });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: videos, error, count } = await query;

    if (error) {
      console.error('Error fetching watchlist videos:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch videos' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        videos,
        total: count || 0,
        page,
        hasMore: offset + limit < (count || 0),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get watchlist videos error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
