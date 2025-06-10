import { GetProfileResponseData } from '@/types/resume';
import ResumeCard from '../resume/ResumeCard';
import clsx from 'clsx';
import { FileQuestion } from 'lucide-react';

interface ResumeSectionProps {
  resumes: GetProfileResponseData[];
  onEdit: (resume: GetProfileResponseData) => void;
  onDelete: (profileId: string) => void;
  onRecommend: (profileId: string) => void;
  onAdd: () => void;
  onLoadSimulationList?: (profileId: string) => void;
}

const ResumeSection = ({
  resumes,
  onEdit,
  onDelete,
  onRecommend,
  onAdd,
  // onLoadSimulationList,
}: ResumeSectionProps) => {
  return (
    <div className="space-y-4 px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">나의 이력</h2>
        <button
          onClick={onAdd}
          className="text-sm text-white bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80 transition"
        >
          이력 추가
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className={clsx('w-full p-8 bg-white text-center', 'animate-fade-in')}>
          <div className="flex justify-center mb-4">
            <FileQuestion size={48} className="text-accent" />
          </div>

          <h2 className="text-2xl font-bold text-title mb-2">저장된 이력이 없어요</h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            나의 이력을 입력하면 <span className="text-secondary font-medium">AI 맞춤 추천</span>을
            받을 수 있어요. <br /> 지금 바로 입력해보세요!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.profileId}
              data={resume}
              onEdit={() => onEdit(resume)}
              onDelete={() => onDelete(resume.profileId)}
              onRecommend={() => onRecommend(resume.profileId)}
              // onLoadSimulationList={() => onLoadSimulationList(resume.profileId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
