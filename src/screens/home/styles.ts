import styled from 'styled-components/native'

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-family: ${({ theme }) => theme.fonts.bold};

  margin-bottom: 12px;
`

export const EmptyListLabel = styled.Text`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`
