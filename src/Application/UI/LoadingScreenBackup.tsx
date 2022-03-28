import React, { useEffect, useState } from 'react';
import eventBus from './EventBus';

type LoadingProps = {};

const LoadingScreen: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [currentSource, setCurrentSource] = useState('');
    const [overlayOpacity, setOverlayOpacity] = useState(1);

    useEffect(() => {
        eventBus.on('loadedSource', (data) => {
            setProgress(data.progress);
            setCurrentSource(data.sourceName);
        });
    }, []);

    useEffect(() => {
        if (progress >= 1) {
            setOverlayOpacity(0);
        }
    }, [progress]);

    return (
        <div
            style={Object.assign({}, styles.overlay, {
                opacity: overlayOpacity,
            })}
        >
            <div style={styles.loadingContainer}>
                <div>{progress}</div>
                <div
                    style={Object.assign({}, styles.loadingBar, {
                        transform: `scaleX(${progress * 100}%)`,
                    })}
                ></div>
                <p className="loading" style={styles.loadingText}>
                    Loading
                </p>
                <p>
                    {progress * 100}%, {currentSource}
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    overlay: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 1s',
    },
    loadingContainer: {
        display: 'flex',
        width: 300,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    loadingBar: {
        backgroundColor: 'white',
        width: '100%',
        height: 10,
        margin: '0 auto',
        transformOrigin: 'left',
        transition: 'transform 0.5s',
    },
    loadingText: {
        marginTop: 8,
        marginBottom: 4,
        fontWeight: 'bold',
        fontSize: 18,
    },
};

export default LoadingScreen;
