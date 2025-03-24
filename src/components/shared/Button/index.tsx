import { ButtonProps } from './types';
import clsx from 'clsx';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyle =
    'px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none hover:bg-opacity-80';

  const variantStyle = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    outline: 'border border-gray-300 text-gray-800 bg-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyle, variantStyle[variant], className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
    >
      {children}
    </button>
  );
}