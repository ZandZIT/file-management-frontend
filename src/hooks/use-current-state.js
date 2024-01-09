import { create } from "zustand";


export const useCurrentState = create((set) => ({
  state: {},
  onSet: (data = {}) => set({ state: data }),
}));