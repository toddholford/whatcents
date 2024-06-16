import supabase from "../config/supabaseClient";

export const getPaycheckFrequencies = async (setPayFrequencies, setFetchError) => {
    const {data, error} = await supabase
        .from('pay_frequencies')
        .select()

    if (error) {
        setFetchError('Could not fetch the paycheck frequency');
        setPayFrequencies(null);
        console.log(error);
    }
    if (data) {
        setPayFrequencies(data);
        setFetchError(null);
    }
}