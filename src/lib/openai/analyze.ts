/**
 * AI-Powered Video Analysis
 *
 * Uses OpenAI GPT-4o to analyze viral videos and understand
 * why they performed exceptionally well.
 *
 * Analysis covers:
 * - Hook strategy (first 3-5 seconds)
 * - Storytelling structure
 * - Emotional triggers
 * - Visual format recommendations
 * - Call-to-action effectiveness
 * - Key takeaways
 */

import { openai, MODELS } from './client';

export interface VideoAnalysisInput {
  title: string;
  description: string;
  transcript: string;
  views: number;
  likes: number;
  comments: number;
}

export interface VideoAnalysisResult {
  hookAnalysis: string;
  storytellingAnalysis: string;
  emotionalTriggers: string;
  visualFormat: string;
  ctaAnalysis: string;
  keyTakeaways: string;
  fullAnalysis: string;
  tokensUsed: number;
}

/**
 * Analyze a viral video to understand why it performed well
 *
 * @param video - Video information including transcript
 * @returns Structured analysis with insights
 */
export async function analyzeVideo(
  video: VideoAnalysisInput
): Promise<VideoAnalysisResult> {
  try {
    // Prepare the analysis prompt
    const prompt = buildAnalysisPrompt(video);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: MODELS.GPT4O,
      messages: [
        {
          role: 'system',
          content: getSystemPrompt()
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500
    });

    const analysis = response.choices[0].message.content || '';
    const tokensUsed = response.usage?.total_tokens || 0;

    // Parse the structured analysis
    const parsed = parseAnalysis(analysis);

    return {
      ...parsed,
      fullAnalysis: analysis,
      tokensUsed
    };
  } catch (error) {
    console.error('Error analyzing video:', error);
    throw new Error('Failed to analyze video. Please try again.');
  }
}

/**
 * Build the analysis prompt for OpenAI
 */
function buildAnalysisPrompt(video: VideoAnalysisInput): string {
  // Truncate transcript if too long (keep first 3000 characters)
  const truncatedTranscript = video.transcript.substring(0, 3000);
  const transcriptNote = video.transcript.length > 3000
    ? '\n\n[Transcript truncated for analysis]'
    : '';

  return `
Analyze this viral educational video and explain why it performed exceptionally well:

**Video Details:**
- Title: ${video.title}
- Views: ${video.views.toLocaleString()}
- Likes: ${video.likes.toLocaleString()}
- Comments: ${video.comments.toLocaleString()}
- Engagement Rate: ${calculateEngagementRate(video)}%

**Description:**
${video.description || 'No description provided'}

**Transcript:**
${truncatedTranscript}${transcriptNote}

Provide a detailed analysis in these sections:

## 1. Hook Analysis (First 3-5 seconds)
- What makes the opening compelling?
- Does it create curiosity or pattern interrupt?
- What specific words/phrases grab attention?
- How could this hook format be replicated?

## 2. Storytelling Structure
- What framework is used? (Problem-Solution, Before-After, etc.)
- How is information sequenced?
- What makes the narrative engaging?
- How does it build and maintain tension?

## 3. Emotional Triggers
- What emotions are evoked? (curiosity, surprise, excitement, etc.)
- How does it maintain engagement throughout?
- What psychological principles are at play?
- How does it make viewers feel?

## 4. Visual Format Recommendations
- What visual style likely worked well?
- Any specific visual hooks mentioned in content?
- Suggestions for recreating this visually
- B-roll or graphics recommendations

## 5. Call-to-Action Analysis
- How does it encourage engagement?
- Is there a strong ending?
- What makes viewers want to follow/subscribe?
- How could the CTA be improved?

## 6. Key Takeaways
- 3-5 specific tactics that made this successful
- Actionable insights for future videos
- What patterns can be replicated?
- Unique elements worth noting

Format your response with clear markdown headers (##) for each section.
Be specific, actionable, and focus on tactics that can be applied to future content.
`.trim();
}

/**
 * Get the system prompt for video analysis
 */
function getSystemPrompt(): string {
  return `You are an expert in viral content analysis, specializing in educational short-form videos for platforms like YouTube Shorts, TikTok, and Instagram Reels.

Your analysis should be:
- Data-driven and evidence-based
- Actionable and specific (not generic advice)
- Focused on replicable patterns
- Tailored to educational content creators
- Honest about what makes content successful

Provide insights that help creators understand WHY something went viral and HOW to apply those lessons to their own content.`;
}

/**
 * Parse the AI response into structured sections
 */
function parseAnalysis(analysis: string): Omit<VideoAnalysisResult, 'fullAnalysis' | 'tokensUsed'> {
  // Extract sections using markdown headers
  const sections = {
    hookAnalysis: extractSection(analysis, '1. Hook Analysis', '2. Storytelling'),
    storytellingAnalysis: extractSection(analysis, '2. Storytelling Structure', '3. Emotional'),
    emotionalTriggers: extractSection(analysis, '3. Emotional Triggers', '4. Visual'),
    visualFormat: extractSection(analysis, '4. Visual Format', '5. Call-to-Action'),
    ctaAnalysis: extractSection(analysis, '5. Call-to-Action', '6. Key Takeaways'),
    keyTakeaways: extractSection(analysis, '6. Key Takeaways', null)
  };

  return sections;
}

/**
 * Extract a section from the analysis text
 */
function extractSection(
  text: string,
  startMarker: string,
  endMarker: string | null
): string {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';

  const contentStart = startIndex + startMarker.length;

  if (endMarker) {
    const endIndex = text.indexOf(endMarker, contentStart);
    if (endIndex === -1) {
      return text.substring(contentStart).trim();
    }
    return text.substring(contentStart, endIndex).trim();
  }

  return text.substring(contentStart).trim();
}

/**
 * Calculate engagement rate for display
 */
function calculateEngagementRate(video: VideoAnalysisInput): string {
  if (video.views === 0) return '0.00';

  const engagement = (video.likes + video.comments) / video.views;
  return (engagement * 100).toFixed(2);
}

/**
 * Analyze multiple videos in batch
 *
 * @param videos - Array of videos to analyze
 * @returns Array of analysis results
 */
export async function analyzeVideosBatch(
  videos: VideoAnalysisInput[]
): Promise<VideoAnalysisResult[]> {
  const results: VideoAnalysisResult[] = [];

  // Process sequentially to avoid rate limits
  for (const video of videos) {
    try {
      const analysis = await analyzeVideo(video);
      results.push(analysis);

      // Small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to analyze video: ${video.title}`, error);
      // Continue with other videos
    }
  }

  return results;
}

/**
 * Get quick insights without full analysis (uses GPT-4o-mini for speed/cost)
 *
 * @param video - Video to analyze
 * @returns Brief insight summary
 */
export async function getQuickInsights(
  video: VideoAnalysisInput
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a viral content expert. Provide brief, actionable insights.'
        },
        {
          role: 'user',
          content: `Briefly explain (2-3 sentences) why this video with ${video.views.toLocaleString()} views performed well:\n\nTitle: ${video.title}\n\nFirst 200 chars of transcript: ${video.transcript.substring(0, 200)}...`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content || 'No insights available';
  } catch (error) {
    console.error('Error getting quick insights:', error);
    return 'Failed to generate insights';
  }
}
