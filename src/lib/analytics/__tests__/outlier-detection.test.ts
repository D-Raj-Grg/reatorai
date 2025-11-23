/**
 * Tests for Outlier Detection Algorithm
 *
 * Run with: npm test outlier-detection
 */

import {
  calculateEngagementRate,
  calculateOutlierScore,
  calculateChannelAverages,
  detectOutliers,
  getOutlierVideos,
  formatOutlierScore,
  getOutlierTier,
  type VideoMetrics,
  type ChannelAverage
} from '../outlier-detection';

describe('Outlier Detection Algorithm', () => {
  describe('calculateEngagementRate', () => {
    it('should calculate engagement rate correctly', () => {
      const video: VideoMetrics = {
        views: 10000,
        likes: 500,
        comments: 100
      };

      const rate = calculateEngagementRate(video);
      expect(rate).toBe(0.06); // (500 + 100) / 10000
    });

    it('should handle zero views', () => {
      const video: VideoMetrics = {
        views: 0,
        likes: 100,
        comments: 50
      };

      const rate = calculateEngagementRate(video);
      expect(rate).toBe(0);
    });
  });

  describe('calculateOutlierScore', () => {
    it('should identify outlier video (2x views)', () => {
      const video: VideoMetrics = {
        views: 20000,
        likes: 500,
        comments: 100
      };

      const channelAvg: ChannelAverage = {
        avgViews: 10000,
        avgEngagementRate: 0.06
      };

      const result = calculateOutlierScore(video, channelAvg);

      expect(result.viewRatio).toBe(2.0); // 20000 / 10000
      expect(result.isOutlier).toBe(true); // Score should be >= 2.0
      expect(result.score).toBeGreaterThanOrEqual(2.0);
    });

    it('should NOT identify normal video as outlier', () => {
      const video: VideoMetrics = {
        views: 10000,
        likes: 600,
        comments: 100
      };

      const channelAvg: ChannelAverage = {
        avgViews: 10000,
        avgEngagementRate: 0.07
      };

      const result = calculateOutlierScore(video, channelAvg);

      expect(result.isOutlier).toBe(false);
      expect(result.score).toBeLessThan(2.0);
    });

    it('should handle edge case with zero averages', () => {
      const video: VideoMetrics = {
        views: 10000,
        likes: 500,
        comments: 100
      };

      const channelAvg: ChannelAverage = {
        avgViews: 0,
        avgEngagementRate: 0
      };

      const result = calculateOutlierScore(video, channelAvg);

      expect(result.isOutlier).toBe(false);
      expect(result.score).toBe(0);
    });
  });

  describe('calculateChannelAverages', () => {
    it('should calculate averages from video list', () => {
      const videos: VideoMetrics[] = [
        { views: 10000, likes: 500, comments: 100 },
        { views: 15000, likes: 750, comments: 150 },
        { views: 5000, likes: 250, comments: 50 }
      ];

      const avg = calculateChannelAverages(videos);

      expect(avg.avgViews).toBe(10000); // (10000 + 15000 + 5000) / 3
      expect(avg.avgEngagementRate).toBeCloseTo(0.06, 2);
    });

    it('should handle empty video list', () => {
      const videos: VideoMetrics[] = [];

      const avg = calculateChannelAverages(videos);

      expect(avg.avgViews).toBe(0);
      expect(avg.avgEngagementRate).toBe(0);
    });
  });

  describe('detectOutliers', () => {
    it('should detect outliers in video batch', () => {
      const videos: VideoMetrics[] = [
        { views: 10000, likes: 500, comments: 100 }, // Normal
        { views: 50000, likes: 2500, comments: 500 }, // Outlier (5x views)
        { views: 8000, likes: 400, comments: 80 },    // Normal
        { views: 25000, likes: 1250, comments: 250 }  // Outlier (2.5x views)
      ];

      const results = detectOutliers(videos);

      const outliers = results.filter(v => v.isOutlier);
      expect(outliers.length).toBeGreaterThan(0);
      expect(results[1].isOutlier).toBe(true); // 50k views video
    });
  });

  describe('getOutlierVideos', () => {
    it('should return only outlier videos', () => {
      const videos: VideoMetrics[] = [
        { views: 10000, likes: 500, comments: 100 },
        { views: 50000, likes: 2500, comments: 500 },
        { views: 8000, likes: 400, comments: 80 }
      ];

      const outliers = getOutlierVideos(videos);

      expect(outliers.length).toBeGreaterThan(0);
      outliers.forEach(v => {
        expect(v.isOutlier).toBe(true);
      });
    });
  });

  describe('formatOutlierScore', () => {
    it('should format score correctly', () => {
      expect(formatOutlierScore(2.5)).toBe('2.5x');
      expect(formatOutlierScore(10.123)).toBe('10.1x');
      expect(formatOutlierScore(1.0)).toBe('1.0x');
    });
  });

  describe('getOutlierTier', () => {
    it('should assign correct tiers', () => {
      expect(getOutlierTier(1.5).tier).toBe('none');
      expect(getOutlierTier(2.5).tier).toBe('bronze');
      expect(getOutlierTier(4.0).tier).toBe('silver');
      expect(getOutlierTier(7.0).tier).toBe('gold');
      expect(getOutlierTier(15.0).tier).toBe('platinum');
    });

    it('should assign correct labels', () => {
      expect(getOutlierTier(1.5).label).toBe('Normal');
      expect(getOutlierTier(2.5).label).toBe('Outlier');
      expect(getOutlierTier(4.0).label).toBe('Strong Outlier');
      expect(getOutlierTier(7.0).label).toBe('Viral');
      expect(getOutlierTier(15.0).label).toBe('Mega Viral');
    });
  });
});
