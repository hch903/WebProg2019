import React, {Component} from 'react';
import MainFullStack from './MainFullStack/MainFullStack';

import logo from '../../Static/logo.svg';
import './Main.css';
import './MainHover.css'

const setTimeClass =  {
  "arrowLeft": "arrowHover",
  "hr": "hrHover",
  "hrturn": "hrturnHover",
  "arrowRight": "arrowHover",
}



class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: false
    }
  }

  componentDidMount(){
    this.node.scrollIntoView();
    setTimeout(() => {
      this.setState({
        active: true
      })
    },3000)
  }

  render() {
    const {active} = this.state
    return (
      <div className="main">
        <div ref={node => this.node = node} />
        <div className="homepage">
          <header>
            <h1 className ={`name ${ active && 'nameHover'}`}
            >周杰</h1>
            {Object.keys(setTimeClass).map((val,index) =>
              <hr
                className ={`${val} ${ active && setTimeClass[val]}`}
                key={val[index]}
              />
            )}
              <img src={logo} className ={`Timing-logo ${active && 'timingLogoHover'}`} alt="Timing-logo"/>
            <a className ={`click ${active && 'clickHover'}`} href="#mainFullStack">click</a>
          </header>
        </div>
        <div className='seperate' />
        <MainFullStack />
        <section></section>
        <section></section>
      </div>
    )
  }
}



export default Main
