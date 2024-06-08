import { styled } from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.gray700};
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray400,
}))`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSizes.xxxl}px;
  font-family: ${({ theme }) => theme.fonts.bold};

  text-align: center;
  margin-top: 16px;
`
