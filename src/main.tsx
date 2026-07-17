import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import caslonWoff2 from '@fontsource/libre-caslon-display/files/libre-caslon-display-latin-400-normal.woff2?url'
import '@fontsource/montserrat/latin-200.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/montserrat/latin-600.css'
import '@fontsource/eb-garamond/latin-400.css'
import '@fontsource/eb-garamond/latin-400-italic.css'
import '@fontsource/eb-garamond/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/libre-caslon-display/latin-400.css'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n'
import { MoodProvider } from './mood'
import { prefetchTourMapTiles } from './utils/prefetchMapTiles'

const preload = document.createElement('link')
preload.rel = 'preload'
preload.as = 'font'
preload.type = 'font/woff2'
preload.crossOrigin = 'anonymous'
preload.href = caslonWoff2
document.head.appendChild(preload)

registerSW({ immediate: false })
prefetchTourMapTiles()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoodProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </MoodProvider>
  </StrictMode>,
)
