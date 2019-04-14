import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

export default class Select extends Component{
    render() {
        const button_name = ["A", "B", "C", "D", "E", "F"];
        const option = this.props.option;
        const lists = button_name.map((i, index) => (
            <button key = {index} className = "search_button">
                <NavLink to = {"/" + option + "/" + i}>{i}</NavLink>
            </button>
        ));
        return (
            <div className = "container">
                <h1>Select one to {option}</h1>
                <div className = "search_button_container">
                    {lists}
                </div>
            </div>
        )
    }
}