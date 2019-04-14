import React, { Component } from "react";
import Search_result from '../components/Search_result'

export default class SearchRender extends Component {
    render() {
        const button_name = ["A", "B", "C", "D", "E", "F"];
        const { name } = this.props.match.params;
        return name && button_name.includes(name) ? (
            <Search_result name = {name} />
        ) : (
            <div>
                <h3>ERROR! {name} NOT FOUND!</h3>
            </div>
        );
    }
}