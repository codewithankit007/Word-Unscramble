import { useState, useCallback, useRef } from 'react';

interface UseVoiceSearchResult {
  listening: boolean;
  supported: boolean;
  start: (onResult: (text: string) => void) => void;
  stop: () => void;
  error: string;
}

export function useVoiceSearch(): UseVoiceSearchResult {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const recRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);

  const SpeechRecognitionClass =
    typeof window !== 'undefined'
      ? (window as typeof window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
        (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition
      : null;

  const supported = !!SpeechRecognitionClass;

  const start = useCallback((onResult: (text: string) => void) => {
    if (!SpeechRecognitionClass) {
      setError('Voice search not supported in this browser.');
      return;
    }
    setError('');
    const rec = new SpeechRecognitionClass();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recRef.current = rec;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      setListening(false);
      if (e.error === 'no-speech') setError('No speech detected. Try again.');
      else if (e.error === 'not-allowed') setError('Microphone access denied.');
      else setError(`Error: ${e.error}`);
    };
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase().replace(/[^a-z ?]/g, '');
      onResult(transcript);
    };

    rec.start();
  }, [SpeechRecognitionClass]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  return { listening, supported, start, stop, error };
}
