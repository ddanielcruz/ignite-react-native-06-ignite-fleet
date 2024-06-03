import { TouchableOpacityProps } from 'react-native'

import { Container, Content, LoadingIndicator } from './styles'

export interface ButtonProps
  extends Omit<TouchableOpacityProps, 'children' | 'activeOpacity'> {
  children: string
  loading?: boolean
}

export function Button({ children, loading = false, ...props }: ButtonProps) {
  return (
    <Container disabled={loading} {...props}>
      {loading ? <LoadingIndicator /> : <Content>{children}</Content>}
    </Container>
  )
}
