import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import '../../asserts/css/Header.css';
import ZjuLogo from '../../asserts/image/timgXFIKOJKO.png';
import {backendUrl, setCookie} from "./Common";
import cookie from 'react-cookies'

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flag:0,
			username:"",
		};
	}

	SignIn=()=>{
		this.setState({
			flag:1,
		})
	}

	Create=()=>{
		this.setState({
			flag:2,
		})
	}

	User=()=>{
		this.setState({
			flag:4,
		})
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
                this.setState({
					username:result.username,
				})
				if(typeof(this.state.username)!=='undefined'){
					console.log(this.state.username);
					this.setState({
						flag:3,
					})
				};
            },
            (error)=>{
                console.log(error);
            })
    }

	render() {
		if(this.state.flag === 0){
			return (
				<div>
					<body className = "Header">
						<img src = {ZjuLogo}></img>
						<input type = "text" name = "搜索"></input>
						<div id = "button">
							<button onClick = {this.SignIn}>登录</button>
							<button onClick = {this.Create}>注册</button>
						</div>
					</body>
				</div>
			);	
		}else if(this.state.flag === 1){
			return <Redirect to = {{pathname:'/LoginIn'}} />
		}else if(this.state.flag === 2){
			return <Redirect to = {{pathname:'/Create'}} />
		}else if(this.state.flag === 3){
			return (
				<div>
					<body className = "Header">
						<img src = {ZjuLogo}></img>
						<input type = "text" name = "搜索"></input>
						<div id = "button">
							<button>{this.state.username}</button>
							<button onClick = {this.User}>用户界面</button>
						</div>
					</body>
				</div>
			);	
		}else if(this.state.flag === 4){
			return <Redirect to = {{pathname:'/User'}} />
		}
		
	}
}

export default Main;
