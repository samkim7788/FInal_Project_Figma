import React, { useState } from 'react';
import { MainPage } from './components/MainPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { MyPage } from './components/MyPage';
import { ChatPage } from './components/ChatPage';
import { ChatGuidelinesPage } from './components/ChatGuidelinesPage';
import { PreferencePage } from './components/PreferencePage';
import { PreferenceResultPage } from './components/PreferenceResultPage';
import { ReferenceBoard } from './components/ReferenceBoard';
import { PasswordResetPage } from './components/PasswordResetPage';

type Page = 'main' | 'login' | 'signup' | 'mypage' | 'chat' | 'chat-guidelines' | 'preference' | 'preference-result' | 'reference' | 'password-reset';

export default function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('main');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('main');
    setUserPreferences(null);
    setFavoriteProducts([]);
  };

  const handlePreferenceComplete = (preferences: any) => {
    setUserPreferences(preferences);
    setCurrentPage('preference-result');
  };

  const handleAddFavorite = (product: any) => {
    setFavoriteProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    setFavoriteProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleNavigate = (page: Page) => {
    // Check if user is trying to access restricted pages without login
    if (!isLoggedIn && (page === 'mypage' || page === 'preference' || page === 'reference')) {
      alert('로그인이 필요한 서비스입니다.');
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignUpPage onNavigate={handleNavigate} />;
      case 'password-reset':
        return <PasswordResetPage onNavigate={handleNavigate} />;
      case 'preference':
        return <PreferencePage onNavigate={handleNavigate} onComplete={handlePreferenceComplete} />;
      case 'preference-result':
        return <PreferenceResultPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} preferences={userPreferences} />;
      case 'reference':
        return <ReferenceBoard onNavigate={handleNavigate} isLoggedIn={isLoggedIn} userPreferences={userPreferences} onLogout={handleLogout} />;
      case 'chat':
        return <ChatPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} userPreferences={userPreferences} favoriteProducts={favoriteProducts} onAddFavorite={handleAddFavorite} onRemoveFavorite={handleRemoveFavorite} />;
      case 'chat-guidelines':
        return <ChatGuidelinesPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
      case 'mypage':
        return <MyPage onNavigate={handleNavigate} onLogout={handleLogout} userPreferences={userPreferences} favoriteProducts={favoriteProducts} handleRemoveFavorite={handleRemoveFavorite} />;
      default:
        return <MainPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
    </div>
  );
}