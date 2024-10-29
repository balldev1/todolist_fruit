"use client"
import { useState } from 'react';

const items = [
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
    const [selectedItems, setSelectedItems] = useState({
        Fruit: [],
        Vegetable: []
    });

    const handleSelect = (item) => {
        setAvailableItems((prev) => prev.filter((i) => i.name !== item.name));
        setSelectedItems((prev) => ({
            ...prev,
            [item.type]: [...prev[item.type], item]
        }));

        setTimeout(() => {
            handleDeselect(item);
        }, 5000);
    };

    const handleDeselect = (item) => {
        setSelectedItems((prev) => ({
            ...prev,
            [item.type]: prev[item.type].filter((i) => i.name !== item.name)
        }));
        setAvailableItems((prev) => [...prev, item]);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <div style={{ display: 'flex', gap: '2rem' }}>
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

                {/*Vegetable */}
                <div>
                    <h3>Vegetables</h3>
                    <ul>
                        {selectedItems.Vegetable.map((item) => (
                            <li key={item.name} onClick={() => handleDeselect(item)} style={{ cursor: 'pointer' }}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/*  Fruit */}
                <div>
                    <h3>Fruits</h3>
                    <ul>
                        {selectedItems.Fruit.map((item) => (
                            <li key={item.name} onClick={() => handleDeselect(item)} style={{ cursor: 'pointer' }}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
