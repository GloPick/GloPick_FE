// 리스트 중 하나 선택, 없으면 직접 입력 (기타)
import { useEffect, useState } from 'react';
import InputField from '../InputField';

type Option = {
  label: string;
  value: string;
};

interface DropdownWithOtherProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  otherLabel?: string;
  required?: boolean;
  error?: string;
}

export default function DropdownWithOther({
  label,
  options,
  value,
  onChange,
  placeholder = '직접 입력',
  otherLabel = '기타 (직접 입력)',
  required = false,
  error,
}: DropdownWithOtherProps) {
  const [isOther, setIsOther] = useState(false);
  const [otherInput, setOtherInput] = useState('');

  useEffect(() => {
    // 최초 렌더링 시 기타인지 확인
    if (!options.some((opt) => opt.value === value) && value !== '') {
      setIsOther(true);
      setOtherInput(value);
    }
  }, [value, options]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === 'other') {
      setIsOther(true);
      setOtherInput('');
      onChange('');
    } else {
      setIsOther(false);
      onChange(selected);
    }
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setOtherInput(input);
    onChange(input);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor="dropdown-with-other" className="font-semibold text-md text-text">
          {label} {required && <span className="text-text ml-0.5">*</span>}
        </label>
      )}

      <select
        id="dropdown-with-other"
        value={isOther ? 'other' : value}
        onChange={handleSelectChange}
        className="w-full border border-gray-300 p-2 rounded"
      >
        <option value="">선택해주세요</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        <option value="other">{otherLabel}</option>
      </select>

      {isOther && (
        <InputField
          name="customOption"
          value={otherInput}
          onChange={handleOtherChange}
          placeholder={placeholder}
          required={required && isOther}
          error={error}
        />
      )}
    </div>
  );
}
