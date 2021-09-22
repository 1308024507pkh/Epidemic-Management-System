import React, { Component } from 'react';
import { Radio } from 'antd';

class RiskLevel extends Component {
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
                <Radio value={"高风险"}>高风险</Radio>
                <Radio value={"风险"}>风险</Radio>
                <Radio value={"低风险"}>低风险</Radio>
                <Radio value={"安全"}>安全</Radio>
            </Radio.Group>
        );
    }
}

export default RiskLevel;