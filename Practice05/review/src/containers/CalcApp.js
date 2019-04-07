import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,      
    };
    this.operator = "";
    this.valueBefore = 0;
    this.clickedOperator = false;
    this.lastOperator = false;
    // this.resetState = this.resetState.bind(this);
  }

  resetState = () => {
    this.setState({value: 0});
    this.operator =  "";
    this.valueBefore =  0;
    this.clickedOperator = false;
    this.resetNum = false;
    this.lastOperator = false;
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }
  clickNumber = e => {
    const num = parseInt(e.target.innerText);
    // if(this.clickedOperator){
    //   this.resetNum ? 
    //   this.setState({value: num}) : this.setState({value: this.state.value * 10 + num});
    // }
    // else{
    //   this.setState({value: this.state.value * 10 + num});
    // }
    this.resetNum ? 
    this.setState({value: num}) : this.setState({value: this.state.value * 10 + num});
    this.resetNum = false; 
    this.lastOperator = false;
  }
  clickOperator = e => {
    const op = e.target.innerText;
    if(this.lastOperator){
      // this.lastOperator = true;
      this.operator = op;
      return ;
    }
    if(this.clickedOperator){
      
      const res = this.calculate(this.operator,this.state.value);
      this.setState({value: res});
      this.valueBefore = res;
    }
    else{
      this.valueBefore = this.state.value;
    }

    this.operator = op;
    this.resetNum = true;
    this.clickedOperator = true;
    this.lastOperator = true;
    
  }
  clickEqual = () => {
    if(!this.clickedOperator){      
      return ;
    }
    if(this.lastOperator){
      return ;
    }
    const res = this.calculate(this.operator,this.state.value);
    this.setState({value: res});
    this.valueBefore = this.state.value;
    this.operator = "";
    this.clickedOperator = false;
    this.resetNum = true;
  }

  calculate = (op, val) => {
    let result = 0;
    if(op === "+"){
      result = this.valueBefore + val;
    }
    if(op === "-"){
      result = this.valueBefore - val;
    }
    if(op === "x"){
      result = this.valueBefore * val;
    }
    if(op === "÷"){
      result = this.valueBefore / val;
    }
    if(op === "="){
      this.clickEqual();
    }
    return(result)
  }
  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.value}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton onClick={this.clickOperator} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.clickNumber} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.clickNumber} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.clickNumber} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.clickOperator} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.clickNumber} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.clickNumber} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.clickNumber} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.clickOperator} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.clickNumber} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.clickNumber} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.clickNumber} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.clickOperator} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.clickNumber} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton onClick={this.clickEqual} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
