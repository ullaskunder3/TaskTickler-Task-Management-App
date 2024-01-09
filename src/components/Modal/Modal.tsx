interface ModalProps {
    newItemName: string;
    handleNewItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    priority: 'low' | 'medium' | 'high';
    setPriority: React.Dispatch<React.SetStateAction<'low' | 'medium' | 'high'>>;
    handleAddNewItem: () => void;
    label:string
}

export function ModalUI({ label, newItemName, handleNewItemChange, priority, setPriority, handleAddNewItem }: ModalProps): JSX.Element {
    return (
        <div className="modal-container__wrapper">
            <h2>{label}</h2>
            <input
                type="text"
                placeholder="Item Name"
                value={newItemName}
                onChange={handleNewItemChange}
            />
            <div className="selecter-items">
                <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <button className="btn" onClick={handleAddNewItem}>Add Item</button>
            </div>
        </div>
    );
}
