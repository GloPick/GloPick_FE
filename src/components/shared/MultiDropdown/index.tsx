import { useState } from 'react';
import Dropdown from '../Dropdown';

interface MultiDropdownProps<T = string> {
  label?: string;
  name?: string;
  items: DropdownItem<T>[];
  selcted?: T;
  value?: string;
  onChange: (val: string) => void;
}

interface DropdownItem<T = string> {
  name: string;
  value: T;
}

export default function MultiDropdown({ label, items, value = '', onChange }: MultiDropdownProps) {
  const isInitialCustom = value !== '' && !items.some((item) => item.value === value);
  const [isCustomInput, setIsCustomInput] = useState(isInitialCustom);

  const handleSelect = (selected: string) => {
    if (selected === '기타') {
      setIsCustomInput(true);
      onChange('');
    } else {
      setIsCustomInput(false);
      onChange(selected);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Dropdown
        label={label}
        items={[...items, { name: '기타', value: '기타' }]}
        selected={isCustomInput ? '기타' : value}
        onSelect={handleSelect}
      />
      {isCustomInput && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="직접 입력하세요"
          className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}
