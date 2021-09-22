import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import '../../asserts/css/UserSelect.css'

class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
        };
    }

    Info=()=>{
        this.props.Info();
    }

    Change=()=>{
        this.props.Change();
    }

    Comment=()=>{
        this.props.Comment();
    }

    Application=()=>{
        this.props.Application();
    }

    Back=()=>{
        this.setState({
            flag:0,
        })
    }

    render() {
        if(this.state.flag === 1){
            return (
                <div className = "UserSelect">
                    <div>
                        <button onClick = {this.Info.bind()}>用户信息</button>
                    </div>
                    <div>
                        <button onClick = {this.Change.bind()}>修改信息</button>
                    </div>
                    <div>
                        <button onClick = {this.Comment.bind()}>查看评论</button>
                    </div>
                    <div>
                        <button onClick = {this.Application.bind()}>申请进度</button>
                    </div>
                    <div>
                        <button onClick = {this.Back}>返回首页</button>
                    </div>
                </div>
            );
        }else if(this.state.flag === 0){
            return <Redirect to = {{pathname:'/'}} />
        }
        
    }
}

export default UserSelect;
