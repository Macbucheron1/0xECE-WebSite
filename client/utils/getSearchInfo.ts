import { supabase } from "./supabaseClient";

async function getSearchInfo(contentSearched: string) {
  // Search in user_personalization_info table by username
  const { data: users } = await supabase
    .from("user_personalization_info")
    .select("*")
    .ilike("username", `%${contentSearched}%`);

  // Search in writeups table by title
  const { data: writeUps } = await supabase
    .from("writeups")
    .select("*")
    .ilike("title", `%${contentSearched}%`);

  // Search in comments table by content
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .ilike("content", `%${contentSearched}%`);

  return {
    users,
    writeUps,
    comments,
  };
}

export default getSearchInfo;
