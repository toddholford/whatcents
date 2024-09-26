import supabase from "../config/supabaseClient";

export const getAllPayments = async (setPayments, setFetchError) => {
  const { data, error } = await supabase
      .from("payments")
      .select()
      .order('expense_due_date', { ascending: true });

  if (error) {
    setFetchError("Could not fetch the payments");
    setPayments(null);
    console.log("PaymentsService getAllPayments error : ", error);
  }
  if (data) {
    setPayments(data);
    console.log("PaymentsService getAllPayments data : ", data);
    setFetchError(null);
  }
};

export const addPayment = async (
  expenseName,
  expenseAmount,
  expenseDueDate,
  setExpenseName,
  setExpenseAmount,
  setExpenseDueDate,
  setPayments,
  setFetchError,
) => {
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
    setFetchError("Could not add the payment");
    console.log("PaymentsService addPayment error : ", error);
  }

  if (data) {
    setPayments((prevPayments) => [...prevPayments, ...data]);
    setExpenseName("");
    console.log("add payment expenseName : ", expenseName);
    setExpenseAmount(0);
    setExpenseDueDate(0);
    console.log("PaymentsService addPayment data : ", data);
    setFetchError(null);
  }
};

export const editPaymentRow = async (id) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({
        // expense_name: expenseName,
        // expense_amount: expenseAmount,
        // expense_due_date: expenseDueDate,
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    // window.location.reload();
  } catch (error) {
    alert(error.message);
  }
};

export const deletePaymentRow = async (id, setPayments) => {
  try {
    const { error } = await supabase.from("payments").delete().eq("id", id);

    if (error) throw error;
    setPayments((prevPayments) =>
      prevPayments.filter((payment) => payment.id !== id),
    );
    console.log("PaymentsService deletePaymentRow: payment deleted");
  } catch (error) {
    alert(error.message);
  }
};
