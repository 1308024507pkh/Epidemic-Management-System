import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import '../../asserts/css/App.css';
import '../../asserts/css/Logo.css';
import '../../asserts/css/Info.css';
import Title from './Title';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'
import Body from './Body';
import { Button, Form,Input, Checkbox } from 'antd';
import Navi from '../../components/Menu/Navigator';
import Logo from '../../asserts/logo.jpg';
import '../../components/Menu/Menu.css';
var storage=window.localStorage;

class LoginIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
            username:"",
            password:"",
            isLogin:false,
        };
    }

    GetUsername=(e)=>{
        this.setState({
            username:e.target.value,
        })
    }

    GetCode=(e)=>{
        this.setState({
            password:e.target.value,
        })
    }

    AppData=()=>{
        
        fetch(backendUrl+"user/login/post/",{
            method:"post",
            mode:"cors",
            body:JSON.stringify(this.state),
            credentials: 'include',
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    isLogin:result.isSuccess,
                })
                if(this.state.isLogin) {
               
                    storage.setItem("sessionid",result.session_id);
                    storage.setItem("username",this.state.username);
                    console.log(storage.getItem("sessionid"));
                    console.log(storage.getItem("username"))
                    // for 用户登录子系统
                    cookie.save('sessionid',result.session_id);
                    cookie.save('username',this.state.username);

                    alert(result.message);
                    this.setState({
                        flag : 3,
                    })
                }else{
                    alert("用户名和密码错误");
                }
               
            },
        (error)=>{
            console.log(error);
        })

    }

    Back=()=>{
        this.setState({
            flag:0,
        })
    }

    render(){
        if(this.state.flag === 1){
            return (
                <div>
                    <div className = "header">
                        <img class = "logo" src = {Logo} alt="校徽" />
                        <div class ="title"> 疫情管控系统 </div>
                        <div style = {{alignSelf:'flex-end'}}> <Navi /> </div>
                    </div>
                    <div className = "Logo_Login" style={{float:'left'}}>
                        <Body></Body>
                    </div>
                    <div className = "Info_Login" style={{float:'left'}}>
                        <div>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={this.AppData}>
                            
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input onChange = {(e)=>this.GetUsername(e)}/>
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>

                                <Input.Password onChange = {(e)=>this.GetCode(e)}/>

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                                <Button onClick = {this.Back} type = "primary">
                                    返回
                                </Button>
                            </Form.Item>
                        </Form>
                        </div>
                    </div>
                </div>
            );
        }else if(this.state.flag === 0){
            return <Redirect to = {{pathname:'/ESS/situation'}} />
        }else if(this.state.flag === 3){
            return <Redirect to = {{pathname:'/ESS/situation'}}/>
        }
    }
}

export default LoginIn;