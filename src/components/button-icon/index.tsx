import { IconProps as PhosphorIconProps } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

export type IconProps = (props: PhosphorIconProps) => JSX.Element

export interface ButtonIconProps
  extends Omit<TouchableOpacityProps, 'children' | 'activeOpacity'> {
  icon: IconProps
}

export function ButtonIcon({ icon: Icon, ...props }: ButtonIconProps) {
  const theme = useTheme()

  return (
    <Container {...props}>
      <Icon size={24} color={theme.colors.brandMid} />
    </Container>
  )
}
