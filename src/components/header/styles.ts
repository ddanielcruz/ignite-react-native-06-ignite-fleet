import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
`

export const Children = styled.View`
  padding: 32px;

  flex-direction: row;
  align-items: center;
`
