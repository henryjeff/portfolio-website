import React from 'react';
import { motion } from 'framer-motion';

interface TerminalIconProps {
    onClick: () => void;
}

const TerminalIcon: React.FC<TerminalIconProps> = ({ onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.container}
            onClick={onClick}
        >
            <div style={styles.iconWrapper}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
            </div>
        </motion.div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        background: 'black',
        padding: 4,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        display: 'flex',
        cursor: 'pointer',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        color: '#00ff41',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default TerminalIcon;
