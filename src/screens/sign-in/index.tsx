import { GOOGLE_CLIENT_ID_IOS, GOOGLE_CLIENT_ID_WEB } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Realm, useApp } from '@realm/react'
import { useState } from 'react'
import { Alert } from 'react-native'

import backgroundImg from '@/assets/background.png'
import { Button } from '@/components/button'

import { Container, Slogan, Title } from './styles'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: GOOGLE_CLIENT_ID_WEB,
  iosClientId: GOOGLE_CLIENT_ID_IOS,
})

export function SignInScreen() {
  const realmApp = useApp()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()
      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)
        return await realmApp.logIn(credentials)
      }

      throw new Error('auth-failed')
    } catch (error) {
      if (!(error instanceof Error) || error.message !== 'auth-failed') {
        console.error(error)
      }

      Alert.alert('Não foi possível autenticar com o Google!')
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos.</Slogan>

      <Button onPress={handleGoogleSignIn} loading={isAuthenticating}>
        Entrar com Google
      </Button>
    </Container>
  )
}
