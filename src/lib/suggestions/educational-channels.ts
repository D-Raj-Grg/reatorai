export interface SuggestedChannel {
  name: string;
  channelId: string;
  handle: string;
  category: 'Science' | 'Geography' | 'History' | 'General Education';
  description: string;
  subscribers: string;
  thumbnail?: string;
}

export const SUGGESTED_CHANNELS: SuggestedChannel[] = [
  // Science Channels
  {
    name: 'Veritasium',
    channelId: 'UCHnyfMqiRRG1u-2MsSQLbXA',
    handle: '@veritasium',
    category: 'Science',
    description: 'An element of truth - videos about science, engineering, and anything else',
    subscribers: '15M+',
  },
  {
    name: 'Vsauce',
    channelId: 'UC6nSFpj9HTCZ5t-N3Rm3-HA',
    handle: '@Vsauce',
    category: 'Science',
    description: 'Mind-blowing facts and fascinating questions about our world',
    subscribers: '19M+',
  },
  {
    name: 'Kurzgesagt',
    channelId: 'UCsXVk37bltHxD1rDPwtNM8Q',
    handle: '@kurzgesagt',
    category: 'Science',
    description: 'Animated videos explaining things with optimistic nihilism',
    subscribers: '21M+',
  },
  {
    name: 'Mark Rober',
    channelId: 'UCY1kMZp36IQSyNx_9h4mpCg',
    handle: '@MarkRober',
    category: 'Science',
    description: 'Former NASA engineer creating amazing science experiments',
    subscribers: '57M+',
  },
  {
    name: 'SmarterEveryDay',
    channelId: 'UC6107grRI4m0o2-emgoDnAA',
    handle: '@smartereveryday',
    category: 'Science',
    description: 'Exploring the world using science',
    subscribers: '11M+',
  },
  {
    name: 'MinutePhysics',
    channelId: 'UCUHW94eEFW7hkUMVaZz4eDg',
    handle: '@minutephysics',
    category: 'Science',
    description: 'Cool physics and other sweet science explained in a minute',
    subscribers: '5.6M+',
  },
  {
    name: 'Physics Girl',
    channelId: 'UC7DdEm33SyaTDtWYGO2CwdA',
    handle: '@physicsgirl',
    category: 'Science',
    description: 'Physics videos for every atom and eve',
    subscribers: '2M+',
  },

  // Geography Channels
  {
    name: 'Geography Now',
    channelId: 'UCmmPgObSUPw1HL2lq6H4ffA',
    handle: '@GeographyNow',
    category: 'Geography',
    description: 'Learning about every country in the world',
    subscribers: '3.5M+',
  },
  {
    name: 'RealLifeLore',
    channelId: 'UCP5tjEmvPItGyLhmjdwP7Ww',
    handle: '@RealLifeLore',
    category: 'Geography',
    description: 'Explaining places and answering the questions nobody asks',
    subscribers: '6.8M+',
  },
  {
    name: 'Wendover Productions',
    channelId: 'UC9RM-iSvTu1uPJb8X5yp3EQ',
    handle: '@Wendoverproductions',
    category: 'Geography',
    description: 'Explanations of the world around us',
    subscribers: '4.5M+',
  },
  {
    name: 'Atlas Pro',
    channelId: 'UCz1oFxMrgrQ82-276UCOU9w',
    handle: '@AtlasPro1',
    category: 'Geography',
    description: 'Geography and earth science videos',
    subscribers: '2.5M+',
  },

  // History Channels
  {
    name: 'History Matters',
    channelId: 'UC22BdTgxefuvUivrjesETjg',
    handle: '@HistoryMatters',
    category: 'History',
    description: 'Short animated history documentaries',
    subscribers: '2.5M+',
  },
  {
    name: 'Oversimplified',
    channelId: 'UCNIuvl7V8zACPpTmmNIqP2A',
    handle: '@OverSimplified',
    category: 'History',
    description: 'Oversimplified historical events',
    subscribers: '8M+',
  },
  {
    name: 'The History Guy',
    channelId: 'UC4sEmXUuWIFlxRIFBRV6VXQ',
    handle: '@TheHistoryGuyChannel',
    category: 'History',
    description: 'History that deserves to be remembered',
    subscribers: '1.8M+',
  },
  {
    name: 'Kings and Generals',
    channelId: 'UCMmaBzfCCwZ2KqaBJjkj0fw',
    handle: '@KingsandGenerals',
    category: 'History',
    description: 'Historical animated documentaries',
    subscribers: '3.3M+',
  },

  // General Education
  {
    name: 'TED-Ed',
    channelId: 'UCsooa4yRKGN_zEE8iknghZA',
    handle: '@TEDed',
    category: 'General Education',
    description: "TED's education initiative with animated lessons",
    subscribers: '19M+',
  },
  {
    name: 'CGP Grey',
    channelId: 'UC2C_jShtL725hvbm1arSV9w',
    handle: '@CGPGrey',
    category: 'General Education',
    description: 'Explaining complex topics simply',
    subscribers: '6.5M+',
  },
  {
    name: 'Crash Course',
    channelId: 'UCX6b17PVsYBQ0ip5gyeme-Q',
    handle: '@crashcourse',
    category: 'General Education',
    description: 'Fast-paced crash courses on various subjects',
    subscribers: '15M+',
  },
  {
    name: 'The Infographics Show',
    channelId: 'UCfdNM3NAhaBOXCafH7krzrA',
    handle: '@TheInfographicsShow',
    category: 'General Education',
    description: 'Animated infographics on interesting topics',
    subscribers: '14M+',
  },
  {
    name: 'Half as Interesting',
    channelId: 'UCuCkxoKLYO_EQ2GeFtbM_bw',
    handle: '@halfasinteresting',
    category: 'General Education',
    description: 'Fascinating facts presented in a fun way',
    subscribers: '3.5M+',
  },
  {
    name: 'Polymatter',
    channelId: 'UCgNg3vwj3xt7QOrcIDaHdFg',
    handle: '@PolyMatter',
    category: 'General Education',
    description: 'Explaining complex global topics',
    subscribers: '2.2M+',
  },
];

export const CATEGORIES = ['Science', 'Geography', 'History', 'General Education'] as const;

export function getChannelsByCategory(category: typeof CATEGORIES[number]) {
  return SUGGESTED_CHANNELS.filter((channel) => channel.category === category);
}

export function getAllCategories() {
  return CATEGORIES;
}
