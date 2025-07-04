import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://caarashpaxencctvhquf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhYXJhc2hwYXhlbmNjdHZocXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjIxNDgsImV4cCI6MjA2NDc5ODE0OH0._1O99lF5CIuYAefN147R8vyFYC4FI_JnjwMYXsLX1BQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
