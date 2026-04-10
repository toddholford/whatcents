import supabase from "../config/supabaseClient";

export const getUserUUID = async (
  setUserUUID: (uuid: string | null) => void,
): Promise<void> => {
  const { data } = await supabase.auth.getUser();
  setUserUUID(data.user?.id ?? null);
};
