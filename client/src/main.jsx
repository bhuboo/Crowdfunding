import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Template/css/style.css'

//# CSS Plugins
import './Template/plugins/slick/slick.css'
import './Template/plugins/font-awesome/fontawesome.min.css'
import './Template/plugins/font-awesome/brands.css'
import './Template/plugins/font-awesome/solid.css'

import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
