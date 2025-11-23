import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const { email, password } = validatedData;

    // Create Supabase client
    const supabase = await createClient();

    // Sign in the user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }

    // Check if user has subscription record, create if missing
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (subError && subError.code === 'PGRST116') {
      // Subscription doesn't exist, create it
      await supabase.from('user_subscriptions').insert({
        user_id: authData.user.id,
        plan_type: 'free',
        max_scripts_per_month: 5,
        max_analyses_per_month: 20,
        max_channels: 5,
        scripts_used_this_month: 0,
        analyses_used_this_month: 0,
        channels_count: 0,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ).toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
