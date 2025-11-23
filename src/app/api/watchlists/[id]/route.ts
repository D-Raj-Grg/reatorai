import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateWatchlistSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  icon: z.string().max(50).optional(),
  display_order: z.number().int().min(0).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch watchlist with its channels
    const { data: watchlist, error } = await supabase
      .from('watchlists')
      .select(`
        *,
        watchlist_channels (
          id,
          added_at,
          channels (
            id,
            channel_id,
            channel_name,
            channel_handle,
            thumbnail_url,
            subscriber_count,
            total_videos,
            last_synced_at
          )
        )
      `)
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Watchlist not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching watchlist:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch watchlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        watchlist,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get watchlist error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateWatchlistSchema.parse(body);

    // Verify watchlist belongs to user
    const { data: existingWatchlist } = await supabase
      .from('watchlists')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!existingWatchlist) {
      return NextResponse.json(
        { success: false, error: 'Watchlist not found or unauthorized' },
        { status: 404 }
      );
    }

    // Update watchlist
    const { data: watchlist, error } = await supabase
      .from('watchlists')
      // @ts-expect-error - Supabase type inference issues
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating watchlist:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update watchlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        watchlist,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Update watchlist error:', error);
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
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Verify watchlist belongs to user before deleting
    const { data: watchlist } = await supabase
      .from('watchlists')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!watchlist) {
      return NextResponse.json(
        { success: false, error: 'Watchlist not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete watchlist (cascade will delete watchlist_channels)
    const { error: deleteError } = await supabase
      .from('watchlists')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting watchlist:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete watchlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Watchlist deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete watchlist error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
