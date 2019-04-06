import React from 'react';

import CalcButton from '../components/CalcButton';
import { stat } from 'fs';

// 計算機 App

const op_cal = {
    '+': (org, previous, current) => previous + current,
    '-': (org, previous, current) => previous - current,
    'x': (org, previous, current) => (previous === 0 && org === true ? previous + 1 : previous) * (current === 0 && org === true ? current + 1 : current),
    '÷': (org, previous, current) => (previous === 0 && org === true ? previous + 1 : previous) / (current === 0 && org === true ? current + 1 : current),
};

class CalcApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            operator: '+',
            previous_number: 0,
            last_number: 0,
            number_reset: false,
            equal_flag: false,
            operator_flag: true,
            org: true
        };
        
    }
    resetState = () => this.setState({
        number: 0,
        operator: '+',
        previous_number: 0,
        last_number: 0,
        number_reset: false,
        equal_flag: false,
        operator_flag: true,
        org: true
    });

    handle_input = e => {
        this.setState(() => ({org: false}));
        if(this.state.number_reset === true){
            this.setState(() => ({
                number: 0,
                number_reset: false
            }));
        }
        if(this.state.equal_flag === true){
            this.resetState();
        }
        // 輸入數字
        if(e.className !== "calc-operator"){
            // 若超過7位數則無法輸入
            if(10 * this.state.number < 10000000){
                const value = parseInt(e.currentTarget.textContent);
                this.setState((state) => ({
                    number: 10*state.number + value,
                    last_number: 10*state.number + value
                }));
                if(this.state.operator_flag === false)
                    this.setState(() => ({operator_flag: true}));
            }
        }
        console.log(this.state.previous_number);
        console.log(this.state.last_number);
        console.log(this.state.number);
        console.log(this.state.org);
    }

    calculate = e => {
        if(this.state.equal_flag === true)
            this.setState(() => ({
                last_number: 0,
                equal_flag: false
            }));
        else
            this.setState(() => ({org: false}));

        const value = e.currentTarget.textContent;
        
        // 如果相鄰的輸入為兩個運算元
        if(this.state.operator_flag === true && this.state.equal_flag === false){
            this.setState((state) => ({
                previous_number: op_cal[state.operator](state.org, state.previous_number, state.last_number),
                number: op_cal[state.operator](state.org, state.previous_number,state.last_number),
                operator: value,
                number_reset: true
            }));
            this.setState(() => ({operator_flag: false}));
        }
        else
            this.setState(() => ({operator: value}));
        
        
        console.log(this.state.previous_number);
        console.log(this.state.last_number);
        console.log(this.state.number);
        console.log(this.state.org);
    }
    
    equal = () => {
        this.setState((state) => ({
            previous_number: op_cal[state.operator](state.org, state.previous_number, state.last_number),
            number: op_cal[state.operator](state.org, state.previous_number, state.last_number),
            number_reset: true,
            equal_flag: true,
        }))
        console.log(this.state.previous_number);
        console.log(this.state.last_number);
        console.log(this.state.number);
        console.log(this.state.org);
    }    

    showNotImplemented() {
        console.warn('This function is not implemented yet.');
    }

    render() {
        return (
        <div className="calc-app">
            <div className="calc-container">
                <div className="calc-output">
                    <div className="calc-display">{this.state.number}</div>
                </div>
                <div className="calc-row">
                    <CalcButton onClick={this.resetState}>AC</CalcButton>
                    <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
                    <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
                    <CalcButton className="calc-operator" onClick={this.calculate}>÷</CalcButton>
                </div>
                <div className="calc-row">
                    <CalcButton className="calc-number" onClick={this.handle_input}>7</CalcButton>
                    <CalcButton className="calc-number" onClick={this.handle_input}>8</CalcButton>
                    <CalcButton className="calc-number" onClick={this.handle_input}>9</CalcButton>
                    <CalcButton className="calc-operator" onClick={this.calculate}>x</CalcButton>
                </div>
                <div className="calc-row">
                    <CalcButton className="calc-number" onClick={this.handle_input}>4</CalcButton>
                    <CalcButton className="calc-number" onClick={this.handle_input}>5</CalcButton>
                    <CalcButton className="calc-number" onClick={this.handle_input}>6</CalcButton>
                    <CalcButton className="calc-operator" onClick={this.calculate}>-</CalcButton>
                </div>
                <div className="calc-row">
                    <CalcButton className="calc-number" onClick={this.handle_input}>1</CalcButton>
                    <CalcButton className="calc-number" onClick={this.handle_input}>2</CalcButton>
                    <CalcButton className="calc-number" onClick={this.handle_input}>3</CalcButton>
                    <CalcButton className="calc-operator" onClick={this.calculate}>+</CalcButton>
                </div>
                <div className="calc-row">
                    <CalcButton className="bigger-btn calc-number" onClick={this.handle_input}>0</CalcButton>
                    <CalcButton className="calc-number">.</CalcButton>
                    <CalcButton className="calc-operator" onClick={this.equal}>=</CalcButton>
                </div>
            </div>
        </div>
        );
    }
}

export default CalcApp;
