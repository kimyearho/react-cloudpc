import React from 'react'
import { withRouter } from '../../utils/withRouter'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { numbers: [1, 2, 3, 4, 5, 6] }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const numbers = this.state.numbers
    return (
      <>
        <ul>
          {numbers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default withRouter(List)
