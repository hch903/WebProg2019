import React, {Component} from 'react';
import Radium from 'radium'

const appear = Radium.keyframes({
  '0%': {opacity: 0,},
  '100%': {opacity: 1},
}, 'pulse');

const styles = {
  main:{
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1:{
    animationName: appear,
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
};


class Collection extends Component {


  componentDidMount(){
    this.node.scrollIntoView();
  }

  render() { 
    return (
      <>
        <div ref={node => this.node = node} />
        <div style={styles.main}>
          <h1 style={styles.h1}>這邊大guy會放一些作品 </h1>
        </div>
      </>
    )
  }
}


export default Radium(Collection)
