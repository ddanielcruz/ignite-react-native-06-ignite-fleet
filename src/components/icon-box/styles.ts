import styled, { css } from 'styled-components/native'

export type IconBoxSize = 'small' | 'base'

export interface IconBoxStyleProps {
  size?: IconBoxSize
}

const variantSizeStyles = (size: IconBoxSize) => {
  switch (size) {
    case 'small':
      return css`
        width: 32px;
        height: 32px;
      `
    default:
      return css`
        width: 44px;
        height: 44px;
      `
  }
}

export const Container = styled.View<IconBoxStyleProps>`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray700};

  justify-content: center;
  align-items: center;

  ${({ size }) => variantSizeStyles(size ?? 'base')}
`
