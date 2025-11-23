/**
 * POST /api/channels/[id]/sync
 *
 * Manually trigger a sync for a specific channel.
 * Rate limited to prevent abuse (max 1 sync per channel per hour).
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { syncChannelVideos } from '@/lib/sync/sync-channel-videos';
import type { Database } from '@/types/database';

type Channel = Database['public']['Tables']['channels']['Row'];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get channel and verify ownership
    const { data, error: channelError } = await supabase
      .from('channels')
      .select('*')
      .eq('id', id)
      .single();

    if (channelError || !data) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    const channel = data as Channel;

    if (channel.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 3. Check rate limit (max 1 sync per hour)
    if (channel.last_synced_at) {
      const lastSyncTime = new Date(channel.last_synced_at).getTime();
      const oneHourAgo = Date.now() - (60 * 60 * 1000);

      if (lastSyncTime > oneHourAgo) {
        const minutesRemaining = Math.ceil((lastSyncTime - oneHourAgo) / (60 * 1000));

        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: `Please wait ${minutesRemaining} minutes before syncing again.`,
            lastSyncedAt: channel.last_synced_at,
            canSyncAt: new Date(lastSyncTime + (60 * 60 * 1000)).toISOString()
          },
          { status: 429 }
        );
      }
    }

    // 4. Perform sync
    console.log(`Manual sync requested for channel ${channel.channel_name} by user ${user.id}`);

    const syncResult = await syncChannelVideos(id);

    if (!syncResult.success) {
      return NextResponse.json(
        {
          error: 'Sync failed',
          message: syncResult.error || 'Unknown error occurred'
        },
        { status: 500 }
      );
    }

    // 5. Return success with stats
    return NextResponse.json({
      success: true,
      channel: {
        id: channel.id,
        name: channel.channel_name
      },
      stats: {
        videosAdded: syncResult.videosAdded,
        videosUpdated: syncResult.videosUpdated,
        outliersFound: syncResult.outliersFound,
        transcriptsFetched: syncResult.transcriptsFetched
      },
      syncedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in manual sync:', error);

    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'YouTube API quota exceeded. Please try again later.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/channels/[id]/sync
 *
 * Get sync status for a channel
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get channel
    const { data, error: channelError } = await supabase
      .from('channels')
      .select('id, channel_name, last_synced_at, user_id')
      .eq('id', id)
      .single();

    if (channelError || !data) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    const channel = data as Pick<Channel, 'id' | 'channel_name' | 'last_synced_at' | 'user_id'>;

    if (channel.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Calculate if can sync now
    let canSyncNow = true;
    let nextSyncAvailableAt: string | null = null;

    if (channel.last_synced_at) {
      const lastSyncTime = new Date(channel.last_synced_at).getTime();
      const oneHourAgo = Date.now() - (60 * 60 * 1000);

      if (lastSyncTime > oneHourAgo) {
        canSyncNow = false;
        nextSyncAvailableAt = new Date(lastSyncTime + (60 * 60 * 1000)).toISOString();
      }
    }

    // Get stats
    const { count: totalVideos } = await supabase
      .from('videos')
      .select('id', { count: 'exact', head: true })
      .eq('channel_id', id);

    const { count: outliers } = await supabase
      .from('videos')
      .select('id', { count: 'exact', head: true })
      .eq('channel_id', id)
      .eq('is_outlier', true);

    return NextResponse.json({
      channel: {
        id: channel.id,
        name: channel.channel_name
      },
      sync: {
        lastSyncedAt: channel.last_synced_at,
        canSyncNow,
        nextSyncAvailableAt
      },
      stats: {
        totalVideos: totalVideos || 0,
        outliers: outliers || 0
      }
    });

  } catch (error) {
    console.error('Error fetching sync status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
