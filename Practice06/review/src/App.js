import React, { Component } from 'react';
import Main from './component/Main/Main';
import Nav from './component/Nav/Nav';
import About from './component/About/About';
import Collection from './component/Collection/Collection';
import List from './component/List/List';
import Footer from './component/Footer/Footer';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tab:false
    }
  }

  componentDidMount() {
      setTimeout(() => {
        this.setState({
          tab:true
        })
      },2000)
  }

  render() {
    const {tab} =this.state
    return (
      <div>
        <BrowserRouter>
          {tab && <Nav />}
          <Switch>
            <Route exact path ="/" component={Main} />
            <Route exact path ="/about" component={About} />
            <Route exact path ="/collection" component={Collection} />
            <Route exact path ="/list" component={List} />
            <Route path ="/list/:id" component={List} />
          </Switch>
          {tab && <Footer />}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
