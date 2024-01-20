import { create } from "zustand";

export const useAdmin = create((set) => ({
  isAdmin: false,
  onSet: (isAdmin) => set({ isAdmin: isAdmin }),
}));