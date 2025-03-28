import React, { useState } from 'react';
import clsx from 'clsx';
import { MultiSelectInputProps } from './types';

export default function MultiSelectInput({
  label,
  selected,
  onChange,
  placeholder = '입력해주세요',
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

  const handleRemove = (item: string) => {
    onChange(selected.filter((val) => val !== item));
  };

  return (
    <div className="flex flex-col max-w-md gap-2">
      {label && <label className="text-sm font-medium text-text">{label}</label>}
      <div
        className={clsx(
          'flex flex-wrap gap-2 p-2 rounded-xl bg-background-gray',
          'focus-within:ring-2 focus-within:ring-primary',
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
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
      </div>
    </div>
  );
}
