import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

import { IconProps } from '../button-icon'
import { Container, Message } from './styles'

interface TopMessageProps {
  icon?: IconProps
  message: string
}

export default function TopMessage({ message, icon: Icon }: TopMessageProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <Container style={{ paddingTop: insets.top }}>
      {Icon && <Icon size={18} color={theme.colors.gray100} />}
      <Message>{message}</Message>
    </Container>
  )
}
