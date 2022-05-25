import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { WindowsOutlined, CodeSandboxOutlined } from '@ant-design/icons'

import Layout from '../layouts/Layout'
import Login from '../views/login/Login'
import Home from '../views/dashboard/Dashboard'

// const Home = React.lazy(() => import('../views/home/Home'))
const CloudPcDetail = React.lazy(() =>
  import('../views/cloudPcInfo/CloudPcDetail')
)

const SelfErrorRecovery = React.lazy(() =>
  import('../views/cloudPcManage/SelfErrorRecovery')
)

const RequireAuth = ({ children }) => {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  return children
}

const IsLogin = () => {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Login />
  }
}

export const routers = [
  {
    key: 'root',
    path: '/',
    element: <Layout />,
    children: [
      {
        key: 'login',
        path: '/login',
        element: <IsLogin />
      },
      {
        key: 'dashboard',
        path: '/dashboard',
        index: true,
        icon: <WindowsOutlined />,
        element: (
          <RequireAuth>
            {/* <Suspense fallback={<Loader />}> */}
            <Home />
            {/* </Suspense> */}
          </RequireAuth>
        )
      },
      {
        key: 'cpcinfo',
        path: '/cpc-info',
        icon: <CodeSandboxOutlined />,
        label: 'Cloud PC 정보',
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <Suspense fallback={<></>}>
                  <CloudPcDetail
                    meta={{
                      title: 'Cloud PC 목록',
                      showPcSubmenu: true,
                      showAlert: false
                    }}
                  />
                </Suspense>
              </RequireAuth>
            )
          }
        ]
      },
      {
        key: 'cpcsetting',
        path: '/cpc-setting',
        icon: <CodeSandboxOutlined />,
        label: 'Cloud PC 관리',
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <Suspense fallback={<></>}>
                  <SelfErrorRecovery
                    meta={{
                      title: '자가 오류 복구',
                      showPcSubmenu: false,
                      showAlert: true,
                      alertTitle: '알림',
                      alertMessage:
                        '자가 오류 복구는 Cloud PC에 이상이 있을 시 사용자가 직접 Cloud PC를 초기화 하는 기능입니다. 오류 복구는 C드라이브에 설치된 OS 영역만 초기화되며 D드라이브의 데이터는 초기화되지 않습니다. (사용자가 별도로 설치한 프로그램은 모두 삭제됨)'
                    }}
                  />
                </Suspense>
              </RequireAuth>
            )
          }
        ]
      }
    ]
  }
]
