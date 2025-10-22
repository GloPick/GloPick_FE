import { JOB_OPTIONS } from '@/constants';
import { ISCOJobField } from '@/types/profile';

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
