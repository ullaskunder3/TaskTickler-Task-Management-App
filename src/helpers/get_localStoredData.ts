import { TaskProps } from "src/types/task";

export const getDataFromLocalStorage = (key: string): TaskProps[] | null => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};
