import React from 'react';
import { Lamp } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export function Header({ onNavigate, isLoggedIn, onLogout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('main')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Lamp size={20} className="text-white" />
          </div>
          <span className="text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            MOOD ON
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => onNavigate('chat')}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                챗봇
              </button>
              <button 
                onClick={() => onNavigate('reference')}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                레퍼런스 보드
              </button>
              <button 
                onClick={() => onNavigate('mypage')}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                마이페이지
              </button>
              <button 
                onClick={onLogout}
                className="px-6 py-2 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-all"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('chat')}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                챗봇
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                회원가입
              </button>
              <button 
                onClick={() => onNavigate('login')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:from-blue-600 hover:to-blue-500 transition-all shadow-md"
              >
                로그인
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
