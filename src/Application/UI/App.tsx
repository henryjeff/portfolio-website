import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import HelpPrompt from './components/HelpPrompt';
import eventBus from './EventBus';
import './style.css';

const App = () => {
    const [loading, setLoading] = useState(true);

    eventBus.on('loadingScreenDone', () => {
        setLoading(false);
    });

    return (
        <div id="ui-app">
            {!loading && <HelpPrompt />}
            <LoadingScreen />
        </div>
    );
};

const createUI = () => {
    ReactDOM.render(<App />, document.getElementById('ui'));
};

export default createUI;
