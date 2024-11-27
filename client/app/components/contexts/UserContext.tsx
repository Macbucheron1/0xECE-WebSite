// Import necessary modules and components from React and Supabase
import { createContext, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { generateGravatarUrl } from "../../../utils/gravatar";

/**
 * Defines the structure of a custom user object with all user-related properties.
 */
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
  email_visible: boolean | null;
};

/**
 * Mapping of Discord role IDs to role names.
 */
const roleNames = {
  "1227192380118138901": "Membre",
  "1225487330228310126": "Bureau",
  "1227564151946084363": "President",
};

/**
 * Mapping of Discord promo IDs to promo names.
 */
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

/**
 * Interface for user personalization settings stored in the database.
 */
interface UserPersonalization {
  user_uid?: string;
  pp_fav_provider: string;
  bio: string | null;
  theme: string;
  language: string;
  role: string;
  promo: string;
  linkedin_url: string | null;
  rootme_url: string | null;
  tryhackme_url: string | null;
  htb_url: string | null;
  email_visible: boolean;
}

/**
 * Creates a React context for user authentication and personalization.
 */
const Context = createContext<{
  user: CustomUser | null;
  setUser: (newUser: CustomUser) => void;
  getID: (session: Session) => string;
  getConnectedWith: (session: Session, service: string) => boolean;
  getEmail: (session: Session) => string;
  getUsername: (session: Session) => string;
  getPP: (session: Session) => CustomUser["pp"];
  getUserPersonalization: (
    session: Session,
    connected_with_discord: boolean
  ) => Promise<UserPersonalization>;
  login: () => Promise<void>;
  updateFavPPProvider: (newProvider: string) => void;
  updatePromo: (newPromo: string) => void;
  updateBio: (newBio: string) => void;
  updateLink: (newLink: string, website: string) => void;
  updateTheme: (newTheme: string) => void;
  udpateLanguage: (newLanguage: string) => void;
  updateEmailVisibility: (visibility: boolean) => void;
  logout: () => void;
    }>({
      // Default context values
      user: null,
      setUser: () => {},
      getID: () => null,
      getConnectedWith: () => false,
      getEmail: () => null,
      getUsername: () => null,
      getPP: () => null,
      getUserPersonalization: async () => ({
        pp_fav_provider: "gravatar",
        bio: null,
        theme: "Dark",
        language: "english",
        role: "non membre",
        promo: "undefined",
        linkedin_url: null,
        rootme_url: null,
        tryhackme_url: null,
        htb_url: null,
        email_visible: false
      }),
      login: async () => null,
      updateFavPPProvider: () => null,
      updatePromo: () => null,
      updateBio: () => null,
      updateLink: () => null,
      updateTheme: () => null,
      udpateLanguage: () => null,
      updateEmailVisibility: () => null,
      logout: () => null,
    });

export default Context;

/**
 * ContextProvider component that provides user context to its child components.
 *
 * @param {React.ReactNode} children - The child components that require user context.
 * @returns {JSX.Element} The provider component wrapping the children.
 */
