import styled from 'styled-components/native'

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
`
export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`
