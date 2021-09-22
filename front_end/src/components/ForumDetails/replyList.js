import React, { Component } from 'react'
import {List, Avatar} from 'antd'
import {Link} from 'react-router-dom'

export default class txtDetails extends Component {
  render() {
    const {data} = this.props
    
    return (
      <div>
        <List
          dataSource={data}
          renderItem={
                item=>(<List.Item
                  className={'reply-item'}
                  extra={ item.ups.length >0?<span className={'item-answer'}>有{item.ups.length}个人赞了这条回复</span> :''}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.author.avatar_url}/>
                    }
                    description={
                      <span >
                        <Link to={'/user/'+item.author.loginname}> {item.author.loginname} </Link>
                          发表于:{item.create_at.split("T")[0]}  
                      </span>
                    }
                  >
                  </List.Item.Meta>
                  <div
                    className={'item-content'}
                    dangerouslySetInnerHTML={{
                      __html: item.content
                    }}
                  ></div>
                </List.Item>
            )
          }
        >
        </List>
      </div>
    )
  }
}
