import { StateCreator } from 'zustand';

export interface GuestSlice {
  guestCount: number;

  setGuestCount: (value: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  setGuestCount: (value) => {
    set({ guestCount: value > 0 ? value : 0 });
  },
  guestCount: 0,
});
