import React from "react";
import supabase from "../../config/supabaseClient";
import { addCurrencyZeroes } from "../../helpers/numberFormatHelper";
import { AddDueDateSuffix } from "../../helpers/dateHelpers";

export const PaymentsTableRow = ({ payment }) => {
  const editPaymentRow = async (payment) => {
    const { data, error } = await supabase
      .from("payments")
      .update({ other_column: "otherValue" })
      .eq("some_column", "someValue")
      .select();
  };

  const deletePaymentRow = async (payment) => {
    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("some_column", "someValue");
  };

  return (
    <tr className="flex w-full items-center border-b border-gray-700 bg-gray-900">
      <th
        scope="row"
        className="w-1/4 whitespace-nowrap p-4 text-sm font-medium text-gray-200"
      >
        {payment.expense_name}
      </th>
      <td className="w-1/4 p-4">{addCurrencyZeroes(payment.expense_amount)}</td>
      <td className="w-1/4 p-4 ordinal">
        {AddDueDateSuffix(payment.expense_due_date)}
      </td>
      <td className="w-1/4 p-4">
        <button
          type="button"
          className="ml-2 w-1/3 rounded-sm bg-gray-800 py-2 outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
          onClick={editPaymentRow}
        >
          Edit
        </button>
        <button
          type="button"
          className="ml-2 w-1/3 rounded-sm bg-gray-800 py-2 outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
          onClick={deletePaymentRow}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
