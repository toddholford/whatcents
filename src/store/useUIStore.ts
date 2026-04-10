import { create } from "zustand";

interface UIStore {
  calculatorOpen: boolean;
  showFormColumn: boolean;
  showCalendarColumn: boolean;
  showMonthlyExpensesColumn: boolean;
  setCalculatorOpen: (open: boolean) => void;
  setShowFormColumn: (show: boolean) => void;
  setShowCalendarColumn: (show: boolean) => void;
  setShowMonthlyExpensesColumn: (show: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  calculatorOpen: false,
  showFormColumn: false,
  showCalendarColumn: false,
  showMonthlyExpensesColumn: false,
  setCalculatorOpen: (calculatorOpen) => set({ calculatorOpen }),
  setShowFormColumn: (showFormColumn) => set({ showFormColumn }),
  setShowCalendarColumn: (showCalendarColumn) => set({ showCalendarColumn }),
  setShowMonthlyExpensesColumn: (showMonthlyExpensesColumn) =>
    set({ showMonthlyExpensesColumn }),
}));
