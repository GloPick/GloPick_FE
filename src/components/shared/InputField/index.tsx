import { InputFieldProps } from './types';
import clsx from 'clsx';

export default function InputField({
  type,
  label,
  name,
  value,
  placeholder,
  onChange,
  error,
  disabled = false,
  className,
}: InputFieldProps) {
  return (
    <div className="flex flex-col max-w-md gap-2">
      {label && (
        <label htmlFor={name} className="font-medium text-sm text-text">
          {label}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'w-full p-3 text-sm text-text bg-background-gray placeholder-placeholder rounded-xl focus:outline-none shadow-inner',
          error ? 'shadow-red' : 'shadow-inner',
          className,
        )}
      />
      {error && <span className="text-sm text-red mt-2">{error}</span>}
    </div>
  );
}
