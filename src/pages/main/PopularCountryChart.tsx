import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { country: '캐나다', value: 120 },
  { country: '호주', value: 100 },
  { country: '독일', value: 85 },
  { country: '싱가포르', value: 70 },
  { country: '일본', value: 65 },
];

const COLORS = ['#2b6097', '#a3acbd', '#6f7788', '#92455c', '#ca778f'];

export default function PopularCountryChart() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          barCategoryGap="20%"
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="country"
            tick={{ fontSize: 14, fill: '#1A1A1A' }}
            width={100}
          />
          <Tooltip
            cursor={{ fill: '#f9fafb' }}
            contentStyle={{ fontSize: '14px', borderRadius: '8px' }}
            formatter={(value) => [`${value}명`, '신청자']}
          />
          <Bar dataKey="value" radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
