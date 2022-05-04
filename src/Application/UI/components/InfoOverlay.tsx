import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import UIEventBus from '../EventBus';
import { Easing } from '../Animation';

interface InfoOverlayProps {
    visibleOverride: boolean;
}

const NAME_TEXT = 'Henry Heffernan';
const TITLE_TEXT = 'Software Engineer and Creative Developer';

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visibleOverride }) => {
    const [visible, setVisible] = useState(false);
    const visRef = useRef(visible);
    const [nameText, setNameText] = useState('');
    const [titleText, setTitleText] = useState('');

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void
    ) => {
        if (i < text.length) {
            setTimeout(() => {
                window.postMessage(
                    { type: 'keydown', key: `_AUTO_${text[i]}` },
                    '*'
                );

                setText(curText + text[i]);
                typeText(i + 1, curText + text[i], text, setText, callback);
            }, Math.random() * 100 + 50);
        } else {
            callback();
        }
    };

    useEffect(() => {
        UIEventBus.on('enterMonitor', () => {
            setVisible(false);
        });
        UIEventBus.on('leftMonitor', () => {
            setVisible(true);
        });
    }, []);

    useEffect(() => {
        if (visible && nameText == '') {
            setTimeout(() => {
                typeText(0, '', NAME_TEXT, setNameText, () => {
                    typeText(0, '', TITLE_TEXT, setTitleText, () => {});
                });
            }, 400);
        }
        visRef.current = visible;
    }, [visible]);

    useEffect(() => {
        setVisible(visibleOverride);
    }, [visibleOverride]);

    return (
        <motion.div
            variants={vars}
            initial="hide"
            animate={visible ? 'visible' : 'hide'}
            style={styles.wrapper}
        >
            {nameText !== '' && (
                <div style={styles.container}>
                    <p>{nameText}</p>
                </div>
            )}
            {titleText !== '' && (
                <div style={styles.container}>
                    <p>{titleText}</p>
                </div>
            )}
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
            duration: 0.3,
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
