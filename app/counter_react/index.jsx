import React    from 'react';
import ReactDOM from 'react-dom';

let currentId = 0;
const nextId  = () => {
    currentId += 1;
    return currentId;
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number: 0};
    }
    render() {
        return (
            <div>
              <h1>React Counter App</h1>
              <hr />
              <CounterDisplay number={this.state.number} />
              <IncrementButton onClick={this.increment} />
              <hr />
              <Graph number={this.state.number} />
            </div>
        );
    }
    increment = (delta) => {
        this.state.number += delta;
        this.setState(this.state);
    }
}

class Graph extends React.Component {
    render () {
        const style = {
            backgroundColor: 'blue',
            height: '100px',
            width: this.props.number
        };
        return (
            <div style={style}></div>
        );
    }
}

class CounterDisplay extends React.Component {
    render () {
        return (
            <h1>
              <center>
                {this.props.number}
              </center>
            </h1>
        );
    }
}

class IncrementButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {delta: 1};
    }
    render () {
        return (
            <div>
            <input type="button"
                   onClick={() => this.props.onClick(this.state.delta)}
                   value={`${this.state.delta} 増やす`} />
            <input type="range"
                   min="1"
                   max="10"
                   onClick={this.changeDelta} />
            </div>
        );
    }
    changeDelta = (e) => {
        this.state.delta = parseInt(e.target.value);
        this.setState(this.state);
    }
}

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
};

render();
