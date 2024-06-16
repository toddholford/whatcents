import supabase from "../config/supabaseClient";

export const getIncomeAmount = async (setIncomeAmount, setFetchError) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("income_amount");

  // console.log('income amount data :', data)
  if (error) {
    setFetchError("Could not fetch the income amount");
    setIncomeAmount(0);
    console.log(error);
  }
  if (data) {
    data.map((d) => {
      setIncomeAmount(d.income_amount);
    });
    setFetchError(null);
  }
};

export const getPaycheckFrequency = async (setPayFrequency, setFetchError) => {
  let { data, error } = await supabase
    .from("paycheck_info")
    .select("paycheck_frequency");

  if (error) {
    setFetchError("Could not fetch the paycheck frequency");
    setPayFrequency("Pay Period");
    console.log(error);
  }
  if (data) {
    data.map((d) => {
      setPayFrequency(d.paycheck_frequency);
    });
    setFetchError(null);
  }
};
