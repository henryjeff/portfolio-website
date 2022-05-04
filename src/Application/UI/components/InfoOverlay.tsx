import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UIEventBus from '../EventBus';
import { Easing } from '../Animation';

interface InfoOverlayProps {
    visibleOverride?: boolean;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visibleOverride }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        UIEventBus.on('enterMonitor', () => {
            setVisible(false);
        });
        UIEventBus.on('leftMonitor', () => {
            setVisible(true);
        });
    }, []);

    return (
        <motion.div
            variants={vars}
            initial="hide"
            animate={!visibleOverride ? 'hide' : visible ? 'visible' : 'hide'}
            style={styles.wrapper}
        >
            <div style={styles.container}>
                <p>Henry Heffernan</p>
            </div>
            <div style={styles.container}>
                <p>Software Engineer and Creative Developer</p>
            </div>
        </motion.div>
    );
};

const vars = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: 0.5,
            ease: 'easeOut',
        },
    },
    hide: {
        x: -32,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Typescript angry at me for some reason, so I'm just going to ignore it.
// and redeclare this here

interface StyleSheetCSS {
    [key: string]: React.CSSProperties;
}

const styles: StyleSheetCSS = {
    container: {
        background: 'black',
        padding: 4,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        display: 'flex',
        margin: 4,
        boxSizing: 'border-box',
    },
    wrapper: {
        position: 'absolute',
        top: 64,
        left: 64,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    blinkingContainer: {
        // width: 100,
        // height: 100,
        marginLeft: 8,
        paddingBottom: 2,
        paddingRight: 4,
    },
};

export default InfoOverlay;
