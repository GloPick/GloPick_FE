import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white' | 'none';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  type = 'button',
  variant = 'none',
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyle =
    'px-6 py-3 rounded-sm text-sm transition-all focus:outline-none hover:bg-opacity-80';

  const variantStyle = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-2 text-white',
    outline: 'border border-gray-300 text-gray-800 bg-white',
    white: 'border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100',
    none: '',
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
