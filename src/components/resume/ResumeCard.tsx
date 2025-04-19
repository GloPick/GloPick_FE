import { ResumeCardProps } from './types';

const ResumeCard = ({ data }: ResumeCardProps) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="text-lg font-semibold text-primary mb-2">{data.desiredJob}</div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-800">학력:</span> {data.education}
        </p>
        <p>
          <span className="font-medium text-gray-800">경력:</span> {data.experience}
        </p>
        <p>
          <span className="font-medium text-gray-800">기술 스택:</span> {data.skills.join(', ')}
        </p>
        <p>
          <span className="font-medium text-gray-800">언어:</span> {data.languages.join(', ')}
        </p>
        <p>
          <span className="font-medium text-gray-800">희망 연봉:</span>{' '}
          {data.desiredSalary.toLocaleString()}만원
        </p>
        {data.additionalNotes && (
          <p>
            <span className="font-medium text-gray-800">기타:</span> {data.additionalNotes}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
