import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routers } from '../router/router'
import { useDispatch } from 'react-redux'
import { staticPublic } from '../store/actions/user_action'

const App = () => {
  const type = 'user'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(staticPublic(type))
  }, [type, dispatch])

  const element = useRoutes(routers)
  return <>{element}</>
}

export default App
