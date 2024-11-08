import { createContext, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { generateGravatarUrl } from "../../utils/gravatar";
import { UUID } from "crypto";

type CustomUser = {
  id: string | null;
  email: string | null;
  username: string | null;
  connected_with_github: boolean | null;
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
  discord_token?: UUID | null;
  discord_refresh_token?: UUID | null;
  role: string | null;
  promo: string | null;
  // Add other fields as needed
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
    connected_with_github: false,
    connected_with_discord: false,
    pp: null,
    fav_pp_provider: null,
    theme: "Light",
    bio: null,
    language: "english",
    discord_token: null,
    discord_refresh_token: null,
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
        console.error("No personalization data found for user: ", getID(session));
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
              role: "non_membre",
              promo: null,
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
          role: "non_membre",
          promo: null,
        };
      } else {
        console.error("Error fetching user personalization:", error);
        return null;
      }
    }
    return data;
  };

  const login = async () => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const new_id = getID(session);
        const new_connected_with_github = getConnected_With(session, "github");
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
        getUserPersonalization(session).then((data) => {
          new_fav_pp_provider = data.pp_fav_provider;
          new_bio = data.bio;
          new_theme = data.theme;
          new_language = data.language;
          setUser({
            id: new_id,
            email: new_email,
            username: new_username,
            connected_with_github: new_connected_with_github,
            connected_with_discord: new_connected_with_discord,
            pp: new_pp,
            fav_pp_provider: new_fav_pp_provider,
            bio: new_bio,
            theme: new_theme,
            language: new_language,
            discord_token: null,
            discord_refresh_token: null,
            role: data.role,
            promo: data.promo,
          });
        });
      } else {
        setUser({
          id: null,
          email: null,
          username: null,
          connected_with_github: false,
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
    setUser({ ...user, fav_pp_provider: newProvider});
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
      connected_with_github: false,
      connected_with_discord: false,
      pp: null,
      fav_pp_provider: null,
      theme: "Light",
      bio: null,
      language: "english",
      discord_token: null,
      discord_refresh_token: null,
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
