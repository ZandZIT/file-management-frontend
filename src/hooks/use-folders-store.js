import { create } from "zustand";


export const useModalStore = create((set) => ({
    type: null,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
  }));