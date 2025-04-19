import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { LoginData } from '@/types/auth';
import { postLogin } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';

export default function LoginForm() {
  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const { login } = useAuthStore();
  const { closeModal } = useModalStore();

  const handleChange = (field: keyof LoginData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await postLogin(form);
      if (res.code === 201 && res.data) {
        login(res.data.token, { name: res.data.name, email: res.data.email });
        closeModal();
        alert('로그인 되었습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-2">로그인</h2>

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

      {/* 비밀번호 찾기 */}
      <div className="text-right text-xs text-muted hover:underline cursor-pointer">
        비밀번호를 잊으셨나요?
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-opacity-90 transition"
      >
        로그인
      </button>
    </form>
  );
}
