import React, { Suspense } from 'react'
import Loader from '../utils/loader'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

//* 지연 로딩을 해야한다면 아래 솔루션을 사용한다.
// const Login = React.lazy(async () => {
//   const [moduleExports] = await Promise.all([
//     import('../views/login/Login'),
//     new Promise((resolve) => setTimeout(resolve, 500))
//   ])
//   return moduleExports
// })

const Home = React.lazy(() => import('../views/home/Home'))
const About = React.lazy(() => import('../views/about/About'))
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const List = React.lazy(() => import('../views/list/List'))

function RequireAuth({ children }) {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  return children
}

export const routers = [
  {
    label: <Link to="/main">Main</Link>,
    key: 'main',
    path: '/main',
    icon: <AppstoreOutlined />,
    meta: null,
    element: (
      <RequireAuth>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </RequireAuth>
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
              <RequireAuth>
                <Suspense fallback={<Loader />}>
                  <About name="Ken" />
                </Suspense>
              </RequireAuth>
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
              <RequireAuth>
                <Suspense fallback={<>...</>}>
                  <Dashboard />
                </Suspense>
              </RequireAuth>
            )
          },
          {
            label: <Link to="/list">List</Link>,
            key: 'list',
            path: '/list',
            element: (
              <RequireAuth>
                <Suspense fallback={<>...</>}>
                  <List params={{ meta: { id: 1, name: 'ken' } }} />
                </Suspense>
              </RequireAuth>
            )
          }
        ]
      }
    ]
  }
]
