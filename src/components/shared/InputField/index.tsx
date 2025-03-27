import { InputFieldProps } from './type';
import clsx from 'clsx';

export default function InputField({
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
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-base text-dark mb-3">
          {label}
        </label>
      )}

      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-4 text-base text-text bg-background-gray placeholder-placeholder rounded-xl focus:outline-none shadow-inner',
          error ? 'shadow-red' : 'shadow-inner',
          className,
        )}
      />
      {error && <span className="text-sm text-red mt-2">{error}</span>}
    </div>
  );
}
