/**
 * GET /api/scripts
 *
 * Fetches all scripts for the authenticated user with filtering, sorting, and pagination.
 * Supports query parameters: search, hookFormat, framework, favoritesOnly, sortBy, sortOrder, page, limit
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface ScriptWithVideo {
  id: string;
  user_id: string;
  source_video_id: string | null;
  writing_style_id: string | null;
  hook_format: string | null;
  storytelling_framework: string | null;
  topic: string | null;
  hook_text: string | null;
  body_text: string | null;
  cta_text: string | null;
  visual_suggestions: string | null;
  full_script: string | null;
  estimated_duration: number | null;
  word_count: number | null;
  tokens_used: number | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  videos: {
    id: string;
    video_id: string;
    title: string;
    thumbnail_url: string | null;
    view_count: number | null;
    published_at: string | null;
  } | null;
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const hookFormat = searchParams.get('hookFormat') || '';
    const framework = searchParams.get('framework') || '';
    const favoritesOnly = searchParams.get('favoritesOnly') === 'true';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Calculate offset
    const offset = (page - 1) * limit;

    // 3. Build query
    let query = supabase
      .from('scripts')
      .select(`
        *,
        videos (
          id,
          video_id,
          title,
          thumbnail_url,
          view_count,
          published_at
        )
      `, { count: 'exact' })
      .eq('user_id', user.id);

    // Apply filters
    if (search) {
      query = query.or(`topic.ilike.%${search}%,hook_text.ilike.%${search}%`);
    }

    if (hookFormat) {
      query = query.eq('hook_format', hookFormat);
    }

    if (framework) {
      query = query.eq('storytelling_framework', framework);
    }

    if (favoritesOnly) {
      query = query.eq('is_favorite', true);
    }

    // Apply sorting
    const validSortColumns = ['created_at', 'updated_at', 'is_favorite', 'topic', 'estimated_duration', 'word_count'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const ascending = sortOrder.toLowerCase() === 'asc';

    if (sortColumn === 'is_favorite') {
      // Special handling for favorites - show favorites first
      query = query.order('is_favorite', { ascending: false }).order('created_at', { ascending: false });
    } else {
      query = query.order(sortColumn, { ascending });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // 4. Execute query
    const { data: scripts, error: fetchError, count } = await query;

    if (fetchError) {
      console.error('Error fetching scripts:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch scripts' },
        { status: 500 }
      );
    }

    // 5. Return response with pagination metadata
    return NextResponse.json({
      success: true,
      scripts: scripts as ScriptWithVideo[],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasMore: offset + scripts.length < (count || 0)
      }
    });

  } catch (error) {
    console.error('Error in GET /api/scripts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
