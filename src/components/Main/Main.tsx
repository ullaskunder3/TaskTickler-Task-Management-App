import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "@helpers/StrictModeDroppable";
import { v4 as uuidv4 } from 'uuid';
import { Store } from "src/types/task";
import TaskList from "./TaskList";
import { getDataFromLocalStorage } from "@helpers/get_localStoredData";
import { setDataToLocalStorage } from "@helpers/set_localStoredData";

const LOCAL_STORAGE_KEY = "task-list-storage-key";

const DATA: Store[] = [
    {
      id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
      name: "Added",
      items: [
        { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "test1", priority: "high" as const },
        { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "test2", priority: "medium" as const },
      ],
      tint: 1,
    },
    {
      id: "487f68b4-1746-438c-920e-d67b7df46247",
      name: "Started",
      items: [
        { id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae", name: "test3", priority: "medium" as const },
        { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "test4", priority: "low" as const },
      ],
      tint: 2,
    },
    {
      id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
      name: "Completed",
      items: [
        { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "test5", priority: "medium" as const },
        { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "test6", priority: "low" as const },
      ],
      tint: 3,
    },
  ];
  
  
function Main(): JSX.Element {
    const [stores, setStores] = useState<Store[]>(getDataFromLocalStorage(LOCAL_STORAGE_KEY) || DATA);

    useEffect(() => {
        const storedData = getDataFromLocalStorage(LOCAL_STORAGE_KEY);
        if (storedData) {
            setStores(storedData);
        }
    }, []);

    useEffect(() => {
        setDataToLocalStorage(LOCAL_STORAGE_KEY, stores);
    }, [stores]);

    const handleAddItem = (storeId: string, itemName: string, priority: 'low' | 'medium' | 'high') => {
        const newItemId = uuidv4();

        const storeIndex = stores.findIndex((store) => store.id === storeId);

        if (storeIndex !== -1) {
            const newItem = { id: newItemId, name: itemName, priority: priority };

            const newStores = [...stores];
            newStores[storeIndex].items = [...newStores[storeIndex].items, newItem];
            setStores(newStores);
        }
    };


    const handleDragAndDrop = (results: DropResult) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        if (type === "group") {
            const reorderedStores = [...stores];

            const storeSourceIndex = source.index;
            const storeDestinatonIndex = destination.index;

            const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
            reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

            return setStores(reorderedStores);
        }
        const itemSourceIndex = source.index;
        const itemDestinationIndex = destination.index;

        const storeSourceIndex = stores.findIndex(
            (store) => store.id === source.droppableId
        );
        const storeDestinationIndex = stores.findIndex(
            (store) => store.id === destination.droppableId
        );

        const newSourceItems = [...stores[storeSourceIndex].items];
        const newDestinationItems =
            source.droppableId !== destination.droppableId
                ? [...stores[storeDestinationIndex].items]
                : newSourceItems;

        const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
        newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

        const newStores = [...stores];

        newStores[storeSourceIndex] = {
            ...stores[storeSourceIndex],
            items: newSourceItems,
        };
        newStores[storeDestinationIndex] = {
            ...stores[storeDestinationIndex],
            items: newDestinationItems,
        };

        setStores(newStores);
    };

    console.log("store", stores);
    

    return (
        <div className="layout__wrapper">
            <DragDropContext onDragEnd={handleDragAndDrop}>
                <div className="header">
                    <h1>Task Management App</h1>
                </div>
                <Droppable droppableId="ROOT" type="group">
                    {(provided) => (
                        <div className="main__task-container" {...provided.droppableProps} ref={provided.innerRef}>
                            {stores.map((store, index) => (
                                <Draggable
                                    isDragDisabled
                                    draggableId={store.id}
                                    index={index}
                                    key={store.id}
                                >
                                    {(provided) => (
                                        <div
                                            className="flex1"
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <TaskList {...store} handleAddItem={handleAddItem} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Main