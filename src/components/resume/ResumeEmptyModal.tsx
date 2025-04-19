import { ResumeEmptyModalProps } from './types';

const ResumeEmptyModal = ({ onClose, onAddClick }: ResumeEmptyModalProps) => {
  return (
    <div className="bg-white w-full max-w-md rounded-xl p-8 text-center">
      <h2 className="text-xl font-bold text-primary mb-4">저장된 이력이 없습니다</h2>
      <p className="text-gray-600 text-sm mb-6">추천을 받기 위해 먼저 이력을 추가해주세요.</p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onAddClick}
          className="px-4 py-2 rounded-md bg-primary text-white text-sm hover:bg-opacity-90 transition"
        >
          이력 추가하러 가기
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ResumeEmptyModal;
