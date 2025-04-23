import * as React from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

// Example theme (you can adjust it as needed)
const theme = {
  colors: {
    primary: '#0070f3',
    background: '#fff',
    text: '#000',
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
}
