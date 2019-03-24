import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Title Block
class Title extends Component {
    render() {
      return (
        <h1><center>Pierre's Blog</center></h1>
      );
    }
}

// Content Block
class FirstRow extends Component {
    render() {
      return (
        // publish time block
        <div id="row">
            <h5>Blog Post Title</h5>
            <p class="article_pub-date"> Published 
                <time>{this.props.time}</time>
            </p>
        </div>
      );
    }
}

class SecondRow extends Component {
    render() {
      return (
        <div class="row">
          <div id="large-12 columns"></div>
          <div id='line1'></div>
          <div id='line2'></div>
          <div id='line3'></div>
          <div id='line4'></div>
        </div>
      );
    }
}

class Picture extends Component {
    render() {
      return (
        <img class="float-left" src={this.props.imgurl} />
      );
    }
}

class Line extends Component {
    render() {
      return (
        <p>{this.props.description}</p>
      );
    }
}


// Title
ReactDOM.render(<Title />, document.getElementById('root'));

// Content
//// Row-1
const element1 = <FirstRow time=" March 24, 2019" />;
ReactDOM.render(element1, document.getElementById('main-content1'));
//// Row-2
ReactDOM.render(<SecondRow />, document.getElementById('main-content2'));
//// picture
const pic = <Picture imgurl="img/image.png" line='Bacon ipsum dolor sit amet nulla'/>;
ReactDOM.render(pic, document.getElementById('large-12 columns'));
//// lines
const line1 = <Line description="Hi my name is Pierre." />;
const line2 = <Line description="This is my Practice03 in the class (web programming)" />;
const line3 = <Line description="This homework focus on the implementation of react.js" />;
const line4 = <Line description="The template was downloaded from https://github.com/SteveMcArthur/simple-blog." />;
ReactDOM.render(line1, document.getElementById('line1'));
ReactDOM.render(line2, document.getElementById('line2'));
ReactDOM.render(line3, document.getElementById('line3'));
ReactDOM.render(line4, document.getElementById('line4'));


// ReactDOM.render(<Title />, document.getElementById('main-content'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
