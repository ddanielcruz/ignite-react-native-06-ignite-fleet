import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import { useRef, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native'

import { Button } from '@/components/button'
import { LicensePlateInput } from '@/components/license-plate-input'
import { Screen } from '@/components/screen'
import { ScreenHeader } from '@/components/screen-header'
import { TextArea } from '@/components/text-area'
import { useRealm } from '@/lib/realm'
import { History } from '@/lib/realm/schemas/history'
import { isValidLicensePlate } from '@/utils/validations'

import { Content } from './styles'

const keyboardAvoidingViewBehavior =
  Platform.OS === 'ios' ? 'padding' : 'height'

export function DepartureScreen() {
  const realm = useRealm()
  const user = useUser()!
  const navitation = useNavigation()
  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

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
      navitation.goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <Screen>
      <ScreenHeader title="Saída" />

      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
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
      </KeyboardAvoidingView>
    </Screen>
  )
}
