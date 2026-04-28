// Supabase Configuration (Primary Email)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayfxscdfcyowyeaktnnn.supabase.co';
const supabaseAnonKey = 'sb_publishable_0j-KuWXh1xwik2RV53jJXA_IqP_3gq2';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
