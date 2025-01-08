import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './Global.css'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'
import 'core-js/stable';  // Polyfills para las nuevas características de JS

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
