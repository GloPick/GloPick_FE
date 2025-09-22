import React from 'react';

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  required = false,
  error,
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="font-semibold text-md text-text">
        {label} {required && <span className="text-text ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border p-2 rounded ${error ? 'border-red' : 'border-gray-300'}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red mt-2">{error}</p>}
    </div>
  );
}
