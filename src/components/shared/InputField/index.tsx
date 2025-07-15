import clsx from 'clsx';

interface InputFieldProps {
  type?: string;
  label?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

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
    <div className="flex flex-col max-w-full gap-2">
      {label && (
        <label htmlFor={name} className="font-semibold text-md text-text">
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
