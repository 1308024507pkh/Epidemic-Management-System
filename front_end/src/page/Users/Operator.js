import React, { Component } from 'react';
import Title from './Title';

class Operator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Title></Title>
                <div className = "Operator">
                    该板块得等其他板块搞定再看需求
                </div>
            </div>
            
        );
    }
}

export default Operator;
