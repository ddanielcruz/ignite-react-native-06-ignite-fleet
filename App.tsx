import { REALM_APP_ID } from '@env'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { AppProvider, UserProvider } from '@realm/react'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components'

import { HomeScreen } from '@/screens/home'

import { Loading } from './src/components/loading'
import { SignInScreen } from './src/screens/sign-in'
import { theme } from './src/styles/theme'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!hasLoadedFonts) {
    return (
      <ThemeProvider theme={theme}>
        <Loading />
      </ThemeProvider>
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <UserProvider fallback={SignInScreen}>
          <HomeScreen />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
