import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const dimensions = Dimensions.get('window')

export const Container = styled.View`
  position: absolute;

  width: ${dimensions.width}px;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.gray500};
  padding-bottom: 6px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-left: 4px;
`
