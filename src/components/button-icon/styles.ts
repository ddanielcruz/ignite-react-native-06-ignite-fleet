import { styled } from 'styled-components/native'

import { TouchableOpacity } from '../touchable-opacity'

export const Container = styled(TouchableOpacity)`
  height: 56px;
  width: 56px;
  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.gray600};
`
