import styled from 'styled-components/native'

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }) => theme.colors.gray800};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.brandLight};
  font-size: ${({ theme }) => theme.fontSize.xxxl}px;
  font-family: ${({ theme }) => theme.fontFamily.bold};
  text-align: center;
  margin-bottom: 6px;
`

export const Slogan = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-family: ${({ theme }) => theme.fontFamily.regular};
  text-align: center;

  margin-bottom: 32px;
`
