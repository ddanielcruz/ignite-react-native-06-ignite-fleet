import styled from 'styled-components/native'

import { TouchableOpacity } from '../touchable-opacity'

export const Container = styled(TouchableOpacity)`
  width: 100%;
  margin: 32px 0;
  padding: 20px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.gray700};

  flex-direction: row;
  align-items: center;
`

export const IconBox = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray600};

  margin-right: 12px;

  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  flex: 1;
`

export const TextHighlight = styled.Text`
  color: ${({ theme }) => theme.colors.brandLight};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`
