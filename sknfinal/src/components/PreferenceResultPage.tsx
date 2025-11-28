import React from 'react';
import { Header } from './Header';
import { Sparkles, Heart, Star } from 'lucide-react';

interface PreferenceResultPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout?: () => void;
  preferences: {
    gender: string;
    birthdate: string;
    mbti: string;
    styles: string[];
  };
}

const styleDisplayNames: { [key: string]: string } = {
  'vintage': '빈티지',
  'luxury': '럭셔리',
  'natural': '내추럴',
  'scandinavian': '스칸디나비안',
  'french': '프렌치',
  'lovely': '러블리',
  'pastel': '파스텔',
  'modern': '모던',
  'bohemian': '보헤미안',
  'classic': '클래식',
  'industrial': '인더스트리얼',
  'minimal': '미니멀'
};

export function PreferenceResultPage({ onNavigate, isLoggedIn, onLogout, preferences }: PreferenceResultPageProps) {
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(preferences.birthdate);
  const ageGroup = age < 20 ? '10대' : age < 30 ? '20대' : age < 40 ? '30대' : age < 50 ? '40대' : age < 60 ? '50대' : '60대 이상';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden" style={{ fontFamily: "'Fredoka', sans-serif" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating 3D Glass Spheres */}
        <div className="absolute top-20 left-10 w-32 h-32 animate-float">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-pink-200/30 to-pink-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -10px -10px 20px rgba(255, 255, 255, 0.5), inset 10px 10px 20px rgba(236, 72, 153, 0.1), 0 25px 50px rgba(236, 72, 153, 0.3)' }}></div>
        </div>
        
        <div className="absolute top-40 right-20 w-24 h-24 animate-float-delayed">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-purple-200/30 to-purple-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -8px -8px 16px rgba(255, 255, 255, 0.5), inset 8px 8px 16px rgba(168, 85, 247, 0.1), 0 20px 40px rgba(168, 85, 247, 0.3)' }}></div>
        </div>
        
        <div className="absolute bottom-40 left-1/4 w-40 h-40 animate-float-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-blue-200/30 to-blue-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -12px -12px 24px rgba(255, 255, 255, 0.5), inset 12px 12px 24px rgba(59, 130, 246, 0.1), 0 30px 60px rgba(59, 130, 246, 0.3)' }}></div>
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-20 h-20 animate-float">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-yellow-200/30 to-yellow-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -7px -7px 14px rgba(255, 255, 255, 0.5), inset 7px 7px 14px rgba(250, 204, 21, 0.1), 0 18px 36px rgba(250, 204, 21, 0.3)' }}></div>
        </div>
        
        <div className="absolute bottom-20 right-40 w-28 h-28 animate-float-delayed">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-cyan-200/30 to-cyan-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -9px -9px 18px rgba(255, 255, 255, 0.5), inset 9px 9px 18px rgba(34, 211, 238, 0.1), 0 22px 44px rgba(34, 211, 238, 0.3)' }}></div>
        </div>

        {/* Large blur orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-transparent rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400 to-transparent rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      <Header onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Celebration Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Center large sphere */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/50 via-pink-200/40 to-pink-400/30 backdrop-blur-xl shadow-2xl border-2 border-white/40 animate-pulse-gentle" 
                     style={{ boxShadow: 'inset -12px -12px 24px rgba(255, 255, 255, 0.6), inset 12px 12px 24px rgba(236, 72, 153, 0.15), 0 30px 60px rgba(236, 72, 153, 0.4)' }}>
                </div>
                
                {/* Floating stars */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full animate-bounce-gentle"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
            
            <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                취향 분석 완료!
              </span>
            </h1>
            <p className="text-xl text-gray-700" style={{ fontWeight: 500 }}>
              당신의 멋진 취향을 정리했어요
            </p>
          </div>

          {/* Result Cards */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-[40px] p-8 shadow-2xl border-4 border-white/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200 to-transparent rounded-full blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
                    <Heart size={24} className="text-white fill-white" />
                  </div>
                  <h2 className="text-3xl" style={{ fontWeight: 600 }}>
                    <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      프로필
                    </span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border-2 border-pink-200">
                    <p className="text-sm text-pink-600 mb-2" style={{ fontWeight: 600 }}>성별</p>
                    <p className="text-2xl text-gray-800" style={{ fontWeight: 600 }}>{preferences.gender}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200">
                    <p className="text-sm text-purple-600 mb-2" style={{ fontWeight: 600 }}>연령대</p>
                    <p className="text-2xl text-gray-800" style={{ fontWeight: 600 }}>{ageGroup}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border-2 border-blue-200">
                    <p className="text-sm text-blue-600 mb-2" style={{ fontWeight: 600 }}>MBTI</p>
                    <p className="text-2xl text-gray-800" style={{ fontWeight: 600 }}>{preferences.mbti}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Style Preferences Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-[40px] p-8 shadow-2xl border-4 border-white/80 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200 to-transparent rounded-full blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl" style={{ fontWeight: 600 }}>
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      선호 스타일
                    </span>
                  </h2>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {preferences.styles.map((styleId, index) => (
                    <div 
                      key={styleId}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative px-8 py-4 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-full border-3 border-white/50 shadow-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{index + 1}</span>
                          <span className="text-xl text-gray-800" style={{ fontWeight: 600 }}>
                            {styleDisplayNames[styleId]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200">
                  <p className="text-gray-700 leading-relaxed" style={{ fontWeight: 400 }}>
                    <span className="text-purple-600" style={{ fontWeight: 600 }}>"{styleDisplayNames[preferences.styles[0]]}"</span> 스타일을 가장 좋아하시는군요! 
                    이제 AI 챗봇이 회원님의 취향에 맞는 멋진 인테리어 상품들을 추천해드릴게요.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-[40px] p-8 shadow-2xl border-4 border-white relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200 to-transparent rounded-full blur-3xl opacity-30"></div>
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full animate-bounce-gentle"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
                </div>
                
                <h3 className="text-3xl mb-4" style={{ fontWeight: 700 }}>
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {preferences.gender}이고 {ageGroup}인 {preferences.mbti} 성격의 당신!
                  </span>
                </h3>
                
                <p className="text-xl text-gray-700 mb-8" style={{ fontWeight: 500 }}>
                  {preferences.styles.map((styleId) => styleDisplayNames[styleId]).join(', ')} 스타일을 좋아하시네요
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => onNavigate('chat')}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 text-lg relative overflow-hidden group"
                    style={{ fontWeight: 600 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles size={20} />
                      AI 챗봇 시작하기
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  </button>
                  
                  <button
                    onClick={() => onNavigate('main')}
                    className="px-8 py-4 bg-white/80 backdrop-blur border-4 border-purple-300 text-purple-600 rounded-full hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                    style={{ fontWeight: 600 }}
                  >
                    메인으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
