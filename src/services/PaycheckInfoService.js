import supabase from "../config/supabaseClient";

export const getIds = async (setIds, setFetchError) => {
  const { data, error } = await supabase.from("paycheck_info").select("id");

  if (error) {
    setFetchError("Could not fetch the paycheck info");
    console.log("paycheckInfoService getIds error : ", error);
  }
  if (data) {
    console.log("PaycheckInfoService getIds data : ", data);
    let newData = [];
    data.map((d) => {
      console.log("PaycheckInfoService getIds data d : ", d.id);
      newData.push(d.id);
    });
    console.log("PaycheckInfoService getIds newData : ", newData);
    setIds(newData);
  }
};

export const getId = async (userId) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("id")
    .eq("id", userId);

  if (error) {
    console.log("PaycheckInfoService getId error : ", error);
    // return null; // return null or handle the error appropriately
  }

  if (data) {
    console.log("PaycheckInfoService getId data : ", data);
    console.log("PaycheckInfoService getId data[0] : ", data[0].id);
    return data[0].id;
  }

  return null;
};

export const getIncomeAmount = async (setIncomeAmount, setFetchError) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("income_amount");

  // console.log('income amount data :', data)
  if (error) {
    setFetchError("Could not fetch the income amount");
    console.log("PaycheckInfoService getIncomeAmount error : ", error);
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
    console.log("getPaycheckFrequency Service: ", error);
  }
  if (data) {
    data.map((d) => {
      setPayFrequency(d.paycheck_frequency);
    });
    setFetchError(null);
  }
};

export const getPerPaycheckExpenses = async (
  setPerPaycheckExpenses,
  setFetchError,
) => {
  let { data, error } = await supabase
    .from("paycheck_info")
    .select("per_paycheck_expenses");

  if (error) {
    setFetchError("Could not fetch the per paycheck expenses");
    // setPerPaycheckExpenses({});
    console.log("getPerPaycheckExpenses Service error: ", error);
  }
  if (data) {
    data.map((d) => {
      console.log("data.map d: ", d.per_paycheck_expenses);
      setPerPaycheckExpenses(d.per_paycheck_expenses);
    });
    setFetchError(null);
  }
};

export const updatePerPaycheckExpenses = async (
  userId,
  perPaycheckExpenses,
  setPerPaycheckExpenses,
  setFetchError,
) => {
  console.log("updatePerPaycheckExpenses userId : ", userId);
  console.log(
    "updatePerPaycheckExpenses perPaycheckExpenses : ",
    perPaycheckExpenses,
  );

  const { data, error } = await supabase
    .from("paycheck_info")
    .update({ per_paycheck_expenses: perPaycheckExpenses })
    .eq("id", userId)
    .single();

  if (error) {
    setFetchError("Could not update the per paycheck expenses");
    console.log("updatePerPaycheckExpenses error: ", error);
  }
  if (data) {
    console.log("updatePerPaycheckExpenses data: ", data);
    setPerPaycheckExpenses(perPaycheckExpenses);
    setFetchError(null);
  }
};

export const addPaycheckInfo = async (
  userId,
  incomeAmount,
  paycheckFrequency,
  perPaycheckExpenses,
  setIncomeAmount,
  setPaycheckFrequency,
  setPerPaycheckExpenses,
  setFetchError,
) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .insert({
      id: userId,
      income_amount: incomeAmount,
      paycheck_frequency: paycheckFrequency,
      per_paycheck_expenses: perPaycheckExpenses,
    })
    .single();

  if (error) {
    console.log("Error in addPaycheckInfo : ", error);
    setFetchError(error);
  }
  if (data) {
    console.log("Data in addPaycheckInfo : ", data);
    setIncomeAmount(incomeAmount);
    setPaycheckFrequency(paycheckFrequency);
    setPerPaycheckExpenses(perPaycheckExpenses);
    setFetchError(null);
  }
};

export const updatePaycheckInfo = async (
  userId,
  incomeAmount,
  paycheckFrequency,
  perPaycheckExpenses,
  setIncomeAmount,
  setPaycheckFrequency,
  setPerPaycheckExpenses,
  setFetchError,
) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .update({
      income_amount: incomeAmount,
      paycheck_frequency: paycheckFrequency,
      per_paycheck_expenses: perPaycheckExpenses,
    })
    .eq("id", userId)
    .single();

  if (error) {
    setFetchError(error);
  }
  if (data) {
    setIncomeAmount(incomeAmount);
    setPaycheckFrequency(paycheckFrequency);
    setPerPaycheckExpenses(perPaycheckExpenses);
    setFetchError(null);
  }
};
