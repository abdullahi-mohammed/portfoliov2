import { createClient } from "@supabase/supabase-js";
import { app } from "../shared/const";
import { Database } from "../shared/types/supabase/supabae";

export const supaBaseClient = createClient<Database>(
  app.supabase.url,
  app.supabase.apiKey
);
