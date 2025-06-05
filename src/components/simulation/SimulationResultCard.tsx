import { FC } from 'react';
import { SimulationResultData } from '@/types/simulation';
import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  BookOpen,
  Briefcase,
  Building2,
  Bus,
  CalendarDays,
  CloudSun,
  Contact2,
  Globe,
  Home,
  Info,
  Landmark,
  Languages,
  Link2,
  LucideBanknote,
  MapPin,
  Plane,
  PlaneTakeoff,
  Search,
  ShieldCheck,
  Sparkles,
  Train,
  UserCheck,
  Users,
} from 'lucide-react';

interface SimulationResultCardProps {
  result: SimulationResultData;
  flightLinks: {
    googleFlights: string;
    skyscanner: string;
  };
}

const SimulationResultCard: FC<SimulationResultCardProps> = ({ result, flightLinks }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">🧭 최종 시뮬레이션 결과</h2>

      {/* 도시 및 국가 */}
      <div className="text-center space-y-2 bg-primary/5 p-4 rounded-xl border border-primary shadow-sm">
        <h3 className="text-2xl font-extrabold text-primary flex justify-center items-center gap-2 animate-pulse">
          <MapPin size={24} />
          <span className="underline underline-offset-4 decoration-primary">
            {result.recommendedCity}
          </span>
        </h3>
        <p className="text-base text-gray-700 flex justify-center items-center gap-2">
          <Globe size={18} /> {result.country}
        </p>
      </div>

      {/* 지역 정보 */}
      <div className="section">
        <h4 className="title">
          <MapPin className="text-primary" size={20} /> 지역 정보
        </h4>
        <ul className="list">
          <li className="item">
            <Bus className="icon" size={18} />
            <span>
              <span className="text">대중교통:</span> {result.localInfo.publicTransport}
            </span>
          </li>
          <li className="item">
            <ShieldCheck className="icon" size={18} />
            <span>
              <span className="text">치안 수준:</span> {result.localInfo.safetyLevel}
            </span>
          </li>
          <li className="item">
            <CloudSun className="icon" size={18} />
            <span>
              <span className="text">기후:</span> {result.localInfo.climateSummary}
            </span>
          </li>
          <li className="item">
            <Users className="icon" size={18} />
            <span>
              <span className="text">한인 커뮤니티:</span>
              {result.localInfo.koreanCommunity}
            </span>
          </li>
          <li className="item">
            <Building2 className="icon" size={18} />
            <span>
              <span className="text">주요 시설:</span>{' '}
              {result.localInfo.essentialFacilities.join(', ')}
            </span>
          </li>
          <li className="item">
            <Info className="icon" size={18} />
            <span>
              <span className="text">문화 팁:</span> {result.localInfo.culturalTips}
            </span>
          </li>
          <li className="item">
            <AlertTriangle className="icon" size={18} />
            <span>
              <span className="text">주의사항:</span> {result.localInfo.warnings}
            </span>
          </li>
        </ul>
      </div>

      {/* 예상 지출 추정 */}
      <div className="section">
        <h4 className="title">
          <LucideBanknote className="text-primary" size={20} /> 예상 월별 지출
        </h4>
        <ul className="list">
          <li className="item">
            <Home className="icon" size={18} />
            <span>
              <span className="text">주거:</span> {result.estimatedMonthlyCost.housing}
            </span>
          </li>
          <li className="item">
            <Sparkles className="icon" size={18} />
            <span>
              <span className="text">식비:</span> {result.estimatedMonthlyCost.food}
            </span>
          </li>
          <li className="item">
            <Train className="icon" size={18} />
            <span>
              <span className="text">교통:</span> {result.estimatedMonthlyCost.transportation}
            </span>
          </li>
          <li className="item">
            <Info className="icon" size={18} />
            <span>
              <span className="text">기타:</span> {result.estimatedMonthlyCost.etc}
            </span>
          </li>
          <li className="item">
            <BadgeCheck className="icon" size={18} />
            <span>
              <span className="text">총합:</span> {result.estimatedMonthlyCost.total}
            </span>
          </li>
          <li className="item">
            <CalendarDays className="icon" size={18} />
            <span>
              <span className="text">1년 예상 지출:</span> {result.estimatedMonthlyCost.oneYearCost}
            </span>
          </li>
          <li className="item">
            <Sparkles className="icon" size={18} />
            <span>
              <span className="text">비용 절감 팁:</span>{' '}
              {result.estimatedMonthlyCost.costCuttingTips}
            </span>
          </li>
          <li className="item">
            <BookOpen className="icon" size={18} />
            <span>
              <span className="text">물가 비교:</span> {result.estimatedMonthlyCost.cpi}
            </span>
          </li>
        </ul>
      </div>

      {/* 가까운 공항 */}
      <div className="section">
        <h4 className="title">
          <Plane className="text-primary" size={20} /> 가장 가까운 공항
        </h4>
        <p className="text-gray-700 text-md">
          {result.nearestAirport.name} ({result.nearestAirport.code}) - {result.nearestAirport.city}
        </p>
      </div>

      {/* 초기 정착 준비 */}
      <div className="section">
        <h4 className="title">
          <Home className="text-primary" size={20} /> 초기 정착 준비
        </h4>
        <ul className="list">
          <li className="item">
            <Landmark size={18} className="icon" />
            <span>
              <span className="text">단기 주거:</span>{' '}
              {result.initialSetup.shortTermHousingOptions.join(', ')}
            </span>
          </li>
          <li className="item">
            <Landmark size={18} className="icon" />
            <span>
              <span className="text">장기 주거:</span>{' '}
              {result.initialSetup.longTermHousingPlatforms.join(', ')}
            </span>
          </li>
          <li className="item">
            <Contact2 size={18} className="icon" />
            <span>
              <span className="text">모바일 플랜:</span> {result.initialSetup.mobilePlan}
            </span>
          </li>
          <li className="item">
            <Banknote size={18} className="icon" />
            <span>
              <span className="text">은행 계좌:</span> {result.initialSetup.bankAccount}
            </span>
          </li>
        </ul>
      </div>

      {/* 직업 정보 */}
      <div className="section">
        <h4 className="title">
          <Briefcase className="text-primary" size={20} /> 직업 정보
        </h4>
        <ul className="list">
          <li className="item">
            <Search size={18} className="icon" />
            <span>
              <span className="text">추천 직무:</span> {result.jobReality.commonJobs.join(', ')}
            </span>
          </li>
          <li className="item">
            <Link2 size={18} className="icon" />
            <span>
              <span className="text">구직 플랫폼:</span>{' '}
              {result.jobReality.jobSearchPlatforms.join(', ')}
            </span>
          </li>
          <li className="item">
            <Languages size={18} className="icon" />
            <span>
              <span className="text">언어 요구:</span> {result.jobReality.languageRequirement}
            </span>
          </li>
          <li className="item">
            <AlertTriangle size={18} className="icon" />
            <span>
              <span className="text">비자 팁:</span> {result.jobReality.visaLimitationTips}
            </span>
          </li>
        </ul>
      </div>

      {/* 문화 통합 */}
      <div className="section">
        <h4 className="title">
          <Globe className="text-primary" size={20} /> 문화 정보
        </h4>
        <ul className="list">
          <li className="item">
            <Users size={18} className="icon" />
            <span>
              <span className="text">한인 비율:</span>{' '}
              {result.culturalIntegration.koreanPopulationRate}
            </span>
          </li>
          <li className="item">
            <UserCheck size={18} className="icon" />
            <span>
              <span className="text">외국인 비율:</span>{' '}
              {result.culturalIntegration.foreignResidentRatio}
            </span>
          </li>
          <li className="item">
            <Link2 size={18} className="icon" />
            <span>
              <span className="text">한인 커뮤니티 링크:</span>{' '}
              <ul className="ml-6 list-disc text-blue-600 underline">
                {result.culturalIntegration.koreanResourcesLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </span>
          </li>
        </ul>
      </div>

      {/* 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <p className="text-base text-gray-700 mb-1">취업 가능성</p>
          <p className="text-2xl font-bold text-primary">28%</p>
        </div>
        <div className="bg-accent/10 rounded-xl p-4 text-center">
          <p className="text-base text-gray-700 mb-1">이주 적합도</p>
          <p className="text-2xl font-bold text-accent">28%</p>
        </div>
      </div>

      {/* 항공편 */}
      <div className="section">
        <h4 className="title">
          <PlaneTakeoff className="text-primary" size={20} /> 항공편 확인
        </h4>
        <ul className="list-disc ml-6 text-base text-blue-600 underline space-y-1">
          <li>
            <a href={flightLinks.googleFlights} target="_blank" rel="noopener noreferrer">
              Google Flights 보기
            </a>
          </li>
          <li>
            <a href={flightLinks.skyscanner} target="_blank" rel="noopener noreferrer">
              Skyscanner 보기
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimulationResultCard;
