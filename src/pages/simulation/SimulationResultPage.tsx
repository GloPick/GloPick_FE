import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/shared';
import {
  MapPin,
  DollarSign,
  Home,
  Briefcase,
  Users,
  Plane,
  Info,
  CheckCircle,
  AlertTriangle,
  Shield,
  Train,
  MessageSquare,
  Users2,
  Building,
  Banknote,
  BookOpen,
  LinkIcon,
  ImageIcon,
  Printer,
} from 'lucide-react';
import SectionCard from '@/components/simulation/SectionCard';
import InfoRow from '@/components/simulation/InfoRow';
import ListRow from '@/components/simulation/ListRow';
import { FlightLinks, SimulationResult } from '@/types/profile';
import { getFacilityLabel } from '@/constants';

const SimulationResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { simulation, flightLinks, simulationId, requiredFacilities } = (location.state || {}) as {
    simulation: SimulationResult;
    flightLinks: FlightLinks;
    simulationId: string;
    requiredFacilities: string[];
  };

  if (!simulation) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg">시뮬레이션 결과가 없습니다 😢</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  const {
    country,
    recommendedCity,
    localInfo,
    estimatedMonthlyCost,
    initialSetup,
    jobReality,
    culturalIntegration,
  } = simulation;

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Hero 섹션 */}
        <section className="relative bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden py-12 px-8">
          <div className="relative z-10">
            <p className="text-base font-semibold text-blue-600 mb-2">
              {country} 정착 시뮬레이션 결과
            </p>

            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
              {recommendedCity}
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">{localInfo.climateSummary}</p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-700">요청하신 필수 편의시설</h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-3 text-sm text-gray-800">
                {requiredFacilities?.map((facilityValue) => (
                  <li
                    key={facilityValue}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1.5"
                  >
                    <CheckCircle className="w-4 h-4 mr-1.5 text-blue-500" />
                    {getFacilityLabel(facilityValue)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 월 예상 생활비 */}
        <SectionCard
          title="월 예상 생활비 상세"
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
        >
          {/* ⬇️ 월 총계를 카드의 맨 위로 이동 ⬇️ */}
          <div className="bg-blue-50 p-6 rounded-lg text-center mb-6">
            <p className="text-lg font-semibold text-blue-800">월 예상 총계</p>
            <p className="text-5xl font-extrabold text-blue-600 my-1">
              {estimatedMonthlyCost.total}
            </p>
            <p className="text-md text-blue-700">(1년 기준: {estimatedMonthlyCost.oneYearCost})</p>
          </div>

          <div className="space-y-4">
            <dl>
              <InfoRow label="주거비" icon={<Home className="w-4 h-4" />}>
                <span className="font-semibold">{estimatedMonthlyCost.housing}</span>
              </InfoRow>
              <InfoRow label="식비" icon={<DollarSign className="w-4 h-4" />}>
                <span className="font-semibold">{estimatedMonthlyCost.food}</span>
              </InfoRow>
              <InfoRow label="교통/통신" icon={<Train className="w-4 h-4" />}>
                <span className="font-semibold">{estimatedMonthlyCost.transportation}</span>
              </InfoRow>
              <InfoRow label="기타" icon={<Info className="w-4 h-4" />}>
                <span className="font-semibold">{estimatedMonthlyCost.etc}</span>
              </InfoRow>
            </dl>

            <dl>
              <InfoRow label="현지 물가 정보" icon={<Info className="w-4 h-4" />}>
                {estimatedMonthlyCost.cpi}
              </InfoRow>
              <InfoRow label="비용 절감 팁" icon={<CheckCircle className="w-4 h-4" />}>
                {estimatedMonthlyCost.costCuttingTips}
              </InfoRow>
            </dl>
          </div>
        </SectionCard>

        {/* 현지 생활 정보 */}
        <SectionCard title="현지 생활 정보" icon={<MapPin className="w-6 h-6 text-blue-600" />}>
          <dl>
            <InfoRow label="대중교통" icon={<Train className="w-4 h-4" />}>
              {localInfo.publicTransport}
            </InfoRow>
            <InfoRow label="안전 수준" icon={<Shield className="w-4 h-4" />}>
              {localInfo.safetyLevel}
            </InfoRow>
            <InfoRow label="한인 커뮤니티" icon={<Users2 className="w-4 h-4" />}>
              {localInfo.koreanCommunity}
            </InfoRow>
            <InfoRow label="현지 문화 팁" icon={<MessageSquare className="w-4 h-4" />}>
              {localInfo.culturalTips}
            </InfoRow>
          </dl>
          {/* 주의사항 */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg flex">
            <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">주의사항</h4>
              <p>{localInfo.warnings}</p>
            </div>
          </div>
        </SectionCard>

        {/* 초기 정착 가이드 */}
        <SectionCard title="초기 정착 가이드" icon={<Home className="w-6 h-6 text-blue-600" />}>
          <dl>
            <ListRow
              label="단기 숙소 옵션"
              items={initialSetup.shortTermHousingOptions}
              icon={<Building className="w-4 h-4" />}
            />
            <ListRow
              label="장기 숙소 플랫폼"
              items={initialSetup.longTermHousingPlatforms}
              icon={<Home className="w-4 h-4" />}
            />
            <InfoRow label="모바일 플랜" icon={<Info className="w-4 h-4" />}>
              {initialSetup.mobilePlan}
            </InfoRow>
            <InfoRow label="은행 계좌 개설" icon={<Banknote className="w-4 h-4" />}>
              {initialSetup.bankAccount}
            </InfoRow>
          </dl>
        </SectionCard>

        {/* 현지 취업 현실 */}
        <SectionCard title="현지 취업 현실" icon={<Briefcase className="w-6 h-6 text-blue-600" />}>
          <dl>
            <ListRow
              label="주요 구직 플랫폼"
              items={jobReality.jobSearchPlatforms}
              icon={<Briefcase className="w-4 h-4" />}
            />
            <InfoRow label="필수 언어 수준" icon={<BookOpen className="w-4 h-4" />}>
              {jobReality.languageRequirement}
            </InfoRow>
            <InfoRow label="비자 제한 및 팁" icon={<Info className="w-4 h-4" />}>
              {jobReality.visaLimitationTips}
            </InfoRow>
          </dl>
        </SectionCard>

        {/* 커뮤니티 및 문화 */}
        <SectionCard title="커뮤니티 및 문화" icon={<Users className="w-6 h-6 text-blue-600" />}>
          <dl>
            <InfoRow label="한인 인구 비율" icon={<Users2 className="w-4 h-4" />}>
              {culturalIntegration.koreanPopulationRate}
            </InfoRow>
            <InfoRow label="외국인 거주 비율" icon={<Users className="w-4 h-4" />}>
              {culturalIntegration.foreignResidentRatio}
            </InfoRow>
            <InfoRow label="유용한 한인 리소스" icon={<LinkIcon className="w-4 h-4" />}>
              <div className="flex flex-col space-y-1">
                {culturalIntegration.koreanResourcesLinks.map((link: string) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </InfoRow>
          </dl>
        </SectionCard>

        {/* 다음 단계 */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">더 자세히 알아보기</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={flightLinks.googleFlights}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 text-sm font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
            >
              <Plane className="w-4 h-4" /> Google Flights
            </a>

            <a
              href={flightLinks.skyscanner}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 text-sm font-bold text-blue-700 bg-white rounded-lg shadow-md border border-blue-600 hover:bg-blue-50 transition duration-300 flex items-center justify-center gap-2"
            >
              <Plane className="w-4 h-4" /> Skyscanner
            </a>

            <Button
              onClick={() => {}}
              className="py-3 px-4 text-sm font-bold text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-200 transition duration-300 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> PDF로 저장
            </Button>

            <Button
              onClick={() => {}}
              className="py-3 px-4 text-sm font-bold text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-200 transition duration-300 flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" /> 이미지로 캡처
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            이 시뮬레이션 결과(ID: {simulationId})는 내 프로필에 자동 저장되었습니다.
          </p>
          <Button
            onClick={() => navigate('/mypage/simulations')}
            className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
          >
            내 프로필에서 확인하기 →
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SimulationResultPage;
