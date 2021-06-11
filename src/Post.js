import React, { Component } from 'react';
import './css/index.css';

class Post extends Component {

  render() {
    const className = 'bath'
    return(
      <li className={className}>
        <span>{this.props.id}</span>
        <span>：{this.props.title}　　</span>
        <p>{this.props.desc}</p>
      </li>
    );
  }

}

export default Post