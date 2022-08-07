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

const SIZE_MAP = {
  lg: css`
    min-width: 328px;
    font-size: 40px;
    font-weight: 600;
    padding: 40px 62px;
  `,
  sm: css`
    font-size: 40px;
    font-weight: 700;
    padding: 13px 34px;
  `,
  huge: css`
    min-width: 627px;
    font-size: 60px;
    font-weight: 700;
    padding: 62px 93px;
  `,
};

interface ButtonProps {
  variant: 'contained' | 'outlined';
  color: keyof ColorType;
  onClick?: () => void;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: JSX.Element | React.ReactNode;
  size?: 'lg' | 'sm' | 'huge';
}

interface StyledButtonProps extends Pick<ButtonProps, 'variant' | 'color' | 'size'> {
  isAnyIcon: boolean;
}

function Button(props: ButtonProps) {
  const { children, variant, color, size, startIcon: StartIcon, endIcon: EndIcon } = props;
  return (
    <StButton variant={variant} color={color} size={size} isAnyIcon={!!StartIcon || !!EndIcon}>
      {StartIcon && <StartIcon />}
      {children}
    </StButton>
  );
}

const StButton = styled.button<StyledButtonProps>`
  ${({ variant, color }) => VARIANT_MAP[variant](color)};
  ${({ size }) => SIZE_MAP[size || 'lg']};

  display: flex;
  justify-content: ${({ isAnyIcon }) => (isAnyIcon ? 'space-between' : 'center')};
  align-items: center;

  border-radius: 15px;
`;

export default Button;
