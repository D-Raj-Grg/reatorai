/**
 * AI-Powered Script Generation
 *
 * Uses OpenAI GPT-4o to generate custom viral video scripts
 * based on proven hook formats and storytelling frameworks.
 *
 * Features:
 * - 9 hook formats (Pattern Interrupt, Shocking Stat, etc.)
 * - 7 storytelling frameworks (PAS, AIDA, BAB, etc.)
 * - Customizable tone and vocabulary
 * - Visual suggestions and pacing notes
 * - Optimized for short-form video (60-120 seconds)
 */

import { openai, MODELS } from './client';
import {
  HOOK_FORMATS,
  FRAMEWORKS,
  TONE_OPTIONS,
  VOCABULARY_LEVELS,
  type HookFormatId,
  type FrameworkId,
  type ToneId,
  type VocabularyLevelId
} from './constants';

export interface GenerateScriptParams {
  // Source video context
  videoTitle: string;
  videoDescription?: string;
  videoTranscript: string;
  videoAnalysis?: {
    hookAnalysis?: string;
    storytellingAnalysis?: string;
    emotionalTriggers?: string;
    visualFormat?: string;
    ctaAnalysis?: string;
    keyTakeaways?: string;
  };
  videoStats?: {
    views: number;
    likes: number;
    comments: number;
  };

  // Script generation parameters
  hookFormat: HookFormatId;
  framework: FrameworkId;
  tone?: ToneId;
  vocabularyLevel?: VocabularyLevelId;
  customTopic?: string;
  targetDuration?: number; // seconds (default: 90)
}

export interface GeneratedScript {
  // Main script content
  topic: string;
  hook: string; // First 3-5 seconds
  body: string; // Main content
  callToAction: string; // Closing

  // Production details
  visualSuggestions: string[];
  estimatedDuration: number; // seconds
  wordCount: number;

  // Metadata
  hookFormat: string;
  framework: string;
  tone: string;
  keyPoints: string[];
  pacing: string;
  voiceoverNotes: string;

  // Usage tracking
  tokensUsed: number;
}

/**
 * Generate a custom video script based on viral video insights
 *
 * @param params - Script generation parameters
 * @returns Structured script with production notes
 */
export async function generateScript(
  params: GenerateScriptParams
): Promise<GeneratedScript> {
  try {
    // Get format and framework details
    const hookFormat = getHookFormat(params.hookFormat);
    const framework = getFramework(params.framework);
    const tone = params.tone ? getTone(params.tone) : TONE_OPTIONS.CASUAL;
    const vocab = params.vocabularyLevel
      ? getVocabularyLevel(params.vocabularyLevel)
      : VOCABULARY_LEVELS.SIMPLE;

    // Build comprehensive prompt
    const prompt = buildScriptPrompt(params, hookFormat, framework, tone, vocab);

    // Call OpenAI API with JSON response format
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
      temperature: 0.8, // Higher for more creative writing
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content || '{}';
    const tokensUsed = response.usage?.total_tokens || 0;

    // Parse JSON response
    const parsed = JSON.parse(content);

    // Calculate word count
    const wordCount = countWords(
      `${parsed.hook || ''} ${parsed.body || ''} ${parsed.callToAction || ''}`
    );

    // Return structured script
    return {
      topic: parsed.topic || params.customTopic || 'Video Script',
      hook: parsed.hook || '',
      body: parsed.body || '',
      callToAction: parsed.callToAction || '',
      visualSuggestions: parsed.visualSuggestions || [],
      estimatedDuration: parsed.estimatedDuration || params.targetDuration || 90,
      wordCount,
      hookFormat: hookFormat.name,
      framework: framework.name,
      tone: tone.name,
      keyPoints: parsed.keyPoints || [],
      pacing: parsed.pacing || 'Medium pace throughout',
      voiceoverNotes: parsed.voiceoverNotes || 'Read naturally with energy',
      tokensUsed
    };
  } catch (error) {
    console.error('Error generating script:', error);
    throw new Error('Failed to generate script. Please try again.');
  }
}

/**
 * Build the script generation prompt
 */
