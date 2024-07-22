import { createJSONStorage, StateStorage } from 'zustand/middleware';

const firebaseUrl = 'https://prueba-de-pr-default-rtdb.firebaseio.com/zustand';

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value,
    }).then((res) => res.json());

    console.log(data);
  },
  removeItem: function (): unknown | Promise<unknown> {
    throw new Error('Function not implemented.');
  },
};

export const customFirebaseStorage = createJSONStorage(() => storageAPI);
