import React, { useState } from 'react';
import UIEventBus from '../EventBus';

const HackerToggle = () => {
    const [isHacker, setIsHacker] = useState(false);

    const toggle = () => {
        const next = !isHacker;
        setIsHacker(next);
        UIEventBus.dispatch('hackerModeToggle', next);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }}>
            <button 
                onClick={toggle}
                style={{
                    backgroundColor: isHacker ? '#00ff41' : '#333',
                    color: isHacker ? '#000' : '#00ff41',
                    border: '1px solid #00ff41',
                    padding: '8px 16px',
                    fontFamily: "'Courier New', Courier, monospace",
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: isHacker ? '0 0 15px #00ff41' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                {isHacker ? '[ HACKER_MODE: ACTIVE ]' : '[ ACTIVATE HACKER_MODE ]'}
            </button>
            {isHacker && (
                <div style={{ 
                    fontSize: '10px', 
                    color: '#00ff41', 
                    marginTop: '5px',
                    textShadow: '0 0 5px #00ff41' 
                }}>
                    SYSTEM_ACCESS: GRANTED
                </div>
            )}
        </div>
    );
};

export default HackerToggle;
