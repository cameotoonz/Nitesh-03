import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://jknbjlngahlxqfkhkarr.supabase.co';

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbmJqbG5nYWhseHFma2hrYXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MjA4MTIsImV4cCI6MjEwNjA5NjgxMn0.Dld7pcbihDdNfO8l-um4aCqp-kT5Qf71h_dNoZ9PsH4';

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    global: {
      fetch: async (url, options) => {
        const res = await fetch(url, options);
        if (!res.ok && res.status >= 500) triggerRestore();
        return res;
      },
    },
  }
);

export default supabase;
