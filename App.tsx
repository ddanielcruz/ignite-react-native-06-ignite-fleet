import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components'

import { Loading } from './src/components/loading'
import { SignIn } from './src/screens/sign-in'
import { theme } from './src/styles/theme'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      {hasLoadedFonts ? <SignIn /> : <Loading />}
    </ThemeProvider>
  )
}
