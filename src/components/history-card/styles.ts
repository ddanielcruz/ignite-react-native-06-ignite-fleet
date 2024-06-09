import styled from 'styled-components/native'

import { TouchableOpacity } from '../touchable-opacity'

export const Container = styled(TouchableOpacity)`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.gray700};
  padding: 20px 16px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  margin-bottom: 12px;
`

export const Info = styled.View`
  flex: 1;
`

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const Departure = styled.Text`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-top: 4px;
`
