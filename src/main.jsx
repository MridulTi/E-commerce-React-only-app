import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './Context/AuthContext.jsx'

const theme = createTheme({
  palette: {
    primary: {
      "main": "#F8EDE3",
      "200": "#DFD3C3",
      "300": "#D0B8A8",
      "400": "#C5705D"
    },
    grey: {
      "10": "#ACACAC",
      "20": "#C0C0C0",
      "30": "#D7D7D7",
      "40": "#EBEBEB",
      "50": "#FFFFFF",
      "60": "#343434",
      "70": "#252525",
      "80": "#1D1D1D",
      "90": "#151515",
      "100": "#000000",
    },
    secondary:{
      "main":"#FFD690"
    }
  }
})

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
