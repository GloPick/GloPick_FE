import {
  Pencil,
  Trash2,
  Briefcase,
  GraduationCap,
  Settings2,
  Languages,
  Coins,
  User2,
} from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { GetProfileResponseData } from '@/types/resume';

interface ResumeCardProps {
  data: GetProfileResponseData;
  onEdit?: (resume: GetProfileResponseData) => void;
  onDelete?: (id: string) => void;
  onRecommend?: (id: string) => void;
  onLoadSimulationList?: (profileId: string) => void;
}

const ResumeCard = ({ data, onEdit, onDelete, onRecommend }: ResumeCardProps) => {
  const navigate = useNavigate();
  // const { token } = useAuthStore();
  // const [simulationResult, setSimulationResult] = useState<FinalSimulationResult | null>(null);
  // const [loading, setLoading] = useState(false); // 데이터 로딩 완료 여부

  const handleEdit = () => {
    onEdit?.(data);
  };

  const handleDelete = () => {
    onDelete?.(data.profileId);
  };

  const handleRecommend = () => {
    onRecommend?.(data.profileId);
  };

  // const handleLoadSimulation = async () => {
  //   if (!token) return;

  //   try {
  //     setLoading(true);
  //     const response = await getSimulationResult(data.profileId, token);
  //     const simId = response.data.simulationId;
  //     const scoreRes = await getSimulationScore(simId, token);

  //     const fullResult = {
  //       ...response.data,
  //       scores: scoreRes.data,
  //     };

  //     if (response.code === 200 && response.data) {
  //       setSimulationResult(fullResult);
  //     } else {
  //       alert('시뮬레이션 결과를 불러오는 데 실패했습니다.');
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     if (error.response?.status === 404) {
  //       try {
  //         const recommendResponse = await getCountryRecommend(token);
  //         const target = recommendResponse.data.find(
  //           (rec: GetCountryResponseData) => rec.profileId === data.profileId,
  //         );

  //         if (target) {
  //           alert('해당 이력의 시뮬레이션 결과가 없습니다. 국가 추천 페이지로 넘어갑니다.');
  //           navigate(`/recommend/${data.responseId}`);
  //         } else {
  //           alert('해당 이력에 해당하는 추천 국가가 없습니다. 국가 추천을 먼저 받아주세요.');
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       alert('시뮬레이션 결과를 불러오지 못했습니다.');
  //     }
  //   }
  // };

  // 시뮬 요약 보기
  // const handleViewSimulation = () => {
  //   navigate('/simulation/list');
  // };

  return (
    <div
      className={clsx(
        'relative p-5 bg-white rounded-xl shadow-md border border-gray-200 space-y-4',
        'hover:shadow-lg transition-shadow duration-200 ease-in-out animate-fade-in',
      )}
    >
      {/* 수정, 삭제 */}
      <div className="absolute top-3 right-3 flex gap-2">
        {onEdit && (
          <button onClick={handleEdit} className="hover:text-secondary transition">
            <Pencil size={18} />
          </button>
        )}
        {onDelete && (
          <button onClick={handleDelete} className="hover:text-red transition">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {/* 직무 */}
        <h3 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
          <Briefcase size={18} className="text-secondary" />
          {data.desiredJob}
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          {/* 학력 */}
          <p className="flex items-center gap-2">
            <GraduationCap size={16} className="text-accent" />
            {data.education}
          </p>

          {/* 경력 */}
          <p className="flex items-center gap-2">
            <User2 size={16} className="text-accent" />
            {data.experience}
          </p>

          {/* 기술 */}
          <p className="flex items-start gap-2">
            <Settings2 size={16} className="text-accent mt-0.5" />
            <span className="font-medium text-gray-800">기술:</span>
            <span>{data.skills.join(', ')}</span>
          </p>

          {/* 언어 */}
          <p className="flex items-start gap-2">
            <Languages size={16} className="text-accent mt-0.5" />
            <span className="font-medium text-gray-800">언어:</span>
            <span>{data.languages.join(', ')}</span>
          </p>

          {/* 희망 연봉 */}
          <p className="flex items-center gap-2">
            <Coins size={16} className="text-yellow-500" />
            <span className="font-medium">연봉:</span> {data.desiredSalary.toLocaleString()}만원
          </p>

          {/* 추가 메모 */}
          {data.additionalNotes && (
            <div className="bg-gray-50 rounded-md p-3 text-xs text-gray-600 border mt-4">
              <p className="font-semibold mb-1">기타 희망사항</p>
              <p>{data.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* 버튼 */}
      {/* {onRecommend && (
        <button
          onClick={handleRecommend}
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 transition"
        >
          <Sparkles size={16} />
          이력 기반 추천받기
        </button>
      )} */}
      {data.responseId ? (
        <button
          onClick={() => navigate(`/recommend/${data.responseId}`)}
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 transition"
        >
          국가 추천 결과 보기
        </button>
      ) : (
        <button
          onClick={handleRecommend}
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 transition"
        >
          국가 추천 받기
        </button>
      )}
      {/* <button
        onClick={handleLoadSimulation}
        className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 transition"
      >
        시뮬레이션 결과 보기
      </button>
      <button
        onClick={handleViewSimulation}
        className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 transition"
      >
        시뮬레이션 요약 보기
      </button> */}
    </div>
  );
};

export default ResumeCard;
