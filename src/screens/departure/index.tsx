import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import { useForegroundPermissions } from 'expo-location'
import { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/button'
import { LicensePlateInput } from '@/components/license-plate-input'
import { Screen } from '@/components/screen'
import { ScreenHeader } from '@/components/screen-header'
import { TextArea } from '@/components/text-area'
import { useRealm } from '@/lib/realm'
import { History } from '@/lib/realm/schemas/history'
import { isValidLicensePlate } from '@/utils/validations'

import { Content, Message } from './styles'

export function DepartureScreen() {
  const realm = useRealm()
  const user = useUser()!
  const navigation = useNavigation()
  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)
  const [locationForegroundPermissions, requestLocationForegroundPermissions] =
    useForegroundPermissions()
  const hasLocationPermission = locationForegroundPermissions?.granted ?? false

  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  async function handleRegisterDeparture() {
    if (!isValidLicensePlate(licensePlate)) {
      licensePlateRef.current?.focus()
      return Alert.alert(
        'Placa inválida',
        'A placa informada não é válida. Por favor, verifique e tente novamente.',
      )
    }

    const isDescriptionEmpty = !description.trim()
    if (isDescriptionEmpty) {
      descriptionRef.current?.focus()
      return Alert.alert(
        'Finalidade',
        'Por favor, informe a finalidade da utilização do veículo.',
      )
    }

    try {
      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'History',
          History.create({
            userId: user.id,
            licensePlate: licensePlate.toUpperCase(),
            description: description.trim(),
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
    } finally {
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermissions()
  }, [requestLocationForegroundPermissions])

  if (!hasLocationPermission) {
    return (
      <Screen>
        <ScreenHeader title="Saída" />

        <Content>
          <Message>
            Para registrar a saída do veículo, é necessário conceder permissão
            de localização.
          </Message>
        </Content>
      </Screen>
    )
  }

  return (
    <Screen>
      <ScreenHeader title="Saída" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              value={licensePlate}
              onChangeText={setLicensePlate}
            />

            <TextArea
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              onSubmitEditing={handleRegisterDeparture}
              blurOnSubmit
              value={description}
              onChangeText={setDescription}
            />

            <Button
              onPress={handleRegisterDeparture}
              loading={isRegistering}
              disabled={isRegistering}
            >
              Registrar saída
            </Button>
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Screen>
  )
}
