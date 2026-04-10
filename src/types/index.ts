export interface Payment {
  id: number;
  expense_name: string;
  expense_amount: number;
  expense_due_date: number;
}

export interface PayFrequency {
  id: number;
  value: string;
}

export interface PayweekDate {
  id: number;
  date: Date;
  dayString: string;
  dayNumber: number;
  weekday: string;
}

export interface RepeatingExpenses {
  [name: string]: number;
}
