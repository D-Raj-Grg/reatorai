/**
 * YouTube Transcript Extraction
 *
 * Extracts and processes YouTube video transcripts using the
 * youtube-transcript package.
 *
 * Features:
 * - Automatic language detection
 * - Multi-language support
 * - Timestamp preservation (optional)
 * - Text cleanup and formatting
 * - Error handling for videos without transcripts
 */

import { YoutubeTranscript } from 'youtube-transcript';

export interface TranscriptSegment {
  text: string;
  duration: number;
  offset: number;
  lang?: string;
}

export interface TranscriptOptions {
  includeTimestamps?: boolean;
  language?: string;
  preserveFormatting?: boolean;
}

export interface TranscriptResult {
  text: string;
  segments?: TranscriptSegment[];
  language?: string;
  duration?: number;
  wordCount?: number;
}

/**
 * Fetch and format transcript for a YouTube video
 *
 * @param videoId - YouTube video ID (11 characters)
 * @param options - Optional configuration
 * @returns Transcript as formatted string, or null if unavailable
 */
export async function fetchTranscript(
  videoId: string,
  options: TranscriptOptions = {}
): Promise<string | null> {
  try {
    // Validate video ID
    if (!videoId || videoId.length !== 11) {
      console.error('Invalid YouTube video ID:', videoId);
      throw new Error(`Invalid YouTube video ID: ${videoId}. Expected 11 characters.`);
    }

    // Fetch transcript from YouTube
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: options.language
    });

    if (!transcript || transcript.length === 0) {
      throw new Error('No transcript segments returned from YouTube');
    }

    // Combine all segments into one text
    let fullTranscript = transcript
      .map(segment => segment.text)
      .join(' ');

    // Clean up the transcript
    if (!options.preserveFormatting) {
      fullTranscript = cleanTranscript(fullTranscript);
    }

    return fullTranscript;
  } catch (error) {
    // Handle common errors with more specific messages
    if (error instanceof Error) {
      if (error.message.includes('Transcript is disabled')) {
        throw new Error(`Transcripts are disabled for this video. The creator may have turned them off.`);
      } else if (error.message.includes('Could not find') || error.message.includes('No transcripts available')) {
        throw new Error(`No transcripts available for this video. The creator may not have added any captions.`);
      } else if (error.message.includes('Invalid YouTube video ID')) {
        throw error; // Re-throw validation errors as-is
      } else if (error.message.includes('No transcript segments')) {
        throw error; // Re-throw empty transcript error
      } else {
        console.error('Error fetching transcript:', error.message);
        throw new Error(`Failed to fetch transcript: ${error.message}`);
      }
    }
    throw new Error('An unknown error occurred while fetching the transcript');
  }
}

/**
 * Fetch detailed transcript with segments and timestamps
 *
 * @param videoId - YouTube video ID
 * @param options - Optional configuration
 * @returns Detailed transcript result or null
 */
export async function fetchDetailedTranscript(
  videoId: string,
  options: TranscriptOptions = {}
): Promise<TranscriptResult | null> {
  try {
    // Validate video ID
    if (!videoId || videoId.length !== 11) {
      console.error('Invalid YouTube video ID:', videoId);
      return null;
    }

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: options.language
    });

    if (!transcript || transcript.length === 0) {
      return null;
    }

    // Process segments
    const segments: TranscriptSegment[] = transcript.map(segment => ({
      text: segment.text,
      duration: segment.duration || 0,
      offset: segment.offset || 0,
      lang: segment.lang
    }));

    // Combine text
    let fullText = segments.map(s => s.text).join(' ');

    if (!options.preserveFormatting) {
      fullText = cleanTranscript(fullText);
    }

    // Calculate total duration
    const lastSegment = segments[segments.length - 1];
    const duration = lastSegment
      ? lastSegment.offset + lastSegment.duration
      : 0;

    // Count words
    const wordCount = countWords(fullText);

    return {
      text: fullText,
      segments: options.includeTimestamps ? segments : undefined,
      language: segments[0]?.lang,
      duration,
      wordCount
    };
  } catch (error) {
    console.error('Error fetching detailed transcript:', error);
    return null;
  }
}

/**
 * Clean and normalize transcript text
 *
 * @param text - Raw transcript text
 * @returns Cleaned text
 */
export function cleanTranscript(text: string): string {
  return text
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Remove excessive punctuation
    .replace(/\.{2,}/g, '.')
    // Fix common transcript artifacts
    .replace(/\[.*?\]/g, '') // Remove [Music], [Applause], etc.
    .replace(/\(.*?\)/g, '') // Remove parenthetical notes
    // Trim
    .trim();
}

/**
 * Count words in text
 *
 * @param text - Input text
 * @returns Word count
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Extract transcript excerpt (first N words)
 *
 * @param text - Full transcript
 * @param wordLimit - Maximum words to include
 * @returns Excerpt with ellipsis if truncated
 */
export function getTranscriptExcerpt(
  text: string,
  wordLimit: number = 100
): string {
  const words = text.trim().split(/\s+/);

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(' ') + '...';
}

/**
 * Format transcript with timestamps
 *
 * @param segments - Transcript segments
 * @returns Formatted text with timestamps
 */
export function formatTranscriptWithTimestamps(
  segments: TranscriptSegment[]
): string {
  return segments
    .map(segment => {
      const timestamp = formatTimestamp(segment.offset);
      return `[${timestamp}] ${segment.text}`;
    })
    .join('\n');
}

/**
 * Format seconds to timestamp (MM:SS or HH:MM:SS)
 *
 * @param seconds - Time in seconds
 * @returns Formatted timestamp
 */
export function formatTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if a video likely has a transcript
 *
 * @param videoId - YouTube video ID
 * @returns True if transcript is available
 */
export async function hasTranscript(videoId: string): Promise<boolean> {
  const transcript = await fetchTranscript(videoId);
  return transcript !== null && transcript.length > 0;
}

/**
 * Batch fetch transcripts for multiple videos
 *
 * @param videoIds - Array of YouTube video IDs
 * @param options - Optional configuration
 * @returns Map of video ID to transcript
 */
export async function fetchTranscriptsBatch(
  videoIds: string[],
  options: TranscriptOptions = {}
): Promise<Map<string, string | null>> {
  const results = new Map<string, string | null>();

  // Process in parallel (but be mindful of rate limits)
  const promises = videoIds.map(async (videoId) => {
    const transcript = await fetchTranscript(videoId, options);
    return { videoId, transcript };
  });

  const settled = await Promise.allSettled(promises);

  settled.forEach((result) => {
    if (result.status === 'fulfilled') {
      results.set(result.value.videoId, result.value.transcript);
    }
  });

  return results;
}
