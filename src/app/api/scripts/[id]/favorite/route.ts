/**
 * PATCH /api/scripts/[id]/favorite
 * Toggles the favorite status of a script
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
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

    // 3. Parse request body
    const body = await request.json();
    const { is_favorite } = body;

    // Validate is_favorite field
    if (typeof is_favorite !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request: is_favorite must be a boolean' },
        { status: 400 }
      );
    }

    // 4. Update script favorite status (RLS ensures user owns it)
    const { data: updatedScript, error: updateError } = await supabase
      .from('scripts')
      .update({ is_favorite })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating favorite status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update favorite status' },
        { status: 500 }
      );
    }

    if (!updatedScript) {
      return NextResponse.json(
        { error: 'Script not found' },
        { status: 404 }
      );
    }

    // 5. Return success
    return NextResponse.json({
      success: true,
      script: updatedScript,
      message: is_favorite ? 'Added to favorites' : 'Removed from favorites'
    });

  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
