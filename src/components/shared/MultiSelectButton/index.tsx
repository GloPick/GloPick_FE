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
}

export default function MultiSelectButton({
  label,
  options,
  selected,
  onChange,
  otherLabel = '기타',
  otherValue = '',
  onOtherChange,
  required = false,
}: MultiSelectButtonProps) {
  const [showInput, setShowInput] = useState(false);

  // 기타 입력 기능 활성화 조건
  const isOtherEnabled = typeof otherValue === 'string' && typeof onOtherChange === 'function';

  // 옵션 선택/해제
  const toggleSelect = (option: string) => {
    const isSelected = selected.includes(option); // selected 배열에 option 있는지
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

  // 기타 버튼 클릭
  const handleOtherClick = () => {
    if (!isOtherEnabled) return;

    if (showInput) {
      setShowInput(false);
      if (otherValue) {
        onChange(selected.filter((v) => v !== otherValue));
        onOtherChange?.('');
      }
    } else {
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
    <div className={'flex flex-col gap-2'}>
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

        {/* 기타 버튼 렌더링 */}
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

      {/* 기타 입력창 렌더링 */}
      {isOtherEnabled && showInput && (
        <InputField
          name="customOption"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="직접 입력"
          required={required}
          error={error} // 필요 시
        />
      )}
    </div>
  );
}
