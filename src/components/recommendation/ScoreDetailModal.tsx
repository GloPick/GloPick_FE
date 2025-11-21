import { Button } from '@/components/shared';
import { useModalStore } from '@/store/modalStore';
import { CountryRecommendation } from '@/types/recommendation';
import { X } from 'lucide-react';

interface ScoreDetailModalProps {
  item: CountryRecommendation;
}

const ScoreDetailModal = ({ item }: ScoreDetailModalProps) => {
  const { country, breakdown, reasons, totalScore } = item;
  const { languageScore, jobScore, qualityOfLifeScore, appliedWeights } = breakdown;
  const { closeModal } = useModalStore();

  return (
    // 배경 오버레이
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      {/* 모달 컨텐츠 */}
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 z-50"
        onClick={(e) => e.stopPropagation()} // 모달 클릭 시 닫히지 않게
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{country.name} 점수 상세</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
            <X />
          </button>
        </div>

        {/* 종합 점수 */}
        <div className="text-center bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">종합 점수</p>
          <p className="text-4xl font-extrabold text-blue-600">{totalScore.toFixed(1)}점</p>
        </div>

        {/* 추천 이유 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">💡 주요 추천 이유</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>

        {/* 점수 분석 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">📊 점수 분석 (가중치 적용)</h4>
          <p className="text-xs text-gray-500">
            * 괄호 안은 (원본 점수 × 사용자가 입력한 가중치) 입니다.
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">언어 일치도</span>
              <span className="font-bold">
                {languageScore.toFixed(1)}점
                <span className="text-xs font-normal text-gray-500 ml-1">
                  (× {appliedWeights.language})
                </span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">직업/고용 점수</span>
              <span className="font-bold">
                {jobScore.toFixed(1)}점
                <span className="text-xs font-normal text-gray-500 ml-1">
                  (× {appliedWeights.job})
                </span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">삶의 질(QOL)</span>
              <span className="font-bold">
                {qualityOfLifeScore.toFixed(1)}점
                <span className="text-xs font-normal text-gray-500 ml-1">
                  (× {appliedWeights.qualityOfLife})
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <Button onClick={closeModal} className="w-full mt-4 font-semibold">
          닫기
        </Button>
      </div>
    </div>
  );
};

export default ScoreDetailModal;
