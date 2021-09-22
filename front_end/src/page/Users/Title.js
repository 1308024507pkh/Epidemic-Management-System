import React, { Component } from 'react';
import '../../asserts/css/Header.css';
import ZjuLogo from '../../asserts/image/timgXFIKOJKO.png';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <body className = "Header">
                <img src = {ZjuLogo}></img>
            </body>
        );
    }
}

export default Title;
