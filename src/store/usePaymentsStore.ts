import { create } from "zustand";
import type { Payment } from "../types";

interface PaymentsStore {
  payments: Payment[];
  fetchError: string | null;
  setPayments: (payments: Payment[]) => void;
  addPayment: (payment: Payment) => void;
  deletePayment: (id: number) => void;
  setFetchError: (error: string | null) => void;
}

export const usePaymentsStore = create<PaymentsStore>((set) => ({
  payments: [],
  fetchError: null,
  setPayments: (payments) => set({ payments }),
  addPayment: (payment) =>
    set((state) => ({ payments: [...state.payments, payment] })),
  deletePayment: (id) =>
    set((state) => ({
      payments: state.payments.filter((p) => p.id !== id),
    })),
  setFetchError: (fetchError) => set({ fetchError }),
}));
