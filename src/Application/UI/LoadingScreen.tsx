import React, { useCallback, useEffect, useState } from 'react';
import eventBus from './EventBus';

type LoadingProps = {};

let resources = '';

const LoadingScreen: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [toLoad, setToLoad] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [overlayOpacity, setOverlayOpacity] = useState(1);

    const [showBiosInfo, setShowBiosInfo] = useState(false);
    const [showLoadingResources, setShowLoadingResources] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const [resources] = useState<string[]>([]);

    useEffect(() => {
        setShowBiosInfo(true);
    }, []);

    useEffect(() => {
        eventBus.on('loadedSource', (data) => {
            setProgress(data.progress);
            setToLoad(data.toLoad);
            setLoaded(data.loaded);
            resources.push(
                `Loaded ${data.sourceName}${getSpace(
                    data.sourceName
                )} ... ${Math.round(data.progress * 100)}%`
            );
        });
    }, []);

    useEffect(() => {
        setShowLoadingResources(true);
        setCounter(counter + 1);
    }, [loaded]);

    useEffect(() => {
        if (progress >= 1) {
            setDoneLoading(true);
            setTimeout(() => {
                setOverlayOpacity(0);
                eventBus.dispatch('loadingScreenDone', {});
            }, 1500);
        }
    }, [progress]);

    const getSpace = (sourceName: string) => {
        let spaces = '';
        for (let i = 0; i < 24 - sourceName.length; i++) spaces += '\xa0';
        return spaces;
    };

    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        // add leading zero
        const monthFormatted = month < 10 ? `0${month}` : month;
        const dayFormatted = day < 10 ? `0${day}` : day;
        return `${monthFormatted}/${dayFormatted}/${year}`;
    };

    return (
        <div
            style={Object.assign({}, styles.overlay, {
                opacity: overlayOpacity,
                transform: `scale(${overlayOpacity === 0 ? 1.02 : 1})`,
            })}
        >
            <div style={styles.header}>
                <div style={styles.logoContainer}>
                    <div>
                        <p>
                            <b>Heffernan,</b>{' '}
                        </p>
                        <p>
                            <b>Henry Inc.</b>
                        </p>
                    </div>
                </div>
                <div style={styles.headerInfo}>
                    <p>Released: 01/13/2000</p>
                    <p>HHBIOS (C)2000 Heffernan Henry Inc.,</p>
                </div>
            </div>
            <div style={styles.body}>
                <p>HSP S13 2000-2022 Special UC131S</p>
                <div style={styles.spacer} />
                {showBiosInfo && (
                    <>
                        <p>HSP Showcase(tm) XX 113</p>
                        <p>Checking RAM : {14000} OK</p>
                        <div style={styles.spacer} />
                        <div style={styles.spacer} />
                        {showLoadingResources ? (
                            progress == 1 ? (
                                <p>FINISHED LOADING RESOURCES</p>
                            ) : (
                                <p className="loading">
                                    LOADING RESOURCES ({loaded}/
                                    {toLoad === 0 ? '-' : toLoad})
                                </p>
                            )
                        ) : (
                            <p className="loading">WAIT</p>
                        )}
                    </>
                )}
                <div style={styles.spacer} />
                <div style={styles.resourcesLoadingList}>
                    {resources.map((sourceName) => (
                        <p key={sourceName}>{sourceName}</p>
                    ))}
                </div>
                <div style={styles.spacer} />
                {showLoadingResources && doneLoading && (
                    <p>
                        All Content Loaded, launching{' '}
                        <b style={styles.red}>
                            'Henry Heffernan Portfolio Showcase'
                        </b>{' '}
                        V1.0
                    </p>
                )}
                <div style={styles.spacer} />
            </div>
            <div style={styles.footer}>
                <p>
                    Press <b>DEL</b> to enter SETUP , <b>ESC</b> to skip memory
                    test
                </p>
                <p>{getCurrentDate()}</p>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'opacity 0.2s, transform 0.2s',
        MozTransition: 'opacity 0.2s, transform 0.2s',
        WebkitTransition: 'opacity 0.2s, transform 0.2s',
        OTransition: 'opacity 0.2s, transform 0.2s',
        msTransition: 'opacity 0.2s, transform 0.2s',

        transitionTimingFunction: 'ease-in-out',
        MozTransitionTimingFunction: 'ease-in-out',
        WebkitTransitionTimingFunction: 'ease-in-out',
        OTransitionTimingFunction: 'ease-in-out',
        msTransitionTimingFunction: 'ease-in-out',

        boxSizing: 'border-box',
        fontSize: 16,
        letterSpacing: 0.8,
    },

    spacer: {
        height: 16,
    },
    header: {
        width: '100%',
        boxSizing: 'border-box',
        padding: 48,
        display: 'flex',
        flexDirection: 'row',
    },
    headerInfo: {
        marginLeft: 64,
    },
    red: {
        color: 'lightGreen',
    },
    body: {
        flex: 1,
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        flexDirection: 'column',
        paddingLeft: 48,
        paddingRight: 48,
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    resourcesLoadingList: {
        display: 'flex',
        paddingLeft: 32,
        paddingBottom: 32,
        flexDirection: 'column',
    },
    logoImage: {
        width: 64,
        height: 42,
        imageRendering: 'pixelated',
        marginRight: 16,
    },
    footer: {
        padding: 48,
        paddingBottom: 64,
        boxSizing: 'border-box',
        width: '100%',
    },
};

export default LoadingScreen;
