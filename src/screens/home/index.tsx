import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { CarStatus } from '@/components/car-status'
import { HistoryCard } from '@/components/history-card'
import { HomeHeader } from '@/components/home-header'
import { Screen } from '@/components/screen'
import { useQuery, useRealm } from '@/lib/realm'
import { History } from '@/lib/realm/schemas/history'

import { Content, EmptyListLabel, Title } from './styles'

export function HomeScreen() {
  const realm = useRealm()
  const navigation = useNavigation()
  const history = useQuery(History)

  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const [usedVehicles, setUsedVehicles] = useState<History[]>([])

  function handleRegisterMovement() {
    if (vehicleInUse) {
      navigation.navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigation.navigate('departure')
    }
  }
  const fetchUsedVehicles = useCallback(() => {
    try {
      const result = history
        .filtered("status = 'arrival'")
        .sorted('updatedAt', true)

      setUsedVehicles([...result])
    } catch (error) {
      console.error(error)
      Alert.alert('Histórico', 'Não foi possível buscar o histórico.')
    }
  }, [history])

  const fetchVehicleInUse = useCallback(() => {
    try {
      const [vehicle] = history.filtered("status = 'departure'")
      setVehicleInUse(vehicle ?? null)
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível buscar o veículo em uso.')
      console.error(error)
    }
  }, [history])

  function handleOpenHistoryDetails(history: History) {
    navigation.navigate('arrival', { id: history._id.toString() })
  }

  useEffect(fetchUsedVehicles, [fetchUsedVehicles])

  useEffect(fetchVehicleInUse, [fetchVehicleInUse])

  useEffect(() => {
    realm.addListener('change', fetchVehicleInUse)
    return () => realm.removeListener('change', fetchVehicleInUse)
  }, [realm, fetchVehicleInUse])

  return (
    <Screen>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.licensePlate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          data={usedVehicles}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <HistoryCard
              history={item}
              onPress={() => handleOpenHistoryDetails(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={() => (
            <EmptyListLabel>
              Nenhum veículo utilizado até o momento.
            </EmptyListLabel>
          )}
        />
      </Content>
    </Screen>
  )
}
