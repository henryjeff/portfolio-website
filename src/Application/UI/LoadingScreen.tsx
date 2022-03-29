import React, { useCallback, useEffect, useState } from 'react';
import eventBus from './EventBus';

type LoadingProps = {};

let resources = '';

const LoadingScreen: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [toLoad, setToLoad] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [overlayOpacity, setLoadingOverlayOpacity] = useState(1);
    const [loadingTextOpacity, setLoadingTextOpacity] = useState(1);
    const [startPopupOpacity, setStartPopupOpacity] = useState(0);

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
                setLoadingTextOpacity(0);
                setTimeout(() => {
                    setStartPopupOpacity(1);
                }, 500);
            }, 1500);
        }
    }, [progress]);

    const start = useCallback(() => {
        setLoadingOverlayOpacity(0);
        eventBus.dispatch('loadingScreenDone', {});
    }, []);

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
                transform: `scale(${overlayOpacity === 0 ? 1.1 : 1})`,
            })}
        >
            {startPopupOpacity === 0 && loadingTextOpacity === 0 && (
                <div style={styles.blinkingContainer}>
                    <span className="blinking-cursor" />
                </div>
            )}
            <div
                style={Object.assign({}, styles.overlayText, {
                    opacity: loadingTextOpacity,
                })}
            >
                <div style={styles.header}>
                    <div style={styles.logoContainer}>
                        <div>
                            <p style={styles.green}>
                                <i>
                                    <b>Heffernan,</b>{' '}
                                </i>
                            </p>
                            <p style={styles.green}>
                                <i>
                                    <b>Henry Inc.</b>
                                </i>
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
                            <b style={styles.green}>
                                'Henry Heffernan Portfolio Showcase'
                            </b>{' '}
                            V1.0
                        </p>
                    )}
                    <div style={styles.spacer} />
                    <span className="blinking-cursor" />
                </div>
                <div style={styles.footer}>
                    <p>
                        Press <b>DEL</b> to enter SETUP , <b>ESC</b> to skip
                        memory test
                    </p>
                    <p>{getCurrentDate()}</p>
                </div>
            </div>
            <div
                style={Object.assign({}, styles.popupContainer, {
                    opacity: startPopupOpacity,
                })}
            >
                <div style={styles.startPopup}>
                    <p>Henry Heffernan Portfolio Showcase 2022</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <p>Press start to begin{'\xa0'}</p>
                        <span className="blinking-cursor" />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '16px',
                        }}
                    >
                        <div className="bios-start-button" onClick={start}>
                            <p>START</p>
                        </div>
                    </div>
                </div>
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
    popupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blinkingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: 48,
    },
    startPopup: {
        backgroundColor: '#000',
        padding: 24,
        border: '7px solid #fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    headerInfo: {
        marginLeft: 64,
    },
    green: {
        // color: '#00ff00',
    },
    overlayText: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