export const ContextProvider = ({ children }) => {
  // State to store the current user information
  const [user, setUser] = useState<CustomUser | null>({
    id: null,
    email: null,
    username: null,
    connected_with_discord: false,
    pp: null,
    fav_pp_provider: null,
    theme: "Dark",
    bio: null,
    language: "english",
    role: "non membre",
    promo: null,
    linkedin_url: null,
    rootme_url: null,
    tryhackme_url: null,
    htb_url: null,
    email_visible: false,
  });

  /**
   * Retrieves the user ID from the session.
   *
   * @param {Session} session - The current user session.
   * @returns {string} The user's unique identifier.
   */
  const getID = (session: Session) => {
    return session.user.id;
  };

  /**
   * Checks if the user is connected with a specific service (e.g., Discord, GitHub).
   *
   * @param {Session} session - The current user session.
   * @param {string} service - The name of the service to check.
   * @returns {boolean} True if connected with the service, false otherwise.
   */
  const getConnectedWith = (session: Session, service: string) => {
    if (!session?.user?.identities) return false;
    return session.user.identities.some(identity => identity.provider === service);
  };

  /**
   * Retrieves the user's email from the session.
   *
   * @param {Session} session - The current user session.
   * @returns {string} The user's email address.
   */
  const getEmail = (session: Session) => {
    return session.user.email;
  };

  /**
   * Retrieves the user's username from the session metadata.
   *
   * @param {Session} session - The current user session.
   * @returns {string} The user's username.
   */
  const getUsername = (session: Session) => {
    return (
      session.user.user_metadata.full_name ||
      session.user.user_metadata.user_name
    );
  };

  /**
   * Retrieves the user's profile pictures from various providers.
   *
   * @param {Session} session - The current user session.
   * @returns {CustomUser["pp"]} An object containing URLs to profile pictures.
   */
  const getPP = (session: Session) => {
    const gravatarUrl = generateGravatarUrl(getEmail(session));
    let discordUrl = null;
    let githubUrl = null;
    
    if (session?.user?.identities) {
      for (const identitie of session.user.identities) {
        if (identitie.provider === "discord") {
          discordUrl = identitie.identity_data.avatar_url;
        } else if (identitie.provider === "github") {
          githubUrl = identitie.identity_data.avatar_url;
        }
      }
    }
    
    return {
      gravatar: gravatarUrl,
      discord: discordUrl,
      github: githubUrl,
    };
  };

  /**
   * Fetches or initializes the user's personalization settings from the database.
   *
   * @param {Session} session - The current user session.
   * @param {boolean} connected_with_discord - Indicates if the user is connected with Discord.
   * @returns {Promise<UserPersonalization>} The user's personalization data.
   */
  const getUserPersonalization = async (
    session: Session,
    connected_with_discord: boolean
  ): Promise<UserPersonalization> => {
    try {
      const { data, error } = await supabase // Fetch user personalization data from the database
        .from("user_personalization_info")
        .select(
          "pp_fav_provider, bio, theme, language, role, promo, linkedin_url, rootme_url, tryhackme_url, htb_url, email_visible"
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

        let newRole = "non membre";
        let newPromo = "undefined";

        if (connected_with_discord) {
          //  If the user is connected with Discord, we fetch the role and promo from Discord
          const { role, promo } = await getInfoFromDiscord(
            session.provider_token
          );
          newRole = role;
          newPromo = promo;
        } // If the user is not connected with Discord, we set the role and promo to default values

        // Insert personalization data

        const { error } = await supabase
          .from("user_personalization_info")
          .insert([
            {
              username: getUsername(session),
              email: getEmail(session),
              user_uid: getID(session),
              pp_fav_provider: "gravatar",
              bio: null,
              theme: "Dark",
              language: "english",
              role: newRole,
              promo: newPromo,
              linkedin_url: null,
              rootme_url: null,
              tryhackme_url: null,
              htb_url: null,
              email_visible: false,
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
        theme: "Dark",
        language: "english",
        role: "non membre",
        promo: "undefined",
        linkedin_url: null,
        rootme_url: null,
        tryhackme_url: null,
        htb_url: null,
        email_visible: false,
      };
    }
  };

  /**
   * Retrieves the user's role and promo information from Discord.
   *
   * @param {string} token - The user's Discord token.
   * @returns {Promise<{ role: string; promo: string }>} The user's role and promo.
   */
  const getInfoFromDiscord = async (
    token: string
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

  /**
   * Sets up authentication state change listener and updates user state accordingly.
   *
   * @async
   */
  const login = async () => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const newId = getID(session);
        const newConnectedWithDiscord = getConnectedWith(
          session,
          "discord"
        );
        const newEmail = getEmail(session);
        const newUsername = getUsername(session);
        const newPp = getPP(session);
        let newFavPpProvider = null;
        let newBio = null;
        let newTheme = null;
        let newLanguage = null;
        let newRole = "non membre";
        let newPromo = "undefined";
        let newLinkedinUrl = null;
        let newRootmeUrl = null;
        let newTryhackmeUrl = null;
        let newHtbUrl = null;
        let newEmailVisible = false;
        getUserPersonalization(session, newConnectedWithDiscord).then(
          (data) => {
            newFavPpProvider = data.pp_fav_provider;
            newBio = data.bio;
            newTheme = data.theme;
            newLanguage = data.language;
            newRole = data.role;
            newPromo = data.promo;
            newLinkedinUrl = data.linkedin_url;
            newRootmeUrl = data.rootme_url;
            newTryhackmeUrl = data.tryhackme_url;
            newHtbUrl = data.htb_url;
            newEmailVisible = data.email_visible;
            setUser({
              id: newId,
              email: newEmail,
              username: newUsername,
              connected_with_discord: newConnectedWithDiscord,
              pp: newPp,
              fav_pp_provider: newFavPpProvider,
              bio: newBio,
              theme: newTheme,
              language: newLanguage,
              role: newRole,
              promo: newPromo,
              linkedin_url: newLinkedinUrl,
              rootme_url: newRootmeUrl,
              tryhackme_url: newTryhackmeUrl,
              htb_url: newHtbUrl,
              email_visible: newEmailVisible,
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
          theme: "Dark",
          bio: null,
          language: "english",
          role: "non membre",
          promo: "undefined",
          linkedin_url: null,
          rootme_url: null,
          tryhackme_url: null,
          htb_url: null,
          email_visible: false,
        });
      }
    });
  };

  /**
   * Updates the user's preferred profile picture provider in the database and state.
   *
   * @param {string} newProvider - The new preferred profile picture provider.
   */
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

  /**
   * Updates the user's promo information in the database and state.
   *
   * @param {string} newPromo - The new promo value.
   */
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

  /**
   * Updates the user's bio in the database and state.
   *
   * @param {string} newBio - The new bio content.
   */
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

  /**
   * Updates the user's social or platform link in the database and state.
   *
   * @param {string} newLink - The new link URL.
   * @param {string} website - The identifier of the website (e.g., 'linkedin', 'rootme').
   */
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

  /**
   * Updates the user's theme preference in the database and state.
   *
   * @param {string} newTheme - The new theme preference.
   */
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

  /**
   * Updates the user's language preference in the database and state.
   *
   * @param {string} newLanguage - The new language preference.
   */
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

  /**
   * Updates the visibility of the user's email in their profile.
   *
   * @param {boolean} visibility - True to make email visible, false to hide.
   */
  const updateEmailVisibility = async (visibility: boolean) => {
    const { error } = await supabase
      .from("user_personalization_info")
      .update({ email_visible: visibility })
      .eq("user_uid", user.id);

    if (error) {
      console.error("Error updating email visibility:", error);
    }
  };

  /**
   * Logs out the current user and resets the user state.
   */
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
      theme: "Dark",
      bio: null,
      language: "english",
      role: "non membre",
      promo: "undefined",
      linkedin_url: null,
      rootme_url: null,
      tryhackme_url: null,
      htb_url: null,
      email_visible: false,
    });
  };

  // Provide the context value to child components
  return (
    <Context.Provider
      value={{
        user: user,
        setUser: setUser,
        getID: getID,
        getConnectedWith: getConnectedWith,
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
        updateEmailVisibility: updateEmailVisibility,
        logout: Logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
