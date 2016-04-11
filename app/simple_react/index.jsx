require('./main.css');
import React    from 'react';
import ReactDOM from 'react-dom';

let currentId = 0
const nextId  = () => {
    currentId += 1
    return currentId
}

class Header extends React.Component {
    render () {
        return <h1>
            Hello React
        </h1>;
    }
}

const TodoList = (props) => (
    <ul>
      {props.tasks.map((task) => (
        <li key={task.id}>
          {task.title}
        </li>
      ))}
    </ul>
);

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks: [{
                id: nextId(),
                title: 'hello'
            },{
                id: nextId(),
                title: 'world'
            }]
        };
    }
    render () {
        return <div>
            <Header />
            <TodoList tasks={this.state.tasks} />
            </div>;
    }
}

window.setupSimpleReactApp = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
}
