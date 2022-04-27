import { Button } from "antd";
import React from "react";

function LoginButton(props) {
  return (
      <Button type="primary" onClick={props.onClick}>Login</Button>
  );
}

function LogoutButton(props) {
  return (
    <Button type="danger" onClick={props.onClick}>Logout</Button>
  )
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true,
    });
  }
  handleLogoutClick() {
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    const divStyle = { marginTop: '20px' }
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <>
        <div style={divStyle}>{button}</div>
      </>
    );
  }
}

export default Dashboard;
