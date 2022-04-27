import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "antd";
import About from "./about/About";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    //* 생성자에서 setCount bind 하는방법.
    //* arrow function으로 함수를 작성하지 않을경우 생성자에서 해당 함수를 bind해주어야한다.
    // this.setCount = this.setCount.bind(this)
  }

  componentDidMount() {
    console.log("mounted!");
  }
  componentWillUnmount() {
    console.log("unmounted!");
  }

  //* 생성자에서 setCount 함수를 bind해야 사용할 수 있다.
  // setCount() {
  //   this.setState((state, props) => ({
  //     count: state.count + 1
  //   }))
  // }

  //* arrow function으로 함수를 작성할경우 생성자에서 별도의 bind처리를 하지 않아도 된다.
  setCount = (increment) => {
    this.setState((state) => ({
      count: state.count + increment,
    }));
  };

  render() {
    const navLinkStyle = {
      marginLeft: "10px",
    };
    return (
      <div className="App">
        <nav>
          <Link to="/">Root</Link>
          <Link style={navLinkStyle} to="/home">
            Home
          </Link>
          <Link style={navLinkStyle} to="/about">
            About
          </Link>
          <Link style={navLinkStyle} to="/dashboard">
            Dashboard
          </Link>
        </nav>

        <h2>count: {this.state.count}</h2>
        <Button onClick={() => this.setCount(1)}>click count</Button>

        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About name="Ken" />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    );
  }
}

export default App;
