import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import './styles/index.scss'
import './i18n'
import App from './views/App'

import { Provider } from 'react-redux'
import { injectStore } from './utils/request'
import store from './store/store'

import { setupBrowserMock } from './mocks/server'
injectStore(store)

//* React 18 bootstrap
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  setupBrowserMock()
}

//* React 18 bootstrap
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
