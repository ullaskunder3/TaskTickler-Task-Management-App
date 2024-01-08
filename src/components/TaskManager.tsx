import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "@helpers/StrictModeDroppable";
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';

const LOCAL_STORAGE_KEY = "shoppingListData";

const getDataFromLocalStorage = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
};

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Added",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "test1", priority: "high" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "test2", priority: "medium" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Started",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "test3",
        priority: "medium"
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "test4", priority: "low" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Completed",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "test5", priority: "medium" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "test6", priority: "low" },
    ],
    tint: 3,
  },
];

function Main() {
  const [stores, setStores] = useState(getDataFromLocalStorage() || []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stores));
  }, [stores]);

  const handleAddItem = (storeId, itemName, priority) => {
    const newItemId = uuidv4();

    const storeIndex = stores.findIndex((store) => store.id === storeId);

    if (storeIndex !== -1) {
      const newItem = { id: newItemId, name: itemName, priority: priority };

      const newStores = [...stores];
      newStores[storeIndex].items = [...newStores[storeIndex].items, newItem];
      setStores(newStores);
    }
  };


  const handleDragAndDrop = (results) => {
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
                      <StoreList {...store} handleAddItem={handleAddItem} />
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

function StoreList({ name, items, id, handleAddItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [priority, setPriority] = useState('low');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewItemChange = (e) => {
    setNewItemName(e.target.value);
  };

  const handleAddNewItem = () => {
    if (newItemName.trim() !== '') {
      handleAddItem(id, newItemName, priority);
      setNewItemName('');
      setPriority('low');
      closeModal();
    }
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="store-container__wrapper" {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store-container">
            <h3>{name}</h3>
          </div>
          <div className="items-container">
            <div className="items-container__wrapper">
              {items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <div
                      className={`item-container ${getBackgroundColor(item.priority)}`}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <h4>{item.name}</h4>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
            <button className="item-container btn" onClick={openModal}>Add New Item</button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Add Item Modal"
              className={"modal-container"}
            >
              <div className="modal-container__wrapper">
                <h2>Add New Item</h2>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={handleNewItemChange}
                />
                <div className="selecter-items">
                  <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button className="btn" onClick={handleAddNewItem}>Add Item</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </Droppable>
  );

  function getBackgroundColor(priority) {

    console.log("getBackgroundColor->", priority);
    switch (priority) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return '';
    }
  }
}


export default Main;