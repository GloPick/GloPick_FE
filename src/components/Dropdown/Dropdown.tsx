import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label?: string;
  items: string[];
  selected?: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, items, selected, onSelect }: DropdownProps) => {
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

  return (
    <div className="relative inline-block w-full max-w-xs" ref={dropdownRef}>
      {label && <label className="block mb-1 text-sm text-text">{label}</label>}

      <button
        className="w-full border border-gray-300 bg-white text-left py-2 px-3 rounded-lg shadow-sm hover:border-primary transition"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selected || '선택하세요'}
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {items.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
