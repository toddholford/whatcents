import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { PaycheckCalendarPaymentInfo } from "../../components/PaycheckCalendarPaymentInfo";
import { PaycheckCalendar } from "../../components/PaycheckCalendar";
import { CustomNumberInput } from "../../components/CustomNumberInput";
import {addPayment, getAllPayments} from "../../services/PaymentsService";
import { getPaycheckFrequencies } from "../../services/PaycheckFrequenciesService";
import { getPaycheckCalculations } from "../../services/PaycheckCalculationsService";
import { PaymentsPage } from "../Payments";
import { CustomDropdown } from "../../components/CustomDropDown";
import { CustomDateInput } from "../../components/CustomDateInput";
import { toast, ToastContainer } from "react-toastify";
import { RepeatingExpenses } from "../../components/RepeatingExpenses";
import supabase from "../../config/supabaseClient";
import {
  getCorrectDate,
  formatDate,
  AddDueDateSuffix,
} from "../../helpers/dateHelpers";
import {
  getAllPaymentsTotal,
  getPayweekCalendarRows,
  getPayweekDates,
  getPayweekExpenseTotal,
  getPayweekRemainingAmount,
  getSelectedDateExpenses,
  getSelectedDateExpenseTotal, getSelectedPayweekExpenseTotal,
} from "../../helpers/payweekHelpers";
import {
  addPaycheckInfo,
  getId,
  getIds,
  getIncomeAmount,
  getPaycheckFrequency,
  updatePaycheckInfo,
} from "../../services/PaycheckInfoService";
import { getUserUUID } from "../../services/UsersService";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { Calculator } from "../../components/Calculator";
import {Helmet} from "react-helmet-async";
import {FormColumn} from "../../components/FormColumn";
import {CalendarColumn} from "../../components/CalendarColumn";
import {MonthlyExpensesColumn} from "../../components/MonthlyExpensesColumn";

