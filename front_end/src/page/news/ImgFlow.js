import React, { Component, Children } from 'react'

export default class SildeShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            current: 0
        }
    }
    
    componentDidMount() {
        const { children } = this.props
        this.setState({
            total: Children.count(children)
        });
        //定时轮播
        this.interval = setInterval(this.showNext,5000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    showNext = () => {
        const {total,current}=this.state
        this.setState({
            current:current+1===total?0:current+1
        })
    }
    render() {
        const { children } = this.props;
        return (
            <div>
                {Children.toArray(children)[this.state.current]}
            </div>
        )
    }
}

