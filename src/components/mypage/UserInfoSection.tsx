import { putUserInfo } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { PutUserInfoPayloadData } from '@/types/auth';
import { useState, useEffect } from 'react';
import SectionCard from './SectionCard';

export interface UserInfo {
  name: string;
  email: string;
  birth: string;
  phone: string;
}

interface UserInfoSectionProps {
  userInfo: UserInfo;
  onUpdate: () => Promise<void>;
}

const UserInfoSection = ({ userInfo, onUpdate }: UserInfoSectionProps) => {
  const { token } = useAuthStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState<PutUserInfoPayloadData>({ ...userInfo });

  // userInfo props가 변경될 때마다 formData를 업데이트
  useEffect(() => {
    setFormData({ ...userInfo });
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await putUserInfo(formData, token);
      alert('정보가 수정되었습니다.');
      await onUpdate();
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      alert('정보 수정에 실패했습니다.');
    }
  };

  return (
    <SectionCard title="회원 정보">
      {!isEditOpen ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <InfoItem label="이름" value={userInfo.name} />
            <InfoItem label="이메일" value={userInfo.email} />
            <InfoItem label="생년월일" value={userInfo.birth} />
            <InfoItem label="전화번호" value={userInfo.phone} />
          </div>

          <div className="w-[100px] px-4 py-2 rounded-md bg-primary text-white text-center font-semibold hover:bg-primary/90 transition">
            <button onClick={() => setIsEditOpen(true)}>정보 수정</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdateUser} className="space-y-6">
          <FormInput label="이름" name="name" value={formData.name} onChange={handleChange} />
          <FormInput
            label="이메일"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
          <FormInput
            label="생년월일"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            type="date"
          />
          <FormInput label="전화번호" name="phone" value={formData.phone} onChange={handleChange} />
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
            >
              취소
            </button>
            <button
              onClick={handleUpdateUser}
              className="px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition"
            >
              저장
            </button>
          </div>
        </form>
      )}
    </SectionCard>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
    <dd className="text-base font-semibold text-gray-800">{value}</dd>
  </div>
);

const FormInput = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700 mb-1 block">{label}</span>
    <input
      {...props}
      className={`w-full border p-2.5 rounded-lg shadow-inner outline-none 
                  transition-colors duration-200
                  ${
                    props.readOnly
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
                      : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                  }`}
      readOnly={props.readOnly}
    />
  </label>
);

export default UserInfoSection;
