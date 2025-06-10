import { getCityRanking, getCountryRanking } from '@/api/ranking';
import { RankingResponseData } from '@/types/ranking';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function PopularChart() {
  const [countryRanking, setCountryRanking] = useState<RankingResponseData[]>([]);
  const [cityRanking, setCityRanking] = useState<RankingResponseData[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const countryRes = await getCountryRanking();
        const cityRes = await getCityRanking();

        if (countryRes.code === 200) setCountryRanking(countryRes.data.slice(0, 5));
        if (cityRes.code === 200) setCityRanking(cityRes.data.slice(0, 5)); // 원하는 만큼 자르기
      } catch (error) {
        console.error('인기 순위 로딩 실패', error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* 인기 국가 차트 */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-primary">🌍 인기 국가 TOP 5</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={countryRanking}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 인기 도시 차트 */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-primary">🏙️ 인기 도시 TOP 5</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={cityRanking}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
