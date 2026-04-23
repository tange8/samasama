// server/config/supabaseAdmin.js
require('dotenv').config(); // Load the secret keys
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// This client bypasses RLS (Row Level Security) - be careful!
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabaseAdmin;