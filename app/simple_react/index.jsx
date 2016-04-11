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

class Todo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {editing: false};
    }
    render () {
        const task    = this.props.task;
        const editing = this.state.editing;
        if (editing) {
            return <li>
                <input type="text"
                 defaultValue={task.title}
                 onKeyPress={this.checkEnter} />
            </li>;
        }else{
            return <li onClick={this.beginEdit}>
                {task.title}
            </li>;
        }
    }
    checkEnter = (e) => {
        if(e.key === 'Enter') {
            this.props.onEdit({...this.props.task, title: e.target.value});
            this.setState({editing: false});
        }
    }
    beginEdit = () => {
        this.setState({editing: true});
    }
}

const TodoList = (props) => (
    <ul>
      {props.tasks.map(task => (
          <Todo task={task} key={task.id} onEdit={props.onEdit} />
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
              <input type="button" onClick={this.addTask} value="Add Task" />
              <TodoList tasks={this.state.tasks} onEdit={this.onEdit} />
            </div>;
    }
    addTask = () => {
        this.setState({tasks: [
                ...this.state.tasks, {
                    id: nextId(),
                    title: 'new'
                }
        ]});
    }
    onEdit = (newTask) => {
        this.setState({tasks: this.state.tasks.map((task) => {
            if (task.id == newTask.id) {
                return newTask;
            }else{
                return task;
            }
        })});
    }
}

window.setupSimpleReactApp = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
}
