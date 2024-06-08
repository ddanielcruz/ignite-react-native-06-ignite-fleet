import { useNavigation } from '@react-navigation/native'

import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'
import { Screen } from '@/components/screen'

import { Content } from './styles'

export function HomeScreen() {
  const navigation = useNavigation()

  function handleRegisterDeparture() {
    navigation.navigate('departure')
  }

  return (
    <Screen>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterDeparture} />
      </Content>
    </Screen>
  )
}
