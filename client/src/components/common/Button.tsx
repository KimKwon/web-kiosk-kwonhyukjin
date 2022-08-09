import styled, { css } from 'styled-components';
import { ColorType } from '../../cores/styles/theme';
import { parseCamelToKebab } from '../../utils/parse';

const VARIANT_MAP = {
  contained: (bgColor: ButtonProps['color']) => css`
    border: 3px solid ${({ theme }) => theme.colors[bgColor]};
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
  md: css`
    font-size: 25px;
    font-weight: 700;
    padding: 22px 35px;
  `,
  sm: css`
    font-size: 16px;
    font-weight: 700;
    padding: 13px 36px;
  `,
  lg: css`
    font-size: 36px;
    font-weight: 700;
    padding: 38px 58px;
  `,
};

interface ButtonProps {
  variant: 'contained' | 'outlined';
  color: keyof ColorType;
  onClick?: () => void;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: JSX.Element | React.ReactNode;
  size?: 'md' | 'sm' | 'lg';
  extraStyle?: {
    [cssKey: string]: string;
  };
}

interface StyledButtonProps extends Pick<ButtonProps, 'variant' | 'color' | 'size' | 'extraStyle'> {
  isAnyIcon: boolean;
}

function Button(props: ButtonProps) {
  const {
    children,
    variant,
    color,
    size,
    startIcon: StartIcon,
    endIcon: EndIcon,
    extraStyle,
    onClick,
  } = props;
  return (
    <StButton
      extraStyle={extraStyle}
      variant={variant}
      color={color}
      size={size}
      isAnyIcon={!!StartIcon || !!EndIcon}
      onClick={onClick}
    >
      {StartIcon && <StartIcon />}
      {children}
    </StButton>
  );
}

const StButton = styled.button<StyledButtonProps>`
  ${({ variant, color }) => VARIANT_MAP[variant](color)};
  ${({ size }) => SIZE_MAP[size || 'sm']};

  display: flex;
  justify-content: ${({ isAnyIcon }) => (isAnyIcon ? 'space-between' : 'center')};
  align-items: center;

  border-radius: 15px;

  ${({ extraStyle }) =>
    extraStyle &&
    Object.entries(extraStyle).reduce(
      (acc, [cssKey, cssValue]) =>
        acc.concat(`
    ${parseCamelToKebab(cssKey)}: ${cssValue};
  `),
      '',
    )};
`;

export default Button;
