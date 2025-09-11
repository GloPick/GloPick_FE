// 리스트 중 하나 선택, 없으면 직접 입력 (기타)
import { useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

interface MultiDropdownProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  otherLabel?: string;
}

export default function MultiDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = '직접 입력',
  otherLabel = '기타 (직접 입력)',
}: MultiDropdownProps) {
  const [isOther, setIsOther] = useState(false);
  const [customValue, setCustomValue] = useState('');

  useEffect(() => {
    // 최초 렌더링 시 기타인지 확인
    if (!options.some((opt) => opt.value === value) && value !== '') {
      setIsOther(true);
      setCustomValue(value);
    }
  }, [value, options]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    if (selected === 'other') {
      setIsOther(true);
      setCustomValue('');
      onChange('');
    } else {
      setIsOther(false);
      onChange(selected);
    }
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCustomValue(input);
    onChange(input);
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold text-md text-text">{label}</label>
      <select
        value={isOther ? 'other' : value}
        onChange={handleSelectChange}
        className="w-full border p-2 rounded"
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
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder={placeholder}
          value={customValue}
          onChange={handleCustomInput}
        />
      )}
    </div>
  );
}
