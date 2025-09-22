import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  maxLength = 100,
  className,
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (!textAreaRef.current) return;
    const textAreaLineHeight = 24;
    const previousRows = textAreaRef.current.rows;
    textAreaRef.current.rows = 1;
    const currentRows = Math.floor(textAreaRef.current.scrollHeight / textAreaLineHeight);

    if (currentRows !== previousRows) {
      setRows(currentRows);
    }

    textAreaRef.current.rows = currentRows;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      onChange(input);
    }
  };

  return (
    <div className="w-full max-w-full">
      <div className="relative">
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className={clsx(
            'w-full pt-3 pl-2 pb-7 rounded border border-gray-300 focus:outline-none resize-none',
            'text-text placeholder-placeholder',
            className,
          )}
        />
        <div className="absolute bottom-3 right-3 text-xs text-text">
          <span className="text-red">{value.length}</span>
          <span className="text-text">/{maxLength}</span>
        </div>
      </div>
    </div>
  );
}
