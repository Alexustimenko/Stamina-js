import React, { useRef, useEffect } from 'react';

export const InputField = ({ value = '', onChange }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const el = divRef.current;
        if (el && el.innerText !== value) {
            el.innerText = value;
        }
    }, [value]);

    const handleInput = (e) => {
        const text = e.target.innerText.replace(/\n/g, '');
        onChange(text);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault(); // Блокировка вставки
        }
    };

    return (
        <div
            ref={divRef}
            contentEditable
            spellCheck={false}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            style={{
                fontFamily: `'Fira Code', 'Courier New', monospace`,
                fontSize: '28px',
                color: '#111',
                padding: '10px 15px',
                background: '#f9f9f9',
                border: '2px solid #d3d3d3',
                borderRadius: '10px',
                minHeight: '60px',
                outline: 'none',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                boxShadow: 'inset 0 0 5px #ddd',
                width: '100%',
                maxWidth: '900px'
            }}
        />
    );
};
