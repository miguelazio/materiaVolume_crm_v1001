// Supabase Configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fuqmqcusthzmqekltpkk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cW1xY3VzdGh6bXFla2x0cGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDYzNTMsImV4cCI6MjA5MDgyMjM1M30.uwLw0RILX8kpmTkgeo8Z84kjVnqiRhaNUaJq1SKTYyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
