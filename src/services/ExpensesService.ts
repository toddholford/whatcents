import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";

export const getExpenses = async (
  setExpenses: (data: unknown[]) => void,
): Promise<void> => {
  const { data, error } = await supabase.from("expenses").select("*");

  if (error) {
    toast.error("Could not fetch expenses");
    return;
  }
  if (data) {
    setExpenses(data);
  }
};
