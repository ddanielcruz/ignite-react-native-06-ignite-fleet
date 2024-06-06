import { useApp, useUser } from '@realm/react'

import { Header } from '../header'
import { TouchableOpacity } from '../touchable-opacity'
import {
  Greeting,
  GreetingMessage,
  SignOutIcon,
  UserImage,
  UserName,
} from './styles'

export function HomeHeader() {
  const app = useApp()
  const user = useUser()

  const pictureUrl = user?.profile?.pictureUrl
  const name = user?.profile?.name ?? ''
  const firstName = name.split(' ')[0]

  async function handleLogout() {
    await app.currentUser?.logOut()
  }

  return (
    <Header>
      <UserImage source={pictureUrl} />

      <Greeting>
        <GreetingMessage>Olá,</GreetingMessage>
        <UserName>{firstName}</UserName>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <SignOutIcon />
      </TouchableOpacity>
    </Header>
  )
}
