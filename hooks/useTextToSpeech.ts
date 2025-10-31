
import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { processAudioData } from '../utils/audioUtils';

export const useTextToSpeech = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const generateSpeech = useCallback(async (text: string, voiceApiName: string) => {
    if (!text.trim()) {
      setError("กรุณาป้อนข้อความที่ต้องการแปลงเป็นเสียง");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAudioBlob(null);

    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
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
      } else {
        throw new Error("ไม่ได้รับข้อมูลเสียงจาก API");
      }
    } catch (e: any) {
      console.error("Error generating speech:", e);
      setError(e.message || "เกิดข้อผิดพลาดในการสร้างเสียง");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generateSpeech, isLoading, error, audioBlob };
};
