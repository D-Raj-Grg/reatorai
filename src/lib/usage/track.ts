/**
 * Usage Tracking System
 *
 * Tracks and enforces usage limits for:
 * - AI video analyses per month
 * - Script generations per month
 * - Channel tracking limits
 *
 * Integrates with user_subscriptions table to enforce plan limits.
 */

import { createClient } from '@/lib/supabase/server';

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_type: string;

  // Limits
  max_scripts_per_month: number;
  max_analyses_per_month: number;
  max_channels: number;

  // Current usage
  scripts_used_this_month: number;
  analyses_used_this_month: number;
  channels_count: number;

  // Billing period
  current_period_start: string;
  current_period_end: string;
}

export interface UsageStatus {
  canUse: boolean;
  remaining: number;
  limit: number;
  used: number;
  percentUsed: number;
  planType: string;
}

export interface AllUsageStatus {
  scripts: UsageStatus;
  analyses: UsageStatus;
  channels: UsageStatus;
}

/**
 * Get user's subscription details
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user subscription:', error);
    return null;
  }

  return data as UserSubscription;
}

/**
 * Check if user can perform an analysis
 */
export async function canAnalyzeVideo(userId: string): Promise<UsageStatus> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return {
      canUse: false,
      remaining: 0,
      limit: 0,
      used: 0,
      percentUsed: 100,
      planType: 'none'
    };
  }

  const used = subscription.analyses_used_this_month;
  const limit = subscription.max_analyses_per_month;
  const remaining = Math.max(0, limit - used);
  const canUse = remaining > 0;
  const percentUsed = limit > 0 ? (used / limit) * 100 : 100;

  return {
    canUse,
    remaining,
    limit,
    used,
    percentUsed,
    planType: subscription.plan_type
  };
}

/**
 * Check if user can generate a script
 */
export async function canGenerateScript(userId: string): Promise<UsageStatus> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return {
      canUse: false,
      remaining: 0,
      limit: 0,
      used: 0,
      percentUsed: 100,
      planType: 'none'
    };
  }

  const used = subscription.scripts_used_this_month;
  const limit = subscription.max_scripts_per_month;
  const remaining = Math.max(0, limit - used);
  const canUse = remaining > 0;
  const percentUsed = limit > 0 ? (used / limit) * 100 : 100;

  return {
    canUse,
    remaining,
    limit,
    used,
    percentUsed,
    planType: subscription.plan_type
  };
}

/**
 * Check if user can add another channel
 */
export async function canAddChannel(userId: string): Promise<UsageStatus> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return {
      canUse: false,
      remaining: 0,
      limit: 0,
      used: 0,
      percentUsed: 100,
      planType: 'none'
    };
  }

  const used = subscription.channels_count;
  const limit = subscription.max_channels;
  const remaining = Math.max(0, limit - used);
  const canUse = remaining > 0;
  const percentUsed = limit > 0 ? (used / limit) * 100 : 100;

  return {
    canUse,
    remaining,
    limit,
    used,
    percentUsed,
    planType: subscription.plan_type
  };
}

/**
 * Get all usage status for a user
 */
export async function getAllUsageStatus(userId: string): Promise<AllUsageStatus> {
  const [scripts, analyses, channels] = await Promise.all([
    canGenerateScript(userId),
    canAnalyzeVideo(userId),
    canAddChannel(userId)
  ]);

  return { scripts, analyses, channels };
}

/**
 * Track an analysis (increment counter)
 */
export async function trackAnalysis(userId: string): Promise<{ success: boolean; error?: string }> {
  // Check if user can analyze
  const status = await canAnalyzeVideo(userId);
  if (!status.canUse) {
    return {
      success: false,
      error: `Analysis limit reached. You've used ${status.used}/${status.limit} analyses this month. Upgrade to continue.`
    };
  }

  const supabase = createClient();

  // Increment the counter
  const { error } = await supabase.rpc('increment_analyses_used', {
    user_id_input: userId
  });

  if (error) {
    // Fallback: manual update if RPC doesn't exist yet
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          analyses_used_this_month: subscription.analyses_used_this_month + 1
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error tracking analysis:', updateError);
        return { success: false, error: 'Failed to track usage' };
      }
    }
  }

  return { success: true };
}

/**
 * Track a script generation (increment counter)
 */
export async function trackScriptGeneration(userId: string): Promise<{ success: boolean; error?: string }> {
  // Check if user can generate script
  const status = await canGenerateScript(userId);
  if (!status.canUse) {
    return {
      success: false,
      error: `Script generation limit reached. You've used ${status.used}/${status.limit} scripts this month. Upgrade to continue.`
    };
  }

  const supabase = createClient();

  // Increment the counter
  const { error } = await supabase.rpc('increment_scripts_used', {
    user_id_input: userId
  });

  if (error) {
    // Fallback: manual update if RPC doesn't exist yet
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          scripts_used_this_month: subscription.scripts_used_this_month + 1
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error tracking script:', updateError);
        return { success: false, error: 'Failed to track usage' };
      }
    }
  }

  return { success: true };
}

/**
 * Track channel addition (increment counter)
 */
export async function trackChannelAdd(userId: string): Promise<{ success: boolean; error?: string }> {
  // Check if user can add channel
  const status = await canAddChannel(userId);
  if (!status.canUse) {
    return {
      success: false,
      error: `Channel limit reached. You're tracking ${status.used}/${status.limit} channels. Upgrade to add more.`
    };
  }

  const supabase = createClient();

  const subscription = await getUserSubscription(userId);
  if (subscription) {
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        channels_count: subscription.channels_count + 1
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error tracking channel add:', updateError);
      return { success: false, error: 'Failed to track usage' };
    }
  }

  return { success: true };
}

/**
 * Track channel removal (decrement counter)
 */
export async function trackChannelRemove(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const subscription = await getUserSubscription(userId);
  if (subscription && subscription.channels_count > 0) {
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        channels_count: subscription.channels_count - 1
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error tracking channel remove:', updateError);
      return { success: false, error: 'Failed to track usage' };
    }
  }

  return { success: true };
}

/**
 * Check if user should see upgrade prompt
 */
export function shouldShowUpgradePrompt(status: UsageStatus): boolean {
  // Show prompt when user has used 80%+ of their quota
  return status.percentUsed >= 80;
}

/**
 * Get upgrade prompt message based on usage
 */
export function getUpgradePromptMessage(type: 'scripts' | 'analyses' | 'channels', status: UsageStatus): string {
  if (!status.canUse) {
    return `You've reached your ${type} limit (${status.used}/${status.limit}). Upgrade to continue using ReatorAI!`;
  }

  if (status.percentUsed >= 90) {
    return `Only ${status.remaining} ${type} remaining this month. Upgrade for unlimited access!`;
  }

  if (status.percentUsed >= 80) {
    return `You're using ${status.used}/${status.limit} ${type}. Consider upgrading for more!`;
  }

  return '';
}

/**
 * Reset monthly usage counters (called by cron job)
 */
export async function resetMonthlyUsage(): Promise<{ success: boolean; resetCount: number }> {
  const supabase = createClient();

  // Reset all subscriptions where current_period_end has passed
  const { data, error } = await supabase
    .from('user_subscriptions')
    .update({
      scripts_used_this_month: 0,
      analyses_used_this_month: 0,
      current_period_start: new Date().toISOString().split('T')[0],
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    .lt('current_period_end', new Date().toISOString().split('T')[0])
    .select('id');

  if (error) {
    console.error('Error resetting monthly usage:', error);
    return { success: false, resetCount: 0 };
  }

  return { success: true, resetCount: data?.length || 0 };
}
