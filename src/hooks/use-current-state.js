import { create } from "zustand";
import { ROOT_FOLDER } from "./use-folder";


export const useCurrentState = create((set) => ({
  state: ROOT_FOLDER,
  onSet: (data = {}) => set({ state: data }),
}));