export const DashboardPage = () => {
  const [date, setDate] = useState(
    getCorrectDate(new Date().toLocaleDateString()),
  );
  const [startDate, setStartDate] = useState("");
  const [payweekDates, setPayweekDates] = useState(null);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [selectedExpenseAmount, setSelectedExpenseAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [repeatingExpenses, setRepeatingExpenses] = useState({});
  const [repeatingExpenseTotal, setRepeatingExpenseTotal] = useState(0);
  const [payFrequency, setPayFrequency] = useState(null);
  const [payFrequencies, setPayFrequencies] = useState([]);
  const [payweekCalendarRows, setPayweekCalendarRows] = useState(null);
  const [payweekCalendarEndDate, setPayweekCalendarEndDate] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
  const [paycheckCalculations, setPaycheckCalculations] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [userUUID, setUserUUID] = useState(null);
  const [ids, setIds] = useState([]);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [expenseName, setExpenseName] = useState("");
  const [paymentExpenseAmount, setPaymentExpenseAmount] = useState(0);
  const [expenseDueDate, setExpenseDueDate] = useState(0);

  const [showFormColumn, setShowFormColumn] = useState(true);
  const [showCalendarColumn, setShowCalendarColumn] = useState(false);
  const [showMonthlyExpensesColumn, setShowMonthlyExpensesColumn] = useState(false);


  //get payments
  useEffect(() => {
    getAllPayments(setPayments, setFetchError);
  }, []);
  //get paycheck frequencies
  useEffect(() => {
    getPaycheckFrequencies(setPayFrequencies, setFetchError);
  }, []);
  //get paycheck calculations
  useEffect(() => {
    getPaycheckCalculations(setPaycheckCalculations, setFetchError);
  }, []);
  //get user income
  useEffect(() => {
    getIncomeAmount(setIncomeAmount, setFetchError);
  }, []);
  //get user paycheck frequency
  useEffect(() => {
    getPaycheckFrequency(setPayFrequency, setFetchError);
  }, []);
  //get user uuid
  useEffect(() => {
    getUserUUID(setUserUUID);
  }, []);
  //get user ids
  useEffect(() => {
    getIds(setIds, setFetchError);
  }, []);

  //date setter
  useEffect(() => {
    setStartDate(formatDate(date));
    setPayweekDates(getPayweekDates(date));
  }, [date]);

  //amount setter
  useEffect(() => {
    setExpenseAmount(
      getPayweekExpenseTotal(
        payweekDates,
        repeatingExpenseTotal,
        date,
        payments,
      ),
    );
    setRemainingAmount(getPayweekRemainingAmount(incomeAmount, expenseAmount));
  }, [payweekDates, incomeAmount, repeatingExpenseTotal, payments]);

  useEffect(() => {
    setSelectedExpenseAmount(
      getSelectedPayweekExpenseTotal(
        payweekDates,
        repeatingExpenseTotal,
        date,
        payments,
        selectedDate,
      ),
    );
  }, [payweekDates, incomeAmount, repeatingExpenseTotal, payments, selectedDate]);

  //calendar setter
  useEffect(() => {
    setPayweekCalendarRows(getPayweekCalendarRows(payweekDates, payFrequency));
  }, [payweekDates, payFrequency]);

  useEffect(() => {
    if (payFrequency === "bi-weekly") {
      setPayweekCalendarEndDate(payweekCalendarRows[1][payweekCalendarRows[1].length - 1]);
    }
  }, [payweekCalendarRows]);

  //selected date expenses setter
  useEffect(() => {
    setSelectedDateExpenses(
      getSelectedDateExpenses(selectedDate, payweekDates, date, payments),
    );
  }, [selectedDate]);


  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !paymentExpenseAmount || !expenseDueDate) {
      return;
    }

    addPayment(
        expenseName,
        paymentExpenseAmount,
        expenseDueDate,
        setExpenseName,
        setPaymentExpenseAmount,
        setExpenseDueDate,
        setPayments,
        setFetchError,
    );
  };

  return (
    <>
      {calculatorOpen ? (
        <Calculator setCalculatorOpen={setCalculatorOpen} />
      ) : null}
      <Navbar formColumn={showFormColumn} setFormColumn={setShowFormColumn} calendarColumn={showCalendarColumn} setCalendarColumn={setShowCalendarColumn} monthlyExpensesColumn={showMonthlyExpensesColumn} setMonthlyExpensesColumn={setShowMonthlyExpensesColumn} />
      <div
          id="main-content"
          className="md:ml-14 md:gap-2 md:col-span-23 md:row-span-full md:grid md:grid-cols-12 md:grid-rows-4 bg-gray-950"
      >
        {showFormColumn && <FormColumn
            userUUID={userUUID}
            repeatingExpenses={repeatingExpenses}
            setRepeatingExpenses={setRepeatingExpenses}
            setRepeatingExpenseTotal={setRepeatingExpenseTotal}
            startDate={startDate}
            setDate={setDate}
            calculatorOpen={calculatorOpen}
            setCalculatorOpen={setCalculatorOpen}
            incomeAmount={incomeAmount}
            setIncomeAmount={setIncomeAmount}
            expenseAmount={expenseAmount}
            repeatingExpenseTotal={repeatingExpenseTotal}
            payFrequency={payFrequency}
            setPayFrequency={setPayFrequency}
            payFrequencies={payFrequencies}
            ids={ids}
            setIds={setIds}
            fetchError={fetchError}
            setFetchError={setFetchError}
        />}
        {
          showCalendarColumn && <CalendarColumn
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              payweekCalendarEndDate={payweekCalendarEndDate}
              incomeAmount={incomeAmount}
              expenseAmount={expenseAmount}
              selectedExpenseAmount={selectedExpenseAmount}
              payweekCalendarRows={payweekCalendarRows}
              selectedDateExpenses={selectedDateExpenses}
          />
        }
        {
          showMonthlyExpensesColumn && <MonthlyExpensesColumn
              handlePaymentSubmit={handlePaymentSubmit}
              expenseName={expenseName}
              setExpenseName={setExpenseName}
              paymentExpenseAmount={paymentExpenseAmount}
              setPaymentExpenseAmount={setPaymentExpenseAmount}
              expenseDueDate={expenseDueDate}
              setExpenseDueDate={setExpenseDueDate}
              payments={payments}
              setPayments={setPayments}
              fetchError={fetchError}
              setFetchError={setFetchError}
          />
        }
      </div>
    </>
  );
};
