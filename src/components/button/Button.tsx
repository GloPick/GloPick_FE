import cn from 'classnames';
import { baseStyle, sizeStyle, colorStyle } from '@/components/Button/styles';

interface ButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  text,
  size = 'md',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseStyle,
        sizeStyle[size],
        colorStyle[color],
        {
          'w-full': fullWidth,
        },
        className,
      )}
    >
      {text}
    </button>
  );
};

export default Button;
