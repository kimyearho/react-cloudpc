import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

function Home() {
  //* useState는 배열을 반환 함.
  //* 첫번째 인자는 상태 값, 두번째 인자는 상태를 업데이트하는 함수를 반환.
  const [count, setCount] = useState(0);
  const countble = () => {
    setCount(count + 1);
  };

  //* React는 effect가 수행되는 시점에 이미 DOM이 업데이트 되었음을 보장한다.
  //* effect는 마운팅과 업데이트를 모두 수행할 수 있다.
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      console.log("useEffect unmount!!");
    };
  }, [count])
  
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
        <p>You clicked {count} times</p>
        <Button onClick={countble}>Click me</Button>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

export default Home;
