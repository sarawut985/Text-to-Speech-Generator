import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { processAudioData } from '../utils/audioUtils';

export const useTextToSpeech = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // State for API Key validation
  const [isValidating, setIsValidating] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);
  const [keyValidationError, setKeyValidationError] = useState<string | null>(null);

  const validateApiKey = useCallback(async (apiKey: string) => {
    if (!apiKey.trim()) {
      setIsKeyValid(null);
      setKeyValidationError(null);
      setIsValidating(false);
      return;
    }

    setIsValidating(true);
    setIsKeyValid(null);
    setKeyValidationError(null);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      // A lightweight, non-streaming call to a text model is good for validation
      await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'hi',
      });
      setIsKeyValid(true);
    } catch (e: any) {
      setIsKeyValid(false);
      if (e.message?.includes('API key not valid')) {
        setKeyValidationError('API Key ไม่ถูกต้อง');
      } else {
        console.error('API Key validation error:', e);
        setKeyValidationError('ไม่สามารถตรวจสอบ API Key ได้');
      }
    } finally {
      setIsValidating(false);
    }
  }, []);

  const generateSpeech = useCallback(async (text: string, voiceApiName: string, apiKey: string) => {
    if (!apiKey.trim()) {
      setError('กรุณาป้อน API Key ของคุณ');
      return;
    }
    if (!text.trim()) {
      setError('กรุณาป้อนข้อความที่ต้องการแปลงเป็นเสียง');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAudioBlob(null);

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceApiName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio) {
        const blob = await processAudioData(base64Audio, audioContextRef.current);
        setAudioBlob(blob);
        setIsKeyValid(true);
        setKeyValidationError(null);
      } else {
        throw new Error('ไม่ได้รับข้อมูลเสียงจาก API');
      }
    } catch (e: any)      {
      console.error('Error generating speech:', e);
      if (e.message?.includes('API key not valid')) {
        const errorMessage = 'API Key ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
        setError(errorMessage);
        setIsKeyValid(false);
        setKeyValidationError(errorMessage);
      } else {
        setError(e.message || 'เกิดข้อผิดพลาดในการสร้างเสียง');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateSpeech,
    isLoading,
    error,
    audioBlob,
    validateApiKey,
    isValidating,
    isKeyValid,
    keyValidationError
  };
};
