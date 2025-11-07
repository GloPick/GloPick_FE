// import { getSimulationSummary } from '@/api/simulation';
// import { useAuthStore } from '@/store/authStore';
// import { GetSimulationSummaryResponseData } from '@/types/simulation';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Radar } from 'lucide-react';

// const SimulationSummarySection = () => {
//   const [simulations, setSimulations] = useState<GetSimulationSummaryResponseData[]>([]);
//   const navigate = useNavigate();
//   const { token } = useAuthStore();

//   useEffect(() => {
//     const fetchList = async () => {
//       if (!token) return;
//       try {
//         const res = await getSimulationSummary(token);
//         if (res.code === 200) {
//           setSimulations(res.data);
//         }
//       } catch (error) {
//         console.error('시뮬레이션 목록 불러오기 실패', error);
//       }
//     };
//     fetchList();
//   }, [token]);

//   const handleSelect = (simulationId: string) => {
//     navigate(`/simulation/result/${simulationId}`);
//   };

//   return (
//     <div className="space-y-4 px-4 py-6">
//       <h2 className="text-xl font-bold">시뮬레이션 결과 목록</h2>
//       {simulations.length === 0 ? (
//         <div className="w-full p-8 bg-white text-center animate-fade-in">
//           <div className="flex justify-center mb-4">
//             <Radar size={48} className="text-primary" />
//           </div>

//           <h2 className="text-2xl font-bold text-title mb-2">시뮬레이션 결과가 없습니다</h2>
//           <p className="text-sm text-gray-600 mb-6 leading-relaxed">
//             이력 기반 추천을 완료하면 <br />
//             <span className="text-secondary font-medium">이주 시뮬레이션 결과</span>를 확인할 수
//             있어요.
//           </p>
//         </div>
//       ) : (
//         <ul className="space-y-2">
//           {simulations.map((sim) => (
//             <li
//               key={sim._id}
//               className="p-4 rounded-xl border shadow hover:bg-gray-50 cursor-pointer"
//               onClick={() => handleSelect(sim._id)}
//             >
//               <div className="text-lg font-semibold">
//                 {sim.city}, {sim.country}
//               </div>
//               <div className="text-sm text-gray-600">직무: {sim.job}</div>
//               <div className="text-sm text-gray-600">이주 적합도: {sim.migrationSuitability}%</div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
// export default SimulationSummarySection;
