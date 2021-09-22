import React, { Component } from 'react';
import { Radio } from 'antd';

class Type extends Component {
    state = {
        value: 0,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        },
            () => this.props.onChange(this.state.value));
    };

    render() {
        return (
            <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={"1"}>航班</Radio>
                <Radio value={"0"}>列车</Radio>
            </Radio.Group>
        );
    }
}

export default Type;