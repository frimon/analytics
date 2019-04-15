import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

function init() {
  ReactDOM.render((
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ), document.getElementById('root'))

  registerServiceWorker()
}

init()
