import { GOOGLE_CLIENT_ID_IOS, GOOGLE_CLIENT_ID_WEB } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
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

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()
      if (idToken) {
        // TODO Send the token to the backend
        return
      }

      throw new Error('Authentication failed!')
    } catch (error) {
      console.error(error)
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
