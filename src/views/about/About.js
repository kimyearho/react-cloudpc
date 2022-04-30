import React, { useCallback, useEffect } from 'react'

function AboutDetail({ featchProduct }) {
  useEffect(() => {
    featchProduct()
  }, [featchProduct])
  return (
    <>
      <h3>Detail!</h3>
    </>
  )
}

function About(props) {
  const { name } = props
  const featchProduct = useCallback(() => {
    // console.log('usecallback!')
  }, [])
  return (
    <>
      <br />
      <h2>Welcome to About detail {name}</h2>
      <AboutDetail featchProduct={featchProduct} />
    </>
  )
}

export default About
