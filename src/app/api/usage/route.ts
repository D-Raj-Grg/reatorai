import { createClient } from '@/lib/supabase/server';
import { getAllUsageStatus } from '@/lib/usage/track';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const usage = await getAllUsageStatus(user.id);

    return NextResponse.json(
      {
        success: true,
        usage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get usage error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
