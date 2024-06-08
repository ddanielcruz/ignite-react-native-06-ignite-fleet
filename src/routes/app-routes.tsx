import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DepartureScreen } from '@/screens/departure'
import { HomeScreen } from '@/screens/home'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="departure" component={DepartureScreen} />
    </Navigator>
  )
}
