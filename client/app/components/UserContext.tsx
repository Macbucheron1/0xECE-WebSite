import { createContext, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { generateGravatarUrl } from "../../utils/gravatar";

type CustomUser = {
  id: string | null;
  email: string | null;
  username: string | null;
  connected_with_discord: boolean | null;
  pp: {
    gravatar?: string | null;
    discord?: string | null;
    github?: string | null;
  } | null;
  fav_pp_provider?: string | null;
  theme?: string | null;
  language?: string | null;
  bio?: string | null;
  role: string | null;
  promo: string | null;
  // Add other fields as needed
};

const roleNames = {
  "1227192380118138901": "Membre",
  "1225487330228310126": "Bureau",
  "1227564151946084363": "President",
};

const promoNames = {
  "1296446288614789162": "ing1",
  "1296446375768096768": "ing2",
  "1296446419556630619": "ing3",
  "1296446455485304853": "ing4",
  "1296446491119849603": "ing5",
  "1296806777983205470": "Bachelor1",
  "1296807354834223205": "Bachelor2",
  "1296807400501673994": "Bachelor3",
};

const Context = createContext<{
  user: CustomUser | null;
  setUser: (newUser: CustomUser) => void;
  getID: (session: Session) => string;
  getConnected_With: (session: Session, service: string) => boolean;
  getEmail: (session: Session) => string;
  getUsername: (session: Session) => string;
  getPP: (session: Session) => CustomUser["pp"];
  getUserPersonalization: (session: Session) => Promise<any>;
  login: () => Promise<void>;
  updateFavPPProvider: (newProvider: string) => void;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  getID: () => null,
  getConnected_With: () => false,
  getEmail: () => null,
  getUsername: () => null,
  getPP: () => null,
  getUserPersonalization: async () => null,
  login: async () => null,
  updateFavPPProvider: () => null,
  logout: () => null,
});

