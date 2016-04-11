require('./main.css');

import React    from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
    render () {
        return <h1>Hello React</h1>;
    }
}

const App = () => (
    <div>
        <Header />
    </div>
);

window.setupSimpleReactApp = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
}
