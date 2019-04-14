import React, { Component } from "react";
import Select from './Select';

export default class SelectRender extends Component {
    render() {
        const option_name = ["search", "insert"];
        const { option } = this.props.match.params;
        return option && option_name.includes(option) ? (
            <Select option = {option} />
        ) : (
            <div>
                <h3>ERROR! No {option} function!</h3>
            </div>
        );
    }
}