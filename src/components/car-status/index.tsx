import { Car, Key } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, IconBox, Message, TextHighlight } from './styles'

interface CarStatusProps extends TouchableOpacityProps {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...props }: CarStatusProps) {
  const theme = useTheme()

  const Icon = licensePlate ? Key : Car
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Container {...props}>
      <IconBox>
        <Icon size={32} color={theme.colors.brandLight} />
      </IconBox>

      <Message>
        {message}
        <TextHighlight>Clique para registrar a {status}.</TextHighlight>
      </Message>
    </Container>
  )
}
