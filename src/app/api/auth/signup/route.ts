import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for signup
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    const { email, password } = validatedData;

    // Create Supabase client
    const supabase = await createClient();

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) {
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'User creation failed' },
        { status: 400 }
      );
    }

    // Create user subscription record
    const { error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .insert({
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

    if (subscriptionError) {
      console.error('Error creating subscription:', subscriptionError);
      // Continue anyway - user is created, just missing subscription record
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully. Please check your email to verify your account.',
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
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

    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
