import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";
import type { PayFrequency } from "../types";

export const getPaycheckFrequencies = async (
  setPayFrequencies: (freqs: PayFrequency[]) => void,
): Promise<void> => {
  const { data, error } = await supabase.from("pay_frequencies").select();

  if (error) {
    toast.error("Could not fetch pay frequencies");
    return;
  }
  if (data) {
    setPayFrequencies(data as PayFrequency[]);
  }
};
