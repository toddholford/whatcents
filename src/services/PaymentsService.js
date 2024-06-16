import supabase from "../config/supabaseClient";

export const getAllPayments = async (setPayments, setFetchError) => {
    const {data, error} = await supabase
        .from('payments')
        .select()

    if (error) {
        setFetchError('Could not fetch the payments');
        setPayments(null);
        console.log(error);
    }
    if (data) {
        setPayments(data);
        setFetchError(null);
    }
}

export const addPayment = async (expenseName, expenseAmount, expenseDueDate) => {
    const { data, error } = await supabase
        .from('payments')
        .insert([
            { expense_name: expenseName, expense_amount: expenseAmount, expense_due_date: expenseDueDate },
        ])
        .select()
}