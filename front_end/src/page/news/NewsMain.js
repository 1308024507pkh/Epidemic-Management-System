import React, { Component } from 'react';
import Logo from '../../asserts/logo.jpg';
import Img from '../../asserts/image/logo.svg';
import SildeShow from './ImgFlow';
import '../../asserts/css/NewMain.css'
import { List, Typography, Divider, Tabs} from 'antd';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';

const { TabPane } = Tabs;

var update = {
    title:"123",
    params:"",
};

class NewsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_1:[
                {title:'新闻一'},
                {title:'新闻二'},
                {title:'新闻三'},
            ],
            data_2:[
                {title:'新闻一'},
                {title:'新闻二'},
                {title:'新闻三'},
            ],
            data_3:[
                {title:'新闻一'},
                {title:'新闻二'},
                {title:'新闻三'},
            ],
            flag:0,
        };
    }

    componentDidMount(){

        fetch('https://127.0.0.1:8000/NewsList/proccess/',{
            method:"get",
            mode:"cors",
            credentials:"include",
            header:{
                
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    data_1:result.news,
                })
            },
            (error)=>{
                console.log(error);
            })

    }

    test=(e,params)=>{
        update.title = e.title;
        update.params = params;
        console.log(update);
        this.setState({
            flag:1,
        })
    }

    callback=(key)=>{
        console.log(key);
    }

    render() {
        if(this.state.flag === 0){
            return (
                <div className = "NewMain">
                    <Tabs defaultActiveKey="1" onChange = {()=>this.callback()} id = "tabs">
                        <TabPane tab = "防疫进展" key = "1">
                            <List
                                id = "list"
                                bordered
                                dataSource = {this.state.data_1}
                                renderItem = {item=>(
                                    <List.Item>
                                        <List.Item.Meta
                                            title = {<a>{item.title}</a>}
                                            onClick = {()=>this.test(item,"process")}>
                                        </List.Item.Meta>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                        <TabPane tab = "防疫知识" key = "2">
                            <List
                                id = "list"
                                bordered
                                dataSource = {this.state.data_2}
                                renderItem = {item=>(
                                    <List.Item>
                                        <List.Item.Meta
                                            title = {<a>{item.title}</a>}
                                            onClick = {()=>this.test(item,"knowledge")}>
                                        </List.Item.Meta>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                        <TabPane tab = "最新情况" key = "3">
                            <List
                                id = "list"
                                bordered
                                dataSource = {this.state.data_3}
                                renderItem = {item=>(
                                    <List.Item>
                                        <List.Item.Meta
                                            title = {<a>{item.title}</a>}
                                            onClick = {()=>this.test(item,"newest")}>
                                        </List.Item.Meta>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                    </Tabs>
                    <div id = "img">
                        <SildeShow>
                            <img src = {Logo}></img>
                            <img src = {Img}></img>
                            <img src = {Logo}></img>
                        </SildeShow>
                    </div>
                </div>
            );
        }else{
            return <Redirect to = {{
                pathname:'/News',
                state: update,
            }} />
        }
    }
}

export default NewsMain;
