import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { customFirebaseStorage } from '../storages/firebase-storage.store';
import { logger } from '../middlewares/logger.middleware';

interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApI: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) =>
    set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) =>
    set({ lastName: value }, false, 'setLastName'),
});

export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(storeApI, {
        name: 'person-store',
        //storage: customFirebaseStorage,
      })
    )
  )
);
