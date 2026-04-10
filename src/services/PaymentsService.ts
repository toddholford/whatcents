import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";
import type { Payment } from "../types";

export const getAllPayments = async (
  setPayments: (p: Payment[]) => void,
): Promise<void> => {
  const { data, error } = await supabase
    .from("payments")
    .select()
    .order("expense_due_date", { ascending: true });

  if (error) {
    toast.error("Could not fetch payments");
    return;
  }
  if (data) {
    setPayments(data as Payment[]);
  }
};

export const addPayment = async (
  expenseName: string,
  expenseAmount: number,
  expenseDueDate: number,
  setExpenseName: (v: string) => void,
  setExpenseAmount: (v: number) => void,
  setExpenseDueDate: (v: number) => void,
  addToPayments: (p: Payment) => void,
): Promise<void> => {
  const { data, error } = await supabase
    .from("payments")
    .insert([
      {
        expense_name: expenseName,
        expense_amount: expenseAmount,
        expense_due_date: expenseDueDate,
      },
    ])
    .select();

  if (error) {
    toast.error("Could not add payment");
    return;
  }
  if (data && data.length > 0) {
    addToPayments(data[0] as Payment);
    setExpenseName("");
    setExpenseAmount(0);
    setExpenseDueDate(0);
    toast.success("Payment added");
  }
};

export const editPaymentRow = async (
  id: number,
  expenseName: string,
  expenseAmount: number,
  expenseDueDate: number,
): Promise<void> => {
  const { error } = await supabase
    .from("payments")
    .update({
      expense_name: expenseName,
      expense_amount: expenseAmount,
      expense_due_date: expenseDueDate,
    })
    .eq("id", id);

  if (error) {
    toast.error("Could not update payment");
  } else {
    toast.success("Payment updated");
  }
};

export const deletePaymentRow = async (
  id: number,
  deleteFromStore: (id: number) => void,
): Promise<void> => {
  const { error } = await supabase.from("payments").delete().eq("id", id);

  if (error) {
    toast.error("Could not delete payment");
    return;
  }
  deleteFromStore(id);
};
