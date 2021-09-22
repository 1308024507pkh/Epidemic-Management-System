import React, { Component } from 'react';
import {backendUrl} from "./Common";
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import cookie from 'react-cookies'

class RealCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:"",
            flag:0,
        };
    }

    componentDidMount(){
        var token = this.props.location.search;
        var uptoken = token.substr(7,token.length);
        fetch(backendUrl+"user/mail/confirm/reg/",{
            method:"post",
            body:JSON.stringify({"token":uptoken}),
            mode:"cors",
        credentials: 'include',
        })
            .then(res => res.json())
            .then((tokenresult)=>{
                console.log(tokenresult);
                alert(tokenresult.message);
                if(tokenresult.isSuccess){
                    this.setState({
                        flag:1,
                    })
                }
                
            },
        (error)=>{
            console.log(error);
        })
    }

    render() {
        if(this.state.flag === 0){
            return (
                <div>
                    
                </div>
            );
        }else{
            return <Redirect to = {{pathname:'/ESS/situation'}} />
        }
        
    }
}

export default RealCreate;
