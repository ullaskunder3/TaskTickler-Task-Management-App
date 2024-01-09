import { TaskProps } from "src/types/task";

export const setDataToLocalStorage = (key: string, tasks: TaskProps[])=>{
    localStorage.setItem(key, JSON.stringify(tasks));
}