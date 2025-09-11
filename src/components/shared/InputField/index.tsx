import clsx from 'clsx';

interface InputFieldProps {
  type?: string;
  label?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
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
  required = false,
  className,
}: InputFieldProps) {
  return (
    <div className="flex flex-col max-w-full gap-2">
      {label && (
        <label className="font-semibold text-md text-text">
          {label} {required && <span className="text-text ml-0.5">*</span>}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full p-2 text-text placeholder-placeholder rounded border',
          error ? 'border-red' : 'border-gray-300',
          className,
        )}
      />
      {error && <span className="text-sm text-red mt-2">{error}</span>}
    </div>
  );
}
