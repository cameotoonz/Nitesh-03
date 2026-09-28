import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jknbjlngahlxqfkhkarr.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseKey || !supabaseKey.startsWith('eyJ')) {
  console.error("❌ ERROR: Key galat hai! Key 'eyJ' se start honi chahiye.");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: async (url, options) => {
      const res = await fetch(url, options);
      if (!res.ok && res.status >= 500) triggerRestore();
      return res;
    },
  },
});

export default supabase;
