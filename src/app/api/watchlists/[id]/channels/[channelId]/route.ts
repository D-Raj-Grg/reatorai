import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; channelId: string }> }
) {
  try {
    const { id: watchlistId, channelId } = await params;
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

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

    // Delete the watchlist_channels relationship
    const { error: deleteError } = await supabase
      .from('watchlist_channels')
      .delete()
      .eq('watchlist_id', watchlistId)
      .eq('channel_id', channelId);

    if (deleteError) {
      console.error('Error removing channel from watchlist:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to remove channel from watchlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Channel removed from watchlist successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Remove channel from watchlist error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
