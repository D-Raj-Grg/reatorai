/**
 * GET /api/cron/sync-videos
 *
 * Vercel Cron Job for automatic video syncing.
 * Runs daily at 2 AM (configured in vercel.json).
 *
 * This endpoint:
 * 1. Finds channels that need syncing (not synced in last 24 hours)
 * 2. Syncs up to 20 channels per run
 * 3. Returns statistics
 *
 * Security: Vercel Cron uses built-in authentication (no CRON_SECRET needed for Hobby plan)
 */

import { NextResponse } from 'next/server';
import { syncChannelsBatch, getChannelsNeedingSync } from '@/lib/sync/sync-channel-videos';
import { resetMonthlyUsage } from '@/lib/usage/track';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max for Hobby plan

export async function GET(request: Request) {
  try {
    console.log('=== CRON: Video Sync Started ===');
    const startTime = Date.now();

    // 1. Reset monthly usage if needed (first of month)
    const now = new Date();
    if (now.getDate() === 1 && now.getHours() === 2) {
      console.log('Resetting monthly usage counters...');
      const resetResult = await resetMonthlyUsage();
      console.log(`Reset ${resetResult.resetCount} subscriptions`);
    }

    // 2. Get channels that need syncing
    // For Hobby plan: limit to 20 channels per day to respect quotas
    const channelIds = await getChannelsNeedingSync(20);

    if (channelIds.length === 0) {
      console.log('No channels need syncing');
      return NextResponse.json({
        success: true,
        message: 'No channels need syncing',
        channelsSynced: 0,
        executionTime: Date.now() - startTime
      });
    }

    console.log(`Found ${channelIds.length} channels needing sync`);

    // 3. Sync channels in batches (3 concurrent)
    const results = await syncChannelsBatch(channelIds, 3);

    // 4. Calculate statistics
    const stats = {
      channelsSynced: results.filter(r => r.success).length,
      channelsFailed: results.filter(r => !r.success).length,
      totalVideosAdded: results.reduce((sum, r) => sum + r.videosAdded, 0),
      totalVideosUpdated: results.reduce((sum, r) => sum + r.videosUpdated, 0),
      totalOutliersFound: results.reduce((sum, r) => sum + r.outliersFound, 0),
      totalTranscriptsFetched: results.reduce((sum, r) => sum + r.transcriptsFetched, 0)
    };

    const executionTime = Date.now() - startTime;

    console.log('=== CRON: Video Sync Complete ===');
    console.log(`Channels synced: ${stats.channelsSynced}/${channelIds.length}`);
    console.log(`Videos added: ${stats.totalVideosAdded}`);
    console.log(`Videos updated: ${stats.totalVideosUpdated}`);
    console.log(`Outliers found: ${stats.totalOutliersFound}`);
    console.log(`Transcripts fetched: ${stats.totalTranscriptsFetched}`);
    console.log(`Execution time: ${(executionTime / 1000).toFixed(2)}s`);

    // 5. Log any failures
    const failures = results.filter(r => !r.success);
    if (failures.length > 0) {
      console.error('Failed syncs:', failures.map(f => ({
        channelId: f.channelId,
        error: f.error
      })));
    }

    return NextResponse.json({
      success: true,
      stats,
      executionTime,
      failures: failures.map(f => ({
        channelId: f.channelId,
        error: f.error
      }))
    });

  } catch (error) {
    console.error('CRON ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now()
      },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint for manual testing (development only)
 */
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  // Reuse GET logic for testing
  return GET(request);
}
