import React, { useState, useEffect, useRef } from 'react';
import './Keyboard.css';

const layouts = {
    en: [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Ctrl', 'Cmd', 'Alt', ' ', 'Alt', 'Cmd', 'Menu', 'Ctrl']
    ],
    ru: [
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
        ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
        ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift'],
        ['Ctrl', 'Cmd', 'Alt', ' ', 'Alt', 'Cmd', 'Menu', 'Ctrl']
    ]
};

export const Keyboard = ({ onKeyClick }) => {
    const [layout, setLayout] = useState('en');
    const [pressedKey, setPressedKey] = useState(null);
    const lastKeyRef = useRef(null);

    // Обработка физической клавиатуры
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            setPressedKey(key);
            setTimeout(() => setPressedKey(null), 200);

            if (lastKeyRef.current === 'Shift' && key === 'Alt') {
                toggleLayout();
            }

            lastKeyRef.current = key;
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleLayout = () => {
        setLayout((prev) => (prev === 'en' ? 'ru' : 'en'));
        lastKeyRef.current = null;
    };

    const handleVirtualKeyClick = (key) => {
        if (lastKeyRef.current === 'Shift' && key === 'Alt') {
            toggleLayout();
            return;
        }

        lastKeyRef.current = key;
        setPressedKey(key);
        setTimeout(() => setPressedKey(null), 200);

        if (key === 'Backspace') {
            onKeyClick('BACKSPACE');
        } else if (key === 'Enter') {
            onKeyClick('ENTER');
        } else if (key === ' ') {
            onKeyClick(' ');
        } else if (key.length === 1) {
            onKeyClick(key);
        }
    };

    const rows = layouts[layout];

    return (
        <div className="keyboard">
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                Layout: <strong>{layout.toUpperCase()}</strong> (Shift → Alt to switch)
            </div>
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((key, keyIndex) => {
                        const isActive =
                            pressedKey &&
                            pressedKey.toLowerCase() === key.toLowerCase();

                        return (
                            <div
                                className={`key ${key.length > 1 ? 'wide' : ''} ${isActive ? 'active' : ''}`}
                                key={keyIndex}
                                onClick={() => handleVirtualKeyClick(key)}
                            >
                                {key === ' ' ? <span className="spacebar" /> : key}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
