import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import Title from './Title';
import UserSelect from './UserSelect';
import '../../asserts/css/Change.css'
import {backendUrl} from "./Common";
import cookie from 'react-cookies'
import {Button} from 'antd';

var used = {};

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:2,
            name:"",
            email:"",
            phone:"",
            token:"",
        };
        this.Info = this.Info.bind(this);
        this.Change = this.Change.bind(this);
        this.Comment = this.Comment.bind(this);
        this.Application = this.Application.bind(this);
    }

    componentDidMount(){

        // fetch(backendUrl+"user/profile/changepass/set_new/",{
        //     mode:"cors",
        // credentials: 'include',
        // })
        //     .then(res => res.json())
        //     .then((tokenresult)=>{
        //     },
        // (error)=>{
        //     console.log(error);
        // })

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
                this.setState({
                    name:result.username,
                    phone:result.phone,
                    email:result.email,
                })
                used.name = result.username;
                used.phone = result.phone;
                used.email = result.email;
            },
            (error)=>{
                console.log(error);
            })
    }

    GetUsername=(e)=>{
        this.setState({
            name:e.target.value,
        })
    }

    GetEmail=(e)=>{
        this.setState({
            email:e.target.value,
        })
    }

    GetPhone=(e)=>{
        this.setState({
            phone:e.target.value,
        })
    }

    Submit=()=>{
        var flag = 0;
        //请求数据
        var email = /^([a-z0-9]+[\.\-_]?)*[a-z0-9]+@[a-z0-9]+[-_]?[a-z0-9]+(\.[a-z0-9]{2,3}){1,2}$/ig;
        if(this.state.name!=""){
            if(this.state.name.length<=4){
                alert("用户名必须超过4位!");
                flag = 1;
            }
        }
        if(this.state.email!=""){
            if(!email.test(this.state.email)){
                alert("邮箱地址不合法!");
                flag = 1;
            }
        }
        if(this.state.phone!=""){
            if(this.state.phone.length!=11){
                alert("电话号码不合法!");
                flag = 1;
            }
        }
        
        if(flag === 0){

            let upload = {};
            
            if(this.state.name!=used.name){
                upload.username = this.state.name;
            }
            if(this.state.email!=used.email){
                upload.email = this.state.email;
            }
            if(this.state.phone!=used.phone){
                upload.phone = this.state.phone;
            }
            console.log(upload);
            fetch(backendUrl+"user/profile/modify/",{
                method:"post",
                body:JSON.stringify(upload),
                mode:"cors",
                credentials: 'include',
                headers:{
                    'sessionid':cookie.loadAll().sessionid,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    alert(result.message);
                },
            (error)=>{
                console.log(error);
            })
        }
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

    ChangePassword=()=>{
        this.setState({
            flag:5,
        })
    }

    render() {
        if(this.state.flag === 2){
            return (
                <div>
                    <div className = "Change">
                        <form>
                            <input type = "text" placeholder = {this.state.name} ref = "name" onChange = {(e)=>this.GetUsername(e)}></input>
                            <input type = "text" placeholder = {this.state.email} ref = "email" onChange = {(e)=>this.GetEmail(e)}></input>
                            <input type = "text" placeholder = {this.state.phone} ref = "phone" onChange = {(e)=>this.GetPhone(e)}></input>
                            <Button type = "default" style = {{marginLeft:8}} onClick = {this.ChangePassword}>
                                修改密码
                            </Button>
                        </form>
                        <Button type = "primary" style = {{marginLeft:8}} onClick = {this.Submit} size = "large">
                            提交
                        </Button>
                    </div>
                </div>
            );
        }else if(this.state.flag === 3){
            return <Redirect to = {{pathname:'/User/Comment'}} />
        }else if(this.state.flag === 1){
            return <Redirect to = {{pathname:'/User'}} />
        }else if(this.state.flag === 4){
            return <Redirect to = {{pathname:'/User/Application'}} />
        }else if(this.state.flag === 5){
            return <Redirect to = {{pathname:'/User/Change/ChangePassword'}} />
        }
    }
}

export default User;
