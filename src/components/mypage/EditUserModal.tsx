import { PutUserInfoPayloadData } from '@/types/auth';
import { useEffect, useState } from 'react';

interface EditUserModalProps {
  initData: PutUserInfoPayloadData;
  onClose: () => void;
  onSubmit: (updatedData: PutUserInfoPayloadData) => void;
}

const EditUserModal = ({ initData, onClose, onSubmit }: EditUserModalProps) => {
  const [form, setForm] = useState(initData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PutUserInfoPayloadData, string>>>({});

  useEffect(() => {
    setForm(initData);
  }, [initData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!form.email.trim()) newErrors.email = '이메일을 입력해주세요.';
    if (!form.birth.trim()) newErrors.birth = '생년월일을 입력해주세요.';
    if (!form.phone.trim()) newErrors.phone = '휴대폰 번호를 입력해주세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit(form);
    onClose();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary text-center">내 정보 수정</h2>

      <div className="space-y-4">
        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="text-sm text-red mt-1">{errors.name}</p>}
        </div>

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="text-sm text-red mt-1">{errors.email}</p>}
        </div>

        {/* 생년월일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">생년월일</label>
          <input
            type="date"
            name="birth"
            value={form.birth}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.birth && <p className="text-sm text-red mt-1">{errors.birth}</p>}
        </div>

        {/* 휴대폰번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && <p className="text-sm text-red mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end space-x-3 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
          disabled={loading}
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition"
          disabled={loading}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
