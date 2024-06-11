import { useNavigation, useRoute } from '@react-navigation/native'
import { X as XIcon } from 'phosphor-react-native'
import { Alert } from 'react-native'
import { BSON } from 'realm'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Screen } from '@/components/screen'
import { ScreenHeader } from '@/components/screen-header'
import { useObject, useRealm } from '@/lib/realm'
import { History } from '@/lib/realm/schemas/history'
import { stopLocationTask } from '@/tasks/background-location-task'

import { Content, Description, Footer, Label, LicensePlate } from './styles'

export function ArrivalScreen() {
  const navigation = useNavigation()
  const params = useRoute().params as { id: string }
  const historyId = new BSON.UUID(params.id) as unknown as string

  const history = useObject(History, historyId)
  const realm = useRealm()
  const isVehicleInUse = history?.status === 'departure'

  async function removeVehicle() {
    realm.write(() => {
      realm.delete(history)
    })

    await stopLocationTask()

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

      await stopLocationTask()

      realm.write(() => {
        history.status = 'arrival'
        history.updatedAt = new Date()
      })

      Alert.alert('Sucesso', 'Chegada registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      if (!(error instanceof Error) || error.message !== 'vehicle-not-found') {
        console.error(error)
      }

      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  return (
    <Screen>
      <ScreenHeader title={isVehicleInUse ? 'Chegada' : 'Detalhes'} />

      <Content>
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
