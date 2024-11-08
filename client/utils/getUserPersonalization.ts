import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import { generateGravatarUrl } from "./gravatar";

async function getUserPersonalization(user: User) {
  // Fetch data from supabase
  const { data, error } = await supabase
    .from("user_personalization_info")
    .select("*")
    .single();

  if (error) {
    console.log("data: ", data);
    return;
  }
  
  const pp_provider = data.pp_fav_provider;
  const bio = data.bio;
  const theme = data.theme;
  const language = data.Language;

  var pp = {
    gravatar: generateGravatarUrl(user.email),
  };
  for (let i = 0; i < user.app_metadata.providers.length; i++) {
    pp[user.app_metadata.providers[i]] =
      user.identities[i].identity_data.avatar_url;
  }

  return { pp: pp[pp_provider], bio: bio, theme: theme, language: language };
}

export default getUserPersonalization;

/**
    useEffect(() => {
    const fetchRole = async () => {
      const token = window.localStorage.getItem("oauth_provider_token");

      // Check if the user is part of the 0xECE guild on Discord with the guild ID : 1225485887463227525
      try {
        const response = await fetch(
          "https://discord.com/api/users/@me/guilds/1225485887463227525/member",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.code == 10004) {
          setRole("Non membre");
        } else {
          // User is part of the guild
          const userRole = data.roles;
          for (let i = 0; i < userRole.length; i++) {
            if (roleNames[userRole[i]] !== undefined) {
              setRole(roleNames[userRole[i]]);
            }
            if (promoNames[userRole[i]] !== undefined) {
              setPromo(promoNames[userRole[i]]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching role from discord:", error.message);
      }
    };

    fetchRole();
  }, []);
 */
