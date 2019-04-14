import React, {Component} from 'react';
import Insert_result from "../components/Insert_result";

export default class Insert extends Component {
    render() {
        const button_name = ["A", "B", "C", "D", "E", "F"];
        const { name } = this.props.match.params;
        return name && button_name.includes(name) ? (
            <Insert_result name = {name} />
        ) : (
            <div>
                <h3>ERROR! {name} NOT FOUND!</h3>
            </div>
        );
    }
}