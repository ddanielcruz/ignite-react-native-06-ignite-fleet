import 'react-native-get-random-values'
import '@/lib/dayjs'

import { REALM_APP_ID } from '@env'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { AppProvider, UserProvider } from '@realm/react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import { Loading } from '@/components/loading'
import { RealmProvider } from '@/lib/realm'
import { Routes } from '@/routes'
import { SignInScreen } from '@/screens/sign-in'
import { theme } from '@/styles/theme'

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
      <SafeAreaProvider
        style={{
          flex: 1,
          backgroundColor: theme.colors.gray800,
        }}
      >
        <ThemeProvider theme={theme}>
          <StatusBar style="light" />
          <UserProvider fallback={SignInScreen}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProvider>
  )
}
