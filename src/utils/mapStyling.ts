/**
 * 시설 종류에 따른 색상 및 심볼 설정
 */
const CATEGORY_COLORS: { [key: string]: string } = {
  medical: '#E74C3C', // 진한 빨간색 (의료/안전)
  education: '#2ECC71', // 녹색 (교육/성장)
  transportation: '#3498DB', // 파란색 (교통/이동)
  living: '#F39C12', // 주황색 (생활/편의)
  public: '#9B59B6', // 보라색 (공공/행정)
  leisure: '#1ABC9C', // 청록색 (문화/여가)
  religious: '#34495E', // 진한 회색 (종교)
  default: '#7F8C8D', // 회색 (기본값)
};

/* 시설 종류 이름(한국어)을 받아 구글 맵 Symbol 객체를 반환 */
export const getMarkerIcon = (categoryName: string): google.maps.Symbol => {
  const color = CATEGORY_COLORS[categoryName] || CATEGORY_COLORS.default;

  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 12,
    fillColor: color,
    fillOpacity: 0.95,
    strokeWeight: 2,
    strokeColor: '#333333',
  };
};
