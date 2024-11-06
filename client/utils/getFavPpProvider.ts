import { supabase } from "./supabaseClient";

async function getFavPpProvider() {
  // Fetch data from supabase
  const { data, error } = await supabase
    .from("user_personalization_info")
    .select("pp_fav_provider")
    .single();

    if (error) {
        console.error("Error fetching profile picture provider:", error.message);
        return null;
    }
    return data.pp_fav_provider;
}

export default getFavPpProvider;