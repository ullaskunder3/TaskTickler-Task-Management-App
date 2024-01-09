export interface Item {
  id: string;
  name: string;
  priority: "low" | "medium" | "high";
}

export interface Store {
  id: string;
  name: string;
  items: Item[];
  tint: number;
}

export interface TaskListProps {
  name: string;
  items: Item[];
  id: string;
  handleAddItem: (
    storeId: string,
    itemName: string,
    priority: "low" | "medium" | "high"
  ) => void;
}
