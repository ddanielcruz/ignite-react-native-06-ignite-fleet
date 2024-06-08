import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { Container, Input, Label } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export const LicensePlateInput = React.forwardRef<
  TextInput,
  LicensePlateInputProps
>(({ label, ...props }, ref) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input ref={ref} maxLength={7} autoCapitalize="characters" {...props} />
    </Container>
  )
})
LicensePlateInput.displayName = 'LicensePlateInput'
