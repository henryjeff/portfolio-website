import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './LoadingScreen';
import './style.css';
import eventBus from './EventBus';

const App = () => (
    <div id="ui-app">
        <LoadingScreen />
    </div>
);

const createUI = () => {
    ReactDOM.render(<App />, document.getElementById('ui'));
};

export default createUI;
