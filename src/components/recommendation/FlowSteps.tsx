import { CheckCircle, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface FlowStepsProps {
  currentStep: number;
}

const stepData = [
  { step: 1, title: '국가 선택' },
  { step: 2, title: '추가 정보 입력' },
  { step: 3, title: '도시 선택' },
  { step: 4, title: '이주 시뮬레이션' },
];

export default function FlowSteps({ currentStep }: FlowStepsProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-7 relative">
        {stepData.map(({ step, title }, idx) => {
          const isActive = currentStep === step;
          const isCompleted = currentStep > step;

          return (
            <div
              key={step}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center text-center p-5 rounded-xl shadow transition relative z-10',
                isActive
                  ? 'bg-primary text-white ring-2 ring-primary scale-105 shadow-xl'
                  : 'bg-white text-gray-800 border border-gray-200',
              )}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full mb-2 text-base font-bold bg-white text-primary shadow">
                {isCompleted ? <CheckCircle size={20} className="text-green-500" /> : step}
              </div>
              <p className="text-sm md:text-base font-semibold">{title}</p>

              {idx < stepData.length - 1 && (
                <div className="hidden md:block absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-0">
                  <ChevronRight className="text-text" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
