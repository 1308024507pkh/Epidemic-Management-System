import React, { Component } from 'react'
import IndexRoute from './indexroute'
import IndexList from './indexlist'
import './index.css'

export default class index extends Component {
  render() {
    return (
      <div className={'index'}>
        <IndexRoute tab={this.props.match.params.id}/>
        <IndexList className={'index-list'}  tab={this.props.match.params.id}/>
      </div>
    )
  }
}
