// import { useState } from 'react';
// import { PostSimulationFormPayloadData } from '@/types/simulation';
// import { Button, InputField, TextArea } from '../shared';
// import { motion } from 'framer-motion';

// // const LANGUAGE_LEVEL_OPTIONS = [
// //   { name: '능숙', value: '능숙' },
// //   { name: '기초', value: '기초' },
// //   { name: '통역 필요', value: '통역 필요' },
// // ];

// interface SimulationFormProps {
//   onSubmit: (formData: PostSimulationFormPayloadData) => void;
//   selectedCountry?: string;
// }

// const SimulationForm = ({ onSubmit, selectedCountry }: SimulationFormProps) => {
//   const [form, setForm] = useState<PostSimulationFormPayloadData>({
//     selectedRankIndex: 0,
//     budget: 0,
//     duration: '',
//     languageLevel: '기초',
//     hasLicense: false,
//     jobTypes: [],
//     requiredFacilities: [],
//     accompanyingFamily: '',
//     visaStatus: [],
//     additionalNotes: '',
//     departureAirport: '',
//   });
//   const [errors, setErrors] = useState<
//     Partial<Record<keyof PostSimulationFormPayloadData, string>>
//   >({});

//   const validateForm = (): boolean => {
//     const newErrors: typeof errors = {};

//     if (!form.departureAirport.trim()) {
//       newErrors.departureAirport = '출발 공항을 입력해주세요.';
//     }
//     if (!form.budget || form.budget <= 0) {
//       newErrors.budget = '예산은 0보다 커야 합니다.';
//     }
//     if (!form.duration.trim()) {
//       newErrors.duration = '거주 기간을 입력해주세요.';
//     }
//     if (!form.languageLevel.trim()) {
//       newErrors.languageLevel = '언어 능력을 선택해주세요.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = <T extends keyof PostSimulationFormPayloadData>(
//     field: T,
//     value: PostSimulationFormPayloadData[T],
//   ) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     onSubmit(form);
//   };

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6 bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mx-auto"
//     >
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">🛠️ 추가 정보 입력</h2>
//       {selectedCountry && (
//         <p className="text-right text-lg text-gray-700 font-medium mb-4">
//           🌍 선택한 국가: <span className="text-primary font-semibold">{selectedCountry}</span>
//         </p>
//       )}

//       <InputField
//         label="✈️ 출발 공항 (필수)"
//         name="departureAirport"
//         value={form.departureAirport}
//         onChange={(e) => handleChange('departureAirport', e.target.value)}
//         placeholder="예: 인천공항"
//         error={errors.departureAirport}
//       />

//       <InputField
//         label="💰 예산 (만원) (필수)"
//         name="budget"
//         value={form.budget.toString()}
//         onChange={(e) => handleChange('budget', parseInt(e.target.value) || 0)}
//         placeholder="예: 3000"
//         error={errors.budget}
//         type="number"
//       />

//       <InputField
//         label="📅 거주 기간 (필수)"
//         name="duration"
//         value={form.duration}
//         onChange={(e) => handleChange('duration', e.target.value)}
//         placeholder="예: 1년"
//         error={errors.duration}
//       />

//       {/* <div>
//         <Dropdown
//           label="🗣️ 언어 능력 (필수)"
//           items={LANGUAGE_LEVEL_OPTIONS as { name: string; value: '기초' | '능숙' | '통역 필요' }[]}
//           onSelect={(val) => handleChange('languageLevel', val)}
//           selected={form.languageLevel}
//         />
//         {errors.languageLevel && (
//           <p className="text-sm text-red-500 mt-1">{errors.languageLevel}</p>
//         )}
//       </div> */}

//       <div className="flex flex-col">
//         <label className="text-md font-semibold text-gray-800 mb-1">🚗 운전 면허</label>
//         <div className="px-4 py-3 rounded-md flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={form.hasLicense}
//             onChange={(e) => handleChange('hasLicense', e.target.checked)}
//             className="accent-primary scale-150"
//           />
//           <span className="text-text text-md">운전 면허 있음</span>
//         </div>
//       </div>

//       {/* <MultiSelectInput
//         label="💼 희망 취업 형태"
//         selected={form.jobTypes}
//         onChange={(val) => handleChange('jobTypes', val)}
//         placeholder="예: 원격 근무, 정규직"
//       />

//       <MultiSelectInput
//         label="🏥 필수 편의 시설"
//         selected={form.requiredFacilities}
//         onChange={(val) => handleChange('requiredFacilities', val)}
//         placeholder="예: 병원, 대중교통"
//       /> */}

//       <InputField
//         label="👨‍👩‍👧 동반 가족"
//         name="accompanyigFamily"
//         value={form.accompanyingFamily}
//         onChange={(e) => handleChange('accompanyingFamily', e.target.value)}
//         placeholder="예: 배우자, 자녀"
//         error={errors.accompanyingFamily}
//       />

//       {/* <MultiSelectInput
//         label="🛂 비자 상태"
//         selected={form.visaStatus}
//         onChange={(val) => handleChange('visaStatus', val)}
//         placeholder="예: 취업 비자, 학생 비자"
//       /> */}

//       <TextArea
//         value={form.additionalNotes || ''}
//         onChange={(val) => handleChange('additionalNotes', val)}
//         placeholder="📝 기타 희망사항이 있다면 입력해주세요."
//       />

//       <Button type="submit" className="w-full mt-4">
//         시뮬레이션 시작하기
//       </Button>
//     </motion.form>
//   );
// };

// export default SimulationForm;
