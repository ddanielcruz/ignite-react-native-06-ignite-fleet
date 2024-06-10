import { ViewProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { IconProps } from '../button-icon'
import { Container, IconBoxSize } from './styles'

export interface IconBoxProps extends Omit<ViewProps, 'children'> {
  size?: IconBoxSize
  icon: IconProps
}

export function IconBox({ size, icon: Icon, ...props }: IconBoxProps) {
  const theme = useTheme()
  const iconSize = size === 'small' ? 16 : 24

  return (
    <Container size={size} {...props}>
      <Icon size={iconSize} color={theme.colors.brandLight} />
    </Container>
  )
}
