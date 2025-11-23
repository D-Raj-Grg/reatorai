/**
 * Hook Formats for Script Generation
 *
 * These are proven opening strategies that grab attention in the first 3-5 seconds.
 */

export const HOOK_FORMATS = {
  PATTERN_INTERRUPT: {
    id: 'pattern_interrupt',
    name: 'Pattern Interrupt',
    description: 'Disrupt the viewer\'s scrolling with an unexpected action, sound, or visual. Great for breaking the scroll.',
    example: '*Record scratch* "Yep, that\'s me. You\'re probably wondering how I ended up here..."',
    bestFor: 'Entertainment, Comedy, Storytelling'
  },
  SHOCKING_STAT: {
    id: 'shocking_stat',
    name: 'Shocking Stat',
    description: 'Open with a surprising or counterintuitive statistic that makes viewers question what they know.',
    example: '"97% of people don\'t know this simple trick that could save them thousands..."',
    bestFor: 'Educational, Finance, Health'
  },
  PERSONAL_STORY: {
    id: 'personal_story',
    name: 'Personal Story',
    description: 'Start with a relatable personal moment or experience that creates immediate connection.',
    example: '"Last year, I was $50,000 in debt and sleeping in my car. Today..."',
    bestFor: 'Motivational, Personal Development, Business'
  },
  BOLD_CLAIM: {
    id: 'bold_claim',
    name: 'Bold Claim',
    description: 'Make a provocative statement that challenges conventional wisdom or promises a big result.',
    example: '"Everything you know about productivity is wrong, and I can prove it..."',
    bestFor: 'Contrarian takes, Myth-busting, Hot takes'
  },
  QUESTION_HOOK: {
    id: 'question_hook',
    name: 'Question Hook',
    description: 'Ask a compelling question that makes the viewer need to know the answer.',
    example: '"What if I told you there\'s a way to double your income without working more hours?"',
    bestFor: 'Problem-solving, How-to, Educational'
  },
  TREND_JACKING: {
    id: 'trend_jacking',
    name: 'Trend Jacking',
    description: 'Reference a current trend, meme, or viral moment to ride the wave of existing interest.',
    example: '"Everyone\'s talking about ChatGPT, but nobody\'s talking about THIS..."',
    bestFor: 'Tech, Pop Culture, News Commentary'
  },
  CONTRARIAN_TAKE: {
    id: 'contrarian_take',
    name: 'Contrarian Take',
    description: 'Take an unpopular position or argue against common advice to create controversy.',
    example: '"Stop following your passion. Here\'s why that advice is ruining your career..."',
    bestFor: 'Opinion, Business, Career Advice'
  },
  LIST_FORMAT: {
    id: 'list_format',
    name: 'List Format',
    description: 'Promise specific, numbered insights that create clear expectations and easy consumption.',
    example: '"5 mistakes I made in my 20s that cost me $100,000..."',
    bestFor: 'Listicles, Tips & Tricks, Compilations'
  },
  DIRECT_ADDRESS: {
    id: 'direct_address',
    name: 'Direct Address',
    description: 'Speak directly to a specific audience segment to make them feel personally called out.',
    example: '"If you\'re a freelancer charging less than $100/hour, you need to hear this..."',
    bestFor: 'Niche content, Specific audiences, B2B'
  }
} as const;

/**
 * Storytelling Frameworks
 *
 * These are proven structures for organizing your script's narrative.
 */

export const FRAMEWORKS = {
  PAS: {
    id: 'pas',
    name: 'Problem-Agitate-Solve (PAS)',
    description: 'Identify a problem, amplify the pain, then present your solution.',
    structure: [
      '1. Problem: What\'s the issue?',
      '2. Agitate: Why does it hurt?',
      '3. Solve: Here\'s the solution'
    ],
    bestFor: 'Sales, Problem-solving, Product demos',
    example: 'Problem: Can\'t lose weight. Agitate: Tried everything, still gaining. Solve: This one change fixed it.'
  },
  BAB: {
    id: 'bab',
    name: 'Before-After-Bridge',
    description: 'Show the before state, reveal the after state, then bridge how to get there.',
    structure: [
      '1. Before: Where you started',
      '2. After: Where you are now',
      '3. Bridge: How you got there'
    ],
    bestFor: 'Transformation stories, Case studies, Testimonials',
    example: 'Before: Broke. After: Millionaire. Bridge: Started this business.'
  },
  AIDA: {
    id: 'aida',
    name: 'Attention-Interest-Desire-Action',
    description: 'Grab attention, build interest, create desire, prompt action.',
    structure: [
      '1. Attention: Hook them',
      '2. Interest: Make it relevant',
      '3. Desire: Make them want it',
      '4. Action: Tell them what to do'
    ],
    bestFor: 'Marketing, Advertising, Calls to action',
    example: 'Attention: Watch this. Interest: It changed my life. Desire: You can do it too. Action: Click the link.'
  },
  HEROS_JOURNEY: {
    id: 'heros_journey',
    name: 'Hero\'s Journey',
    description: 'Take the viewer on a narrative arc with challenge, struggle, and triumph.',
    structure: [
      '1. Ordinary World: Starting point',
      '2. Call to Adventure: The challenge',
      '3. Trials: The struggle',
      '4. Transformation: The victory',
      '5. Return: The lesson'
    ],
    bestFor: 'Storytelling, Motivational, Personal brand',
    example: 'I was stuck → Faced a crisis → Nearly gave up → Found the solution → Now I teach others'
  },
  SCR: {
    id: 'scr',
    name: 'Situation-Complication-Resolution',
    description: 'Set up the context, introduce the obstacle, reveal how it was overcome.',
    structure: [
      '1. Situation: Set the scene',
      '2. Complication: What went wrong',
      '3. Resolution: How it was fixed'
    ],
    bestFor: 'Case studies, Tutorial, Explainer videos',
    example: 'Was building a business → Hit a major problem → Found this solution'
  },
  FBP: {
    id: 'fbp',
    name: 'Feature-Benefit-Proof',
    description: 'Present features, explain benefits, provide social proof.',
    structure: [
      '1. Feature: What it is',
      '2. Benefit: Why it matters',
      '3. Proof: Evidence it works'
    ],
    bestFor: 'Product reviews, Recommendations, Comparisons',
    example: 'This tool has X feature → It saves you Y time → Here are the results'
  },
  CURIOSITY_LOOP: {
    id: 'curiosity_loop',
    name: 'Curiosity Loop',
    description: 'Open a loop early, add tension throughout, close it with a payoff.',
    structure: [
      '1. Open: Tease the reveal',
      '2. Build: Add context and tension',
      '3. Close: Deliver the payoff'
    ],
    bestFor: 'Mystery, Reveals, Countdowns',
    example: 'This thing changed everything → Let me show you why → Here\'s what it is'
  }
} as const;

/**
 * Tone Options for Writing Style
 */
export const TONE_OPTIONS = {
  CASUAL: {
    id: 'casual',
    name: 'Casual',
    description: 'Conversational, friendly, like talking to a friend',
    markers: 'Use contractions, simple language, personal pronouns'
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    description: 'Polished, authoritative, credible',
    markers: 'Formal language, data-driven, expert positioning'
  },
  ENTHUSIASTIC: {
    id: 'enthusiastic',
    name: 'Enthusiastic',
    description: 'Energetic, exciting, passion-driven',
    markers: 'Exclamation points, power words, emotion'
  },
  EDUCATIONAL: {
    id: 'educational',
    name: 'Educational',
    description: 'Teaching-focused, clear, structured',
    markers: 'Step-by-step, explanations, examples'
  }
} as const;

/**
 * Vocabulary Level Options
 */
export const VOCABULARY_LEVELS = {
  SIMPLE: {
    id: 'simple',
    name: 'Simple',
    description: 'Easy to understand, accessible to all',
    readingLevel: '6th-8th grade'
  },
  MODERATE: {
    id: 'moderate',
    name: 'Moderate',
    description: 'Balanced, mainstream audience',
    readingLevel: '9th-12th grade'
  },
  ADVANCED: {
    id: 'advanced',
    name: 'Advanced',
    description: 'Sophisticated, niche audience',
    readingLevel: 'College level'
  }
} as const;

// Type exports for TypeScript
export type HookFormatId = keyof typeof HOOK_FORMATS;
export type FrameworkId = keyof typeof FRAMEWORKS;
export type ToneId = keyof typeof TONE_OPTIONS;
export type VocabularyLevelId = keyof typeof VOCABULARY_LEVELS;

/**
 * Helper functions to get all available options (for UI)
 */

/**
 * Get all available hook formats (for UI selection)
 */
export function getAllHookFormats() {
  return Object.values(HOOK_FORMATS);
}

/**
 * Get all available frameworks (for UI selection)
 */
export function getAllFrameworks() {
  return Object.values(FRAMEWORKS);
}

/**
 * Get all available tones (for UI selection)
 */
export function getAllTones() {
  return Object.values(TONE_OPTIONS);
}

/**
 * Get all available vocabulary levels (for UI selection)
 */
export function getAllVocabularyLevels() {
  return Object.values(VOCABULARY_LEVELS);
}
