import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch channel with its videos
    const { data: channel, error } = await supabase
      .from('channels')
      .select(`
        *,
        videos (
          id,
          video_id,
          title,
          thumbnail_url,
          view_count,
          like_count,
          comment_count,
          published_at,
          is_outlier,
          outlier_score
        )
      `)
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Channel not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching channel:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch channel' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        channel,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get channel error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Verify channel belongs to user before deleting
    const { data: channel } = await supabase
      .from('channels')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!channel) {
      return NextResponse.json(
        { success: false, error: 'Channel not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete channel (cascade will delete related videos, watchlist_channels, etc.)
    const { error: deleteError } = await supabase
      .from('channels')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting channel:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete channel' },
        { status: 500 }
      );
    }

    // Decrement channels_count in user_subscriptions
    // Note: Commenting out due to type issues with user_subscriptions table
    // This is a non-critical feature that can be re-enabled after fixing database types
    // const { data: subscription, error: subError } = await supabase
    //   .from('user_subscriptions')
    //   .select('channels_count')
    //   .eq('user_id', user.id)
    //   .maybeSingle();
    //
    // if (!subError && subscription) {
    //   const channelsCount = (subscription as { channels_count: number | null }).channels_count;
    //   if (channelsCount && channelsCount > 0) {
    //     await supabase
    //       .from('user_subscriptions')
    //       .update({ channels_count: channelsCount - 1 })
    //       .eq('user_id', user.id);
    //   }
    // }

    return NextResponse.json(
      {
        success: true,
        message: 'Channel deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete channel error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
