import React, { Component } from 'react';
import Button from "../components/Button"
import Input from "../components/Input"

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {count: 100};
    }
    handleInc = () => this.setState(state => ({count: state.count + 1}));
    handleDec = () => this.setState(state => ({count: state.count - 1}));

    setNumber = num => this.setState(() => ({ count: num }));
    handleInput = e => {
        if (e.key === "Enter") {
            const value = parseInt(e.target.value);
            if (value === 0 || value) this.setNumber(value);
            e.target.value = "";
            e.target.blur();
        }
    };

    render() {
        return(
            <div>
                <h1>{this.state.count}</h1>
                <span>
                    <Button text = "+" onClick = {this.handleInc}>+</Button>
                    <Button text = "-" onClick = {this.handleDec}>-</Button>
                    <Input onKeyPress={this.handleInput} />
                </span>
            </div>
        )
    }    
}

export default Counter;