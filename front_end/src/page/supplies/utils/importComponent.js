import React,{Component, useEffect} from 'react';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component{
        constructor(props){
            super(props);
            this.state = {
                component: null
            };
        }
        componentDidMount() {
            importComponent().then((mode) => {
                this.setState({
                    component: mode.default ? mode.default : mode
                });
            });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props}/> : null
        }
    }
    return AsyncComponent;
}
