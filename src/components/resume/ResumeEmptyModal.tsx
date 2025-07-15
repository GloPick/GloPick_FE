import { FileQuestion } from 'lucide-react';
import Button from '@/components/shared/Button';
import clsx from 'clsx';
import { ResumeEmptyModalProps } from './types';

const ResumeEmptyModal = ({ onClose, onAddClick }: ResumeEmptyModalProps) => {
  return (
    <div className={clsx('w-full max-w-md p-8 bg-white text-center animate-fade-in')}>
      {/* 아이콘 */}
      <div className="flex justify-center mb-4">
        <FileQuestion size={48} className="text-accent" />
      </div>

      {/* 메시지 */}
      <h2 className="text-2xl font-bold text-title mb-2">저장된 이력이 없어요</h2>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        나의 이력을 입력하면 <span className="text-secondary font-medium">AI 맞춤 추천</span>을 받을
        수 있어요. <br /> 지금 바로 입력해보세요!
      </p>

      {/* 버튼 */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={onAddClick}>
          이력 추가하러 가기
        </Button>
      </div>
    </div>
  );
};

export default ResumeEmptyModal;
