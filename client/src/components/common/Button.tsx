import styled, { css } from 'styled-components';
import { ColorType } from '../../cores/styles/theme';

const VARIANT_MAP = {
  contained: (bgColor: ButtonProps['color']) => css`
    background-color: ${({ theme }) => theme.colors[bgColor]};
    color: white;
  `,
  outlined: (color: ButtonProps['color']) => css`
    border: 3px solid ${({ theme }) => theme.colors[color]};
    background-color: transparent;
    color: ${({ theme }) => theme.colors[color]}; ;
  `,
};

interface ButtonProps {
  variant: 'contained' | 'outlined';
  color: keyof ColorType;
  onClick?: () => void;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: JSX.Element | React.ReactNode;
  size?: 'lg' | 'sm';
}

function Button(props: ButtonProps) {
  const { children, variant, color, size = 'lg' } = props;
  return (
    <StButton variant={variant} color={color} size={size}>
      {children}
    </StButton>
  );
}

const StButton = styled.button<Pick<ButtonProps, 'variant' | 'color' | 'size'>>`
  ${({ variant, color }) => VARIANT_MAP[variant](color)};
  ${({ size }) => {
    return size === 'lg'
      ? css`
          min-width: 328px;
          font-size: 40px;
          padding: 40px 62px;
        `
      : css`
          font-size: 40px;
          padding: 13px 34px;
        `;
  }};

  border-radius: 15px;
`;

export default Button;
