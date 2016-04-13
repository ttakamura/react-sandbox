import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { combineReducers, createStore } from 'redux';
// import { Provider, connect }         from 'react-redux';

let currentId = 0;
const nextId  = () => {
    currentId += 1;
    return currentId;
};

class App extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
};

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
};

render();
