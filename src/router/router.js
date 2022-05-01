import React from 'react'
import { Link } from 'react-router-dom'

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons'

import Loader from '../utils/loader'

// const Home = React.lazy(() => import('../views/home/Home'))
const Home = React.lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('../views/home/Home'),
    new Promise((resolve) => setTimeout(resolve, 1500))
  ])
  return moduleExports
})
const About = React.lazy(() => import('../views/about/About'))
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const List = React.lazy(() => import('../views/list/List'))
const Login = React.lazy(() => import('../views/login/Login'))

//* 지연 로딩을 해야한다면 아래 솔루션을 사용한다.
// const Login = React.lazy(async () => {
//   const [moduleExports] = await Promise.all([
//     import('../views/login/Login'),
//     new Promise((resolve) => setTimeout(resolve, 500))
//   ])
//   return moduleExports
// })

export const routers = [
  {
    label: <Link to="/main">Main</Link>,
    key: 'main',
    path: '/main',
    icon: <AppstoreOutlined />,
    element: (
      <React.Suspense fallback={<Loader />}>
        <Home />
      </React.Suspense>
    )
  },
  {
    label: <Link to="/login">Login</Link>,
    key: 'login',
    path: '/login',
    icon: <MailOutlined />,
    element: (
      <React.Suspense fallback={<Loader />}>
        <Login />
      </React.Suspense>
    )
  },
  {
    label: 'Submenu',
    key: 'submenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'User',
        children: [
          {
            label: <Link to="/about">About</Link>,
            key: 'about',
            path: '/about',
            element: (
              <React.Suspense fallback={<>...</>}>
                <About name="Ken" />
              </React.Suspense>
            )
          }
        ]
      },
      {
        type: 'group',
        label: 'Example',
        children: [
          {
            label: <Link to="/dashboard">Dashboard</Link>,
            key: 'dashboard',
            path: '/dashboard',
            element: (
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            )
          },
          {
            label: <Link to="/list">List</Link>,
            key: 'list',
            path: '/list',
            element: (
              <React.Suspense fallback={<>...</>}>
                <List params={{ meta: { id: 1, name: 'ken' } }} />
              </React.Suspense>
            )
          }
        ]
      }
    ]
  }
]
