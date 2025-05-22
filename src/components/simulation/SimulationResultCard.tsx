import { FC } from 'react';
import { SimulationResultData } from '@/types/simulation';
import {
  BookOpen,
  Briefcase,
  Building2,
  Bus,
  CloudSun,
  Globe,
  Home,
  MapPin,
  PlaneTakeoff,
  Search,
  ShieldCheck,
  Sparkles,
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
          <Globe size={18} className="text-accent" /> {result.country}
        </p>
      </div>

      {/* 지역 정보 */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-xl text-gray-800 mb-3 flex items-center gap-2">
          <MapPin className="text-primary" size={20} /> 지역 정보
        </h4>
        <ul className="text-base text-gray-700 space-y-3">
          <li className="flex items-start gap-2">
            <Bus className="text-accent mt-0.5" size={18} />
            <span>
              <span className="font-semibold">대중교통:</span> {result.localInfo.publicTransport}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="text-accent mt-0.5" size={18} />
            <span>
              <span className="font-semibold">치안 수준:</span> {result.localInfo.safetyLevel}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CloudSun className="text-accent mt-0.5" size={18} />
            <span>
              <span className="font-semibold">기후:</span> {result.localInfo.climateSummary}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Building2 className="text-accent mt-0.5" size={18} />
            <span>
              <span className="font-semibold">필수 시설:</span>{' '}
              {result.localInfo.essentialFacilities.join(', ')}
            </span>
          </li>
        </ul>
      </div>

      {/* 주거 정보 */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-xl text-gray-800 mb-3 flex items-center gap-2">
          <Home className="text-primary" size={20} /> 주거 정보
        </h4>
        <p className="text-base text-gray-700 mb-1 flex items-center gap-2">
          <Building2 size={16} className="text-accent" />
          <span>
            <span className="font-semibold">단기:</span>{' '}
            {result.initialSetup.shortTermHousingOptions.join(', ')}
          </span>
        </p>
        <p className="text-base text-gray-700 flex items-center gap-2">
          <Home size={16} className="text-accent" />
          <span>
            <span className="font-semibold">장기:</span>{' '}
            {result.initialSetup.longTermHousingPlatforms.join(', ')}
          </span>
        </p>
      </div>

      {/* 직업 정보 */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-xl text-gray-800 mb-3 flex items-center gap-2">
          <Briefcase className="text-primary" size={20} /> 직업 정보
        </h4>
        <p className="text-base text-gray-700 mb-1 flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <span>
            <span className="font-semibold">일반 직무:</span>{' '}
            {result.jobReality.commonJobs.join(', ')}
          </span>
        </p>
        <p className="text-base text-gray-700 flex items-center gap-2">
          <Search size={16} className="text-accent" />
          <span>
            <span className="font-semibold">구직 플랫폼:</span>{' '}
            {result.jobReality.jobSearchPlatforms.join(', ')}
          </span>
        </p>
      </div>

      {/* 문화 통합 */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-xl text-gray-800 mb-3 flex items-center gap-2">
          <Globe className="text-primary" size={20} /> 문화 통합
        </h4>
        <p className="text-base text-gray-700 mb-1 flex items-center gap-2">
          <Users size={16} className="text-accent" />
          <span className="font-semibold">한인 커뮤니티 링크:</span>
        </p>
        <ul className="list-disc ml-6 text-base text-blue-600 underline space-y-1">
          {result.culturalIntegration.koreanResourcesLinks.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-base text-gray-700 mt-3 flex items-center gap-2">
          <BookOpen size={16} className="text-accent" />
          <span>
            <span className="font-semibold">프로그램:</span>{' '}
            {result.culturalIntegration.culturalIntegrationPrograms.join(', ')}
          </span>
        </p>
      </div>

      {/* 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <p className="text-base text-gray-700 mb-1">취업 가능성</p>
          <p className="text-2xl font-bold text-primary">{result.employmentProbability}%</p>
        </div>
        <div className="bg-accent/10 rounded-xl p-4 text-center">
          <p className="text-base text-gray-700 mb-1">이주 적합도</p>
          <p className="text-2xl font-bold text-accent">{result.migrationSuitability}%</p>
        </div>
      </div>

      {/* 항공편 */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-xl text-gray-800 mb-3 flex items-center gap-2">
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
