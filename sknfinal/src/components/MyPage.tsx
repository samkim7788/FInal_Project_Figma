import React, { useState } from 'react';
import { Header } from './Header';
import { Heart, ExternalLink, Trash2, AlertCircle, X, ArrowUpDown, User, Calendar, Sparkles, Palette } from 'lucide-react';

interface MyPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userPreferences: any;
  favoriteProducts: any[];
  handleRemoveFavorite: (productId: string) => void;
}

type SortOption = 'recent' | 'price-low' | 'price-high';

export function MyPage({ onNavigate, onLogout, userPreferences, favoriteProducts, handleRemoveFavorite }: MyPageProps) {
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleDeleteAccount = () => {
    setShowDeleteAccountPopup(true);
  };

  const confirmDeleteAccount = () => {
    alert('회원 탈퇴가 완료되었습니다. 그동안 MOOD ON을 이용해주셔서 감사합니다.');
    setShowDeleteAccountPopup(false);
    onLogout();
  };

  // Sort products
  const getSortedProducts = () => {
    const sorted = [...favoriteProducts];
    
    if (sortBy === 'price-low') {
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
        return priceB - priceA;
      });
    }
    
    return sorted; // recent (default order)
  };

  const sortedProducts = getSortedProducts();

  const getSortLabel = () => {
    switch(sortBy) {
      case 'price-low': return '가격 낮은순';
      case 'price-high': return '가격 높은순';
      default: return '등록순';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header onNavigate={onNavigate} isLoggedIn={true} onLogout={onLogout} />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Profile Header */}
          <div className="mb-12 text-center">
            <div className="inline-block relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl text-white">M</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles size={20} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              mountainstar03
            </h1>
            <p className="text-gray-600">mountainstar03@gmail.com</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Account Settings Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  <User size={24} className="text-blue-500" />
                  <span>계정 관리</span>
                </h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => onNavigate('password-reset')}
                    className="w-full text-left py-4 px-5 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl transition-all group flex items-center justify-between"
                  >
                    <span className="text-gray-800">비밀번호 수정</span>
                    <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full text-left py-4 px-5 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-2xl transition-all group flex items-center justify-between"
                  >
                    <span className="text-red-700">회원 탈퇴</span>
                    <span className="text-red-500 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* My Mood Section - Redesigned */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Palette size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    나의 MOOD
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Gender */}
                  <div className="group">
                    <div className="relative mb-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-105 group-hover:rotate-3">
                        <div className="text-5xl">
                          {userPreferences?.gender === '여성' ? '👩' : userPreferences?.gender === '남성' ? '👨' : '🧑'}
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <User size={16} className="text-purple-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">성별</p>
                      <p className="font-medium text-gray-800">{userPreferences?.gender || '여성'}</p>
                    </div>
                  </div>
                  
                  {/* Birthdate */}
                  <div className="group">
                    <div className="relative mb-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-105 group-hover:rotate-3">
                        <div className="text-5xl">🎂</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <Calendar size={16} className="text-pink-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">생년월일</p>
                      <p className="font-medium text-gray-800 text-sm">{userPreferences?.birthdate || '2000.06.17'}</p>
                    </div>
                  </div>
                  
                  {/* MBTI */}
                  <div className="group">
                    <div className="relative mb-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-green-200 via-emerald-300 to-teal-400 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-105 group-hover:rotate-3">
                        <div className="text-2xl text-white drop-shadow-lg">{userPreferences?.mbti || 'ENTJ'}</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <Sparkles size={16} className="text-green-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">MBTI</p>
                      <p className="font-medium text-gray-800">{userPreferences?.mbti || 'ENTJ'}</p>
                    </div>
                  </div>
                  
                  {/* Style Preference */}
                  <div className="group">
                    <div className="relative mb-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-blue-200 via-cyan-300 to-sky-400 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-105 group-hover:rotate-3">
                        <div className="text-5xl">🏠</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <Palette size={16} className="text-blue-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">스타일</p>
                      <p className="font-medium text-gray-800">{userPreferences?.styles?.[0] || '북유럽'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preference Update Banner */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl p-8 shadow-xl border-2 border-purple-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -ml-12 -mb-12 opacity-50"></div>
              <div className="relative flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1 text-gray-800">취향이 바뀌셨나요?</h3>
                    <p className="text-gray-600">언제든 선호도를 업데이트할 수 있어요!</p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('preference')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <span>선호도 업데이트</span>
                  <span>✨</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Wishlist Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart size={24} className="text-white fill-white" />
                </div>
                <h2 className="text-3xl text-gray-800">관심 상품</h2>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm shadow-lg">
                  {favoriteProducts.length}개
                </span>
              </div>

              {favoriteProducts.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="px-6 py-3 bg-white border-2 border-blue-200 rounded-2xl hover:border-blue-400 transition-all shadow-md flex items-center gap-2"
                  >
                    <ArrowUpDown size={18} className="text-blue-600" />
                    <span className="text-gray-700">{getSortLabel()}</span>
                  </button>
                  
                  {showSortMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden z-10 min-w-[160px]">
                      <button
                        onClick={() => {
                          setSortBy('recent');
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors ${
                          sortBy === 'recent' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        등록순
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('price-low');
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors ${
                          sortBy === 'price-low' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        가격 낮은순
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('price-high');
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors ${
                          sortBy === 'price-high' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        가격 높은순
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {favoriteProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 min-h-[400px] flex flex-col items-center justify-center shadow-xl border-2 border-dashed border-blue-200">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mb-6">
                  <Heart size={64} className="text-pink-300" />
                </div>
                <h3 className="text-2xl mb-3 text-gray-800">아직 관심 상품이 없어요</h3>
                <p className="text-gray-500 mb-8 text-center">
                  챗봇에서 마음에 드는 상품을 찾아보세요!<br/>
                  AI가 당신의 취향에 맞는 상품을 추천해드릴게요.
                </p>
                <button
                  onClick={() => onNavigate('chat')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <span>챗봇으로 가기</span>
                  <span>💬</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="group">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-pink-100 hover:border-pink-300 transform hover:-translate-y-2">
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => handleRemoveFavorite(product.id)}
                          className="absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur rounded-full hover:bg-red-50 transition-all shadow-lg group/btn"
                          title="관심 상품 해제"
                        >
                          <Heart size={20} className="text-pink-500 fill-pink-500 group-hover/btn:text-red-500 group-hover/btn:fill-red-500" />
                        </button>
                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs shadow-lg">
                          관심상품
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="mb-1 text-lg truncate">{product.name}</h4>
                        <p className="text-xs text-gray-500 mb-3">{product.brand || 'Brand'}</p>
                        <p className="text-blue-600 mb-4 text-xl">{product.price}</p>
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-md hover:shadow-lg"
                        >
                          <ExternalLink size={18} />
                          <span>구매하러 가기</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Account Popup */}
      {showDeleteAccountPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <AlertCircle size={40} className="text-white" />
              </div>
              <h2 className="text-2xl mb-3 text-gray-800">
                정말 탈퇴하시겠어요?
              </h2>
              <p className="text-gray-600 mb-6">
                회원 탈퇴 시 모든 데이터가 삭제되며<br/>
                복구할 수 없습니다.
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 mb-6 border-2 border-red-100">
              <h3 className="text-sm mb-3 text-red-800 flex items-center gap-2">
                <AlertCircle size={18} />
                <span>삭제되는 정보</span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>계정 정보 및 프로필</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>취향 분석 데이터</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>관심 상품 목록</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>채팅 히스토리</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteAccountPopup(false)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all text-gray-700"
              >
                취소
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="flex-1 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl hover:from-red-600 hover:to-rose-600 transition-all shadow-lg"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}