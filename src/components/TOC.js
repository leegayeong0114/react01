import React, { Component } from 'react'

class TOC extends Component {

  shouldComponentUpdate(newProps) {
    if(this.props.data === newProps.data) {
      return false
    }
    return true
  }

  render() {
    const changePage = (id, e) => {
      e.preventDefault()
      this.props.onChangePage('read', id)
    }

    const lists = []
    const data = this.props.data // 상위 this.state.data = 하위 this.props.data

    data.filter(list => {
      lists.push(
        <li key={list.id}>
          <a 
            href={'/content/' + list.id} 
            data-idid={list.id}
            onClick={changePage.bind(this, list.id)} 
            >{list.title}</a>
        </li>
      )
    })

    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default TOC