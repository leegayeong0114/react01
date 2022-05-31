import React, { Component } from 'react'

class Control extends Component {
  render() {

    const changePage = (_mode, e) => {
      e.preventDefault()
      this.props.onChangeMode(_mode, this.props.selectContentId)
    }

    return (
      <ul>
        <li>
          <a 
            href="/create"
            onClick={changePage.bind(this, 'create')}
          >create</a>
        </li>
        <li>
          <a 
            href="/update"
            onClick={changePage.bind(this, 'update')}
          >update</a>
        </li>
        <li>
          <button
            onClick={changePage.bind(this, 'delete')}
          >delete</button>
        </li>
      </ul>
    )
  }
}

export default Control