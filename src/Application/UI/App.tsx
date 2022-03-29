import React from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './LoadingScreen';
import './style.css';

const App = () => (
    <div id="ui-app">
        {/* <ClickToStart /> */}
        <LoadingScreen />
        {/* <button>HEllo</button> */}
    </div>
);

const createUI = () => {
    ReactDOM.render(<App />, document.getElementById('ui'));
};

export default createUI;
