import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "@helpers/StrictModeDroppable";
import { v4 as uuidv4 } from 'uuid';
import { TaskProps } from "src/types/task";
import TaskList from "./TaskList";
import { getDataFromLocalStorage } from "@helpers/get_localStoredData";
import { setDataToLocalStorage } from "@helpers/set_localStoredData";
import "./Main.css"

const LOCAL_STORAGE_KEY = "task-list-storage-key";

const DATA: TaskProps[] = [
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
    const [tasks, setTask] = useState<TaskProps[]>(getDataFromLocalStorage(LOCAL_STORAGE_KEY) || DATA);

    useEffect(() => {
        const storedData = getDataFromLocalStorage(LOCAL_STORAGE_KEY);
        if (storedData) {
            setTask(storedData);
        }
    }, []);

    useEffect(() => {
        setDataToLocalStorage(LOCAL_STORAGE_KEY, tasks);
    }, [tasks]);

    const handleAddItem = (taskId: string, itemName: string, priority: 'low' | 'medium' | 'high') => {
        const newItemId = uuidv4();

        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            const newItem = { id: newItemId, name: itemName, priority: priority };

            const newTasks = [...tasks];
            newTasks[taskIndex].items = [...newTasks[taskIndex].items, newItem];
            setTask(newTasks);
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
            const reorderedTasks = [...tasks];

            const taskSourceIndex = source.index;
            const taskDestinatonIndex = destination.index;

            const [removedTask] = reorderedTasks.splice(taskSourceIndex, 1);
            reorderedTasks.splice(taskDestinatonIndex, 0, removedTask);

            return setTask(reorderedTasks);
        }
        const itemSourceIndex = source.index;
        const itemDestinationIndex = destination.index;

        const taskSourceIndex = tasks.findIndex(
            (task) => task.id === source.droppableId
        );
        const taskDestinationIndex = tasks.findIndex(
            (task) => task.id === destination.droppableId
        );

        const newSourceItems = [...tasks[taskSourceIndex].items];
        const newDestinationItems =
            source.droppableId !== destination.droppableId
                ? [...tasks[taskDestinationIndex].items]
                : newSourceItems;

        const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
        newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

        const newTasks = [...tasks];

        newTasks[taskSourceIndex] = {
            ...tasks[taskSourceIndex],
            items: newSourceItems,
        };
        newTasks[taskDestinationIndex] = {
            ...tasks[taskDestinationIndex],
            items: newDestinationItems,
        };

        setTask(newTasks);
    };    

    return (
        <div className="layout__wrapper">
            <DragDropContext onDragEnd={handleDragAndDrop}>
                <div className="header">
                    <h1>Task Management App</h1>
                </div>
                <Droppable droppableId="ROOT" type="group">
                    {(provided) => (
                        <div className="main__task-container" {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable
                                    isDragDisabled
                                    draggableId={task.id}
                                    index={index}
                                    key={task.id}
                                >
                                    {(provided) => (
                                        <div
                                            className="flex1"
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <TaskList {...task} handleAddItem={handleAddItem} />
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