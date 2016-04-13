import React    from 'react';
import ReactDOM from 'react-dom';

let currentId = 0;
const nextId  = () => {
    currentId += 1;
    return currentId;
};

class CounterDisplay extends React.Component {
    render () {
        return (
            <h1><center>
                {this.props.number}
              </center></h1>
        );
    }
}

class IncrementButton extends React.Component {
    render () {
        return (
            <input type="button"
                   onClick={this.props.onClick}
                   value="増やす" />
        );
    }
}

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
              <IncrementButton onClick={() => this.increment()} />
            </div>
        );
    }
    increment() {
        this.state.number += 1;
        this.setState(this.state);
    }
};

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
};

render();
