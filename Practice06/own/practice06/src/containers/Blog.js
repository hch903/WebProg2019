import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import SelectRender from "./SelectRender";
import SearchRender from "./SearchRender";
import InsertRender from "./InsertRender";

export default class Blog extends Component {
    render() {
        return (
            <>
                <nav className = 'button_container'>
                    <ul>
                        <li className = "home">
                            <a><NavLink to = "/home">Home</NavLink></a>
                        </li>
                        <li className = "insert">
                            <a><NavLink to = "/insert">Insert</NavLink></a>
                        </li>
                        <li className = "search">
                            <a><NavLink to = "/search">Search</NavLink></a>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Redirect path = "/home" to = "/" />
                    <Route exact path = "/" component = {Home}/>
                    <Route exact path = "/:option?" component = {SelectRender}/>
                    <Route path = "/search/:name?" component = {SearchRender}/>
                    <Route path = "/insert/:name?" component = {InsertRender}/>
                </Switch>
            </>
        )
    }
}