import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counter from './containers/Counter';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// class Button extends React.Component {
//     render() {
//         return <button onClick = {this.props.onClick}>{this.props.text}</button>
//     }
// }
// class Counter extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {count: 100};
//     }
//     handleInc = () => this.setState(state => ({count: state.count + 1}));
//     handleDec = () => this.setState(state => ({count: state.count - 1}));

//     render() {
//         return(
//             <div>
//                 <h1>{this.state.count}</h1>
//                 <span>
//                     <Button text = "+" onClick = {this.handleInc}>+</Button>
//                     <Button text = "-" onClick = {this.handleDec}>-</Button>
//                 </span>
//             </div>
//         )
//     }    
// }

ReactDOM.render(<Counter />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
