import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { Container } from './styles'

interface BaseHeaderProps extends SafeAreaViewProps {}

export function BaseHeader({ style, ...props }: BaseHeaderProps) {
  const insets = useSafeAreaInsets()

  return <Container style={[style, { paddingTop: insets.top }]} {...props} />
}
