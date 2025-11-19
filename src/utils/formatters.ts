import { COUNTRY_CODE_MAP, JOB_OPTIONS } from '@/constants';
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
