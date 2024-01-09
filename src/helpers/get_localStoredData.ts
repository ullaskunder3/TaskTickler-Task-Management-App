import { Store } from "src/types/task";

export const getDataFromLocalStorage = (key: string): Store[] | null => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};
