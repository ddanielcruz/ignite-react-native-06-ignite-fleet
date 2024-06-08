import { TextInputProps } from 'react-native'

import { Container, Input, Label } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export function LicensePlateInput({ label, ...props }: LicensePlateInputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input maxLength={7} autoCapitalize="characters" {...props} />
    </Container>
  )
}