export default Context;

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>({
    id: null,
    email: null,
    username: null,
    connected_with_discord: false,
    pp: null,
    fav_pp_provider: null,
    theme: "Light",
    bio: null,
    language: "english",
    role: "non_membre",
    promo: null,
  });

  const getID = (session: Session) => {
    return session.user.id;
  };

  const getConnected_With = (session: Session, service: string) => {
    for (let identitie of session?.user?.identities) {
      if (identitie.provider === service) {
        return true;
      }
    }
    return false;
  };

  const getEmail = (session: Session) => {
    return session.user.email;
  };

  const getUsername = (session: Session) => {
    return (
      session.user.user_metadata.full_name ||
      session.user.user_metadata.user_name
    );
  };

  const getPP = (session: Session) => {
    const gravatarUrl = generateGravatarUrl(getEmail(session));
    let discordUrl = null;
    let githubUrl = null;
    for (let identitie of session?.user?.identities) {
      if (identitie.provider === "discord") {
        discordUrl = identitie.identity_data.avatar_url;
      } else if (identitie.provider === "github") {
        githubUrl = identitie.identity_data.avatar_url;
      }
    }
    return {
      gravatar: gravatarUrl,
      discord: discordUrl,
      github: githubUrl,
    };
  };

  const getUserPersonalization = async (session: Session) => {
    const { data, error } = await supabase
      .from("user_personalization_info")
      .select("pp_fav_provider, bio, theme, language, role, promo")
      .eq("user_uid", getID(session))
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        console.error(
          "No personalization data found for user: ",
          getID(session)
        );
        // get info from discord
        const { role, promo } = await getInfoFromDiscord(
          session.provider_token,
          session.provider_refresh_token,
          getID(session)
        );
        // insert default personalization data
        const { error } = await supabase
          .from("user_personalization_info")
          .insert([
            {
              user_uid: getID(session),
              pp_fav_provider: "gravatar",
              bio: null,
              theme: "Light",
              language: "english",
              role: role,
              promo: promo,
            },
          ]);
        if (error) {
          console.error("Error inserting default personalization data:", error);
          return null;
        }
        return {
          user_uid: getID(session),
          pp_fav_provider: "gravatar",
          bio: null,
          theme: "Light",
          language: "english",
          role: role,
          promo: promo,
        };
      } else {
        console.error("Error fetching user personalization:", error);
        return null;
      }
    }
    return data;
  };

  const getInfoFromDiscord = async (token: string, refresh_token: string, id: string) => {
    console.log("Fetching role from discord");
    // Check if the user is part of the 0xECE guild on Discord with the guild ID : 1225485887463227525
    let role = null;
    let promo = null;
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
        role = "Non membre";
      } else {
        // User is part of the guild
        const userRole = data.roles;
        for (let i = 0; i < userRole.length; i++) {
          if (roleNames[userRole[i]] !== undefined) {
            role = roleNames[userRole[i]];
          }
          if (promoNames[userRole[i]] !== undefined) {
            promo = promoNames[userRole[i]];
          }
        }
      }

      // Lets put the role and promo in the database
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ role: role, promo: promo })
        .eq("user_uid", id);
      if (error) {
        console.error("Error updating role and promo:", error);
      }
    } catch (error) {
      console.log("Error fetching role from discord:", error);
      if (error == 429) {
        console.log("Rate limited by discord");
      }else{
        console.error("Error fetching role from discord:", error);
      }
    }

    return { role: role, promo: promo };
  };

  const login = async () => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const new_id = getID(session);
        const new_connected_with_discord = getConnected_With(
          session,
          "discord"
        );
        const new_email = getEmail(session);
        const new_username = getUsername(session);
        const new_pp = getPP(session);
        let new_fav_pp_provider = null;
        let new_bio = null;
        let new_theme = null;
        let new_language = null;
        let discord_token = null;
        let discord_refresh_token = null;
        let new_role = "non_membre";
        let new_promo = "non definie";
        getUserPersonalization(session).then((data) => {
          new_fav_pp_provider = data.pp_fav_provider;
          new_bio = data.bio;
          new_theme = data.theme;
          new_language = data.language;
          if (new_role && new_promo) {
            setUser({
              id: new_id,
              email: new_email,
              username: new_username,
              connected_with_discord: new_connected_with_discord,
              pp: new_pp,
              fav_pp_provider: new_fav_pp_provider,
              bio: new_bio,
              theme: new_theme,
              language: new_language,
              role: new_role,
              promo: new_promo,
            });
          } else {
            setUser({
              id: new_id,
              email: new_email,
              username: new_username,
              connected_with_discord: new_connected_with_discord,
              pp: new_pp,
              fav_pp_provider: new_fav_pp_provider,
              bio: new_bio,
              theme: new_theme,
              language: new_language,
              role: data.role,
              promo: data.promo,
            });
          }
        });
      } else {
        setUser({
          id: null,
          email: null,
          username: null,
          connected_with_discord: false,
          pp: null,
          fav_pp_provider: null,
          theme: "Light",
          bio: null,
          role: "non_membre",
          promo: null,
        });
      }
    });
  };

  const updateFavPPProvider = async (newProvider: string) => {
    const { error } = await supabase
      .from("user_personalization_info")
      .update({ pp_fav_provider: newProvider })
      .eq("user_uid", user.id);
    if (error) {
      console.error("Error updating favorite profile picture provider:", error);
    }
    setUser({ ...user, fav_pp_provider: newProvider });
  };

  const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    }
    setUser({
      id: null,
      email: null,
      username: null,
      connected_with_discord: false,
      pp: null,
      fav_pp_provider: null,
      theme: "Light",
      bio: null,
      language: "english",
      role: "non_membre",
      promo: null,
    });
  };

  return (
    <Context.Provider
      value={{
        user: user,
        setUser: setUser,
        getID: getID,
        getConnected_With: getConnected_With,
        getEmail: getEmail,
        getUsername: getUsername,
        getPP: getPP,
        getUserPersonalization: getUserPersonalization,
        login: login,
        updateFavPPProvider: updateFavPPProvider,
        logout: Logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
