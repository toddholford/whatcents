import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";
import type { RepeatingExpenses } from "../types";

export const getIds = async (setIds: (ids: string[]) => void): Promise<void> => {
  const { data, error } = await supabase.from("paycheck_info").select("id");
  if (error) {
    toast.error("Could not fetch paycheck info");
    return;
  }
  if (data) {
    setIds(data.map((d) => d.id as string));
  }
};

export const getId = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("id")
    .eq("id", userId);

  if (error || !data || data.length === 0) return null;
  return data[0].id as string;
};

export const getIncomeAmount = async (
  setIncomeAmount: (amount: number) => void,
): Promise<void> => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("income_amount");

  if (error) {
    toast.error("Could not fetch income amount");
    return;
  }
  if (data && data.length > 0) {
    setIncomeAmount(data[0].income_amount as number);
  }
};

export const getPaycheckFrequency = async (
  setPayFrequency: (freq: string | null) => void,
): Promise<void> => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("paycheck_frequency");

  if (error) {
    toast.error("Could not fetch paycheck frequency");
    return;
  }
  if (data && data.length > 0) {
    setPayFrequency(data[0].paycheck_frequency as string);
  }
};

export const getPerPaycheckExpenses = async (
  setPerPaycheckExpenses: (expenses: RepeatingExpenses) => void,
): Promise<void> => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("per_paycheck_expenses");

  if (error) {
    toast.error("Could not fetch repeating expenses");
    return;
  }
  if (data && data.length > 0) {
    setPerPaycheckExpenses((data[0].per_paycheck_expenses as RepeatingExpenses) ?? {});
  }
};

export const updatePerPaycheckExpenses = async (
  userId: string,
  perPaycheckExpenses: RepeatingExpenses,
  setPerPaycheckExpenses: (expenses: RepeatingExpenses) => void,
): Promise<void> => {
  const { error } = await supabase
    .from("paycheck_info")
    .update({ per_paycheck_expenses: perPaycheckExpenses })
    .eq("id", userId);

  if (error) {
    toast.error("Could not update repeating expenses");
    return;
  }
  setPerPaycheckExpenses({ ...perPaycheckExpenses });
};

export const addPaycheckInfo = async (
  userId: string,
  incomeAmount: number,
  paycheckFrequency: string | null,
  perPaycheckExpenses: RepeatingExpenses,
  setIncomeAmount: (v: number) => void,
  setPaycheckFrequency: (v: string | null) => void,
  setPerPaycheckExpenses: (v: RepeatingExpenses) => void,
): Promise<void> => {
  const { error } = await supabase.from("paycheck_info").insert({
    id: userId,
    income_amount: incomeAmount,
    paycheck_frequency: paycheckFrequency,
    per_paycheck_expenses: perPaycheckExpenses,
  });

  if (error) {
    toast.error("Could not save paycheck info");
    return;
  }
  setIncomeAmount(incomeAmount);
  setPaycheckFrequency(paycheckFrequency);
  setPerPaycheckExpenses(perPaycheckExpenses);
};

export const updatePaycheckInfo = async (
  userId: string,
  incomeAmount: number,
  paycheckFrequency: string | null,
  perPaycheckExpenses: RepeatingExpenses,
  setIncomeAmount: (v: number) => void,
  setPaycheckFrequency: (v: string | null) => void,
  setPerPaycheckExpenses: (v: RepeatingExpenses) => void,
): Promise<void> => {
  const { error } = await supabase
    .from("paycheck_info")
    .update({
      income_amount: incomeAmount,
      paycheck_frequency: paycheckFrequency,
      per_paycheck_expenses: perPaycheckExpenses,
    })
    .eq("id", userId);

  if (error) {
    toast.error("Could not update paycheck info");
    return;
  }
  setIncomeAmount(incomeAmount);
  setPaycheckFrequency(paycheckFrequency);
  setPerPaycheckExpenses(perPaycheckExpenses);
};
