import React, { Component } from 'react'
import { Tag } from 'antd';
const tablist = {
  top:{
    color: 'red',
    txt:'置顶',
  },
  good:{
    color: 'lime',
    txt:'复工复产',
  },
  ask:{
    color: 'green',
    txt:'社区管控',
  },
  job:{
    color: 'magenta',
    txt:'医疗服务',
  },
  dev:{
    color: 'purple',
    txt:'其他措施',
  },
  share:{
    color: 'orange',
    txt:'交通出行',
  },
}

function gettab(data){
  return (
    data.top ? 'top'
      : data.good ? 'good'
        : data.tab
  )
}

export default class tag extends Component {
  render() {
    const nowTab = tablist[gettab(this.props.tag)]
    return (
      nowTab 
      ?<Tag color={nowTab.color}>
        {nowTab.txt}
      </Tag> 
      : ''
    )
  }
}
