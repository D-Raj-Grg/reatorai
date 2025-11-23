/**
 * Example Usage of Outlier Detection Algorithm
 *
 * This file demonstrates how to use the outlier detection
 * functions in real-world scenarios.
 */

import {
  calculateOutlierScore,
  calculateChannelAverages,
  detectOutliers,
  getOutlierVideos,
  formatOutlierScore,
  getOutlierTier,
  type VideoMetrics
} from './outlier-detection';

// ============================================
// Example 1: Detect Outliers in a Channel
// ============================================

function exampleDetectOutliersInChannel() {
  console.log('=== Example 1: Detect Outliers in Channel ===\n');

  // Sample video data from a channel
  const channelVideos: VideoMetrics[] = [
    { views: 12000, likes: 600, comments: 120 },
    { views: 15000, likes: 750, comments: 150 },
    { views: 45000, likes: 2250, comments: 450 }, // Potential outlier
    { views: 10000, likes: 500, comments: 100 },
    { views: 8000, likes: 400, comments: 80 },
    { views: 120000, likes: 6000, comments: 1200 }, // Mega outlier
    { views: 13000, likes: 650, comments: 130 }
  ];

  // Detect outliers
  const results = detectOutliers(channelVideos);

  // Display results
  results.forEach((video, index) => {
    const tier = getOutlierTier(video.score);
    console.log(`Video ${index + 1}:`);
    console.log(`  Views: ${video.views.toLocaleString()}`);
    console.log(`  Score: ${formatOutlierScore(video.score)}`);
    console.log(`  Status: ${tier.label}`);
    console.log(`  Is Outlier: ${video.isOutlier ? '✅' : '❌'}`);
    console.log('');
  });

  // Get only outliers
  const outliers = results.filter(v => v.isOutlier);
  console.log(`Found ${outliers.length} outliers out of ${channelVideos.length} videos\n`);
}

// ============================================
// Example 2: Single Video Check
// ============================================

function exampleCheckSingleVideo() {
  console.log('=== Example 2: Check Single Video ===\n');

  const newVideo: VideoMetrics = {
    views: 50000,
    likes: 2500,
    comments: 500
  };

  const channelAverage = {
    avgViews: 10000,
    avgEngagementRate: 0.06
  };

  const result = calculateOutlierScore(newVideo, channelAverage);
  const tier = getOutlierTier(result.score);

  console.log('New Video Analysis:');
  console.log(`  Views: ${newVideo.views.toLocaleString()}`);
  console.log(`  Likes: ${newVideo.likes.toLocaleString()}`);
  console.log(`  Comments: ${newVideo.comments.toLocaleString()}`);
  console.log('');
  console.log('Outlier Analysis:');
  console.log(`  Score: ${formatOutlierScore(result.score)}`);
  console.log(`  View Ratio: ${result.viewRatio.toFixed(2)}x`);
  console.log(`  Engagement Ratio: ${result.engagementRatio.toFixed(2)}x`);
  console.log(`  Tier: ${tier.label} (${tier.tier})`);
  console.log(`  Is Outlier: ${result.isOutlier ? '✅ YES' : '❌ NO'}`);
  console.log('');
}

// ============================================
// Example 3: Calculate Channel Stats
// ============================================

function exampleCalculateChannelStats() {
  console.log('=== Example 3: Calculate Channel Stats ===\n');

  const videos: VideoMetrics[] = [
    { views: 10000, likes: 500, comments: 100 },
    { views: 15000, likes: 750, comments: 150 },
    { views: 8000, likes: 400, comments: 80 },
    { views: 12000, likes: 600, comments: 120 },
    { views: 20000, likes: 1000, comments: 200 }
  ];

  const averages = calculateChannelAverages(videos);

  console.log('Channel Statistics:');
  console.log(`  Total Videos: ${videos.length}`);
  console.log(`  Average Views: ${averages.avgViews.toLocaleString()}`);
  console.log(`  Average Engagement Rate: ${(averages.avgEngagementRate * 100).toFixed(2)}%`);
  console.log('');
}

// ============================================
// Example 4: Real-World Scenario
// ============================================

function exampleRealWorldScenario() {
  console.log('=== Example 4: Real-World Scenario ===\n');

  // Simulate a channel that just uploaded a new video
  const existingVideos: VideoMetrics[] = [
    { views: 5000, likes: 250, comments: 50 },
    { views: 7000, likes: 350, comments: 70 },
    { views: 6000, likes: 300, comments: 60 },
    { views: 4500, likes: 225, comments: 45 },
    { views: 8000, likes: 400, comments: 80 }
  ];

  const newVideo: VideoMetrics = {
    views: 25000,
    likes: 1250,
    comments: 250
  };

  // Calculate channel baseline
  const baseline = calculateChannelAverages(existingVideos);

  // Check if new video is an outlier
  const analysis = calculateOutlierScore(newVideo, baseline);
  const tier = getOutlierTier(analysis.score);

  console.log('📊 Channel Baseline:');
  console.log(`  Average Views: ${baseline.avgViews.toLocaleString()}`);
  console.log(`  Average Engagement: ${(baseline.avgEngagementRate * 100).toFixed(2)}%`);
  console.log('');

  console.log('🎬 New Video Performance:');
  console.log(`  Views: ${newVideo.views.toLocaleString()}`);
  console.log(`  Engagement Rate: ${(analysis.engagementRate * 100).toFixed(2)}%`);
  console.log('');

  console.log('⚡ Outlier Analysis:');
  console.log(`  Score: ${formatOutlierScore(analysis.score)}`);
  console.log(`  Performance: ${tier.label}`);
  console.log(`  View Multiplier: ${analysis.viewRatio.toFixed(1)}x channel average`);

  if (analysis.isOutlier) {
    console.log('  🎉 This video is performing significantly better than usual!');
    console.log('  💡 Consider analyzing it for viral patterns');
  } else {
    console.log('  📈 Normal performance - within expected range');
  }
  console.log('');
}

// ============================================
// Example 5: Get Only Top Outliers
// ============================================

function exampleGetTopOutliers() {
  console.log('=== Example 5: Get Top Outliers ===\n');

  const videos: VideoMetrics[] = [
    { views: 10000, likes: 500, comments: 100 },
    { views: 45000, likes: 2250, comments: 450 },
    { views: 8000, likes: 400, comments: 80 },
    { views: 120000, likes: 6000, comments: 1200 },
    { views: 12000, likes: 600, comments: 120 },
    { views: 30000, likes: 1500, comments: 300 }
  ];

  const outliers = getOutlierVideos(videos);

  console.log(`Found ${outliers.length} outlier videos:\n`);

  outliers
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .forEach((video, index) => {
      const tier = getOutlierTier(video.score);
      console.log(`${index + 1}. ${formatOutlierScore(video.score)} - ${tier.label}`);
      console.log(`   Views: ${video.views.toLocaleString()}`);
      console.log('');
    });
}

// ============================================
// Run All Examples
// ============================================

export function runAllExamples() {
  exampleDetectOutliersInChannel();
  console.log('\n' + '='.repeat(50) + '\n');

  exampleCheckSingleVideo();
  console.log('\n' + '='.repeat(50) + '\n');

  exampleCalculateChannelStats();
  console.log('\n' + '='.repeat(50) + '\n');

  exampleRealWorldScenario();
  console.log('\n' + '='.repeat(50) + '\n');

  exampleGetTopOutliers();
}

// Uncomment to run examples:
// runAllExamples();
