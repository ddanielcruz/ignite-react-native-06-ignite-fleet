import { Image } from 'expo-image'
import { Power } from 'phosphor-react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 32px;

  flex-direction: row;
  align-items: center;
`

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const GreetingMessage = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const UserImage = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray600};
`

export const SignOutIcon = styled(Power).attrs(({ theme }) => ({
  size: 32,
  color: theme.colors.gray400,
}))``
