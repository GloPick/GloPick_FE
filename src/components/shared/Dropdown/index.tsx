import { useState, useRef, useEffect } from 'react';

interface DropdownProps<T = string> {
  label?: string;
  name?: string;
  items: DropdownItem<T>[];
  selected?: T;
  onSelect: (value: T) => void;
}

export interface DropdownItem<T = string> {
  name: string;
  value: T;
}

export default function Dropdown<T = string>({
  label,
  items,
  selected,
  onSelect,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = items.find((item) => item.value === selected);

  return (
    <div className="relative inline-block w-full max-w-full gap-2" ref={dropdownRef}>
      {label && <label className="font-semibold text-md text-text">{label}</label>}

      <button
        className="w-full border border-gray-300 bg-white text-left py-2 px-3 rounded-lg shadow-sm hover:border-primary transition"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selectedItem?.name || '선택하세요'}
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.value as string}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(item.value);
                setIsOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
