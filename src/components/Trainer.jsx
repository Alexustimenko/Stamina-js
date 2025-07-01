import React, { useState } from 'react';
import { terms } from '../data/terms';
import { TermDisplay } from './TermDisplay';
import { InputField } from './InputField';
import { Keyboard } from './Keyboard';

export const Trainer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const currentTerm = terms[currentIndex];

    const handleInputChange = (value) => {
        setInputValue(value);
        if (value === currentTerm) {
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % terms.length);
                setInputValue('');
            }, 300);
        }
    };
    const handleVirtualKeyPress = (key) => {
        if (key === 'BACKSPACE') {
            setInputValue((prev) => prev.slice(0, -1));
        } else if (key === 'ENTER') {

        } else {
            setInputValue((prev) => prev + key);
        }
    };



    if (!currentTerm) {
        return <div>No term found</div>;
    }

    return (
        <div>
            <TermDisplay term={currentTerm} userInput={inputValue} />
            <InputField value={inputValue} onChange={handleInputChange} />
            <Keyboard onKeyClick={handleVirtualKeyPress} />
        </div>
    );
};
