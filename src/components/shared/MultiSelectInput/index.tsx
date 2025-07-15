import React, { useState } from 'react';
import clsx from 'clsx';

interface MultiSelectInputProps {
  label?: string;
  selected: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function MultiSelectInput({
  label,
  selected,
  onChange,
  placeholder = '입력해주세요',
  error,
  className,
}: MultiSelectInputProps) {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim() && !isComposing) {
      e.preventDefault();
      if (!selected.includes(input.trim())) {
        onChange([...selected, input.trim()]);
        setInput('');
      }
    }
  };

  const handleBlur = () => {
    const trimmed = input.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
      setInput('');
    }
  };

  const handleRemove = (item: string) => {
    onChange(selected.filter((val) => val !== item));
  };

  return (
    <div className="flex flex-col max-w-full gap-2">
      {label && <label className="text-md font-semibold text-text">{label}</label>}
      <div
        className={clsx(
          'flex flex-wrap gap-2 p-2 rounded-xl bg-background-gray',
          'ring-1 ring-transparent shadow-inner',
          error ? 'shadow-red' : 'shadow-inner',
          className,
        )}
      >
        {selected.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm font-medium"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="text-xs text-white hover:text-gray-200"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 min-w-28 p-2 bg-transparent outline-none text-sm placeholder-placeholder"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
      </div>
      {error && <span className="text-sm text-red mt-2">{error}</span>}
    </div>
  );
}
