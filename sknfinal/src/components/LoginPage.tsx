import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Mail, Lock, AlertCircle, Clock } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [failCount, setFailCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  useEffect(() => {
    if (blockTimeLeft > 0) {
      const timer = setTimeout(() => setBlockTimeLeft(blockTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (blockTimeLeft === 0 && isBlocked) {
      setIsBlocked(false);
      setFailCount(0);
    }
  }, [blockTimeLeft, isBlocked]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    setError('');

    if (isBlocked) {
      setError(`10분 후 다시 시도해주세요. (${Math.floor(blockTimeLeft / 60)}:${(blockTimeLeft % 60).toString().padStart(2, '0')})`);
      return;
    }

    if (!validateEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // Mock 로그인 (실제로는 서버 검증)
    const mockEmail = 'test@test.com';
    const mockPassword = 'test123!';

    if (email !== mockEmail || password !== mockPassword) {
      const newFailCount = failCount + 1;
      setFailCount(newFailCount);

      if (newFailCount >= 5) {
        setIsBlocked(true);
        setBlockTimeLeft(600); // 10분
        setError('로그인 5회 실패로 10분간 로그인이 제한됩니다.');
      } else {
        setError(`이메일 또는 비밀번호가 일치하지 않습니다. (${newFailCount}/5)`);
      }
      return;
    }

    onLogin();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header onNavigate={onNavigate} isLoggedIn={false} />
      
      <main className="pt-32 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Logo/Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/50 via-blue-200/40 to-blue-400/30 backdrop-blur-lg shadow-2xl border border-white/40" 
                   style={{ boxShadow: 'inset -8px -8px 16px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(59, 130, 246, 0.15), 0 20px 40px rgba(59, 130, 246, 0.3)' }}>
              </div>
            </div>

            <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              로그인
            </h1>
            <p className="text-gray-500 text-center mb-8">MOOD ON에 오신 것을 환영합니다</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-gray-700">이메일</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="example@email.com"
                    disabled={isBlocked}
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-400 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">비밀번호</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="비밀번호"
                    disabled={isBlocked}
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-400 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl mb-6">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {isBlocked && (
              <div className="flex items-center justify-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl mb-6">
                <Clock size={20} className="text-yellow-600" />
                <p className="text-sm text-yellow-700">
                  {Math.floor(blockTimeLeft / 60)}분 {blockTimeLeft % 60}초 후 재시도 가능
                </p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={isBlocked}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              로그인
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                onClick={() => onNavigate('password-reset')}
                className="text-blue-600 hover:underline"
              >
                비밀번호 찾기
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="text-blue-600 hover:underline"
              >
                회원가입
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <p className="text-sm text-gray-700 mb-2">테스트 계정:</p>
              <p className="text-sm text-gray-600">이메일: test@test.com</p>
              <p className="text-sm text-gray-600">비밀번호: test123!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}