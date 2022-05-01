import React from 'react'
import { Link } from 'react-router-dom'

const Home = React.lazy(() => import('../views/home/Home'))
const About = React.lazy(() => import('../views/about/About'))
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const List = React.lazy(() => import('../views/list/List'))
const Login = React.lazy(() => import('../views/login/Login'))

export const routers = [
  {
    label: <Link to="/main">Main</Link>,
    key: 'main',
    path: '/main',
    element: (
      <React.Suspense fallback={<>...</>}>
        <Home />
      </React.Suspense>
    )
  },
  {
    label: <Link to="/login">Login</Link>,
    key: 'login',
    path: '/login',
    element: (
      <React.Suspense fallback={<>...</>}>
        <Login />
      </React.Suspense>
    )
  },
  {
    label: 'Submenu',
    key: 'submenu',
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
