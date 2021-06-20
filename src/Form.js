import React, { Component } from 'react'
import './css/form.css';

class Form extends Component {
  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.handleSubmit} class="post_form">
          <input name="title" type="text" placeholder="タイトル" defaultValue="" /><br/>
          <input name="content" type="text" placeholder="内容" defaultValue="" /><br/>
          <button type="submit">投稿</button>
        </form>
      </div>
    )
  }
}

export default Form