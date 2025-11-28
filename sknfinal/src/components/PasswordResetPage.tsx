import React, { useState } from 'react';
import { Header } from './Header';
import { Mail, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

interface PasswordResetPageProps {
  onNavigate: (page: string) => void;
}

export function PasswordResetPage({ onNavigate }: PasswordResetPageProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <Header onNavigate={onNavigate} isLoggedIn={false} />
        
        <main className="pt-32 pb-16">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h1 className="text-3xl mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  이메일 전송 완료!
                </h1>
                <div className="bg-blue-50 rounded-2xl p-5 mb-6">
                  <p className="text-gray-700 mb-2">
                    <span className="text-blue-600">{email}</span>로
                  </p>
                  <p className="text-gray-700">
                    비밀번호 재설정 링크를 전송했습니다.
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  이메일을 확인하고 링크를 클릭하여<br/>
                  비밀번호를 재설정하세요.
                </p>
              </div>
              
              <button
                onClick={() => onNavigate('login')}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                <span>로그인으로 돌아가기</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header onNavigate={onNavigate} isLoggedIn={false} />
      
      <main className="pt-32 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock size={36} className="text-white" />
              </div>
              <h1 className="text-3xl mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                비밀번호 재설정
              </h1>
              <p className="text-gray-600">
                가입하신 이메일 주소를 입력하시면<br />
                비밀번호 재설정 링크를 보내드립니다.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  <span>이메일</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                재설정 링크 전송
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => onNavigate('login')}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <ArrowLeft size={16} />
                <span>로그인으로 돌아가기</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
