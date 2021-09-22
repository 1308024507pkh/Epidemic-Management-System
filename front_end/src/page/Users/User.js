import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import '../../asserts/css/User.css'
import Title from './Title';
import UserSelect from './UserSelect';
import {backendUrl, setCookie} from "./Common";
import cookie from 'react-cookies'
import { Button } from 'antd';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
            username:"",
            phone:"",
            email:"",
            real_name:"",
        };
        this.Info = this.Info.bind(this);
        this.Change = this.Change.bind(this);
        this.Comment = this.Comment.bind(this);
        this.Application = this.Application.bind(this);
    }

    componentDidMount(){

        fetch(backendUrl+"user/profile/",{
            method:"get",
            mode:"cors",
            credentials:"include",
            headers:{
                'sessionid':cookie.loadAll().sessionid,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                console.log(result.groups[0]);
                if(result.groups[0] === "superAdmin"){
                    this.setState({
                        flag:6,
                    })
                }
            },
            (error)=>{
                console.log(error);
            })


        fetch(backendUrl+"user/profile/",{
            method:"get",
            mode:"cors",
            credentials:"include",
            headers:{
                'sessionid':cookie.loadAll().sessionid,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                console.log(result);
                this.setState({
                    username:result.username,
                    phone:result.phone,
                    email:result.email,
                    real_name:result.real_name,
                })
            },
            (error)=>{
                console.log(error);
            })
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
        this.setState({
            flag:3,
        })
    }

    Application=()=>{
        this.setState({
            flag:4,
        })
    }

    Out=()=>{

        fetch(backendUrl+"user/logout/",{
                method:"get",
                credentials: 'include',
                headers:{
                    'sessionid':cookie.loadAll().sessionid,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    if(result.isSuccess){
                        alert("登出成功!");
                        cookie.remove('sessionid');
                        this.setState({
                            flag:0,
                        })
                    }else{
                        alert("登出失败!");
                    }
                },
            (error)=>{
                console.log(error);
            })
    }

    render() {
        if(this.state.flag === 1){
            return (
                <div>
                    <div className = "User">
                        <div id = "UserName">
                            {this.state.username}
                        </div>
                        <div id = "Info">
                            <a>
                                <text>电话</text>
                                <text>{this.state.phone}</text>
                            </a>
                            <a>
                                <text>邮箱</text>
                                <text>{this.state.email}</text>
                            </a>
                            <a>
                                <text>真实姓名</text>
                                <text>{this.state.real_name}</text>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }else if(this.state.flag === 3){
            return <Redirect to = {{pathname:'/User/Comment'}} />
        }else if(this.state.flag === 2){
            return <Redirect to = {{pathname:'/User/Change'}} />
        }else if(this.state.flag === 4){
            return <Redirect to = {{pathname:'/User/Application'}} />
        }else if(this.state.flag === 0){
            return <Redirect to = {{pathname:'/ESS/situation'}} />
        }else if(this.state.flag === 6){
            return <Redirect to = {{pathname:'/SuperOperator'}} />
        }
    }
}

export default User;
