import { create } from "zustand";
import type { PayFrequency, RepeatingExpenses } from "../types";

interface PaycheckStore {
  incomeAmount: number;
  payFrequency: string | null;
  payFrequencies: PayFrequency[];
  repeatingExpenses: RepeatingExpenses;
  repeatingExpenseTotal: number;
  userUUID: string | null;
  ids: string[];
  setIncomeAmount: (amount: number) => void;
  setPayFrequency: (freq: string | null) => void;
  setPayFrequencies: (freqs: PayFrequency[]) => void;
  setRepeatingExpenses: (expenses: RepeatingExpenses) => void;
  setRepeatingExpenseTotal: (total: number) => void;
  setUserUUID: (uuid: string | null) => void;
  setIds: (ids: string[]) => void;
}

export const usePaycheckStore = create<PaycheckStore>((set) => ({
  incomeAmount: 0,
  payFrequency: null,
  payFrequencies: [],
  repeatingExpenses: {},
  repeatingExpenseTotal: 0,
  userUUID: null,
  ids: [],
  setIncomeAmount: (incomeAmount) => set({ incomeAmount }),
  setPayFrequency: (payFrequency) => set({ payFrequency }),
  setPayFrequencies: (payFrequencies) => set({ payFrequencies }),
  setRepeatingExpenses: (repeatingExpenses) => set({ repeatingExpenses }),
  setRepeatingExpenseTotal: (repeatingExpenseTotal) =>
    set({ repeatingExpenseTotal }),
  setUserUUID: (userUUID) => set({ userUUID }),
  setIds: (ids) => set({ ids }),
}));
