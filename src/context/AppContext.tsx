import { createContext, useContext, useState, useEffect } from 'react'
import { config } from "../cms/config";
import { SupportedLanguage, Theme } from "../cms/types";
import { lightTheme, darkTheme } from '../theme'

interface AppContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  isDarkMode: boolean
  toggleTheme: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('language')
    return (saved && Object.keys(config.languages).includes(saved)) 
      ? saved as SupportedLanguage 
      : config.defaults.language
  })

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (saved !== 'light' && (config.defaults.theme as Theme) === 'dark')
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    const theme = isDarkMode ? darkTheme : lightTheme
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <AppContext.Provider value={{ language, setLanguage, isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
} 