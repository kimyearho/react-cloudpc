import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
// import 'antd/dist/antd.min.css'
import './styles/antd.css'
import App from './views/App'

import { Provider } from 'react-redux'
import store from './store/store'

//* React 18 bootstrap
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

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
