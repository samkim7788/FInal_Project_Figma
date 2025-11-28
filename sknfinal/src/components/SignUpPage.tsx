import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Check, Mail, Lock, AlertCircle, Clock } from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
  onSignUp: () => void;
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [error, setError] = useState('');
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  // 타이머
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (blockTimeLeft > 0) {
      const timer = setTimeout(() => setBlockTimeLeft(blockTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (blockTimeLeft === 0 && isBlocked) {
      setIsBlocked(false);
      setSendCount(0);
    }
  }, [blockTimeLeft, isBlocked]);

  const generateVerificationCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (pwd: string) => {
    // 6~16자
    if (pwd.length < 6 || pwd.length > 16) {
      return '비밀번호는 6~16자로 입력해주세요.';
    }

    // 영문, 숫자, 특수문자 중 2종류 이상
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!?~@#$%&^]/.test(pwd);
    const typesCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (typesCount < 2) {
      return '영문, 숫자, 특수문자(!?~@#$%&^) 중 2종류 이상을 혼용해주세요.';
    }

    // 연속된 숫자 (1111, 1234)
    if (/(\d)\1{3,}/.test(pwd) || /0123|1234|2345|3456|4567|5678|6789/.test(pwd)) {
      return '연속되거나 동일한 숫자는 사용할 수 없습니다.';
    }

    // 연속된 문자 (aaa, qwer)
    if (/([a-zA-Z])\1{2,}/.test(pwd) || /qwer|asdf|zxcv|abcd|bcde|cdef/.test(pwd.toLowerCase())) {
      return '연속되거나 동일한 문자는 사용할 수 없습니다.';
    }

    return '';
  };

  const handleSendCode = () => {
    setError('');

    if (isBlocked) {
      setError(`10분 후 다시 시도해주세요. (${Math.floor(blockTimeLeft / 60)}:${(blockTimeLeft % 60).toString().padStart(2, '0')})`);
      return;
    }

    if (!validateEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (sendCount >= 5) {
      setIsBlocked(true);
      setBlockTimeLeft(600); // 10분
      setError('인증번호 전송 횟수를 초과했습니다. 10분 후 다시 시도해주세요.');
      return;
    }

    const code = generateVerificationCode();
    setSentCode(code);
    setTimeLeft(180); // 3분
    setSendCount(sendCount + 1);
    
    // Mock: 실제로는 이메일로 전송
    console.log('인증 코드:', code);
    alert(`인증 코드가 발송되었습니다: ${code}\n(실제로는 이메일로 전송됩니다)`);
  };

  const handleVerifyCode = () => {
    setError('');

    if (timeLeft === 0) {
      setError('인증 시간이 만료되었습니다. 인증번호를 재발송해주세요.');
      return;
    }

    if (verificationCode !== sentCode) {
      setError('인증번호가 일치하지 않습니다.');
      return;
    }

    setStep(3);
  };

  const handleCompleteSignUp = () => {
    setError('');

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // Mock: 실제로는 서버에 암호화된 비밀번호 전송
    alert('회원가입이 완료되었습니다!');
    onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header onNavigate={onNavigate} isLoggedIn={false} />
      
      <main className="pt-32 pb-16">
        <div className="max-w-md mx-auto px-6">
          {/* Progress */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > s ? <Check size={20} /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-all ${
                    step > s ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: 약관 동의 */}
          {step === 1 && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                약관 동의
              </h1>
              <p className="text-gray-500 text-center mb-8">서비스 이용을 위해 약관에 동의해주세요</p>

              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 p-4 border-2 border-blue-100 rounded-2xl hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p>서비스 이용약관 (필수)</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowTermsPopup(true);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                      >
                        내용보기
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">MOOD ON 서비스 이용을 위한 약관입니다.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 border-blue-100 rounded-2xl hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p>개인정보 처리방침 (필수)</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPrivacyPopup(true);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                      >
                        내용보기
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">개인정보 수집 및 이용에 대한 안내입니다.</p>
                  </div>
                </label>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!termsAccepted || !privacyAccepted}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          )}

          {/* Step 2: 이메일 인증 */}
          {step === 2 && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center">
                  <Mail size={32} className="text-white" />
                </div>
              </div>

              <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                이메일 인증
              </h1>
              <p className="text-gray-500 text-center mb-8">이메일로 인증번호를 받아주세요</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block mb-2 text-gray-700">이메일</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-400"
                    />
                    <button
                      onClick={handleSendCode}
                      disabled={isBlocked}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all whitespace-nowrap disabled:opacity-50"
                    >
                      {sendCount === 0 ? '발송' : '재발송'}
                    </button>
                  </div>
                  {sendCount > 0 && (
                    <p className="text-sm text-gray-500 mt-2">발송 횟수: {sendCount}/5</p>
                  )}
                </div>

                {sentCode && (
                  <div>
                    <label className="block mb-2 text-gray-700">인증번호</label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="인증번호 8자리"
                      maxLength={8}
                      className="w-full px-4 py-3 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-400"
                    />
                    {timeLeft > 0 && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                        <Clock size={16} />
                        <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl mb-6">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border-2 border-blue-200 rounded-2xl hover:bg-blue-50 transition-all"
                >
                  이전
                </button>
                <button
                  onClick={handleVerifyCode}
                  disabled={!verificationCode || !sentCode}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  인증하기
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 비밀번호 설정 */}
          {step === 3 && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center">
                  <Lock size={32} className="text-white" />
                </div>
              </div>

              <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                비밀번호 설정
              </h1>
              <p className="text-gray-500 text-center mb-8">안전한 비밀번호를 설정해주세요</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block mb-2 text-gray-700">비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="영문, 숫자, 특수문자 2종류 이상 혼용 (6~16자)"
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">비밀번호 확인</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호를 다시 입력해주세요"
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">비밀번호 조건:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 6~16자</li>
                  <li>• 영문, 숫자, 특수문자(!?~@#$%&^) 중 2종류 이상</li>
                  <li>• 연속되거나 동일한 문자/숫자 불가</li>
                </ul>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl mb-6">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border-2 border-blue-200 rounded-2xl hover:bg-blue-50 transition-all"
                >
                  이전
                </button>
                <button
                  onClick={handleCompleteSignUp}
                  disabled={!password || !confirmPassword}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  회원가입 완료
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Terms Popup */}
      {showTermsPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              서비스 이용약관
            </h2>
            <div className="space-y-4 text-sm text-gray-700 mb-6">
              <section>
                <h3 className="mb-2 text-blue-600">제1조 (목적)</h3>
                <p>이 약관은 MOOD ON(이하 \"회사\")이 제공하는 인테리어 상품 추천 서비스 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제2조 (정의)</h3>
                <p>1. \"서비스\"라 함은 회사가 제공하는 AI 기반 인테리어 상품 추천, 챗봇 상담, 스타일 분석 등 모든 서비스를 의미합니다.</p>
                <p>2. \"이용자\"라 함은 본 약관에 따라 회사가 제공하는 서비스를 받는 회원을 말합니다.</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제3조 (서비스의 제공)</h3>
                <p>1. 회사는 이용자에게 AI 챗봇을 통한 인테리어 상품 추천 서비스를 제공합니다.</p>
                <p>2. 서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다. 다만, 시스템 정기점검 등의 사유로 서비스가 일시 중단될 수 있습니다.</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제4조 (이용자의 의무)</h3>
                <p>1. 이용자는 서비스 이용 시 다음 각 호의 행위를 하여서는 안 됩니다:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>타인의 개인정보를 도용하는 행위</li>
                  <li>불법적이거나 부적절한 내용을 게시하는 행위</li>
                  <li>서비스의 안정적 운영을 방해하는 행위</li>
                </ul>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제5조 (AI 추천의 한계)</h3>
                <p>1. AI 추천은 참고용이며, 최종 구매 결정은 이용자의 책임입니다.</p>
                <p>2. 상품의 재고, 가격, 배송 정보는 실시간과 다를 수 있습니다.</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제6조 (면책조항)</h3>
                <p>회사는 천재지변, 전쟁, 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
              </section>
            </div>
            <button
              onClick={() => setShowTermsPopup(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Privacy Popup */}
      {showPrivacyPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              개인정보 처리방침
            </h2>
            <div className="space-y-4 text-sm text-gray-700 mb-6">
              <section>
                <h3 className="mb-2 text-blue-600">제1조 (개인정보의 수집 및 이용 목적)</h3>
                <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>회원가입 및 관리</li>
                  <li>서비스 제공 및 맞춤형 추천</li>
                  <li>서비스 개선 및 통계 분석</li>
                </ul>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제2조 (수집하는 개인정보의 항목)</h3>
                <p>회사는 다음의 개인정보 항목을 수집합니다:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>필수항목: 이메일, 비밀번호</li>
                  <li>선택항목: 성별, 생년월일, MBTI, 선호 스타일</li>
                  <li>자동 수집: IP주소, 쿠키, 서비스 이용 기록</li>
                </ul>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제3조 (개인정보의 보유 및 이용기간)</h3>
                <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                <p className="mt-2">회원 탈퇴 시 즉시 파기됩니다. (단, 관련 법령에 의거하여 보존할 필요가 있는 경우 해당 기간 동안 보관)</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제4조 (개인정보의 제3자 제공)</h3>
                <p>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자의 동의가 있거나 법령의 규정에 의한 경우는 예외로 합니다.</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제5조 (개인정보의 파기)</h3>
                <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
              </section>
              <section>
                <h3 className="mb-2 text-blue-600">제6조 (이용자의 권리·의무)</h3>
                <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입해지를 요청할 수 있습니다.</p>
              </section>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mt-6">
                <p className="text-sm text-yellow-800">
                  ⚠️ 주의: MOOD ON은 PII(개인식별정보) 수집을 최소화합니다. 주민등록번호, 전화번호, 정확한 주소 등 민감한 정보를 입력하지 마세요.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrivacyPopup(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}