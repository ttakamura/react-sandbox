require('./main.css');
import React    from 'react';
import ReactDOM from 'react-dom';

let currentId = 0;
const nextId  = () => {
    currentId += 1;
    return currentId
};

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
        const toggle  = task.done ? <span>[x]</span> : <span>[ ]</span>;

        if (editing) {
            return <li>
                <input type="text"
                 defaultValue={task.title}
                 onKeyPress={this.checkEnter} />
            </li>;
        }else{
            return <li>
                <div onClick={this.toggleTodo}>{toggle}</div>
                <div onClick={this.beginEdit}>{task.title}</div>
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
    toggleTodo = () => {
        this.props.toggleTodo(this.props.task);
    }
}

const TodoList = (props) => (
    <ul>
      {props.tasks.map(task => (
          <Todo task={task} key={task.id} onEdit={props.onEdit} toggleTodo={props.toggleTodo} />
      ))}
    </ul>
);

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks: [{
                id: nextId(),
                title: 'hello',
                done: false
            },{
                id: nextId(),
                title: 'world',
                done: false
            }]
        };
    }
    render () {
        return <div>
            <Header />
              <input type="button" onClick={this.addTask} value="Add Task" />
              <TodoList tasks={this.state.tasks} onEdit={this.onEdit} toggleTodo={this.toggleTodo} />
            </div>;
    }
    addTask = () => {
        this.setState({tasks: [
                ...this.state.tasks, {
                    id: nextId(),
                    title: 'new',
                    done: false
                }
        ]});
    }
    toggleTodo = (newTask) => {
        this.state.tasks.forEach((task) => {
            if (task.id == newTask.id) {
                task.done = !task.done;
            }
        });
        this.setState({tasks: this.state.tasks});
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
