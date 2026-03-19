import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayfxscdfcyowyeaktnnn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5ZnhzY2RmY3lvd3llYWt0bm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjY5NzQsImV4cCI6MjA4OTQ0Mjk3NH0.1bFJNR4e6J-F5PkZATyvRmRM-kNB4-MlhiSlCttn24k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
