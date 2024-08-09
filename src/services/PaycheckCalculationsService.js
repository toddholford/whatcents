import supabase from "../config/supabaseClient";

export const getPaycheckCalculations = async (
  setPaycheckCalculations,
  setFetchError,
) => {
  const { data, error } = await supabase
    .from("paycheck_calculations")
    .select("*");

  if (error) {
    setFetchError("Could not fetch the paycheck calculations");
    setPaycheckCalculations(null);
    console.log("getPaycheckCalculations Service error: ", error);
  }
  if (data) {
    setPaycheckCalculations(data);
    setFetchError(null);
  }
};
