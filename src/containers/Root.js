import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../state/store.js'
import App from './App.js'

const store = configureStore({});

export default function () {
  return (
    <Provider store={ store }>
      <App />
    </Provider>
  )
}
