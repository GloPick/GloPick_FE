type Option = {
  label: string;
  value: string;
};

interface SelectDropdownProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
}

export default function SelecDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  required = false,
  error,
}: SelectDropdownProps) {
  return (
    <div className="space-y-2">
      <label className="font-semibold text-md text-text">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
