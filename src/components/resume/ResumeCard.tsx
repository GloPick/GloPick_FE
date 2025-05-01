import { ResumeCardProps } from './types';
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

const ResumeCard = ({ data, onEdit, onDelete }: ResumeCardProps) => {
  const handleEdit = () => {
    onEdit?.(data);
  };

  const handleDelete = () => {
    onDelete?.(data._id);
  };

  return (
    <div
      className={clsx(
        'relative p-5 bg-white rounded-xl shadow-md border border-gray-200 space-y-4',
        'animate-fade-in',
      )}
    >
      {/* 수정, 삭제 */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={handleEdit} className="hover:text-secondary transition">
          <Pencil size={18} />
        </button>
        <button onClick={handleDelete} className="hover:text-red transition">
          <Trash2 size={18} />
        </button>
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
    </div>
  );
};

export default ResumeCard;