function buildScriptPrompt(
  params: GenerateScriptParams,
  hookFormat: typeof HOOK_FORMATS[keyof typeof HOOK_FORMATS],
  framework: typeof FRAMEWORKS[keyof typeof FRAMEWORKS],
  tone: typeof TONE_OPTIONS[keyof typeof TONE_OPTIONS],
  vocab: typeof VOCABULARY_LEVELS[keyof typeof VOCABULARY_LEVELS]
): string {
  const targetDuration = params.targetDuration || 90;
  const targetWords = Math.round(targetDuration / 60 * 150); // 150 words per minute

  // Truncate transcript if too long
  const truncatedTranscript = params.videoTranscript.substring(0, 2000);
  const transcriptNote = params.videoTranscript.length > 2000
    ? '\n[Transcript truncated]'
    : '';

  return `
Generate a viral short-form video script inspired by this successful video:

## Source Video Context

**Original Video:**
- Title: ${params.videoTitle}
- Description: ${params.videoDescription || 'N/A'}
${params.videoStats ? `- Views: ${params.videoStats.views.toLocaleString()}
- Likes: ${params.videoStats.likes.toLocaleString()}
- Comments: ${params.videoStats.comments.toLocaleString()}` : ''}

**Transcript Sample:**
${truncatedTranscript}${transcriptNote}

${params.videoAnalysis?.keyTakeaways ? `**Viral Insights:**
${params.videoAnalysis.keyTakeaways}` : ''}

${params.videoAnalysis?.hookAnalysis ? `**Hook Strategy:**
${params.videoAnalysis.hookAnalysis}` : ''}

${params.videoAnalysis?.storytellingAnalysis ? `**Storytelling Approach:**
${params.videoAnalysis.storytellingAnalysis}` : ''}

---

## Script Generation Requirements

### Hook Format: ${hookFormat.name}
**Description:** ${hookFormat.description}
**Example:** ${hookFormat.example}
**Best For:** ${hookFormat.bestFor}

**Your script MUST start with this hook style.**

### Storytelling Framework: ${framework.name}
**Description:** ${framework.description}
**Structure:**
${framework.structure.map((s: string) => `- ${s}`).join('\n')}
**Best For:** ${framework.bestFor}

**Your script MUST follow this structure.**

### Writing Style
- **Tone:** ${tone.name} - ${tone.description}
  - ${tone.markers}
- **Vocabulary:** ${vocab.name} (${vocab.readingLevel})
  - ${vocab.description}

### Technical Specs
- **Target Duration:** ${targetDuration} seconds
- **Target Word Count:** ~${targetWords} words (at 150 words/minute)
- **Platform:** Short-form video (YouTube Shorts, TikTok, Instagram Reels)
${params.customTopic ? `- **Topic/Angle:** ${params.customTopic}` : ''}

---

## Output Format (JSON)

Return your response as valid JSON with this structure:

\`\`\`json
{
  "topic": "Clear, engaging topic title",
  "hook": "The opening 3-5 seconds that grab attention using ${hookFormat.name} format",
  "body": "Main content following ${framework.name} structure (multiple paragraphs)",
  "callToAction": "Strong closing that encourages engagement",
  "visualSuggestions": [
    "Specific visual idea 1",
    "Specific visual idea 2",
    "Specific visual idea 3"
  ],
  "estimatedDuration": ${targetDuration},
  "keyPoints": [
    "Main point 1",
    "Main point 2",
    "Main point 3"
  ],
  "pacing": "Detailed pacing notes (e.g., 'Fast-paced hook, moderate body, energetic close')",
  "voiceoverNotes": "Voice delivery instructions (tone, emphasis, energy)"
}
\`\`\`

---

## Critical Success Factors

1. **Hook is EVERYTHING:** First 3 seconds must stop the scroll using ${hookFormat.name}
2. **Follow the Framework:** Adhere strictly to ${framework.name} structure
3. **Match the Tone:** Write in ${tone.name} style throughout
4. **Keep it Tight:** Target ${targetWords} words for ~${targetDuration} seconds
5. **Viral Elements:** Incorporate what made the original video successful
6. **Visual-First:** Every sentence should suggest a visual
7. **Energy:** Maintain high engagement throughout
8. **Clear Value:** Viewer should know what they'll learn/gain immediately

Generate the script now as JSON.
`.trim();
}

/**
 * Get the system prompt for script generation
 */
function getSystemPrompt(): string {
  return `You are an expert viral content scriptwriter specializing in short-form video scripts for YouTube Shorts, TikTok, and Instagram Reels.

Your expertise includes:
- Crafting attention-grabbing hooks that stop the scroll
- Applying proven storytelling frameworks (PAS, AIDA, etc.)
- Writing for educational content creators
- Optimizing scripts for 60-120 second videos
- Creating visual-first narratives
- Maximizing watch time and engagement

Write scripts that are:
- Immediately engaging (hook within 3 seconds)
- Tightly structured and fast-paced
- Full of personality and energy
- Optimized for retention
- Easy to execute visually
- Authentic and relatable

Always return valid JSON matching the exact structure requested.`;
}

/**
 * Helper function to get hook format by ID
 */
function getHookFormat(id: HookFormatId) {
  const format = HOOK_FORMATS[id.toUpperCase() as keyof typeof HOOK_FORMATS];
  if (!format) {
    throw new Error(`Unknown hook format: ${id}`);
  }
  return format;
}

/**
 * Helper function to get framework by ID
 */
function getFramework(id: FrameworkId) {
  const framework = FRAMEWORKS[id.toUpperCase() as keyof typeof FRAMEWORKS];
  if (!framework) {
    throw new Error(`Unknown framework: ${id}`);
  }
  return framework;
}

/**
 * Helper function to get tone by ID
 */
function getTone(id: ToneId) {
  const tone = TONE_OPTIONS[id.toUpperCase() as keyof typeof TONE_OPTIONS];
  if (!tone) {
    throw new Error(`Unknown tone: ${id}`);
  }
  return tone;
}

/**
 * Helper function to get vocabulary level by ID
 */
function getVocabularyLevel(id: VocabularyLevelId) {
  const level = VOCABULARY_LEVELS[id.toUpperCase() as keyof typeof VOCABULARY_LEVELS];
  if (!level) {
    throw new Error(`Unknown vocabulary level: ${id}`);
  }
  return level;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Generate multiple script variations
 *
 * @param params - Base script parameters
 * @param variations - Number of variations to generate (1-3)
 * @returns Array of generated scripts
 */
export async function generateScriptVariations(
  params: GenerateScriptParams,
  variations: number = 2
): Promise<GeneratedScript[]> {
  const results: GeneratedScript[] = [];

  // Generate variations sequentially
  for (let i = 0; i < Math.min(variations, 3); i++) {
    try {
      const script = await generateScript(params);
      results.push(script);

      // Small delay to avoid rate limits
      if (i < variations - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to generate variation ${i + 1}:`, error);
      // Continue with other variations
    }
  }

  return results;
}
