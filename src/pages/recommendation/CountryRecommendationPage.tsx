import React, { useEffect, useState } from 'react';
import { Button, Loading } from '@/components/shared';
import { useNavigate } from 'react-router-dom';

const mockRecommendations = [
  { rank: 1, totalScore: 92.5, country: { name: '독일', code: 'DE' } },
  { rank: 2, totalScore: 89.3, country: { name: '캐나다', code: 'CA' } },
  { rank: 3, totalScore: 85.5, country: { name: '싱가포르', code: 'SG' } },
  { rank: 4, totalScore: 83.1, country: { name: '호주', code: 'AU' } },
  { rank: 5, totalScore: 80.9, country: { name: '스웨덴', code: 'SE' } },
];

const COUNTRY_CODE_MAP: Record<string, string> = {
  KOR: 'kr', // 한국
  JPN: 'jp', // 일본
  USA: 'us', // 미국
  CAN: 'ca', // 캐나다
  AUS: 'au', // 호주
  DEU: 'de', // 독일
  FRA: 'fr', // 프랑스
  GBR: 'gb', // 영국
  ITA: 'it', // 이탈리아
  NLD: 'nl', // 네덜란드
  SWE: 'se', // 스웨덴
  NOR: 'no', // 노르웨이
  DNK: 'dk', // 덴마크
  FIN: 'fi', // 핀란드
  CHE: 'ch', // 스위스
  NZL: 'nz', // 뉴질랜드
  SGP: 'sg', // 싱가포르
  IRL: 'ie', // 아일랜드
  BEL: 'be', // 벨기에
  AUT: 'at', // 오스트리아
  ISR: 'il', // 이스라엘
  CZE: 'cz', // 체코
  POL: 'pl', // 폴란드
  PRT: 'pt', // 포르투갈
  ESP: 'es', // 스페인
  EST: 'ee', // 에스토니아
  HUN: 'hu', // 헝가리
  SVK: 'sk', // 슬로바키아
  SVN: 'si', // 슬로베니아
  TUR: 'tr', // 터키
  LUX: 'lu', // 룩셈부르크
  ISL: 'is', // 아이슬란드
  MEX: 'mx', // 멕시코
};

const CountryRecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof mockRecommendations>([]);

  useEffect(() => {
    setTimeout(() => {
      setResults(mockRecommendations);
      setLoading(false);
    }, 800); // 로딩 효과용
  }, []);

  if (loading) return <Loading message="AI가 맞춤 국가를 분석 중입니다..." />;

  const topCountry = results[0];
  const otherCountries = results.slice(1);
  if (!topCountry) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg">추천 결과가 없습니다 😢</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  // 국기 코드 변환 함수
  const getFlagUrl = (code: string, size: number) => {
    const alpha2 = COUNTRY_CODE_MAP[code] || code.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w${size}/${alpha2}.png`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* ====================== */}
      {/* 1위 국가 카드 */}
      {/* ====================== */}
      <section className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#1F2A44] via-[#30477D] to-[#3B82F6] text-white py-16 px-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

        <h2 className="text-xl font-semibold text-blue-100 mb-2">
          분석 결과, 당신에게 가장 잘 맞는 국가는
        </h2>

        <div className="flex flex-col items-center mt-4 relative z-10">
          <img
            src={getFlagUrl(topCountry.country.code, 80)}
            alt={`${topCountry.country.name} flag`}
            className="w-16 h-10 rounded-md shadow-lg border border-white/20"
          />

          <h1 className="text-5xl font-extrabold mt-4">{topCountry.country.name}</h1>

          <p className="mt-2 text-blue-100 text-lg font-medium">
            종합 점수{' '}
            <span className="text-white font-bold">{topCountry.totalScore.toFixed(1)}</span>점
          </p>

          <p className="text-blue-200 text-sm mt-3 max-w-md">
            삶의 질, 고용 안정성, 안전성 등 주요 지표에서 우수한 성과를 보이는 국가입니다.
          </p>

          <Button
            className="mt-6 w-52 text-base font-bold shadow-md bg-white text-blue-700 hover:bg-white/90"
            onClick={() =>
              navigate('/cities', {
                state: {
                  country: topCountry.country,
                  cities: [
                    { name: '베를린', score: 88 },
                    { name: '함부르크', score: 83 },
                    { name: '뮌헨', score: 79 },
                  ],
                },
              })
            }
          >
            도시 추천 보기 →
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1F2A44]/80 to-transparent" />
      </section>

      {/* ====================== */}
      {/* 2~5위 국가 리스트 */}
      {/* ====================== */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          다른 추천 국가도 확인해보세요
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherCountries.map((item) => (
            <div
              key={item.country.code}
              className="relative border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all text-center"
            >
              <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                #{item.rank}위
              </span>

              <img
                src={getFlagUrl(item.country.code, 80)}
                alt={`${item.country.name} flag`}
                className="w-12 h-8 mx-auto rounded-sm shadow-sm mt-2"
              />

              <h4 className="text-lg font-bold text-gray-900 mt-4">{item.country.name}</h4>
              <p className="text-sm text-gray-600 mt-1">점수 {item.totalScore.toFixed(1)}점</p>

              <Button
                className="mt-4 w-full py-2 text-sm"
                variant="secondary"
                onClick={() =>
                  navigate('/cities', {
                    state: {
                      country: item.country,
                      cities: [
                        { name: '도시A', score: 80 },
                        { name: '도시B', score: 78 },
                        { name: '도시C', score: 76 },
                      ],
                    },
                  })
                }
              >
                도시 보기
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CountryRecommendationPage;
