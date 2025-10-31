
import React, { useState, useMemo } from 'react';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import type { Gender, VoiceOption } from './types';
import { ALL_VOICES, DEFAULT_FEMALE_VOICE_ID, DEFAULT_MALE_VOICE_ID } from './constants';
import Spinner from './components/Spinner';
import AudioResult from './components/AudioResult';

const App: React.FC = () => {
  const [text, setText] = useState('สวัสดีครับ ยินดีต้อนรับสู่เครื่องมือสร้างเสียงจากข้อความด้วย Gemini API');
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(DEFAULT_MALE_VOICE_ID);
  const [customTone, setCustomTone] = useState('');
  
  const { generateSpeech, isLoading, error, audioBlob } = useTextToSpeech();

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    if (gender === 'female') {
      setSelectedVoiceId(DEFAULT_FEMALE_VOICE_ID);
    } else {
      setSelectedVoiceId(DEFAULT_MALE_VOICE_ID);
    }
  };
  
  const availableVoices = useMemo(() => {
    return ALL_VOICES.filter(voice => voice.gender === selectedGender);
  }, [selectedGender]);
  
  const handleGenerateClick = () => {
    const selectedVoice = ALL_VOICES.find(v => v.id === selectedVoiceId);
    if (selectedVoice) {
      const finalText = customTone.trim()
        ? `พูดด้วยน้ำเสียง${customTone.trim()}: ${text}`
        : text;
      generateSpeech(finalText, selectedVoice.apiName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            Text-to-Speech Generator
          </h1>
          <p className="text-slate-400 mt-2">สร้างเสียงพูดคุณภาพสูงจากข้อความด้วย Gemini API</p>
        </header>
        
        <main className="bg-slate-800 p-8 rounded-lg shadow-2xl">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="text-input" className="block text-sm font-medium text-slate-300">
                  ป้อนข้อความของคุณที่นี่
                </label>
                <button
                  onClick={() => setText('')}
                  className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label="Clear text input"
                >
                  ล้างข้อความ
                </button>
              </div>
              <textarea
                id="text-input"
                rows={5}
                className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                placeholder="พิมพ์ข้อความ..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">เพศ</label>
                <div className="flex space-x-4">
                  {(['female', 'male'] as Gender[]).map((gender) => (
                     <button
                      key={gender}
                      onClick={() => handleGenderChange(gender)}
                      className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition ${selectedGender === gender ? 'bg-sky-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      {gender === 'female' ? 'หญิง' : 'ชาย'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="voice-select" className="block text-sm font-medium text-slate-300 mb-2">
                  เสียง
                </label>
                <select
                  id="voice-select"
                  value={selectedVoiceId}
                  onChange={(e) => setSelectedVoiceId(e.target.value)}
                  className="w-full bg-slate-700 text-white p-2.5 rounded-md border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor="custom-tone-input" className="block text-sm font-medium text-slate-300">
                  ปรับแต่งโทนเสียง (ไม่จำเป็น)
                </label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-full mb-2 left-1/2 z-20 w-64 p-3 -translate-x-1/2 bg-slate-700 text-slate-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-sm">
                      <span className="font-semibold">เคล็ดลับ:</span> ลองใช้คำคุณศัพท์เพื่ออธิบายลักษณะเสียง เช่น 'ตื่นเต้น', 'เศร้า', 'กระซิบอย่างแผ่วเบา', หรือ 'ตะโกนด้วยความโกรธ'
                    </p>
                    <svg className="absolute left-1/2 top-full h-2 w-full -translate-x-1/2 text-slate-700" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                      <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                    </svg>
                  </div>
                </div>
              </div>
              <input
                id="custom-tone-input"
                type="text"
                className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                placeholder="เช่น สดใส, จริงจัง, กระซิบ"
                value={customTone}
                onChange={(e) => setCustomTone(e.target.value)}
              />
              <p className="text-xs text-slate-400 mt-1.5">คำแนะนำนี้จะถูกนำไปปรับใช้กับเสียงที่เลือกไว้ข้างต้น</p>
            </div>

            <div>
              <button
                onClick={handleGenerateClick}
                disabled={isLoading || !text.trim()}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span className="ml-2">กำลังสร้างเสียง...</span>
                  </>
                ) : (
                   'สร้างเสียง'
                )}
              </button>
            </div>
            
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md text-center">
                {error}
              </div>
            )}
            
            <AudioResult audioBlob={audioBlob} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
