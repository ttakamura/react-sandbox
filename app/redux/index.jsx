import { combineReducers, createStore } from 'redux';

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

// reducers -----------------------------------------------------
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
    default:
        return state;
    }
};

const todoAppReducer = combineReducers({
    tasks: tasksReducer
});

// store ---------------------------------------------------------
let store = createStore(todoAppReducer);

// main ----------------------------------------------------------
window.setupSimpleReduxApp = () => {

    let unsubscribe = store.subscribe(() => {
        console.log(store.getState());
    });

    store.dispatch(addTask('hello'));
    store.dispatch(addTask('world'));
    unsubscribe();

    // ReactDOM.render(<App />, document.getElementById('app'));
};
