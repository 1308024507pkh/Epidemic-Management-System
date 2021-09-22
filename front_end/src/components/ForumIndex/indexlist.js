import React, { Component } from 'react'
import {List, Avatar, Pagination} from 'antd'
import TextTag from '../ForumDetails/tag'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import data from './data'

class indexlist extends Component {
  constructor(arg){
    super(arg)
    this.getDate(this.props.tab,this.state.page, this.state.pageSize)
  }
  getDate(tab,page,pageSize){
    let dataSource =JSON.parse(JSON.stringify(data));
    // 调用JSON内置方法先序列化为字符串再解析还原成对象
    var popdata=[];
    for(var i = 0; i <dataSource.data.length; i++)
    {
      if(dataSource.data[i].tab!=tab&&tab!='all')
        popdata.push(i);
    }
    for(var i = popdata.length-1; i>=0; i--)
    {
      dataSource.data.splice(popdata[i], 1);
    }
    console.log(dataSource);
    this.props.dispatch({
        type:'LIST_UPLOAD_SUCC',
        data:dataSource
      })
  }
  // props变化触发
  componentWillReceiveProps(nextProps){
    if( this.props.tab !== nextProps.tab ){
        this.setState({
          page: 1
        })

        this.getDate( nextProps.tab, this.state.page, this.props.pageSize )
    }
  }
  shouldComponentUpdate(nextProps, nextStates){
    // 页面切换时
    if(nextStates.page !== this.state.page){
      this.getDate(this.props.tab, nextStates.page, nextStates.pageSize)
    }
    if( this.props.tab !== nextProps.tab ){
      this.setState({
        page: 1
      })
      this.getDate( nextProps.tab, this.state.page, this.props.pageSize )
    }
    return true
  }
  state={
    page:1,
    pageSize:10,
  }
  render() {
    const {data, loading} = this.props.list
    return (
      <div className={'index-list'}>
        <List
          dataSource={data}
          loading={loading}
          renderItem={
            item=>(<List.Item
              actions={[
                `回复${item.reply_count}`,
                `访问${item.visit_count}`
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={item.author.avatar_url}/>
                }
                title={
                  <div>
                    <TextTag
                     tag={ item }
                     >
                    </TextTag>
                    <Link to={`/details/${item.id}`}>{item.title}</Link>
                  </div>
                }
                description={
                  <p> 
                      <Link to={`/user/${item.author.loginname}`}> {item.author.loginname} </Link>
                      发表于:{item.create_at.split("T")[0]}    
                  </p>
                }
              />
            </List.Item>
          )} 
        >
        </List>
        <Pagination 
          total={10}
          current={this.state.page}
          onChange={(page, pageSize)=>{
            this.setState({
              page,
            })
          }}
        />
      </div>
    )
  }
}

export default connect(state=>({list:state.list}))(indexlist)