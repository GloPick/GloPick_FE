import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { FACILITIES_BY_CATEGORY, FacilityValue, getFacilityLabel } from '@/constants';

interface MultiSelectDropdownProps {
  label: string;
  selectedValues: FacilityValue[];
  onChange: (value: FacilityValue) => void; // 부모의 state 변경 함수
  maxSelect: number; // 최대 선택 가능 개수
  error?: string | null;
  required?: boolean;
}

export default function MultiSelectDropdown({
  label,
  selectedValues,
  onChange,
  maxSelect,
  error,
  required,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 트리거 버튼에 표시될 텍스트
  const getTriggerText = () => {
    const count = selectedValues.length;
    if (count === 0) {
      return `필수 편의시설 선택 (최대 ${maxSelect}개)`;
    }
    if (count <= 2) {
      // 1~2개 선택 시: "약국, 공원"
      return selectedValues.map((val) => getFacilityLabel(val)).join(', ');
    }
    // 3개 이상 선택 시: "3개 시설 선택됨"
    return `${count}개 시설 선택됨`;
  };

  const isMaxReached = selectedValues.length >= maxSelect;

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="font-semibold text-md text-gray-700">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full border p-2 rounded text-left flex justify-between items-center ${
          error ? 'border-red-500' : 'border-gray-300'
        } text-sm`}
      >
        <span className={selectedValues.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
          {getTriggerText()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 패널 */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {/* FACILITIES_BY_CATEGORY 상수를 기반으로 카테고리별 렌더링 */}
          {Object.entries(FACILITIES_BY_CATEGORY).map(([categoryKey, categoryData]) => (
            <div key={categoryKey} className="py-2">
              <h5 className="text-xs font-bold text-gray-500 uppercase px-3 pt-2 pb-1">
                {categoryData.label}
              </h5>
              {categoryData.facilities.map((facility) => {
                const isSelected = selectedValues.includes(facility.value);
                return (
                  <label
                    key={facility.value}
                    className={`flex items-center p-2 mx-2 rounded text-sm ${
                      isMaxReached && !isSelected
                        ? 'text-gray-400 cursor-not-allowed' // 최대 개수 도달 시 비활성화
                        : 'hover:bg-gray-100 cursor-pointer'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onChange(facility.value)}
                      disabled={isMaxReached && !isSelected}
                      className="mr-2 rounded"
                    />
                    {facility.label}
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
