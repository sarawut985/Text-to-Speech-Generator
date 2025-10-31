
import React, { useEffect, useRef, useState } from 'react';

interface AudioResultProps {
  audioBlob: Blob | null;
}

const AudioResult: React.FC<AudioResultProps> = ({ audioBlob }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setAudioUrl(null);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Autoplay was prevented:", e));
    }
  }, [audioUrl]);


  if (!audioUrl) {
    return null;
  }

  return (
    <div className="mt-6 w-full space-y-4">
      <audio ref={audioRef} controls src={audioUrl} className="w-full">
        Your browser does not support the audio element.
      </audio>
      <a
        href={audioUrl}
        download="speech.wav"
        className="inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        ดาวน์โหลดไฟล์เสียง (.wav)
      </a>
    </div>
  );
};

export default AudioResult;
