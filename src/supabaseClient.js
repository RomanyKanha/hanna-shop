import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create the client if both env vars exist.
// This prevents the whole app from crashing (the error you saw yesterday)
// when the keys are missing or misconfigured.
export const supabase = url && key ? createClient(url, key) : null
