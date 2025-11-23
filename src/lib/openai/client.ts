// OpenAI API client configuration
import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Model configurations
export const MODELS = {
  GPT4O: 'gpt-4o',
  GPT4O_MINI: 'gpt-4o-mini',
} as const;

// Default configuration
export const DEFAULT_CONFIG = {
  model: MODELS.GPT4O,
  temperature: 0.7,
  max_tokens: 2000,
} as const;
