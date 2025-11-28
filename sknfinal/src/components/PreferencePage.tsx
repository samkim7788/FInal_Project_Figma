import React, { useState } from 'react';
import { Header } from './Header';
import { Check } from 'lucide-react';

interface PreferencePageProps {
  onNavigate: (page: string) => void;
  onComplete: (preferences: any) => void;
}

const styleImages = [
  { id: 'vintage', name: 'Vintage', displayName: '빈티지', url: 'https://images.unsplash.com/photo-1725711362462-a0333461e1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'luxury', name: 'Luxury', displayName: '럭셔리', url: 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'natural', name: 'Natural', displayName: '내추럴', url: 'https://images.unsplash.com/photo-1597562965673-42cc92e8408f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaW50ZXJpb3IlMjBzcGFjZXxlbnwxfHx8fDE3NjQxMzYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'scandinavian', name: 'Scandinavian', displayName: '스칸디나비안', url: 'https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxMjUzODd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'french', name: 'French', displayName: '프렌치', url: 'https://images.unsplash.com/photo-1678775970375-05bbabcc6bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQxMzYxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'lovely', name: 'Lovely', displayName: '러블리', url: 'https://images.unsplash.com/photo-1756317058150-63264dea336c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlbHklMjBjdXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'pastel', name: 'Pastel', displayName: '파스텔', url: 'https://images.unsplash.com/photo-1632999101501-47bd016f7e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'modern', name: 'Modern', displayName: '모던', url: 'https://images.unsplash.com/photo-1520106392146-ef585c111254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjQxMzYxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'bohemian', name: 'Bohemian', displayName: '보헤미안', url: 'https://images.unsplash.com/photo-1600493504591-aa1849716b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc2NDEzNjE1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'classic', name: 'Classic', displayName: '클래식', url: 'https://images.unsplash.com/photo-1716058845923-9212b7e0887b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'industrial', name: 'Industrial', displayName: '인더스트리얼', url: 'https://images.unsplash.com/photo-1652716279221-439c33c3b835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaW50ZXJpb3IlMjBsb2Z0fGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'minimal', name: 'Minimal', displayName: '미니멀', url: 'https://images.unsplash.com/photo-1621363183028-c97aec91a9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJpb3IlMjB3aGl0ZXxlbnwxfHx8fDE3NjQxMzYxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080' }
];

export function PreferencePage({ onNavigate, onComplete }: PreferencePageProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [mbti, setMbti] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const mbtiOptions = [
    ['E', 'I'],
    ['S', 'N'],
    ['T', 'F'],
    ['J', 'P']
  ];

  const handleMbtiSelect = (index: number, value: string) => {
    const newMbti = [...mbti];
    newMbti[index] = value;
    setMbti(newMbti);
  };

  const toggleStyleSelection = (styleId: string) => {
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles(selectedStyles.filter(id => id !== styleId));
    } else {
      if (selectedStyles.length < 3) {
        setSelectedStyles([...selectedStyles, styleId]);
      }
    }
  };

  const handleNext = () => {
    if (step === 1 && gender) {
      setStep(2);
    } else if (step === 2 && birthdate) {
      setStep(3);
    } else if (step === 3 && mbti.length === 4) {
      setStep(4);
    } else if (step === 4 && selectedStyles.length >= 1) {
      onComplete({
        gender,
        birthdate,
        mbti: mbti.join(''),
        styles: selectedStyles
      });
    }
  };

  const canProceed = () => {
    if (step === 1) return gender !== '';
    if (step === 2) return birthdate !== '';
    if (step === 3) return mbti.length === 4;
    if (step === 4) return selectedStyles.length >= 1 && selectedStyles.length <= 3;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header onNavigate={onNavigate} isLoggedIn={true} />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Step 1: Gender */}
          {step === 1 && (
            <div className="space-y-12">
              <h1 className="text-4xl mb-16 text-center">당신에 대해 알려주세요!</h1>
              
              <div>
                <h2 className="text-xl mb-6 text-center">당신의 성별은 무엇인가요?</h2>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setGender('여성')}
                    className={`px-12 py-3 rounded-full border-2 transition-colors ${
                      gender === '여성' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-500 shadow-lg' 
                        : 'border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    여성
                  </button>
                  <button
                    onClick={() => setGender('남성')}
                    className={`px-12 py-3 rounded-full border-2 transition-colors ${
                      gender === '남성' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-500 shadow-lg' 
                        : 'border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    남성
                  </button>
                  <button
                    onClick={() => setGender('선택 안함')}
                    className={`px-12 py-3 rounded-full border-2 transition-colors ${
                      gender === '선택 안함' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-500 shadow-lg' 
                        : 'border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    선택 안함
                  </button>
                </div>
              </div>
              
              <div className="pt-8">
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  다음 단계 &gt;
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Birthdate */}
          {step === 2 && (
            <div className="space-y-12">
              <h1 className="text-4xl mb-16 text-center">당신에 대해 알려주세요!</h1>
              
              <div>
                <h2 className="text-xl mb-6 text-center">생년월일을 알려주세요.</h2>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 text-center"
                />
              </div>
              
              <div className="pt-8 flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  다음 단계 &gt;
                </button>
              </div>
            </div>
          )}

          {/* Step 3: MBTI */}
          {step === 3 && (
            <div className="space-y-12">
              <h1 className="text-4xl mb-16 text-center">당신에 대해 알려주세요!</h1>
              
              <div>
                <h2 className="text-xl mb-6 text-center">당신의 MBTI는 어떤 타입인가요?</h2>
                <div className="space-y-4">
                  {mbtiOptions.map((options, index) => (
                    <div key={index} className="flex gap-4 justify-center">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleMbtiSelect(index, option)}
                          className={`px-12 py-3 rounded-full border-2 transition-colors ${
                            mbti[index] === option 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-500 shadow-lg' 
                              : 'border-blue-200 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-8 flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  다음 단계 &gt;
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Style Selection */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl mb-4">당신의 취향을 알려주세요!</h1>
                <p className="text-gray-600">마음에 드는 사진을 1개~3개까지 골라주세요 :)</p>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {styleImages.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => toggleStyleSelection(style.id)}
                    className="relative aspect-square rounded-2xl overflow-hidden group"
                  >
                    <img 
                      src={style.url}
                      alt={style.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay with category name */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {style.displayName}
                      </p>
                    </div>
                    {/* Selection indicator */}
                    {selectedStyles.includes(style.id) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <Check size={24} strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  다음 단계 &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}