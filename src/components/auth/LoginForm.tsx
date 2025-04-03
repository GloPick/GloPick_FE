import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { LoginFormData } from './types';

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
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
