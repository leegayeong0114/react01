import './App.css'
import { Component } from 'react'
import Subject from './components/Subject'
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import Control from './components/Control'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

class App extends Component {
  constructor(props) {
    super(props)
    /** 
     * 컴포넌트 reder() 보다 먼저 실행하고 
     * state값 초기화 시킬 때 여기에 쓴다.
     */
    this.max_content_id = 3
    this.state = {
      mode: 'welcome',
      subject: {title: 'WELCOME', sub: 'state state'},
      selected_content_id: 0,
      welecome: {title: 'welcome', desc: 'welecome DESC'}, // mode: welecome
      contents: [ // mode: read
        {id: 1, title: 'HTML', desc: 'HTML DESC'},
        {id: 2, title: 'CSS', desc: 'CSS DESC'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript DESC'},
      ],
    }
    this.createContent = this.createContent.bind(this)
    this.updateContent = this.updateContent.bind(this)
  }

  // submit event
  createContent(_title, _desc) {
    this.max_content_id = this.max_content_id + 1
    // push 쓰지 말고 concat 을 써서 복제본으로 바꾼다. push 쓸거면 Array.form() 해주기
    // const _contents = this.state.contents.concat({id: this.max_content_id, title: _title, desc: _desc})
    const _contents = Array.from(this.state.contents)
    _contents.push({id: this.max_content_id, title: _title, desc: _desc,})
    this.setState({
      contents: _contents,
      mode: 'read',
      selected_content_id: this.max_content_id,
    })
  }

  updateContent(_id, _title, _desc) {
    const targetIndex = this.state.contents.findIndex(content => content.id === _id)

    let copyContents = [...this.state.contents] // contents 복사
    copyContents[targetIndex] = {...copyContents[targetIndex], id: _id, title: _title, desc: _desc,}

    this.setState({
      contents: copyContents,
      mode: 'read',
      selected_content_id: _id,
    })
  }

  getReadContent() {
    const result = this.state.contents.filter(content => content.id === this.state.selected_content_id)
    return result[0]
  }

  getContent() {

    let _title, _desc, _article = null
    let STATE = this.state
    
    if(STATE.mode === 'welecome') {
      const welecome = STATE.welecome
      _title = welecome.title
      _desc = welecome.desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (STATE.mode === 'read') {
      const _content = this.getReadContent()
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (STATE.mode === 'create') {
      _article = <CreateContent onSubmit={this.createContent}></CreateContent>
    } else if (STATE.mode === 'update') {
      const _content = this.getReadContent()
      _article = <UpdateContent data={_content} onSubmit={this.updateContent}></UpdateContent>
    }

    return _article
  }

  render() {
    const modeChange = (_mode, _selected_content_id) => {
      if(_mode === 'delete') {
        let _contents = Array.from(this.state.contents)
        _contents = _contents.filter(content => content.id !== this.state.selected_content_id)
        this.setState({
          contents: _contents,
          mode: 'welecome',
        })
        alert('삭제 성공')
      } else {
        this.setState({
          mode: _mode,
          selected_content_id: _selected_content_id,
        })
      }
    } 

    return (
      <div className="App">
        {/* 상위 state -> 하위 props으로 전달 가능 */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={modeChange.bind(this)}
        ></Subject>
        <TOC 
          data={this.state.contents}
          onChangePage={modeChange.bind(this)}
        ></TOC>
        <Control selectContentId={this.state.selected_content_id} onChangeMode={modeChange.bind(this)}></Control>
        {this.getContent()}
      </div>
    )
  }
}

export default App;