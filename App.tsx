import 'react-native-get-random-values'
import '@/lib/dayjs'

import { REALM_APP_ID } from '@env'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { useNetInfo } from '@react-native-community/netinfo'
import { AppProvider, UserProvider } from '@realm/react'
import { StatusBar } from 'expo-status-bar'
import { WifiSlash } from 'phosphor-react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import { Loading } from '@/components/loading'
import TopMessage from '@/components/top-message'
import { RealmProvider } from '@/lib/realm'
import { Routes } from '@/routes'
import { SignInScreen } from '@/screens/sign-in'
import { theme } from '@/styles/theme'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  const netInfo = useNetInfo()

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
          {!netInfo.isConnected && (
            <TopMessage message="Você está offline." icon={WifiSlash} />
          )}

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
