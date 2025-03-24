export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
