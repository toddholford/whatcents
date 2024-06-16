import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { CustomNumberInput } from "../../components/CustomNumberInput";
import { PaymentsTableRow } from "../../components/PaymentsTableRow";
import { addPayment, getAllPayments } from "../../services/PaymentsService";

export const PaymentsPage = () => {
  const [fetchError, setFetchError] = useState(null);
  const [payments, setPayments] = useState(null);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDueDate, setExpenseDueDate] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount || !expenseDueDate) {
      return;
    }

    addPayment(expenseName, expenseAmount, expenseDueDate);
  };

  useEffect(() => {
    getAllPayments(setPayments, setFetchError);
  }, [payments]);

  return (
    <article className="grid-rows-9 col-span-1 row-span-full grid h-screen grid-cols-12 bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="col-span-full row-span-1 flex flex-row items-end justify-center gap-4 p-6"
      >
        <div>
          <label
            htmlFor="expense_name"
            className="mb-2 block text-base text-gray-600"
          >
            Name of Expense...
          </label>
          <input
            type="text"
            id="expense_name"
            className="bg-gray-850 block h-8 w-full rounded-sm pl-2 outline outline-1 outline-offset-0 outline-gray-700"
            onChange={(e) => {
              setExpenseName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="expense_amount"
            className="mb-2 block text-base text-gray-600"
          >
            Expense Amount...
          </label>
          <CustomNumberInput
            id="expense_amount"
            numberType="decimal"
            adjustBy="10"
            inputValue={expenseAmount}
            setInputValue={setExpenseAmount}
          />
        </div>
        <div>
          <label
            htmlFor="expense_due_date"
            className="mb-2 block text-base text-gray-600"
          >
            Date Expense is Due...
          </label>
          <CustomNumberInput
            id="expense_due_date"
            inputValue={expenseDueDate}
            setInputValue={setExpenseDueDate}
          />
        </div>
        <button
          type="submit"
          className="h-8 w-1/12 rounded-sm bg-emerald-950 text-center text-sm outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800"
        >
          Add
        </button>
      </form>
      <div className="col-span-full row-span-8 pb-10">
        <table className="h-full w-full text-center text-sm text-white">
          <thead className="bg-gray-900 text-xs uppercase text-gray-500 outline outline-1 outline-offset-0 outline-gray-700">
            <tr className="flex w-full items-center justify-evenly">
              <th scope="col" className="w-1/4 p-2">
                Expense
              </th>
              <th scope="col" className="w-1/4 p-2">
                Amount
              </th>
              <th scope="col" className="w-1/4 p-2">
                Due Date
              </th>
              <th scope="col" className="w-1/4 p-2"></th>
            </tr>
          </thead>
          <tbody className="flex h-full w-full flex-col items-center overflow-y-scroll">
            {fetchError && <p>{fetchError}</p>}
            {payments &&
              payments.map((payment) => (
                <PaymentsTableRow key={payment.id} payment={payment} />
              ))}
          </tbody>
        </table>
      </div>
    </article>

    // <div className="grid h-screen">
    //     <div className="flex flex-col">
    //
    //
    //         {/*--------Main Content--------*/}
    //         <div className="grid grid-cols-1 h-full p-4">
    //             {/*--------First Column (Left Half)--------*/}
    //             <div className="flex flex-col items-center justify-start space-y-4 h-full w-full p-4 bg-gray-700 rounded-l-xl rounded-r-xl">
    //                 <p className="bg-gray-900 text-lg p-3 font-thin rounded-md w-full text-center">Add all of your reoccurring monthly payments here</p>
    //                 <form onSubmit={handleSubmit} className="flex flex-row justify-center items-end gap-4 w-1/2 bg-gray-600 rounded-l-xl rounded-r-xl p-6">
    //                     <div>
    //                         <label htmlFor="expense_name" className="calendar-input-label">Name of Expense...</label>
    //                         <input type="text" id="expense_name"
    //                                className="calendar-input"
    //                                onChange={(e) => {setExpenseName(e.target.value)}}
    //                         />
    //                     </div>
    //                     {/*<div>*/}
    //                     {/*    <label htmlFor="pay_frequency" className="calendar-input-label">Frequency of Payment...</label>*/}
    //                     {/*    <select id="pay_frequency"*/}
    //                     {/*            className="calendar-input"*/}
    //                     {/*            value={payFrequency}*/}
    //                     {/*            onChange={(e) => {*/}
    //                     {/*                setPayFrequency(e.target.value)}}>*/}
    //                     {/*        {payFrequencies.map(payFreq => (<option key={payFreq.frequency_id} value={payFreq.pay_frequency}>{payFreq.pay_frequency}</option>))}*/}
    //                     {/*    </select>*/}
    //                     {/*</div>*/}
    //                     <div>
    //                         <label htmlFor="expense_amount" className="calendar-input-label">Expense Amount...</label>
    //                         <CustomNumberInput id="expense_amount" numberType="decimal" adjustBy="10" inputValue={expenseAmount} setInputValue={setExpenseAmount}/>
    //                     </div>
    //                     <div>
    //                         <label htmlFor="expense_due_date" className="calendar-input-label">Date Expense is Due...</label>
    //                         <CustomNumberInput id="expense_due_date" inputValue={expenseDueDate} setInputValue={setExpenseDueDate}/>
    //                     </div>
    //                     <button type="submit" className="btn-table-add">Add</button>
    //                 </form>
    //
    //                 <div className="w-2/3 h-full bg-gray-600 rounded-lg overflow-hidden">
    //                     <table className="w-full h-full text-center text-sm text-white">
    //                         <thead className="text-xs text-white uppercase bg-gray-900">
    //                         <tr className="flex items-center justify-evenly w-full ">
    //                             <th scope="col" className="p-4 w-1/4">
    //                                 Expense
    //                             </th>
    //                             <th scope="col" className="p-4 w-1/4">
    //                                 Amount
    //                             </th>
    //                             <th scope="col" className="p-4 w-1/4">
    //                                 Due Date
    //                             </th>
    //                             <th scope="col" className="p-4 w-1/4">
    //
    //                             </th>
    //                         </tr>
    //                         </thead>
    //                         <tbody className="flex flex-col items-center overflow-y-scroll scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-500 hover:scrollbar-thumb-gray-600 w-full h-full">
    //                         { fetchError && (<p>{fetchError}</p>)}
    //                         { payments && (payments.map((payment) => (
    //                             <PaymentsTableRow key={payment.id} payment={payment} />
    //                         )))}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //
    //         </div>
    //
    //     </div>
    // </div>
  );
};
