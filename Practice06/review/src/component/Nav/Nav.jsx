import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import Radium from 'radium'
import './Nav.css'
import logo from './Blog-Logo.svg'

// const styles = {
//   nav {
//     position: fixed,
//     width: 100%,
//     margin: 10px,
//     z-index: 5,
//     cursor: pointer,
//     animation-name: appear,
//     animation-duration: 1s,
//     animation-fill-mode: forwards,
//   }
  
//   @keyframes appear{
//     from{
//         opacity: 0,
//         /* top: 10px, */
//     }to{
//         opacity: 1,
//         /* top: 0px, */
//     }
//   }
  
  
  
//   /* main */
  
//   #logo {
//     display: inline-block,
//     height: 80px,
//     width: 80px,
//     background-size: contain,
//     background-position: center,
//     margin-left: 10px,
//   }
//   /* ul */
//   ul {
//     position: absolute,
//     top: 15%,
//     display: inline-block,
//     right: 5%,
//     list-style-type: none,
//     display: flex,
//     font-size: 16px,
//   }
  
  
  
//   .link {
//     text-decoration: none,
//     color: black,
//     padding: 3px 1.2vw,
//     position: relative,
//     transition: 0.2s all linear,
//   }
  
//   '.link::after '{
//     height: '100%',
//     content: "",
//     position: 'absolute',
//     right: '0.7rem',
//     bottom: 0,
//     left: '0.7rem',
//     borderBottom: '1px solid black',
//     transform: scaleX(0),
//     transition: transform 0.3s cubic-bezier(0.4, 0, 0, 1),
//     transform-origin: 'center right',
//     zIndex: 3,
//   }
  
//   .link:hover::after {
//     transform: scaleX(1),
//     transformOrigin: 'center left',
//     zIndex: 3,
//   }
  
  
// }
 

class Nav extends Component {
  render(){
    return(
      <nav >
        <NavLink to ="/"><img src={logo} id="logo" alt="Blog-Logo"/></NavLink>
        <ul>
          <li><NavLink to ="/list" className="link">文章列表</NavLink></li>
          <li><NavLink to ="/collection" className="link">作品集</NavLink></li>
          <li><NavLink to ="/about" className="link">關於我</NavLink></li>
        </ul>
      </nav>
    )
  }
}

  
export default Radium(Nav)
