import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://narpwpzolhjtofywdgxx.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcnB3cHpvbGhqdG9meXdkZ3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyODI0NjYsImV4cCI6MjA0NDg1ODQ2Nn0.aEXf8S-ZqPHGw7y0_FvazZ3a844esgyMyM4W2rRbork'
    )
