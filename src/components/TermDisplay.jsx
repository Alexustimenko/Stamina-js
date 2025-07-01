import React from "react";

export const TermDisplay = ({ term = '', userInput = '' }) => {
    return (
        <div style={{ fontSize: '24px', marginBottom: '10px', display: 'flex' }}>
            {term.split('').map((char, index) => {
                let color = 'gray';
                if (index < userInput.length) {
                    color = userInput[index] === char ? 'green' : 'red';
                }

                return (
                    <span key={index} style={{ color, whiteSpace: 'pre' }}>
            {char}
          </span>
                );
            })}
        </div>
    );
};
