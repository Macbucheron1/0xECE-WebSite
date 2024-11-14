import { createContext, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { generateGravatarUrl } from "../../../utils/gravatar";

type CustomUser = {
  id: string | null;
  email: string | null;
  username: string | null;
  connected_with_discord: boolean | null;
  pp: {
    gravatar: string | null;
    discord: string | null;
    github: string | null;
  } | null;
  fav_pp_provider: string | null;
  theme: string | null;
  language: string | null;
  bio: string | null;
  role: string | null;
  promo: string | null;
  linkedin_url: string | null;
  rootme_url: string | null;
  tryhackme_url: string | null;
  htb_url: string | null;
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
  getUserPersonalization: (
    session: Session,
    connected_with_discord: boolean
  ) => Promise<any>;
  login: () => Promise<void>;
  updateFavPPProvider: (newProvider: string) => void;
  updatePromo: (newPromo: string) => void;
  updateBio: (newBio: string) => void;
  updateLink: (newLink: string, website: string) => void;
  updateTheme: (newTheme: string) => void;
  udpateLanguage: (newLanguage: string) => void;
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
  updatePromo: () => null,
  updateBio: () => null,
  updateLink: () => null,
  updateTheme: () => null,
  udpateLanguage: () => null,
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
    role: "non membre",
    promo: null,
    linkedin_url: null,
    rootme_url: null,
    tryhackme_url: null,
    htb_url: null,
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

  const getUserPersonalization = async (
    session: Session,
    connected_with_discord: boolean
  ) => {
    try {
      const { data, error } = await supabase // Fetch user personalization data from the database
        .from("user_personalization_info")
        .select(
          "pp_fav_provider, bio, theme, language, role, promo, linkedin_url, rootme_url, tryhackme_url, htb_url"
        )
        .eq("user_uid", getID(session))
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      if (error.code === "PGRST116") {
        // No personalization data found for user, we need to insert

        let new_role = "non membre";
        let new_promo = "undefined";

        if (connected_with_discord) {
          //  If the user is connected with Discord, we fetch the role and promo from Discord
          const { role, promo } = await getInfoFromDiscord(
            session.provider_token,
            session.provider_refresh_token,
            getID(session)
          );
          new_role = role;
          new_promo = promo;
        } // If the user is not connected with Discord, we set the role and promo to default values

        // Insert personalization data

        const { error } = await supabase
          .from("user_personalization_info")
          .insert([
            {
              user_uid: getID(session),
              pp_fav_provider: "gravatar",
              bio: null,
              theme: "Light",
              language: "english",
              role: new_role,
              promo: new_promo,
              linkedin_url: null,
              rootme_url: null,
              tryhackme_url: null,
              htb_url: null,
            },
          ]);

        if (error) {
          // Error inserting default personalization data
          console.error("Error inserting default personalization data:", error);
        }
      } else if (error.code === "23505") {
        // Error code by double rendering when being in development mode. In production, this error cannot happen.
      } else {
        // Error fetching user personalization data
        console.error("Error fetching user personalization:", error);
      }

      return {
        user_uid: getID(session),
        pp_fav_provider: "gravatar",
        bio: null,
        theme: "Light",
        language: "english",
        role: "non membre",
        promo: "undefined",
        linkedin_url: null,
        rootme_url: null,
        tryhackme_url: null,
        htb_url: null,
      };
    }
  };

  const getInfoFromDiscord = async (
    token: string,
    refresh_token: string,
    id: string
  ) => {
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
    } catch (error) {
      console.error("Error fetching role from discord:", error);
      return { role: "non membre", promo: "undefined" };
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
        let new_role = "non membre";
        let new_promo = "undefined";
        let new_linkedin_url = null;
        let new_rootme_url = null;
        let new_tryhackme_url = null;
        let new_htb_url = null;
        getUserPersonalization(session, new_connected_with_discord).then(
          (data) => {
            new_fav_pp_provider = data.pp_fav_provider;
            new_bio = data.bio;
            new_theme = data.theme;
            new_language = data.language;
            new_role = data.role;
            new_promo = data.promo;
            new_linkedin_url = data.linkedin_url;
            new_rootme_url = data.rootme_url;
            new_tryhackme_url = data.tryhackme_url;
            new_htb_url = data.htb_url;
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
              linkedin_url: new_linkedin_url,
              rootme_url: new_rootme_url,
              tryhackme_url: new_tryhackme_url,
              htb_url: new_htb_url,
            });
          }
        );
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
          language: "english",
          role: "non membre",
          promo: "undefined",
          linkedin_url: null,
          rootme_url: null,
          tryhackme_url: null,
          htb_url: null,
        });
      }
    });
  };

  const updateFavPPProvider = async (newProvider: string) => {
    let newPP = null;
    if (newProvider === "gravatar") {
      newPP = user.pp.gravatar;
    } else if (newProvider === "discord") {
      newPP = user.pp.discord;
    } else if (newProvider === "github") {
      newPP = user.pp.github;
    }
    const { error } = await supabase
      .from("user_personalization_info")
      .update({ pp_fav_provider: newProvider, pp_url: newPP })
      .eq("user_uid", user.id);
    if (error) {
      console.error("Error updating favorite profile picture provider:", error);
    }
    setUser({ ...user, fav_pp_provider: newProvider });
  };

  const updatePromo = async (newPromo: string) => {
    setUser({ ...user, promo: newPromo });
    const { error } = await supabase
      .from("user_personalization_info")
      .update({ promo: newPromo })
      .eq("user_uid", user.id);
    if (error) {
      console.error("Error updating promo:", error);
    }
  };

  const updateBio = async (newBio: string) => {
    setUser({ ...user, bio: newBio });
    const { error } = await supabase
      .from("user_personalization_info")
      .update({ bio: newBio })
      .eq("user_uid", user.id);
    if (error) {
      console.error("Error updating bio:", error);
    }
  };

  const updateLink = async (newLink: string, website: string) => {
    if (website === "linkedin") {
      setUser({ ...user, linkedin_url: newLink });
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ linkedin_url: newLink })
        .eq("user_uid", user.id);
      if (error) {
        console.error("Error updating linkedin url:", error);
      }
    } else if (website === "rootme") {
      setUser({ ...user, rootme_url: newLink });
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ rootme_url: newLink })
        .eq("user_uid", user.id);
      if (error) {
        console.error("Error updating rootme url:", error);
      }
    } else if (website === "tryhackme") {
      setUser({ ...user, tryhackme_url: newLink });
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ tryhackme_url: newLink })
        .eq("user_uid", user.id);
      if (error) {
        console.error("Error updating tryhackme url:", error);
      }
    } else if (website === "htb") {
      setUser({ ...user, htb_url: newLink });
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ htb_url: newLink })
        .eq("user_uid", user.id);
      if (error) {
        console.error("Error updating htb url:", error);
      }
    }
  };

  const updateTheme = async (newTheme: string) => {
    setUser({ ...user, theme: newTheme });
    if (user.id) {
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ theme: newTheme })
        .eq("user_uid", user.id);
      if (error) {
        console.error("Error updating theme:", error);
      }
    }
  };

  const udpateLanguage = async (newLanguage: string) => {
    setUser({ ...user, language: newLanguage });
    if (user.id) {
      const { error } = await supabase
        .from("user_personalization_info")
        .update({ language: newLanguage })
        .eq("user_uid", user.id);
      if (error) {
        console.error("Error updating language:", error);
      }
    }
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
      role: "non membre",
      promo: "undefined",
      linkedin_url: null,
      rootme_url: null,
      tryhackme_url: null,
      htb_url: null,
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
        updateBio: updateBio,
        updateLink: updateLink,
        updatePromo: updatePromo,
        login: login,
        updateFavPPProvider: updateFavPPProvider,
        updateTheme: updateTheme,
        udpateLanguage: udpateLanguage,
        logout: Logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
