import React from 'react'
class ToDoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      string: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ string: event.target.value })
    console.log(this.state.string)
  }

  handleSubmit(event) {
    this.state.value.push(this.state.string)
    this.setState({ string: '' })
    console.log(this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Task:
        <input type="text" value={this.state.string} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <ToDoTask {...this.state} />
      </form>
    )
  }
}
class ToDoTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskCount: 0
    }
    this.handleToggle = this.handleToggle.bind(this)
  }
  componentWillReceiveProps() {
    this.setState({ taskCount: this.props.value.length })
  }
  handleToggle = (event) => {
    const toggleClassName = event.currentTarget.getAttribute('class')
    if (toggleClassName) {
      event.currentTarget.removeAttribute('class')
      const inc = this.state.taskCount + 1
      this.setState({
        taskCount: inc
      })
    } else {
      event.currentTarget.setAttribute('class', 'strikeOut')
      const dec = this.state.taskCount - 1
      this.setState({
        taskCount: dec
      })
    }
  }
  render() {
    const { value } = this.props
    const updatedNums = value.map((value) => {
      if (value) return <li onClick={this.handleToggle} >{value}</li>
      return
    })
    return (
      <ul>
        {updatedNums}
        <div>{'Status: ' + this.state.taskCount + ' tasks remaining of ' + value.length + ' tasks'}</div>
      </ul>
    )
  }
}

export { ToDoForm }
export default { ToDoForm }
