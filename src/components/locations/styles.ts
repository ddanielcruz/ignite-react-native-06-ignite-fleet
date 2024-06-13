import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  margin-bottom: 24px;
`

export const Line = styled.View`
  height: 64px;
  width: 1px;
  margin: -2px;
  margin-left: 24px;
  border-width: 1px;
  border-left-color: ${({ theme }) => theme.colors.gray400};
`
