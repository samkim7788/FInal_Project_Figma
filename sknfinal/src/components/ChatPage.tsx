import React, { useState, useRef, useEffect } from 'react';
import { Header } from './Header';
import { Send, Image as ImageIcon, X, Menu, AlertCircle, Heart, Trash2, ThumbsUp, ThumbsDown, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface ChatPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout?: () => void;
  userPreferences?: any;
  favoriteProducts: any[];
  onAddFavorite: (product: any) => void;
  onRemoveFavorite: (productId: string) => void;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: string;
  link: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
  products?: Product[];
  liked?: boolean | null;
}

interface ChatSession {
  id: string;
  date: string;
  title: string;
  messages: Message[];
}

const exampleQuestions = [
  '빈티지 스타일 소파 추천해줘',
  '원목 테이블 어디서 구매할 수 있을까?',
  '작은 거실에 어울리는 인테리어 소품은?',
  '모던한 조명 추천 부탁해'
];

// Mock products
const mockProducts: Product[] = [
  {
    id: '1',
    name: '빈티지 패브릭 소파',
    brand: 'Brand A',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    price: '₩450,000',
    link: 'https://example.com/product1'
  },
  {
    id: '2',
    name: '원목 커피 테이블',
    brand: 'Brand B',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    price: '₩180,000',
    link: 'https://example.com/product2'
  },
  {
    id: '3',
    name: '북유럽 스타일 조명',
    brand: 'Brand C',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    price: '₩95,000',
    link: 'https://example.com/product3'
  },
  {
    id: '4',
    name: '미니멀 선반',
    brand: 'Brand D',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400',
    price: '₩65,000',
    link: 'https://example.com/product4'
  }
];

