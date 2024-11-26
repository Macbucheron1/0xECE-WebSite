import { createContext, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

type visitedUser = {
  id: string | null;
  email: string | null;
  username: string | null;
  pp_url: string | null;
  bio: string | null;
  role: string | null;
  promo: string | null;
  linkedin_url: string | null;
  rootme_url: string | null;
  tryhackme_url: string | null;
  htb_url: string | null;
  email_visible: boolean;
};

const Context = createContext<{
  visitedUser: visitedUser | null;
  setVisitedUser: (newVisitedUser: visitedUser) => void;
  fetchUser: () => void;
    }>({
      visitedUser: null,
      setVisitedUser: () => {},
      fetchUser: () => {},
    });

export default Context;

export const ContextProvider = ({ children, id }) => {
  const [visitedUser, setVisitedUser] = useState<visitedUser | null>(null);

  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("user_personalization_info")
      .select("*")
      .eq("user_uid", id)
      .single();

    if (error) {
      console.log("error", error);
    } else {
      setVisitedUser(data);
    }
  };

  return (
    <Context.Provider
      value={{
        visitedUser: visitedUser,
        setVisitedUser: setVisitedUser,
        fetchUser: fetchUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
