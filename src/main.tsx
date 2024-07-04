import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from './styles/themes/default.ts'
import { ThemeProvider } from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
