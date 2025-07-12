import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jugyfhdmzpcpljtvwayc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1Z3lmaGRtenBjcGxqdHZ3YXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDEzNTAsImV4cCI6MjA2Nzg3NzM1MH0.F1qOT1L_QIIDn1U6HEp27dOHEBo_ny5cvyhr_JL3IkQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
