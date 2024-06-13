import { useNavigation, useRoute } from '@react-navigation/native'
import { X as XIcon } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { BSON } from 'realm'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Locations } from '@/components/locations'
import { Map } from '@/components/map'
import { Screen } from '@/components/screen'
import { ScreenHeader } from '@/components/screen-header'
import {
  getStoredLocations,
  removeStoredLocations,
  StorageLocation,
} from '@/lib/async-storage/location'
import { useObject, useRealm } from '@/lib/realm'
import { Coords } from '@/lib/realm/schemas/coords'
import { History } from '@/lib/realm/schemas/history'
import { stopLocationTask } from '@/tasks/background-location-task'
import { getAddressLocation } from '@/utils/get-address-location'

import { Content, Description, Footer, Label, LicensePlate } from './styles'

export function ArrivalScreen() {
  const navigation = useNavigation()
  const params = useRoute().params as { id: string }
  const historyId = new BSON.UUID(params.id) as unknown as string
  const history = useObject(History, historyId)
  const realm = useRealm()
  const isVehicleInUse = history?.status === 'departure'

  const [coordinates, setCoordinates] = useState<StorageLocation[]>([])
  const [departureLocation, setDepartureLocation] = useState('')
  const [arrivalLocation, setArrivalLocation] = useState('')

  async function removeVehicle() {
    realm.write(() => {
      realm.delete(history)
    })

    await Promise.all([stopLocationTask(), removeStoredLocations()])

    navigation.goBack()
  }

  function handleCancelUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: removeVehicle },
    ])
  }

  async function handleArrival() {
    try {
      if (!history) {
        throw new Error('vehicle-not-found')
      }

      const coords = await getStoredLocations()

      realm.write(() => {
        history.status = 'arrival'
        history.updatedAt = new Date()
        history.coords.push(...(coords as Coords[]))
      })

      await Promise.all([stopLocationTask(), removeStoredLocations()])

      Alert.alert('Sucesso', 'Chegada registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      if (!(error instanceof Error) || error.message !== 'vehicle-not-found') {
        console.error(error)
      }

      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  useEffect(() => {
    if (!history) {
      return
    }

    if (history.status === 'arrival') {
      const coords = (history.coords || []).map((coords) => ({
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: coords.timestamp,
      }))

      setCoordinates(coords)
      if (coords.length) {
        getAddressLocation(coords[0]).then((location) => {
          setDepartureLocation(location || '')
        })
        getAddressLocation(coords[coords.length - 1]).then((location) => {
          setArrivalLocation(location || '')
        })
      }
    } else {
      getStoredLocations().then((coords) => setCoordinates(coords))
    }
  }, [history])

  return (
    <Screen>
      <ScreenHeader title={isVehicleInUse ? 'Chegada' : 'Detalhes'} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        {!isVehicleInUse && (
          <Locations
            departure={{ label: 'Saída', location: departureLocation }}
            arrival={{ label: 'Chegada', location: arrivalLocation }}
          />
        )}

        <Label>Placa do veículo</Label>
        <LicensePlate>{history?.licensePlate}</LicensePlate>

        <Label style={{ marginTop: 32 }}>Finalidade</Label>
        <Description>{history?.description}</Description>

        {isVehicleInUse && (
          <Footer>
            <ButtonIcon icon={XIcon} onPress={handleCancelUsage} />
            <Button onPress={handleArrival}>Registrar chegada</Button>
          </Footer>
        )}
      </Content>
    </Screen>
  )
}
