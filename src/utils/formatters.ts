import { COUNTRY_CODE_MAP, JOB_OPTIONS, REQUIRED_FACILITIES } from '@/constants';
import { ISCOJobField } from '@/types/recommendation';

/**
 * 한국어 직무명을 받아 ISCOJobField 객체로 변환
 * @param nameKo 한국어 직무명 (예: "전문가")
 * @returns ISCOJobField 객체 (code, nameKo, nameEn)
 */
export const toISCOJobField = (nameKo: string): ISCOJobField => {
  const found = JOB_OPTIONS.find((opt) => opt.nameKo === nameKo);
  if (!found) {
    throw new Error(`유효하지 않은 직무명입니다: ${nameKo}`);
  }
  return found;
};

/**
 * 국가 코드(alpha-3)를 국기 이미지 URL로 변환
 */
export const getFlagUrl = (code: string, size: number): string => {
  if (!code) return ''; // 코드가 없는 경우
  const alpha2 = COUNTRY_CODE_MAP[code] || code.slice(0, 2).toLowerCase();
  return `https://flagcdn.com/w${size}/${alpha2}.png`;
};

/**
 * 영문 Value(예: 'train_station')를 받아 영문 Category(예: 'transportation')를 반환
 */
export const getCategoryByValue = (value: string): string => {
  const cleanValue = value.trim();
  const facility = REQUIRED_FACILITIES.find((f) => f.value === cleanValue);

  // 매칭된 것이 없으면 'default'를 반환
  return facility ? facility.category : 'default';
};
