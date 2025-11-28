import React from 'react';
import { Header } from './Header';
import { MessageCircle, Heart, Image as ImageIcon, Sparkles, Star, Circle } from 'lucide-react';

interface MainPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export function MainPage({ onNavigate, isLoggedIn, onLogout }: MainPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden" style={{ fontFamily: "'Fredoka', sans-serif" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating 3D Glass Spheres */}
        <div className="absolute top-20 left-10 w-32 h-32 animate-float">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-blue-200/30 to-blue-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -10px -10px 20px rgba(255, 255, 255, 0.5), inset 10px 10px 20px rgba(99, 102, 241, 0.1), 0 25px 50px rgba(99, 102, 241, 0.3)' }}></div>
        </div>
        
        <div className="absolute top-40 right-20 w-24 h-24 animate-float-delayed">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-purple-200/30 to-purple-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -8px -8px 16px rgba(255, 255, 255, 0.5), inset 8px 8px 16px rgba(168, 85, 247, 0.1), 0 20px 40px rgba(168, 85, 247, 0.3)' }}></div>
        </div>
        
        <div className="absolute bottom-40 left-1/4 w-40 h-40 animate-float-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-pink-200/30 to-pink-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -12px -12px 24px rgba(255, 255, 255, 0.5), inset 12px 12px 24px rgba(236, 72, 153, 0.1), 0 30px 60px rgba(236, 72, 153, 0.3)' }}></div>
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-20 h-20 animate-float">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-cyan-200/30 to-cyan-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -7px -7px 14px rgba(255, 255, 255, 0.5), inset 7px 7px 14px rgba(34, 211, 238, 0.1), 0 18px 36px rgba(34, 211, 238, 0.3)' }}></div>
        </div>
        
        <div className="absolute bottom-20 right-40 w-28 h-28 animate-float-delayed">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-rose-200/30 to-rose-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -9px -9px 18px rgba(255, 255, 255, 0.5), inset 9px 9px 18px rgba(244, 63, 94, 0.1), 0 22px 44px rgba(244, 63, 94, 0.3)' }}></div>
        </div>
        
        {/* Medium sized glass spheres */}
        <div className="absolute top-60 left-1/3 w-16 h-16 animate-float-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-violet-200/30 to-violet-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -6px -6px 12px rgba(255, 255, 255, 0.5), inset 6px 6px 12px rgba(139, 92, 246, 0.1), 0 15px 30px rgba(139, 92, 246, 0.3)' }}></div>
        </div>
        
        <div className="absolute bottom-60 right-1/3 w-20 h-20 animate-float">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-teal-200/30 to-teal-400/20 backdrop-blur-md shadow-2xl border border-white/30" style={{ boxShadow: 'inset -7px -7px 14px rgba(255, 255, 255, 0.5), inset 7px 7px 14px rgba(20, 184, 166, 0.1), 0 18px 36px rgba(20, 184, 166, 0.3)' }}></div>
        </div>
        
        {/* Large Gradient Orbs with blur */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-transparent rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400 to-transparent rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-300 to-transparent rounded-full blur-3xl opacity-10"></div>
        
        {/* Small glass spheres - twinkling effect */}
        <div className="absolute top-32 left-1/3 animate-twinkle">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white/60 via-yellow-200/40 to-yellow-400/30 backdrop-blur-sm shadow-lg border border-white/40" style={{ boxShadow: 'inset -2px -2px 4px rgba(255, 255, 255, 0.6), inset 2px 2px 4px rgba(250, 204, 21, 0.2), 0 4px 8px rgba(250, 204, 21, 0.4)' }}></div>
        </div>
        
        <div className="absolute top-1/4 right-1/3 animate-twinkle-delayed">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-white/60 via-pink-200/40 to-pink-400/30 backdrop-blur-sm shadow-lg border border-white/40" style={{ boxShadow: 'inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.6), inset 1.5px 1.5px 3px rgba(244, 114, 182, 0.2), 0 3px 6px rgba(244, 114, 182, 0.4)' }}></div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 animate-twinkle">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-white/60 via-purple-200/40 to-purple-400/30 backdrop-blur-sm shadow-lg border border-white/40" style={{ boxShadow: 'inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.6), inset 1.5px 1.5px 3px rgba(192, 132, 252, 0.2), 0 3.5px 7px rgba(192, 132, 252, 0.4)' }}></div>
        </div>
        
        <div className="absolute top-2/3 right-1/4 animate-twinkle-delayed">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white/60 via-blue-200/40 to-blue-400/30 backdrop-blur-sm shadow-lg border border-white/40" style={{ boxShadow: 'inset -1px -1px 2px rgba(255, 255, 255, 0.6), inset 1px 1px 2px rgba(96, 165, 250, 0.2), 0 2.5px 5px rgba(96, 165, 250, 0.4)' }}></div>
        </div>
        
        {/* More scattered glass dots */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-white/60 via-rose-200/40 to-rose-300/30 backdrop-blur-sm shadow-md border border-white/40 animate-twinkle" style={{ boxShadow: 'inset -1px -1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(251, 113, 133, 0.3)' }}></div>
        
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-white/60 via-indigo-200/40 to-indigo-300/30 backdrop-blur-sm shadow-md border border-white/40 animate-twinkle-delayed" style={{ boxShadow: 'inset -1px -1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(129, 140, 248, 0.3)' }}></div>
      </div>

      <Header onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center py-16">
            {/* 3D Glass Spheres Logo */}
            <div className="relative mb-12 animate-float">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
              </div>
              
              <div className="relative flex items-center justify-center gap-6">
                {/* Large center sphere */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/50 via-purple-200/40 to-purple-400/30 backdrop-blur-xl shadow-2xl border-2 border-white/40 animate-pulse-gentle" 
                     style={{ boxShadow: 'inset -15px -15px 30px rgba(255, 255, 255, 0.6), inset 15px 15px 30px rgba(168, 85, 247, 0.15), 0 35px 70px rgba(168, 85, 247, 0.4)' }}>
                </div>
                
                {/* Floating spheres around */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-white/50 via-pink-200/40 to-pink-400/30 backdrop-blur-lg shadow-xl border border-white/40 animate-spin-slow" 
                     style={{ boxShadow: 'inset -8px -8px 16px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(236, 72, 153, 0.15), 0 20px 40px rgba(236, 72, 153, 0.4)' }}>
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-white/50 via-blue-200/40 to-blue-400/30 backdrop-blur-lg shadow-xl border border-white/40 animate-spin-slow-reverse" 
                     style={{ boxShadow: 'inset -6px -6px 12px rgba(255, 255, 255, 0.6), inset 6px 6px 12px rgba(59, 130, 246, 0.15), 0 16px 32px rgba(59, 130, 246, 0.4)' }}>
                </div>
                
                <div className="absolute top-4 -left-10 w-12 h-12 rounded-full bg-gradient-to-br from-white/50 via-yellow-200/40 to-yellow-400/30 backdrop-blur-lg shadow-lg border border-white/40 animate-float" 
                     style={{ boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.6), inset 5px 5px 10px rgba(250, 204, 21, 0.15), 0 12px 24px rgba(250, 204, 21, 0.4)' }}>
                </div>
                
                <div className="absolute bottom-4 -right-12 w-14 h-14 rounded-full bg-gradient-to-br from-white/50 via-cyan-200/40 to-cyan-400/30 backdrop-blur-lg shadow-lg border border-white/40 animate-float-delayed" 
                     style={{ boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.6), inset 5px 5px 10px rgba(34, 211, 238, 0.15), 0 14px 28px rgba(34, 211, 238, 0.4)' }}>
                </div>
              </div>
            </div>
            
            {/* Brand Name with Cute Style */}
            <div className="mb-8 text-center">
              <h1 className="text-8xl mb-4 tracking-tight relative inline-block" style={{ fontWeight: 600 }}>
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
                  MOOD ON
                </span>
                {/* Decorative gradient circle */}
                <div className="absolute -top-6 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 animate-bounce-gentle"></div>
              </h1>
              <div className="flex items-center justify-center gap-3 text-2xl">
                <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ fontWeight: 500 }}>
                  당신의 무드를 켜다
                </p>
              </div>
            </div>
            
            {/* Tagline in Cute Bubble */}
            <div className="mb-12 relative">
              <div className="bg-white/60 backdrop-blur-md rounded-[30px] px-10 py-6 shadow-2xl border-4 border-white/80 max-w-2xl">
                <p className="text-xl text-gray-700 text-center leading-relaxed" style={{ fontWeight: 400 }}>
                  당신의 무드를 이해해 오브제를 추천해주는<br />
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent text-2xl" style={{ fontWeight: 600 }}>
                    인테리어 감성 큐레이션 챗봇
                  </span>
                </p>
              </div>
              {/* Decorative gradient shapes */}
              <div className="absolute -left-8 top-0 w-16 h-16 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-40 animate-wiggle"></div>
              <div className="absolute -right-8 bottom-0 w-14 h-14 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-40 animate-wiggle-delayed"></div>
            </div>
            
            {/* CTA Buttons */}
            {!isLoggedIn && (
              <div className="flex gap-6 mb-20">
                <button 
                  onClick={() => onNavigate('signup')}
                  className="px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 text-xl relative overflow-hidden group"
                  style={{ fontWeight: 600 }}
                >
                  <span className="relative z-10">회원가입하기</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </button>
                <button 
                  onClick={() => onNavigate('login')}
                  className="px-12 py-5 bg-white/80 backdrop-blur border-4 border-purple-300 text-purple-600 rounded-full hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-xl"
                  style={{ fontWeight: 600 }}
                >
                  로그인
                </button>
              </div>
            )}
          </div>
          
          {/* Feature Cards - Cute & Pastel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <button
              onClick={() => onNavigate(isLoggedIn ? 'chat' : 'login')}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-[40px] blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative p-8 bg-gradient-to-br from-blue-200 via-cyan-100 to-blue-100 rounded-[40px] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-4 border-white/50">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                  <MessageCircle size={40} className="text-white" />
                </div>
                <h3 className="text-2xl mb-3 text-gray-800" style={{ fontWeight: 600 }}>
                  AI 챗봇
                </h3>
                <p className="text-gray-700" style={{ fontWeight: 400 }}>
                  실시간 AI 추천으로<br />
                  인테리어 상담하기
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate(isLoggedIn ? 'preference' : 'login')}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-[40px] blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative p-8 bg-gradient-to-br from-yellow-200 via-orange-100 to-pink-100 rounded-[40px] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-4 border-white/50">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                  <Sparkles size={40} className="text-white" />
                </div>
                <h3 className="text-2xl mb-3 text-gray-800" style={{ fontWeight: 600 }}>
                  취향 분석
                </h3>
                <p className="text-gray-700" style={{ fontWeight: 400 }}>
                  나만의 스타일을<br />
                  찾아보세요
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate(isLoggedIn ? 'reference' : 'login')}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 rounded-[40px] blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative p-8 bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 rounded-[40px] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-4 border-white/50">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                  <ImageIcon size={40} className="text-white" />
                </div>
                <h3 className="text-2xl mb-3 text-gray-800" style={{ fontWeight: 600 }}>
                  레퍼런스 보드
                </h3>
                <p className="text-gray-700" style={{ fontWeight: 400 }}>
                  12가지 스타일의<br />
                  인테리어 이미지
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate(isLoggedIn ? 'mypage' : 'login')}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 rounded-[40px] blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative p-8 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-100 rounded-[40px] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-4 border-white/50">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                  <Heart size={40} className="text-white fill-white" />
                </div>
                <h3 className="text-2xl mb-3 text-gray-800" style={{ fontWeight: 600 }}>
                  관심 상품
                </h3>
                <p className="text-gray-700" style={{ fontWeight: 400 }}>
                  마음에 드는 상품을<br />
                  모아보세요
                </p>
              </div>
            </button>
          </div>

          {/* Bottom CTA Banner */}
          <div className="relative rounded-[50px] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-80"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            
            <div className="relative px-16 py-20 text-center text-white">
              <h3 className="text-5xl mb-4 drop-shadow-lg" style={{ fontWeight: 600 }}>
                나만의 공간, 나만의 무드
              </h3>
              <p className="text-2xl mb-8 text-purple-100" style={{ fontWeight: 400 }}>
                MOOD ON과 함께 완성하세요
              </p>
              
              <button 
                onClick={() => onNavigate(isLoggedIn ? 'chat' : 'signup')}
                className="px-12 py-5 bg-white text-purple-600 rounded-full hover:bg-purple-50 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-110 text-xl group/btn"
                style={{ fontWeight: 600 }}
              >
                <span className="flex items-center gap-3">
                  <span>지금 시작하기</span>
                  <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                </span>
              </button>
              
              {/* Floating gradient decorations */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-50 animate-float"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-50 animate-float-delayed"></div>
              <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-br from-yellow-200 to-transparent rounded-full opacity-40 animate-wiggle"></div>
              <div className="absolute top-1/2 right-20 w-14 h-14 bg-gradient-to-br from-pink-200 to-transparent rounded-full opacity-40 animate-wiggle-delayed"></div>
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
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes wiggle-delayed {
          0%, 100% { transform: rotate(5deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle-delayed 2.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        .animate-wiggle-delayed {
          animation: wiggle-delayed 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}