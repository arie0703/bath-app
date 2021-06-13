import React, { Component } from 'react'
import './css/form.css';

class Form extends Component {
  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.handleSubmit}>
          <input name="title" type="text" placeholder="温泉名" defaultValue="" /><br/>
          <input name="place" type="text" placeholder="場所" defaultValue="" /><br/>
          <textarea name="comment" placeholder="コメント" defaultValue=""></textarea><br/>
          <button type="submit">温泉メモを投稿</button>
        </form>
      </div>
    )
  }
}

export default Form