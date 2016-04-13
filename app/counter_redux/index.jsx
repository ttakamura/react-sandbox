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
            <div>
              <h1>React Counter App</h1>
              <hr />
              <CounterDisplay />
              <IncrementButton />
              <hr />
              <Graph />
            </div>
        );
    }
}

class Graph extends React.Component {
    render () {
        const number = store.getState().number;
        const style = {
            backgroundColor: 'blue',
            height: '100px',
            width: number
        };
        return (
            <div style={style}></div>
        );
    }
}

class CounterDisplay extends React.Component {
    render () {
        const number = store.getState().number;
        return (
            <h1>
              <center>
                {number}
              </center>
            </h1>
        );
    }
}

class IncrementButton extends React.Component {
    render () {
        const delta = store.getState().delta;
        return (
            <div>
            <input type="button"
                   onClick={() => store.dispatch(incrementAction(delta))}
                   value={`${delta} 増やす`} />
            <input type="range"
                   min="1"
                   max="10"
                   onClick={(e) => store.dispatch(changeDelta(e.target.value))} />
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
};


// Redux --------------------------------------------------
const clone = (value) => {
    return JSON.parse(JSON.stringify(value));
};

const changeDelta = (delta) => {
    return {
        type: 'CHANGE_DELTA',
        delta: parseInt(delta)
    };
};

const incrementAction = (delta) => {
    return {
        type: 'INCR_NUMBER',
        delta: delta
    };
};

const initialiState = {
    number: 0,
    delta: 1
};

const appReducer = (state=initialiState, action) => {
    let newState = clone(state);

    switch (action.type) {
    case 'INCR_NUMBER':
        newState.number = state.number + action.delta;
        return newState;
    case 'CHANGE_DELTA':
        newState.delta = action.delta;
        return newState;
    default:
        return state;
    }
};

let store = createStore(appReducer);

store.subscribe(render);
store.subscribe(() => console.log(store.getState()));

// store.dispatch(incrementAction(1));
// store.dispatch(incrementAction(1));

render();
