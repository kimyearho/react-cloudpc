import { Button } from 'antd'
import React from 'react'

function LoginButton(props) {
  return (
    <Button type="primary" onClick={props.onClick}>
      Login
    </Button>
  )
}

function LogoutButton(props) {
  if (!props.warn) {
    return null
  }

  return (
    <Button type="danger" onClick={props.onClick}>
      Logout
    </Button>
  )
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoggedIn: false }

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    })
  }
  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const divStyle = { marginTop: '20px' }
    const isLoggedIn = this.state.isLoggedIn
    return (
      <>
        <div style={divStyle}>
          {isLoggedIn ? (
            <LogoutButton warn={true} onClick={this.handleLogoutClick} />
          ) : (
            <LoginButton onClick={this.handleLoginClick} />
          )}
        </div>
      </>
    )
  }
}

export default Dashboard
