"use client"
import { useState } from 'react';

type ItemType = 'Fruit' | 'Vegetable';

interface Item {
    type: ItemType;
    name: string;
}

const items: Item[] = [
    { type: 'Fruit', name: 'Apple' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Mushroom' },
    { type: 'Fruit', name: 'Banana' },
    { type: 'Vegetable', name: 'Tomato' },
    { type: 'Fruit', name: 'Orange' },
    { type: 'Fruit', name: 'Mango' },
    { type: 'Fruit', name: 'Pineapple' },
    { type: 'Vegetable', name: 'Cucumber' },
    { type: 'Fruit', name: 'Watermelon' },
    { type: 'Vegetable', name: 'Carrot' },
];

export default function TodoList() {
    const [availableItems, setAvailableItems] = useState(items);
    const [selectedItems, setSelectedItems] = useState<Record<ItemType, Item[]>>({
        Fruit: [],
        Vegetable: []
    });

    const handleSelect = (item: Item) => {
        setAvailableItems((prev) => prev.filter((i) => i.name !== item.name));
        setSelectedItems((prev) => ({
            ...prev,
            [item.type]: [...prev[item.type], item] // No more Type error
        }));

        setTimeout(() => {
            handleDeselect(item);
        }, 5000);
    };

    const handleDeselect = (item: Item) => {
        setSelectedItems((prev) => ({
            ...prev,
            [item.type]: prev[item.type].filter((i) => i.name !== item.name)
        }));

        setAvailableItems((prev) => {
            // ตรวจสอบว่ามี item นี้ใน availableItems อยู่แล้วหรือไม่
            if (!prev.some((i) => i.name === item.name && i.type === item.type)) {
                return [...prev, item];
            }
            return prev;
        });
    };


    return (
        <div>
            <h2>Todo List</h2>
            <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Available Items */}
                <div>
                    <h3>Available Items</h3>
                    <ul>
                        {availableItems.map((item, index) => (
                            <li
                                key={`${item.name}-${item.type}-${index}`}
                                onClick={() => handleSelect(item)}
                                style={{cursor: 'pointer'}}
                            >
                                {item.name} 
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Vegetables */}
                <div>
                    <h3>Vegetables</h3>
                    <ul>
                        {selectedItems.Vegetable.map((item) => (
                            <li key={`${item.name}-${item.type}`} onClick={() => handleDeselect(item)} style={{ cursor: 'pointer' }}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Fruits */}
                <div>
                    <h3>Fruits</h3>
                    <ul>
                        {selectedItems.Fruit.map((item) => (
                            <li key={`${item.name}-${item.type}`} onClick={() => handleDeselect(item)} style={{ cursor: 'pointer' }}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
