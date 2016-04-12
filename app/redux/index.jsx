import React                        from 'react';
import ReactDOM                     from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider, connect }            from 'react-redux';

let currentId = 0;
const nextId  = () => {
    currentId += 1;
    return currentId;
};

// actions ------------------------------------------------------
const addTask = (title) => {
    return {
        type: 'ADD_TASK',
        id: nextId(),
        title
    };
};

const enterEdit = (id) => {
    return {
        type: 'EDIT_TASK',
        id: id
    };
}

const finishEdit = (id) => {
    return {
        type: 'FINISH_EDIT_TASK',
        id: id
    };
}

// reducers -----------------------------------------------------
const taskReducer = (state, action) => {
    switch (action.type) {
    case 'EDIT_TASK':
        const flag = !state.editing;
        return {
                ...state,
            editing: flag
        };
    default:
        return state;
    }
};

const tasksReducer = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TASK':
        const newTask = {
            id: action.id,
            title: action.title,
            editing: false,
            done: false
        };
        return [...state, newTask];
    case 'EDIT_TASK', 'FINISH_EDIT_TASK':
        return state.map(task => {
            if (action.id === task.id) {
                return taskReducer(task, action)
            }else{
                return task;
            }
        });
    default:
        return state;
    }
};

const todoAppReducer = combineReducers({
    tasks: tasksReducer
});

// components ----------------------------------------------------
const AddTodoButton = ({ onClick }) => {
    return (
        <input type="button" onClick={onClick} value="Add Task" />
    );
};

const TodoView = ({ task, onEdit, onKeyPress, toggleTodo }) => {
    if (task.editing) {
        return (
            <li id="todo-{task.id}">
              <input type="text"
                     defaultValue={task.title}
                     onKeyPress={(e) => onKeyPress(task.id, e)} />
            </li>
        );
    }else{
        return (
            <li id="todo-{task.id}">
              <div onClick={() => toggleTodo(task.id)}>[ ]</div>
              <div onClick={() => onEdit(task.id)}>{task.title}</div>
            </li>
        );
    }
};

const TodoListView = ({ tasks }) => {
    return (
        <ul>
          {tasks.map(task => (
              <Todo key={task.id}
                    task={task} />
          ))}
        </ul>
    );
};

const App = () => {
    return (
        <div>
          <AddTodo />
          <TodoList />
        </div>
    );
};

// containers ----------------------------------------------------
const AddTodo = connect(
    null,
    (dispatch) => {
        return {
            onClick: () => {
                dispatch(addTask('new task'));
            }
        };
    }
)(AddTodoButton);

const Todo = connect(
    null,
    (dispatch) => {
        return {
            onEdit: (id) => {
                dispatch(enterEdit(id));
            },
            onKeyPress: (id, e) => {
                if(e.key === 'Enter') {
                    dispatch(finishEdit(id));
                }
            },
            toggleTodo: (id) => {
                console.log("toggleTodo");
            }
        };
    }
)(TodoView);

const TodoList = connect(
    (state) => {
        return {
            tasks: state.tasks
        };
    },
    null
)(TodoListView);

// main ----------------------------------------------------------
window.setupSimpleReduxApp = () => {

    let store = createStore(todoAppReducer);

    let unsubscribe = store.subscribe(() => {
        console.log(store.getState());
    });
    store.dispatch(addTask('hello'));
    store.dispatch(addTask('world'));
    unsubscribe();

    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('app')
    );
};
