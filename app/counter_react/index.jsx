import React    from 'react';
import ReactDOM from 'react-dom';

let currentId = 0;
const nextId  = () => {
    currentId += 1;
    return currentId
};

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
};