export function ChatPage({ onNavigate, isLoggedIn, onLogout, userPreferences, favoriteProducts, onAddFavorite, onRemoveFavorite }: ChatPageProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      date: '2025-11-27',
      title: '2025-11-27',
      messages: []
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showGuidelinesPopup, setShowGuidelinesPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);
  const [messageIdCounter, setMessageIdCounter] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        alert('JPG 또는 PNG 파일만 업로드 가능합니다.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('이미지 크기는 10MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBotResponse = (userInput: string): { text: string; products?: Product[] } => {
    const keywords = ['소파', '테이블', '조명', '선반', '가구', '인테리어'];
    const hasKeyword = keywords.some(k => userInput.includes(k));

    if (hasKeyword) {
      const numProducts = Math.floor(Math.random() * 3) + 1; // 1-3개
      const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffled.slice(0, numProducts);

      return {
        text: `${userPreferences?.gender || '회원'}님의 취향을 고려해 선별한 상품들이에요! 마음에 드시나요?`,
        products: selectedProducts
      };
    }

    return {
      text: '어떤 스타일의 제품을 찾으시나요? 구체적으로 알려주시면 더 정확한 추천이 가능해요!'
    };
  };

  const handleSend = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    const text = inputText.trim();
    if (!text && !uploadedImage) return;

    if (text.length > 200) {
      alert('질문은 최대 200자 이내로 입력해주세요.');
      return;
    }

    const userMessage: Message = {
      id: messageIdCounter,
      text: text,
      sender: 'user',
      timestamp: new Date(),
      image: uploadedImage || undefined
    };

    const updatedSessions = sessions.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, userMessage]
        };
      }
      return session;
    });

    setSessions(updatedSessions);
    setInputText('');
    setUploadedImage(null);
    setMessageIdCounter(prev => prev + 1);

    setTimeout(() => {
      const response = generateBotResponse(text);
      const botMessage: Message = {
        id: messageIdCounter + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        products: response.products,
        liked: null
      };
      
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, botMessage]
          };
        }
        return session;
      }));
      setMessageIdCounter(prev => prev + 1);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    }
  };

  const createNewSession = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const sessionsToday = sessions.filter(s => s.date === today);
    const sessionNumber = sessionsToday.length + 1;
    const title = sessionNumber > 1 ? `${today}-${sessionNumber}` : today;

    const newSession: ChatSession = {
      id: Date.now().toString(),
      date: today,
      title,
      messages: []
    };

    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
  };

  const handleSessionClick = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessionToDelete(sessionId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      setSessions(prev => prev.filter(s => s.id !== sessionToDelete));
      if (currentSessionId === sessionToDelete) {
        setCurrentSessionId(sessions[0]?.id || '');
      }
      setShowDeleteConfirm(false);
      setSessionToDelete(null);
    }
  };

  const handleLike = (messageId: number, liked: boolean) => {
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: session.messages.map(msg => 
            msg.id === messageId ? { ...msg, liked } : msg
          )
        };
      }
      return session;
    }));
  };

  const handleToggleFavorite = (product: Product) => {
    const isFavorite = favoriteProducts.find(p => p.id === product.id);
    if (isFavorite) {
      onRemoveFavorite(product.id);
    } else {
      onAddFavorite(product);
    }
  };

  const isFavorite = (productId: string) => {
    return favoriteProducts.some(p => p.id === productId);
  };

  const handleRequestMore = (messageId: number) => {
    const botMessage: Message = {
      id: messageIdCounter,
      text: '다른 스타일의 상품들을 준비했어요!',
      sender: 'bot',
      timestamp: new Date(),
      products: [...mockProducts].sort(() => 0.5 - Math.random()).slice(0, 3),
      liked: null
    };
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, botMessage]
        };
      }
      return session;
    }));
    setMessageIdCounter(prev => prev + 1);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col">
      <Header onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-blue-100 flex flex-col shadow-lg">
            <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-100 to-yellow-100">
              <button
                onClick={createNewSession}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                ✨ 새 채팅 시작하기
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto">
              {!isLoggedIn ? (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <p className="text-gray-600 mb-4">로그인 후<br/>이용 가능합니다</p>
                  <button
                    onClick={() => {
                      setShowLoginPopup(true);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:from-blue-600 hover:to-blue-500 transition-all shadow-md text-sm"
                  >
                    로그인하기
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-2">
                    <h3 className="px-4 py-2 text-sm text-gray-600">채팅 히스토리</h3>
                    {sessions.map(session => (
                      <div key={session.id} className="relative group">
                        <button
                          onClick={() => handleSessionClick(session.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all ${
                            session.id === currentSessionId 
                              ? 'bg-gradient-to-r from-blue-100 to-yellow-100 shadow-md' 
                              : 'hover:bg-blue-50'
                          }`}
                        >
                          <p className="truncate">{session.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            💬 {session.messages.length}개의 메시지
                          </p>
                        </button>
                        <button
                          onClick={() => handleDeleteSession(session.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded-lg transition-all"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Favorite Products Section */}
                  <div className="border-t border-blue-100 bg-gradient-to-br from-pink-50 to-rose-50">
                    <button
                      onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-pink-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Heart size={18} className="text-pink-500 fill-pink-500" />
                        <h3 className="text-sm">관심 상품</h3>
                        <span className="text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full">
                          {favoriteProducts.length}
                        </span>
                      </div>
                      {favoritesExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    
                    {favoritesExpanded && (
                      <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                        {favoriteProducts.length === 0 ? (
                          <div className="text-center py-8 text-gray-400 text-sm">
                            <Heart size={32} className="mx-auto mb-2 opacity-30" />
                            <p>아직 관심 상품이 없어요</p>
                            <p className="text-xs mt-1">채팅에서 상품을 추천받아보세요!</p>
                          </div>
                        ) : (
                          favoriteProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-pink-100">
                              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                              <div className="p-3">
                                <p className="text-sm mb-1 truncate">{product.name}</p>
                                <p className="text-xs text-blue-600 mb-2">{product.price}</p>
                                <div className="flex gap-2">
                                  <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
                                  >
                                    구매하기
                                  </a>
                                  <button
                                    onClick={() => onRemoveFavorite(product.id)}
                                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                    title="관심 상품 해제"
                                  >
                                    <X size={16} className="text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-blue-100 px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-sm shadow-sm">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-blue-600" />
            </button>
            <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              MOOD ON AI 챗봇
            </h1>
            {userPreferences && (
              <div className="ml-auto text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                {userPreferences.gender} · {userPreferences.mbti}
              </div>
            )}
          </div>

          <main className="flex-1 flex flex-col overflow-hidden">
            {isEmpty ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full text-center">
                  <div className="mb-6">
                    <p className="text-gray-500 mb-2">안녕하세요 👋</p>
                    <h2 className="text-4xl mb-4">
                      인테리어 고민,<br />
                      <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                        MOOD ON
                      </span>
                      이 도와드릴게요!
                    </h2>
                  </div>

                  <div className="mb-8 flex justify-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-white/50 via-blue-200/40 to-blue-400/30 backdrop-blur-xl shadow-2xl border-2 border-white/40 transform hover:scale-105 transition-transform" 
                         style={{ boxShadow: 'inset -15px -15px 30px rgba(255, 255, 255, 0.6), inset 15px 15px 30px rgba(59, 130, 246, 0.15), 0 35px 70px rgba(59, 130, 246, 0.4)' }}>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {exampleQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!isLoggedIn) {
                            setShowLoginPopup(true);
                          } else {
                            setInputText(question);
                          }
                        }}
                        className="text-left px-6 py-4 bg-white/90 backdrop-blur border-2 border-blue-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all transform hover:-translate-y-1"
                      >
                        <span className="text-blue-600 mr-2 text-xl">💡</span>
                        <span className="text-gray-700">{question}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-blue-50/50 backdrop-blur border border-blue-200 rounded-2xl p-4 inline-flex items-start gap-3 max-w-md mx-auto">
                    <AlertCircle size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 text-left">
                      MOOD ON AI는 실수할 수 있어요. 개인정보는 입력하지 마세요.{' '}
                      <button 
                        onClick={() => setShowGuidelinesPopup(true)}
                        className="text-blue-600 underline hover:text-blue-700"
                      >
                        주의사항 보기
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] px-6 py-4 rounded-3xl shadow-lg ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'
                              : 'bg-white text-gray-800 border border-blue-100'
                          }`}
                        >
                          {message.image && (
                            <img 
                              src={message.image} 
                              alt="Uploaded" 
                              className="rounded-2xl mb-3 max-w-full shadow-md"
                            />
                          )}
                          {message.text && <p className="leading-relaxed">{message.text}</p>}
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString('ko-KR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Products - Square Grid Layout */}
                      {message.products && message.products.length > 0 && (
                        <div className="mt-4 ml-16">
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {message.products.map(product => (
                              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all group">
                                <div className="relative aspect-square">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                  <button
                                    onClick={() => handleToggleFavorite(product)}
                                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all shadow-lg ${
                                      isFavorite(product.id)
                                        ? 'bg-pink-500/90'
                                        : 'bg-white/90 hover:bg-pink-50/90'
                                    }`}
                                    title={isFavorite(product.id) ? "관심 상품 해제" : "관심 상품 등록"}
                                  >
                                    <Heart 
                                      size={18} 
                                      className={isFavorite(product.id) ? 'text-white fill-white' : 'text-pink-500'}
                                    />
                                  </button>
                                </div>
                                <div className="p-4">
                                  <h4 className="mb-1 truncate">{product.name}</h4>
                                  <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                                  <p className="text-blue-600 mb-3">{product.price}</p>
                                  <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-md text-sm"
                                  >
                                    <ExternalLink size={14} />
                                    구매하기
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleRequestMore(message.id)}
                              className="px-4 py-2 bg-white border-2 border-blue-300 text-blue-600 rounded-full hover:bg-blue-50 transition-all text-sm"
                            >
                              🔄 다른 상품을 원해요
                            </button>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleLike(message.id, true)}
                                className={`p-2 rounded-full transition-all ${
                                  message.liked === true 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-white border-2 border-blue-300 text-blue-600 hover:bg-blue-50'
                                }`}
                              >
                                <ThumbsUp size={16} />
                              </button>
                              <button
                                onClick={() => handleLike(message.id, false)}
                                className={`p-2 rounded-full transition-all ${
                                  message.liked === false 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-white border-2 border-red-300 text-red-600 hover:bg-red-50'
                                }`}
                              >
                                <ThumbsDown size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-6 pb-2 text-center">
                  <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
                    <AlertCircle size={14} className="text-blue-500" />
                    <p className="text-xs text-gray-600">
                      개인정보 입력 주의 ·{' '}
                      <button 
                        onClick={() => setShowGuidelinesPopup(true)}
                        className="text-blue-600 underline hover:text-blue-700"
                      >
                        주의사항
                      </button>
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Input Area */}
            <div className="px-6 pb-6 bg-white/80 backdrop-blur">
              {uploadedImage && (
                <div className="mb-3 relative inline-block">
                  <img 
                    src={uploadedImage} 
                    alt="Preview" 
                    className="max-h-32 rounded-2xl shadow-lg"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <div className="flex gap-3 items-end">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowLoginPopup(true);
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                  disabled={!isLoggedIn || !!uploadedImage}
                  className={`p-3 rounded-2xl transition-all ${
                    isLoggedIn && !uploadedImage
                      ? 'bg-gradient-to-r from-blue-100 to-yellow-100 hover:from-blue-200 hover:to-yellow-200 text-blue-600' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  title="이미지 첨부 (JPG, PNG, 최대 10MB)"
                >
                  <ImageIcon size={20} />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        setInputText(e.target.value);
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    onClick={handleInputClick}
                    placeholder={isLoggedIn ? "인테리어 고민을 물어보세요..." : "로그인 후 사용 가능합니다"}
                    className="w-full px-6 py-4 pr-20 border-2 border-blue-200 rounded-3xl focus:outline-none focus:border-blue-400 resize-none shadow-sm bg-white/90"
                    disabled={!isLoggedIn}
                    rows={1}
                  />
                  <span className="absolute right-6 bottom-4 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {inputText.length}/200
                  </span>
                </div>
                
                <button
                  onClick={handleSend}
                  disabled={!isLoggedIn}
                  className={`p-4 rounded-2xl transition-all shadow-lg ${
                    isLoggedIn 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500 hover:shadow-xl transform hover:-translate-y-0.5' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔐</span>
              </div>
              <h2 className="text-2xl mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                로그인이 필요합니다
              </h2>
              <p className="text-gray-600">
                챗봇을 사용하시려면 먼저 로그인해주세요.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  onNavigate('login');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg"
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-white" />
              </div>
              <h2 className="text-2xl mb-2 text-gray-800">
                채팅 히스토리 삭제
              </h2>
              <p className="text-gray-600">
                이 채팅을 삭제하시겠습니까?<br/>
                삭제된 내용은 복구할 수 없습니다.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-2xl hover:from-red-600 hover:to-red-500 transition-all shadow-lg"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guidelines Popup */}
      {showGuidelinesPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center">
                    <AlertCircle size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    MOOD ON AI 주의사항
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setShowGuidelinesPopup(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="mb-2 text-blue-800">💡 서비스 목적 및 한계</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• MOOD ON AI는 인테리어 상품 추천을 위한 보조 도구입니다.</li>
                  <li>• AI 추천은 참고용이며, 최종 구매 결정은 사용자의 책임입니다.</li>
                  <li>• 실시간 재고, 가격, 배송 정보는 실제와 다를 수 있습니다.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 rounded-lg">
                <h3 className="mb-2 text-red-800">🔒 개인정보 보호</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 주민등록번호, 계좌번호, 비밀번호 등을 입력하지 마세요.</li>
                  <li>• 정확한 주소나 전화번호 등의 개인 식별 정보를 자제해주세요.</li>
                  <li>• 대화 내용은 서비스 개선을 위해 저장될 수 있습니다.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="mb-2 text-blue-800">⚠️ 사용 제한사항</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 질문은 한국어로만 입력 가능합니다 🇰🇷</li>
                  <li>• 질문은 최대 200자 이내로 작성해주세요 ✍️</li>
                  <li>• 이미지는 1장만, 최대 10MB (JPG, PNG) 📷</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 rounded-lg">
                <h3 className="mb-2 text-purple-800">🚫 금지된 행위</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 불법적이거나 유해한 콘텐츠 요청</li>
                  <li>• 타인의 권리를 침해하는 내용</li>
                  <li>• 욕설, 비방, 차별적 표현 사용</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-100 to-yellow-100 p-4 rounded-2xl text-center">
              <p className="text-sm text-gray-700">
                안전하고 즐거운 서비스 이용을 위해<br />
                위 내용을 꼭 확인해주세요!
              </p>
            </div>

            <button
              onClick={() => setShowGuidelinesPopup(false)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg"
            >
              확인했어요!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}