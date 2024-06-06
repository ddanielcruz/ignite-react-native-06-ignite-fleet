import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { Children, Container } from './styles'

interface HeaderProps extends SafeAreaViewProps {}

export function Header({ children, style, ...props }: HeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <Container style={[style, { paddingTop: insets.top }]} {...props}>
      <Children>{children}</Children>
    </Container>
  )
}
