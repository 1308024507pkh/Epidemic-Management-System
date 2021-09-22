import React, { Component } from 'react';
import Title from './Title';
import { Redirect } from 'react-router-dom';
import UserSelect from './UserSelect';
import '../../asserts/css/Comment.css'


class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:3,
        };
        this.Info = this.Info.bind(this);
        this.Change = this.Change.bind(this);
        this.Comment = this.Comment.bind(this);
        this.Application = this.Application.bind(this);
    }

    Info=()=>{
        this.setState({
            flag:1,
        })
    }

    Change=()=>{
        this.setState({
            flag:2,
        })
    }

    Comment=()=>{
        
    }

    Application=()=>{
        this.setState({
            flag:4,
        })
    }

    render() {
        if(this.state.flag === 3){
            return (
                <div>
                    <div className = "Comment">
                        123
                    </div>
                </div>
            );
        }else if(this.state.flag === 1){
            return <Redirect to = {{pathname:'/User'}} />
        }else if(this.state.flag === 2){
            return <Redirect to = {{pathname:'/User/Change'}} />
        }else if(this.state.flag === 4){
            return <Redirect to = {{pathname:'/User/Application'}} />
        }
        
    }
}

export default Comment;
