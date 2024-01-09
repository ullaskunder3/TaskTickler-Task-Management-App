import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskListProps } from "src/types/task";
import Modal from 'react-modal'
import { getBackgroundColor } from "@helpers/getBackgroundColor";
import { ModalUI } from "../Modal/Modal";

function TaskList({ name, items, id, handleAddItem }: TaskListProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewItemName(e.target.value);

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
                <div
                 className="store-container__wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="store-container">
                        <h3>{name}</h3>
                    </div>
                    <div className="items-container">
                        <div className="items-container__wrapper">
                            {items.map((item, index) => (
                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`item-container ${getBackgroundColor(item.priority)}`}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                ...provided.draggableProps.style,
                                                background: snapshot.isDragging ? 'white' : '',
                                                border: `2px solid ${snapshot.isDragging ? 'red' : ''}`,
                                                opacity: snapshot.isDragging ? 0.7 : 1,
                                            }}
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
                            <ModalUI label={"Add New Item"} newItemName={newItemName} handleNewItemChange={handleNewItemChange} priority={priority} setPriority={setPriority} handleAddNewItem={handleAddNewItem} />
                        </Modal>
                    </div>
                </div>
            )}
        </Droppable>
    );
}

export default TaskList