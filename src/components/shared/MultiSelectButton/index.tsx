import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import InputField from '../InputField';

interface MultiSelectButtonProps {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
  otherLabel?: string;
  otherValue?: string;
  onOtherChange?: (val: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function MultiSelectButton({
  label,
  options,
  selected,
  onChange,
  otherLabel = '기타',
  otherValue = '',
  onOtherChange,
  error,
  required = false,
  className,
}: MultiSelectButtonProps) {
  const [showInput, setShowInput] = useState(false);

  const isOtherEnabled = typeof otherValue === 'string' && typeof onOtherChange === 'function';

  const toggleSelect = (option: string) => {
    const isSelected = selected.includes(option);
    if (isSelected) {
      onChange(selected.filter((v) => v !== option));
      if (option === otherValue) {
        setShowInput(false);
        onOtherChange?.('');
      }
    } else {
      onChange([...selected, option]);
    }
  };

  const handleOtherClick = () => {
    if (!isOtherEnabled) return;

    if (showInput) {
      // 기타 취소
      setShowInput(false);
      if (otherValue) {
        onChange(selected.filter((v) => v !== otherValue));
        onOtherChange?.('');
      }
    } else {
      // 기타 시작
      setShowInput(true);
    }
  };

  useEffect(() => {
    if (isOtherEnabled && showInput && otherValue) {
      if (!selected.includes(otherValue)) {
        onChange([...selected.filter((v) => v !== ''), otherValue]);
      }
    }
  }, [otherValue]);

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label className="font-semibold text-md text-text">
        {label} {required && <span className="text-text ml-0.5">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleSelect(option)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm border transition-all',
                isSelected
                  ? 'bg-primary text-white border-primary'
                  : 'bg-background-gray text-text border-gray-300 hover:border-primary',
              )}
            >
              {option}
            </button>
          );
        })}

        {/* 기타 버튼은 조건이 충족될 때만 렌더링 */}
        {isOtherEnabled && (
          <button
            type="button"
            onClick={handleOtherClick}
            className={clsx(
              'px-4 py-2 rounded-full text-sm border transition-all',
              showInput
                ? 'bg-primary text-white border-primary'
                : 'bg-background-gray text-text border-gray-300 hover:border-primary',
            )}
          >
            {otherLabel}
          </button>
        )}
      </div>

      {/* 기타 입력창도 마찬가지로 조건 충족 시에만 */}
      {isOtherEnabled && showInput && (
        <InputField
          name="customOption"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="직접 입력"
          required
          error={error} // 필요 시
        />
      )}

      {error && <p className="text-sm text-red mt-2">{error}</p>}
    </div>
  );
}
