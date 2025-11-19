import { GetSimulationResponseData } from '@/types/profile';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionCard from './SectionCard';
import { Button } from '../shared';

interface SimulationListSectionProps {
  simulations: GetSimulationResponseData[];
}

const SimulationList = ({ simulations }: SimulationListSectionProps) => {
  const navigate = useNavigate();

  const handleViewResult = (simulation: GetSimulationResponseData) => {
    // FlightLinks는 API 응답에 없으므로 임시 객체로 처리
    const flightLinksPlaceholder = {
      googleFlights: '#',
      skyscanner: '#',
    };
    // SimulationResultPage가 기대하는 state 구조로 데이터를 매핑
    const statePayload = {
      // ResultPage에서 'simulation' 키로 기대하는 상세 결과 객체
      simulation: simulation.result,

      // Hero 섹션 번역에 필요한 원본 요청 시설 목록
      requiredFacilities: simulation.input.requiredFacilities,

      // ID 및 FlightLinks
      simulationId: simulation._id,
      flightLinks: flightLinksPlaceholder,
    };

    // 상세 결과 페이지로 이동 (ID는 URL에 포함, 데이터는 state에 포함)
    // 이렇게 하면 ResultPage는 API 호출 없이 즉시 렌더링됩니다.
    navigate(`/simulation/result/${simulation._id}`, {
      state: statePayload,
    });
  };

  return (
    <SectionCard title="저장된 시뮬레이션">
      <div className="space-y-4">
        {simulations.length > 0 ? (
          simulations.map((simulation) => (
            <div
              key={simulation._id}
              className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md hover:border-blue-500 cursor-pointer transition-all"
              onClick={() => handleViewResult(simulation)}
            >
              <div>
                {/* 요약 정보 */}
                <h4 className="font-bold text-lg text-gray-800">
                  {simulation.input.selectedCity}, {simulation.input.selectedCountry}
                </h4>
              </div>
              <Button onClick={() => handleViewResult(simulation)}>결과 보기 &rarr;</Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">저장된 시뮬레이션 결과가 없습니다.</p>
        )}
      </div>
    </SectionCard>
  );
};

export default SimulationList;
