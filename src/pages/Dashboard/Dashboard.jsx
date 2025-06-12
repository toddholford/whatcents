import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import {addPayment, getAllPayments} from "../../services/PaymentsService";
import { getPaycheckFrequencies } from "../../services/PaycheckFrequenciesService";
import {
  getCorrectDate,
  formatDate
} from "../../helpers/dateHelpers";
import {
  getPayweekCalendarRows,
  getPayweekDates,
  getPayweekExpenseTotal,
  getPayweekRemainingAmount,
  getSelectedDateExpenses,
  getSelectedPayweekExpenseTotal,
} from "../../helpers/payweekHelpers";
import {
  getIds,
  getIncomeAmount,
  getPaycheckFrequency,
} from "../../services/PaycheckInfoService";
import { getUserUUID } from "../../services/UsersService";
import { Calculator } from "../../components/Calculator";
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
  const [fetchError, setFetchError] = useState(null);
  const [userUUID, setUserUUID] = useState(null);
  const [ids, setIds] = useState([]);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [expenseName, setExpenseName] = useState("");
  const [paymentExpenseAmount, setPaymentExpenseAmount] = useState(0);
  const [expenseDueDate, setExpenseDueDate] = useState(0);

  const [showFormColumn, setShowFormColumn] = useState(false);
  const [showCalendarColumn, setShowCalendarColumn] = useState(false);
  const [showMonthlyExpensesColumn, setShowMonthlyExpensesColumn] = useState(false);

  const isMobile = window.innerWidth < window.innerHeight;

  function displayDashboard() {
    switch (isMobile) {
      case true:
        setShowFormColumn(true);
        break;
      case false:
        setShowFormColumn(true);
        setShowCalendarColumn(true);
        setShowMonthlyExpensesColumn(true);
        break;
      default:
        return <></>;
    }
  }

  useEffect(() => {
    displayDashboard();
  }, []);

  //get payments
  useEffect(() => {
    getAllPayments(setPayments, setFetchError);
  }, []);
  //get paycheck frequencies
  useEffect(() => {
    getPaycheckFrequencies(setPayFrequencies, setFetchError);
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
        <Calculator calculatorOpen={calculatorOpen} setCalculatorOpen={setCalculatorOpen} />
      ) : null}
      <Navbar formColumn={showFormColumn} setFormColumn={setShowFormColumn} calendarColumn={showCalendarColumn} setCalendarColumn={setShowCalendarColumn} monthlyExpensesColumn={showMonthlyExpensesColumn} setMonthlyExpensesColumn={setShowMonthlyExpensesColumn} />
      <div
          id="main-content"
          className="lg:ml-14 lg:gap-2 lg:col-span-23 lg:row-span-full lg:grid lg:grid-cols-12 lg:grid-rows-4 bg-gray-950"
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
