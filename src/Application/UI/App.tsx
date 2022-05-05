import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import HelpPrompt from './components/HelpPrompt';
import InfoOverlay from './components/InfoOverlay';
import VolumeInterface from './components/VolumeInterface';
import eventBus from './EventBus';
import './style.css';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [helpVisible, setHelpVisible] = useState(true);

    useEffect(() => {
        eventBus.on('loadingScreenDone', () => {
            setLoading(false);
        });
    }, []);

    return (
        <div id="ui-app">
            {!loading && (
                <HelpPrompt onVisibleChange={(vis) => setHelpVisible(vis)} />
            )}
            {!loading && <InfoOverlay visibleOverride={!helpVisible} />}
            <LoadingScreen />
        </div>
    );
};

const createUI = () => {
    ReactDOM.render(<App />, document.getElementById('ui'));
};

const createVolumeUI = () => {
    ReactDOM.render(
        <VolumeInterface />,
        document.getElementById('volume-controls')
    );
};

export { createUI, createVolumeUI };
