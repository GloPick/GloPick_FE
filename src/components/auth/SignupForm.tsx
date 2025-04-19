import { useState } from 'react';
import { User, Mail, Lock, Calendar, Phone } from 'lucide-react';
import { SignupData } from '@/types/auth';
import { postSignup } from '@/api/auth';
import { useModalStore } from '@/store/modalStore';

export default function SignupForm() {
  const [form, setForm] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birth: '',
    phone: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordConditionError, setPasswordConditionError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { openModal, closeModal } = useModalStore();

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  };

  const handleChange = (field: keyof SignupData, value: string) => {
    setForm({ ...form, [field]: value });

    if (field === 'email') {
      if (!isValidEmail(value)) {
        setEmailError('올바른 이메일 형식이 아닙니다.');
      } else {
        setEmailError('');
      }
    }

    if (field === 'password') {
      if (!isValidPassword(value)) {
        setPasswordConditionError(
          '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
        );
      } else {
        setPasswordConditionError('');
      }

      if (form.passwordConfirm && value !== form.passwordConfirm) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }

    if (field === 'passwordConfirm') {
      if (form.password && value !== form.password) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postSignup(form);
      if (res.code === 201) {
        alert('회원가입이 완료되었습니다.');
        closeModal();
        openModal('login');
      }
    } catch (err) {
      console.log(err);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-2">회원가입</h2>

      {/* 이름 */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-md shadow-inner border border-gray-200">
        <User className="text-primary" size={18} />
        <input
          type="name"
          placeholder="이름"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          className="w-full text-sm outline-none"
        />
      </div>

      {/* 이메일 */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-md shadow-inner border border-gray-200">
        <Mail className="text-primary" size={18} />
        <input
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
          className="w-full text-sm outline-none"
        />
      </div>
      {emailError && <p className="text-sm text-red ml-1 mt-1">{emailError}</p>}

      {/* 비밀번호 */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-md shadow-inner border border-gray-200">
        <Lock className="text-primary" size={18} />
        <input
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
          className="w-full text-sm outline-none"
        />
      </div>
      {passwordConditionError && (
        <p className="text-sm text-red ml-1 mt-1">{passwordConditionError}</p>
      )}

      {/* 비밀번호 확인 */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-md shadow-inner border border-gray-200">
        <Lock className="text-primary" size={18} />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={form.passwordConfirm}
          onChange={(e) => handleChange('passwordConfirm', e.target.value)}
          required
          className="w-full text-sm outline-none"
        />
      </div>
      {passwordError && <p className="text-sm text-red ml-1 mt-1">{passwordError}</p>}

      {/* 생년월일 */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-md shadow-inner border border-gray-200">
        <Calendar className="text-primary" size={18} />
        <input
          type="date"
          value={form.birth}
          onChange={(e) => handleChange('birth', e.target.value)}
          required
          className="w-full text-sm outline-none"
        />
      </div>

      {/* 전화번호 */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-md shadow-inner border border-gray-200">
        <Phone className="text-primary" size={18} />
        <input
          type="tel"
          placeholder="010-1234-5678"
          value={form.phone}
          onChange={(e) => handleChange('phone', formatPhoneNumber(e.target.value))}
          required
          className="w-full text-sm outline-none"
        />
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-opacity-90 transition"
      >
        회원가입
      </button>
    </form>
  );
}
