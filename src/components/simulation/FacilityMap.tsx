import { getFacilityLabel } from '@/constants';
import { FacilityLocations, MapResponseData } from '@/types/map';
import { getCategoryByValue } from '@/utils/formatters';
import { getMarkerIcon } from '@/utils/mapStyling';
import React, { useRef, useEffect } from 'react';

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '500px',
  borderRadius: '12px',
};

interface FacilityMapProps {
  apiResponseData: MapResponseData;
}
const FacilityMap = ({ apiResponseData }: FacilityMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  const { mapCenter, facilityLocations } = apiResponseData;

  // 1. 지도 초기화 함수 (전역 콜백)
  const initMap = () => {
    if (!mapRef.current) return;

    // 구글 지도 인스턴스 생성
    const map = new google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: 14,
    });

    // 마커 배치
    placeMarkers(map, facilityLocations);
  };

  // 2. 마커를 지도에 배치하는 함수
  const placeMarkers = (map: google.maps.Map, locations: FacilityLocations) => {
    const markers: google.maps.Marker[] = [];
    const infoWindow = new google.maps.InfoWindow();

    // Object.keys()를 사용하여 안전하게 객체 속성을 순회
    Object.keys(locations).forEach((facilityValue) => {
      const categoryKey = getCategoryByValue(facilityValue);
      const iconSymbol = getMarkerIcon(categoryKey);
      const categoryKoreanLabel = getFacilityLabel(facilityValue);

      locations[facilityValue].forEach((item) => {
        const markerRating = item.rating ? item.rating.toFixed(1) : 'N/A';

        const marker = new google.maps.Marker({
          position: item.location,
          map: map,
          title: `${categoryKoreanLabel}: ${item.name} (평점: ${markerRating})`,
          icon: iconSymbol,
          label: {
            text: markerRating, // 평점 텍스트
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#ffffff', // 심볼 색상과 대비되도록 흰색 설정
          },
        });

        marker.addListener('click', () => {
          const content = `
                    <div style="padding: 5px 10px; line-height: 1.5;">
                        <h4 style="margin-top: 0; margin-bottom: 5px; font-size: 15px; font-weight: bold; color: #1F2937;">${item.name}</h4>
                        <p style="margin: 0; font-size: 12px; color: #6B7280;">${item.address || '주소 정보 없음'}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; font-weight: 600;">
                            평점: <strong style="color: #3B82F6;">${markerRating}</strong> (${categoryKoreanLabel})
                        </p>
                    </div>
                `;

          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
        markers.push(marker);
      });
    });
  };

  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error('Google Maps API 키가 없습니다. .env 파일을 확인하세요.');
      return;
    }

    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).initMap = initMap;

    // API 스크립트 생성 및 삽입
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).initMap;
      document.head.removeChild(script);
    };
  }, [googleMapsApiKey]); // 의존성 배열에 키를 넣어 재로드 방지

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-xl font-bold mb-4">주요 시설 지도</h3>
      {/* 지도가 렌더링될 영역 */}
      <div ref={mapRef} style={mapContainerStyle} />
    </div>
  );
};

export default FacilityMap;
