import React, { Component } from 'react'
import TxtTag from './tag'
import {Card, Avatar} from 'antd'
import {Link} from 'react-router-dom'

export default class txtDetails extends Component {
  render() {
    const {data} = this.props
    return (
      <div>
        <Card>
          <Card.Meta
            title={
                <div>
                    <h2> { data.title } </h2>
                    <TxtTag tag={data} />
                    <Avatar src={data.author.avatar_url}></Avatar>
                    <Link className={'details-link'} to={`/user/${data.author_id}`}>{data.author.loginname}</Link>
                    发表于:  {data.create_at.split("T")[0]}  
                </div>
            }
          >
          </Card.Meta>
          <div 
            dangerouslySetInnerHTML={{
                __html:data.content
              }}
          >
          </div>
        </Card>
      </div>
    )
  }
}

