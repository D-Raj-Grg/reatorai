// Supabase client for server-side components and API routes
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies
  });
};
