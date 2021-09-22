import React, { Component } from 'react'
import {Menu,  } from 'antd'
import {Link} from 'react-router-dom';

export default class indexrouter extends Component {
  render() {
    return (
      <div className={'index-link'}>
        <Menu
          defaultSelectedKeys={[this.props.tab]}
        >
          <Menu.Item  
            key='all'
          >
            <Link to={'/index/all'}>全部措施</Link>
          </Menu.Item>
          <Menu.Item
           key='good'
           >
            <Link to={'/index/good'}>复工复产</Link>
          </Menu.Item>
          <Menu.Item
             key='ask'
          >
            <Link to={'/index/ask'}>社区管控</Link>
          </Menu.Item>
          <Menu.Item
             key='share'
            >
            <Link to={'/index/share'}>交通出行</Link>
          </Menu.Item>
          <Menu.Item
             key='job'
          >
            <Link to={'/index/job'}>医疗服务</Link>
          </Menu.Item>
          <Menu.Item
             key='dev'
          >
            <Link to={'/index/dev'}>其他措施</Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
