import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { numbers: [1, 2, 3, 4, 5, 6] }
  }

  render() {
    const numbers = this.state.numbers
    const listItems = numbers.map((item) => <li key={item}>{item}</li>)
    return (
      <>
        <ul>{listItems}</ul>
      </>
    )
  }
}

export default List
