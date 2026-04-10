import { getDaysInMonth, format } from "date-fns";

export function daysInMonth(month: number, year: number): number {
  return getDaysInMonth(new Date(year, month));
}

export function getCorrectDate(date: string): Date {
  // Handle both "M/D/YYYY" (toLocaleDateString) and "YYYY-MM-DD" formats
  const normalized = date.replace(/-/g, "/");
  return new Date(normalized);
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function convertSinglesToDoubles(
  dates: Array<{ dayString: string }>,
): string[] {
  return dates.map((d) =>
    d.dayString.length < 2 ? "0" + d.dayString : d.dayString,
  );
}

export const AddDueDateSuffix = (
  dueDate: number | string | null,
): string | null => {
  if (dueDate === "" || dueDate === null) return null;

  const n = dueDate.toString();
  const num = parseInt(n, 10);

  if (num % 100 >= 11 && num % 100 <= 13) return n + "th";
  switch (num % 10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
    default:
      return n + "th";
  }
};
