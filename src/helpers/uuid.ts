import { Store } from 'src/types/task';
import { v4 as uuidv4 } from 'uuid';

export const getDataFromLocalStorage = (): Store[] | null => {
  const storedData = localStorage.getItem("shoppingListData");
  return storedData ? JSON.parse(storedData) : null;
};

export { uuidv4 };
