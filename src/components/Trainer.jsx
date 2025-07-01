import React, { useState,useEffect } from 'react';
import { terms } from '../data/terms';
import { TermDisplay } from './TermDisplay';
import { InputField } from './InputField';
import { Keyboard } from './Keyboard';

export const Trainer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [totalPresses, setTotalPresses] = useState(0);
    const [correctHits, setCorrectHits] = useState(0);

    const currentTerm = terms[currentIndex];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                alert(`Stat: All Pressed: ${totalPresses} correct: ${correctHits} Percentage: ${Math.round((correctHits/totalPresses*100),2)} %`);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[totalPresses,correctHits]);

    const handleInputChange = (value) => {
        const prevLength = inputValue.length;
        const newChar = value[prevLength];

        setInputValue(value);
        setTotalPresses((prev) => prev + 1);

        const expectedChar = currentTerm[prevLength];
        if (newChar === expectedChar) {
            setCorrectHits((prev) => prev + 1);
        }

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
            setTotalPresses((prev) => prev + 1);
            const expectedChar = currentTerm[inputValue.length];

            if (key === expectedChar) {
                setCorrectHits((prev) => prev + 1);
            }

            const newValue = inputValue + key;
            setInputValue(newValue);

            if (newValue === currentTerm) {
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % terms.length);
                    setInputValue('');
                }, 300);
            }

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
