import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createWatchlistSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  icon: z.string().max(50).optional(),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createWatchlistSchema.parse(body);

    // Create watchlist with defaults
    const watchlistData = {
      user_id: user.id,
      name: validatedData.name,
      description: validatedData.description || null,
      color: validatedData.color || '#3B82F6', // Default blue
      icon: validatedData.icon || 'folder', // Default folder icon
      channel_count: 0,
      total_videos: 0,
      total_outliers: 0,
      display_order: 0,
    };

    const { data: watchlist, error } = await supabase
      .from('watchlists')
      .insert(watchlistData as never)
      .select()
      .single();

    if (error) {
      console.error('Error creating watchlist:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create watchlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        watchlist,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Create watchlist error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

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

    // Fetch all watchlists for the user, ordered by display_order, then created_at
    const { data: watchlists, error } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', user.id)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching watchlists:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch watchlists' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        watchlists,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get watchlists error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
