import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const addChannelSchema = z.object({
  channelId: z.string().uuid(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: watchlistId } = await params;
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { channelId } = addChannelSchema.parse(body);

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

    // Verify channel belongs to user
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

    // Check if channel is already in watchlist
    const { data: existing } = await supabase
      .from('watchlist_channels')
      .select('id')
      .eq('watchlist_id', watchlistId)
      .eq('channel_id', channelId)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Channel already in watchlist' },
        { status: 400 }
      );
    }

    // Add channel to watchlist
    const { data: watchlistChannel, error } = await supabase
      .from('watchlist_channels')
      .insert({
        watchlist_id: watchlistId,
        channel_id: channelId,
      } as never)
      .select()
      .single();

    if (error) {
      console.error('Error adding channel to watchlist:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to add channel to watchlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        watchlistChannel,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Add channel to watchlist error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
