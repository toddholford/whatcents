import supabase from '../config/supabaseClient'

export const getExpenses = async (setExpenses, setFetchError) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')

    if (error) {
        setFetchError("Could not fetch the payments");
        setExpenses(null);
        console.log("PaymentsService getAllPayments error : ", error);
    }
    if (data) {
        setExpenses(data);
        console.log("PaymentsService getAllPayments data : ", data);
        setFetchError(null);
    }

  return data
}