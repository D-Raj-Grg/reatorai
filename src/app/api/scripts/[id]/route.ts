/**
 * GET /api/scripts/[id]
 * Fetches a single script by ID
 *
 * DELETE /api/scripts/[id]
 * Deletes a script
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/scripts/[id]
 * Fetches a single script with source video information
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const supabase = await createClient();

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get script ID from params
    const { id } = await context.params;

    // 3. Fetch script with source video and channel info
    const { data: script, error: scriptError } = await supabase
      .from('scripts')
      .select(`
        *,
        videos:source_video_id (
          id,
          video_id,
          title,
          description,
          thumbnail_url,
          published_at,
          duration,
          view_count,
          like_count,
          comment_count,
          channels (
            id,
            channel_name,
            channel_handle,
            thumbnail_url
          )
        )
      `)
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (scriptError || !script) {
      return NextResponse.json(
        { error: 'Script not found' },
        { status: 404 }
      );
    }

    // 4. Return script data
    return NextResponse.json({
      success: true,
      script
    });

  } catch (error) {
    console.error('Error fetching script:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/scripts/[id]
 * Deletes a script (user must own it)
 */
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const supabase = await createClient();

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get script ID from params
    const { id } = await context.params;

    // 3. Delete script (RLS ensures user owns it)
    const { error: deleteError } = await supabase
      .from('scripts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting script:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete script' },
        { status: 500 }
      );
    }

    // 4. Return success
    return NextResponse.json({
      success: true,
      message: 'Script deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting script:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
