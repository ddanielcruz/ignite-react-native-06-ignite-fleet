import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { Container, Input, Label } from './styles'

interface TextAreaProps extends TextInputProps {
  label: string
}

export const TextArea = React.forwardRef<TextInput, TextAreaProps>(
  ({ label, ...props }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>
        <Input ref={ref} multiline autoCapitalize="sentences" {...props} />
      </Container>
    )
  },
)
TextArea.displayName = 'TextArea'
