import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

async function updateFavPpProvider(user : User, favPpProvider : string) {
  const { data, error } = await supabase
    .from("user_personalization_info")
    .update({ pp_fav_provider: favPpProvider })
    .eq("user_uid", user.id)

  if (error) {
    console.error("Error updating favorite PP provider:", error);
    
  }

}

export { updateFavPpProvider };
