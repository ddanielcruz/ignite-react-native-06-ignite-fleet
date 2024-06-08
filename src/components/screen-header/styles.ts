import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 24px 32px;
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`
