import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import Title from './Title';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'
import { Button } from 'antd';
import '../../asserts/css/SuperOperator.css'
import Navi from '../../components/Menu/Navigator';
import Logo from '../../asserts/logo.jpg';
import '../../components/Menu/Menu.css';


class SuperOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
            admin_1:"",
            admin_2:"",
            admin_3:"",
            admin_4:"",
            admin_5:"",
        };
    }


    GetNews=(e)=>{
        this.setState({
            admin_1:e.target.value,
        })
    }

    GetTravel=(e)=>{
        this.setState({
            admin_2:e.target.value,
        })
    }

    GetIll=(e)=>{
        this.setState({
            admin_3:e.target.value,
        })
    }

    GetObject=(e)=>{
        this.setState({
            admin_4:e.target.value,
        })
    }

    GetRework=(e)=>{
        this.setState({
            admin_5:e.target.value,
        })
    }

    Submit=()=>{

        //请求数据
        fetch(backendUrl+"user/auth/authorization/",{
            method:"post",
            body:JSON.stringify(this.state),
            headers:{
                'content-type': 'application/json',
                'sessionid':cookie.loadAll().sessionid,
            },
            mode:"cors",
            credentials: 'include',
        })
            .then(res => res.json())
            .then((result)=>{
                //返回bool值判断是否更改
                alert(result.message);
                if(result.isSuccess){
                    alert("更改成功");
                }else{
                    alert("更改失败");
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

    render() {
        if(this.state.flag === 1){
            return (
                <div>
                    <div className = "header">
                        <img class = "logo" src = {Logo} alt="校徽" />
                        <div class ="title"> 疫情管控系统 </div>
                        <div style = {{alignSelf:'flex-end'}}> <Navi /> </div>
                    </div>
                    <div className = "SuperOperator">
                        <form>
                            <div>
                                <input type = "text" placeholder = "新闻系统管理员id" refs = "news" onChange = {(e)=>this.GetNews(e)}></input>
                                <input type = "text" placeholder = "同城交通管理员id" refs = "travel" onChange = {(e)=>this.GetTravel(e)}></input>
                            </div>
                            <div>
                                <input type = "text" placeholder = "病例检测管理员id" refs = "check" onChange = {(e)=>this.GetIll(e)}></input>
                                <input type = "text" placeholder = "物资申领管理员id" refs = "object" onChange = {(e)=>this.GetObject(e)}></input>
                            </div>
                            <div>
                                <input type = "text" placeholder = "复工人口管理员id" refs = "back_to_work" onChange = {(e)=>this.GetRework(e)}></input>
                            </div>
                        </form>
                        <Button onClick = {this.Submit} type = "primary">
                            提交
                        </Button>
                        <Button onClick = {this.Back} type = "primary">
                            返回首页
                        </Button>
                    </div>
                </div>
            );
        }else if(this.state.flag === 0){
            return <Redirect to = {{pathname:'/'}} />
        }
        
    }
}

export default SuperOperator;
