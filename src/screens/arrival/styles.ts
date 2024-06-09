import styled from 'styled-components/native'

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 6px;
`

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.xxxl}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Footer = styled.View`
  margin-top: auto;
  width: 100%;

  flex-direction: row;
  gap: 16px;
`
