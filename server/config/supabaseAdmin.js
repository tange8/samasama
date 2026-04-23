// server/config/supabaseAdmin.js
import "dotenv/config"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// This client bypasses RLS (Row Level Security) - be careful!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);