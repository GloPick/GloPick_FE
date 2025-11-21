import { GetSimulationResponseData } from '@/types/profile';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionCard from './SectionCard';
import { Button } from '../shared';
import { FileQuestion } from 'lucide-react';

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
      simulation: simulation.result,

      requiredFacilities: simulation.input.requiredFacilities,

      simulationId: simulation._id,
      flightLinks: flightLinksPlaceholder,
    };

    navigate(`/simulation/result/${simulation._id}`, {
      state: statePayload,
    });
  };

  if (!simulations || simulations.length === 0) {
    return (
      <SectionCard title="저장된 시뮬레이션">
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FileQuestion className="w-10 h-10 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium mb-1">아직 저장된 시뮬레이션 결과가 없습니다.</p>
          <p className="text-sm text-gray-400 mb-6">
            나에게 딱 맞는 국가와 도시를 찾고 시뮬레이션을 시작해보세요!
          </p>
          <Button variant="primary" onClick={() => navigate('/profile')} className="text-sm px-6">
            국가 추천 받으러 가기
          </Button>
        </div>
      </SectionCard>
    );
  }

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
