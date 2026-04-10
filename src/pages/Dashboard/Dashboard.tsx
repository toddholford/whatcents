import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { getAllPayments } from "../../services/PaymentsService";
import { getPaycheckFrequencies } from "../../services/PaycheckFrequenciesService";
import { getCorrectDate, formatDate } from "../../helpers/dateHelpers";
import {
  getPayweekCalendarRows,
  getPayweekDates,
  getPayweekExpenseTotal,
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
import { FormColumn } from "../../components/FormColumn";
import { CalendarColumn } from "../../components/CalendarColumn";
import { MonthlyExpensesColumn } from "../../components/MonthlyExpensesColumn";
import { usePaymentsStore } from "../../store/usePaymentsStore";
import { usePaycheckStore } from "../../store/usePaycheckStore";
import { useUIStore } from "../../store/useUIStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import type { PayweekDate } from "../../types";

export const DashboardPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1124px)");

  const { payments, setPayments } = usePaymentsStore();
  const {
    incomeAmount,
    setIncomeAmount,
    payFrequency,
    setPayFrequency,
    setPayFrequencies,
    repeatingExpenseTotal,
    setUserUUID,
    setIds,
  } = usePaycheckStore();
  const {
    calculatorOpen,
    showFormColumn,
    showCalendarColumn,
    showMonthlyExpensesColumn,
    setShowFormColumn,
    setShowCalendarColumn,
    setShowMonthlyExpensesColumn,
  } = useUIStore();

  const [date, setDate] = useState<Date>(
    getCorrectDate(new Date().toLocaleDateString()),
  );
  const [startDate, setStartDate] = useState<string>("");
  const [payweekDates, setPayweekDates] = useState<PayweekDate[] | null>(null);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [selectedExpenseAmount, setSelectedExpenseAmount] = useState<number>(0);
  const [payweekCalendarRows, setPayweekCalendarRows] = useState<string[][] | null>(null);
  const [payweekCalendarEndDate, setPayweekCalendarEndDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Show appropriate columns based on screen size
  useEffect(() => {
    if (isDesktop) {
      setShowFormColumn(true);
      setShowCalendarColumn(true);
      setShowMonthlyExpensesColumn(true);
    } else {
      setShowFormColumn(true);
      setShowCalendarColumn(false);
      setShowMonthlyExpensesColumn(false);
    }
  }, [isDesktop]);

  // Fetch initial data
  useEffect(() => { getAllPayments(setPayments); }, []);
  useEffect(() => { getPaycheckFrequencies(setPayFrequencies); }, []);
  useEffect(() => { getIncomeAmount(setIncomeAmount); }, []);
  useEffect(() => { getPaycheckFrequency(setPayFrequency); }, []);
  useEffect(() => { getUserUUID(setUserUUID); }, []);
  useEffect(() => { getIds(setIds); }, []);

  // Derive payweek from date
  useEffect(() => {
    setStartDate(formatDate(date));
    setPayweekDates(getPayweekDates(date));
  }, [date]);

  // Derive expense totals
  useEffect(() => {
    setExpenseAmount(
      getPayweekExpenseTotal(payweekDates, repeatingExpenseTotal, date, payments),
    );
  }, [payweekDates, repeatingExpenseTotal, payments]);

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
  }, [payweekDates, repeatingExpenseTotal, payments, selectedDate]);

  // Derive calendar rows
  useEffect(() => {
    setPayweekCalendarRows(getPayweekCalendarRows(payweekDates, payFrequency));
  }, [payweekDates, payFrequency]);

  useEffect(() => {
    if (payFrequency === "bi-weekly" && payweekCalendarRows) {
      const lastRow = payweekCalendarRows[1];
      setPayweekCalendarEndDate(lastRow[lastRow.length - 1] ?? null);
    }
  }, [payweekCalendarRows, payFrequency]);

  const selectedDateExpenses = getSelectedDateExpenses(
    selectedDate,
    payweekDates,
    date,
    payments,
  );

  return (
    <>
      {calculatorOpen && <Calculator />}
      <Navbar />
      <div
        id="main-content"
        className="lg:ml-14 lg:gap-2 lg:col-span-23 lg:row-span-full lg:grid lg:grid-cols-12 lg:grid-rows-4 bg-gray-950"
      >
        {showFormColumn && (
          <FormColumn
            startDate={startDate}
            setDate={setDate}
            expenseAmount={expenseAmount}
          />
        )}
        {showCalendarColumn && (
          <CalendarColumn
            date={date}
            startDate={startDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            payweekCalendarEndDate={payweekCalendarEndDate}
            expenseAmount={expenseAmount}
            selectedExpenseAmount={selectedExpenseAmount}
            payweekCalendarRows={payweekCalendarRows}
            selectedDateExpenses={selectedDateExpenses}
          />
        )}
        {showMonthlyExpensesColumn && <MonthlyExpensesColumn />}
      </div>
    </>
  );
};
