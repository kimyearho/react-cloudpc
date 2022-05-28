import React, { Suspense } from 'react'
import { RequireUserAuth, IsDefaultLogin } from './RequireUserAuth'
import { WindowsOutlined, CodeSandboxOutlined } from '@ant-design/icons'

import Layout from '../layouts/Layout'
import Home from '../views/dashboard/Dashboard'

/* Lazy Routes */
const CloudPcDetail = React.lazy(() =>
  import('../views/cloudPcInfo/CloudPcDetail')
)
const SelfErrorRecovery = React.lazy(() =>
  import('../views/cloudPcManage/SelfErrorRecovery')
)
const Notice = React.lazy(() => import('../views/support/Notice'))

export const routers = [
  {
    key: 'root',
    path: '/',
    element: <Layout />,
    children: [
      {
        key: 'login',
        path: '/login',
        element: <IsDefaultLogin />
      },
      {
        key: 'dashboard',
        path: '/dashboard',
        index: true,
        icon: <WindowsOutlined />,
        element: (
          <RequireUserAuth>
            <Home />
          </RequireUserAuth>
        )
      },
      {
        key: 'cpcinfo',
        path: '/cpc-info',
        icon: <CodeSandboxOutlined />,
        label: 'Cloud PC 정보',
        children: [
          {
            key: 'child-cpc-list',
            index: true,
            label: 'Cloud PC 목록',
            element: (
              <RequireUserAuth>
                <Suspense fallback={<></>}>
                  <CloudPcDetail
                    meta={{
                      title: 'Cloud PC 목록',
                      showPcSubmenu: true,
                      showAlert: false
                    }}
                  />
                </Suspense>
              </RequireUserAuth>
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
            key: 'child-cpc-recovery',
            index: true,
            label: '자가 오류 복구',
            element: (
              <RequireUserAuth>
                <Suspense fallback={<></>}>
                  <SelfErrorRecovery
                    meta={{
                      title: '자가 오류 복구',
                      showPcSubmenu: false,
                      showAlert: true,
                      alertTitle: '알림',
                      alertMessage: (
                        <>
                          자가 오류 복구는 Cloud PC에 이상이 있을 시 사용자가
                          직접 Cloud PC를 초기화 하는 기능입니다.
                          <br />
                          오류 복구는 C드라이브에 설치된 OS 영역만 초기화되며
                          D드라이브의 데이터는 초기화되지 않습니다. (사용자가
                          별도로 설치한 프로그램은 모두 삭제됨)
                        </>
                      )
                    }}
                  />
                </Suspense>
              </RequireUserAuth>
            )
          }
        ]
      },
      {
        key: 'cpcsupport',
        path: '/cpc-support',
        icon: <CodeSandboxOutlined />,
        label: '고객 지원',
        children: [
          {
            key: 'child-cpc-support',
            index: true,
            label: '공지 사항',
            element: (
              <RequireUserAuth>
                <Suspense fallback={<></>}>
                  <Notice
                    meta={{
                      title: '공지 사항',
                      showPcSubmenu: false,
                      showAlert: false
                    }}
                  />
                </Suspense>
              </RequireUserAuth>
            )
          }
        ]
      }
    ]
  }
]
