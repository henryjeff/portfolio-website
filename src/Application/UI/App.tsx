import React from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import './style.css';

const App = () => (
    <div id="ui-app">
        <LoadingScreen />
    </div>
);

const createUI = () => {
    ReactDOM.render(<App />, document.getElementById('ui'));
};

export default createUI;
