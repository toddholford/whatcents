import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";

export const getPaycheckCalculations = async (
  setPaycheckCalculations: (data: unknown[]) => void,
): Promise<void> => {
  const { data, error } = await supabase
    .from("paycheck_calculations")
    .select("*");

  if (error) {
    toast.error("Could not fetch paycheck calculations");
    return;
  }
  if (data) {
    setPaycheckCalculations(data);
  }
};
