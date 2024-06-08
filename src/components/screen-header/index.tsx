import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { BaseHeader } from '../base-header'
import { TouchableOpacity } from '../touchable-opacity'
import { Container, Title } from './styles'

interface ScreenHeaderProps {
  title?: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <BaseHeader>
      <Container>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} weight="bold" color={theme.colors.brandLight} />
        </TouchableOpacity>

        {title && <Title>{title}</Title>}
      </Container>
    </BaseHeader>
  )
}
