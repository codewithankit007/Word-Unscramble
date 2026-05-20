import { useState, useEffect, useRef } from 'react';
import { scoreWord } from '../utils/wordUtils';

interface MeaningEntry {
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
  }[];
}

interface WordMeaningProps {
  word: string;
  score: number;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export default function WordMeaning({ word, score, onClose }: WordMeaningProps) {
  const [data, setData] = useState<MeaningEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then(r => r.ok ? r.json() : Promise.reject('not found'))
      .then((d: MeaningEntry[]) => { setData(d); setLoading(false); })
      .catch(() => { setError('No definition found.'); setLoading(false); });
  }, [word]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const phonetic = data?.[0]?.phonetic;
  const meanings = data?.[0]?.meanings ?? [];

  return (
    <div ref={popupRef} className="word-meaning-popup" style={{ animation: 'fadeInUp 0.18s ease' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 gap-3">
        <div>
          <span className="text-base font-black uppercase tracking-wide text-blue-700">{word}</span>
          {phonetic && <span className="ml-2 text-xs text-slate-400">{phonetic}</span>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="bg-amber-100 text-amber-700 text-xs font-black px-2 py-0.5 rounded-full">{score} pts</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-2 text-slate-400 text-xs">
          <svg className="spin w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          Looking up definition…
        </div>
      )}

      {error && !loading && (
        <p className="text-xs text-slate-400 italic">{error}</p>
      )}

      {!loading && meanings.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {meanings.slice(0, 2).map((m, i) => (
            <div key={i}>
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded mb-1 uppercase tracking-wide">{m.partOfSpeech}</span>
              {m.definitions.slice(0, 2).map((def, di) => (
                <p key={di} className="text-xs text-slate-600 leading-relaxed ml-1">
                  <span className="text-blue-400 font-bold mr-1">{di + 1}.</span>
                  {def.definition}
                  {def.example && <span className="text-slate-400 italic"> — "{def.example}"</span>}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
