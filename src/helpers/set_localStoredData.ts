import { Store } from "src/types/task";

export const setDataToLocalStorage = (key: string, stores: Store[])=>{
    localStorage.setItem(key, JSON.stringify(stores));
}