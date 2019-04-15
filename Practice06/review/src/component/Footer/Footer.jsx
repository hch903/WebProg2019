import React, {Component} from 'react';
import Radium from 'radium';
import githubIcon from '../../Static/github-brands.svg'

const appear = Radium.keyframes({
  '0%': {opacity: 0,},
  '100%': {opacity: 1},
}, 'pulse');

const styles = {
  main:{
    position: 'absolute',
    top: '480vh',
    height: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper:{
    height: 80,
    width: '80%',
  },
  h1:{
    animationName: appear,
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
  githubIcon: {
    width: 25,
  }
};

class Footer extends Component {
  render() {
    return (
      <div style={styles.main}>
        <div style={styles.wrapper}>
          <img style={styles.githubIcon} src={githubIcon} alt="github"/>
          <p>CREATED BY JAY CHOU</p>
          <p>©2019</p>
          <a href="#top">back to top</a>
        </div>
      </div>

    )
  }
}


export default Radium(Footer)
