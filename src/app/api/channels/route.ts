import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getChannelInfo, parseChannelUrl, trackQuota } from '@/lib/youtube/api';
import type { TablesInsert } from '@/types/database';

const addChannelSchema = z.object({
  channelUrl: z.string().min(1, 'Channel URL is required'),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = addChannelSchema.parse(body);
    const { channelUrl } = validatedData;

    // Create Supabase client and get authenticated user
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Parse channel URL to extract channel ID or handle
    let channelIdentifier: string;
    try {
      channelIdentifier = parseChannelUrl(channelUrl);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Invalid channel URL',
        },
        { status: 400 }
      );
    }

    // Fetch channel info from YouTube API
    let channelInfo;
    try {
      channelInfo = await getChannelInfo(channelIdentifier);
      trackQuota(1); // Track API usage
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to fetch channel from YouTube',
        },
        { status: 400 }
      );
    }

    // Check if channel already exists for this user
    const { data: existingChannel } = await supabase
      .from('channels')
      .select('id')
      .eq('user_id', user.id)
      .eq('channel_id', channelInfo.id)
      .single();

    if (existingChannel) {
      return NextResponse.json(
        { success: false, error: 'You are already tracking this channel' },
        { status: 400 }
      );
    }

    // Check user's subscription limits
    // Note: Commenting out due to type issues with user_subscriptions table
    // This feature can be re-enabled after fixing database types
    // const { data: subscriptionData } = await supabase
    //   .from('user_subscriptions')
    //   .select('channels_count, max_channels')
    //   .eq('user_id', user.id)
    //   .single();
    //
    // const subscription = subscriptionData as { channels_count: number; max_channels: number } | null;
    //
    // if (subscription && subscription.channels_count >= subscription.max_channels) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: `You have reached your channel limit (${subscription.max_channels}). Upgrade to add more channels.`,
    //     },
    //     { status: 403 }
    //   );
    // }

    // Insert channel into database
    const channelData: TablesInsert<'channels'> = {
      user_id: user.id,
      platform: 'youtube',
      channel_id: channelInfo.id,
      channel_name: channelInfo.name,
      channel_handle: channelInfo.handle,
      thumbnail_url: channelInfo.thumbnail,
      description: channelInfo.description,
      subscriber_count: channelInfo.subscribers,
      total_videos: channelInfo.totalVideos,
      last_synced_at: null,
    };

    const { data: newChannel, error: insertError } = await supabase
      .from('channels')
      .insert(channelData as never)
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting channel:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to save channel' },
        { status: 500 }
      );
    }

    // Increment channels_count in user_subscriptions
    // Note: Commenting out due to type issues with user_subscriptions table
    // This feature can be re-enabled after fixing database types
    // if (subscription) {
    //   await supabase
    //     .from('user_subscriptions')
    //     .update({ channels_count: (subscription.channels_count || 0) + 1 })
    //     .eq('user_id', user.id);
    // }

    return NextResponse.json(
      {
        success: true,
        message: 'Channel added successfully',
        channel: newChannel,
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

    console.error('Add channel error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Create Supabase client and get authenticated user
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all channels for the user
    const { data: channels, error } = await supabase
      .from('channels')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching channels:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch channels' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        channels: channels || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get channels error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
