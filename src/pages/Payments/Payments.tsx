import React from "react";
import { PaymentsTableRow } from "../../components/PaymentsTableRow";
import { deletePaymentRow } from "../../services/PaymentsService";
import { usePaymentsStore } from "../../store/usePaymentsStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const PaymentsPage = () => {
  const { payments, deletePayment } = usePaymentsStore();
  const isMobile = !useMediaQuery("(min-width: 1124px)");

  const handleDelete = (id: number) => {
    deletePaymentRow(id, deletePayment);
  };

  const tableBodyClass = isMobile
    ? "w-full overflow-y-auto overflow-x-hidden h-[calc(100vh-15rem)]"
    : "w-full overflow-y-auto overflow-x-hidden h-[calc(100vh-11rem)]";

  return (
    <article className="col-span-1 row-span-full grid h-screen grid-cols-12 grid-rows-12 bg-gray-900">
      <div className="col-span-full row-span-11 pb-10">
        <div className="w-full">
          <table className="w-full text-sm text-white">
            <thead className="bg-gray-900 text-xs uppercase text-gray-500 outline outline-1 outline-gray-700">
              <tr>
                <th scope="col" className="w-1/4 p-2">Expense</th>
                <th scope="col" className="w-1/4 p-2">Amount</th>
                <th scope="col" className="w-1/4 p-2">Due Date</th>
                <th scope="col" className="w-1/4 p-2"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
          </table>
        </div>

        <div className={tableBodyClass}>
          <table className="w-full text-sm text-white">
            <tbody className="text-center">
              {payments.map((payment) => (
                <PaymentsTableRow
                  key={payment.id}
                  payment={payment}
                  onDelete={() => handleDelete(payment.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};
