import supabase from "../config/supabaseClient";

export const getUserUUID = async (setUserUUID) => {
  const user = supabase.auth.getUser();

  if (user) {
    setUserUUID((await user).data.user.id);
  } else {
    console.log("Failed UserUUID Retrieval - No authenticated user");
  }
};
