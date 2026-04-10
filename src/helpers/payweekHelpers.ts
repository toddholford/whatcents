import { convertSinglesToDoubles, daysInMonth } from "./dateHelpers";
import type { Payment, PayweekDate } from "../types";

function _buildPayweekDates(date: Date, count: number): PayweekDate[] {
  const daysInGivenMonth = daysInMonth(date.getMonth(), date.getFullYear());
  const startDateDay = date.getUTCDate();
  let expectedEndDate = startDateDay + count;
  let daysPassedCounter = 0;
  const payweekDates: PayweekDate[] = [];

  for (let i = startDateDay; i < expectedEndDate; i++) {
    daysPassedCounter++;
    if (i > daysInGivenMonth) {
      i = 1;
      expectedEndDate = count - daysPassedCounter + 2;
    }
    if (payweekDates.length === count) break;

    const newPayweekDate = new Date(date.getFullYear(), date.getMonth(), i);
    payweekDates.push({
      id: daysPassedCounter,
      date: newPayweekDate,
      dayString: i.toString(),
      dayNumber: i,
      weekday: newPayweekDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 2),
    });
  }

  return payweekDates;
}

export function getPayweekDays(date: Date): PayweekDate[] {
  return _buildPayweekDates(date, 7);
}

export function getPayweekDates(date: Date): PayweekDate[] {
  return _buildPayweekDates(date, 14);
}

export function getPayweekCalendarRows(
  payweekDates: PayweekDate[] | null,
  payFrequency: string | null,
): string[][] {
  let paycheckRow1: string[] = [];
  let paycheckRow2: string[] = [];

  switch (payFrequency) {
    case "bi-weekly":
      paycheckRow1 = payweekDates
        ? convertSinglesToDoubles(payweekDates.slice(0, 7))
        : [];
      paycheckRow2 = payweekDates
        ? convertSinglesToDoubles(payweekDates.slice(7, 14))
        : [];
      break;
    default:
      paycheckRow1 = payweekDates
        ? convertSinglesToDoubles(payweekDates.slice(0, 7))
        : [];
      break;
  }

  return [paycheckRow1, paycheckRow2];
}

export function getSelectedDateExpenses(
  selectedDate: string | null,
  payweekDates: PayweekDate[] | null,
  date: Date,
  payments: Payment[],
): Payment[] {
  const payweek = payweekDates ?? getPayweekDates(date);
  const payweekDaySet = new Set(payweek.map((pd) => pd.dayNumber));
  const payweekPayments = payments.filter((p) =>
    payweekDaySet.has(p.expense_due_date),
  );

  const targetDay = selectedDate
    ? parseInt(selectedDate, 10)
    : (payweek[0]?.dayNumber ?? 0);

  return payweekPayments.filter((p) => p.expense_due_date === targetDay);
}

export function getSelectedDateExpenseTotal(
  selectedDateExpenses: Payment[],
): string {
  return selectedDateExpenses
    .reduce((sum, p) => sum + p.expense_amount, 0)
    .toFixed(2);
}

export function getPayweekExpenseTotal(
  payweekDates: PayweekDate[] | null,
  _repeatingExpenseAmount: number,
  date: Date,
  payments: Payment[],
): number {
  const payweek = payweekDates ?? getPayweekDates(date);
  const payweekDaySet = new Set(payweek.map((pd) => pd.dayNumber));
  return payments
    .filter((p) => payweekDaySet.has(p.expense_due_date))
    .reduce((sum, p) => sum + p.expense_amount, 0);
}

export function getSelectedPayweekExpenseTotal(
  payweekDates: PayweekDate[] | null,
  _repeatingExpenseAmount: number,
  date: Date,
  payments: Payment[],
  selectedDate: string | null,
): number {
  const payweek = payweekDates ?? getPayweekDates(date);
  const index = payweek.findIndex(
    (p) => p.dayNumber === parseInt(selectedDate ?? "0", 10),
  );
  if (index === -1) return 0;

  const remainingDays = new Set(payweek.slice(index).map((p) => p.dayNumber));
  return payments
    .filter((p) => remainingDays.has(p.expense_due_date))
    .reduce((sum, p) => sum + p.expense_amount, 0);
}

export function getAllPaymentsTotal(payments: Payment[]): string {
  return payments
    .reduce((sum, p) => sum + p.expense_amount, 0)
    .toFixed(2);
}

export function getPayweekRemainingAmount(
  incomeAmount: number,
  expenseAmount: number,
): number {
  return incomeAmount - expenseAmount;
}
