import { useState, useRef } from 'react';
import { unscrambleWords, GroupedResults, LETTER_VALUES } from '../utils/wordUtils';
import { useWordList } from '../hooks/useWordList';
import AdBanner from './AdBanner';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import WordMeaning from './WordMeaning';

interface UnscrambleFormProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

interface ActiveWord { word: string; score: number; }

export default function UnscrambleForm({ title = 'Word Unscrambler', subtitle, buttonLabel = 'Unscramble' }: UnscrambleFormProps) {
  const { words, loading, error } = useWordList();
  const [letters, setLetters] = useState('');
  const [startsWith, setStartsWith] = useState('');
  const [endsWith, setEndsWith] = useState('');
  const [mustInclude, setMustInclude] = useState('');
  const [dictionary, setDictionary] = useState('TWL/SOWPODS');
  const [showOptions, setShowOptions] = useState(false);
  const [results, setResults] = useState<GroupedResults | null>(null);
  const [searched, setSearched] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showAllLengths, setShowAllLengths] = useState(false);
  const [activeWord, setActiveWord] = useState<ActiveWord | null>(null);
  const tileRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const { listening, supported: voiceSupported, start: startVoice, stop: stopVoice, error: voiceError } = useVoiceSearch();

  const handleUnscramble = () => {
    if (!letters.trim()) return;
    setIsSearching(true);
    setSearched(letters.trim());
    setShowAllLengths(false);
    setActiveWord(null);
    setTimeout(() => {
      const grouped = unscrambleWords(words, {
        letters: letters.trim(),
        startsWith: startsWith.trim(),
        endsWith: endsWith.trim(),
        mustInclude: mustInclude.trim(),
      });
      setResults(grouped);
      setIsSearching(false);
    }, 30);
  };

  const handleVoice = () => {
    if (listening) { stopVoice(); return; }
    startVoice(text => {
      const cleaned = text.replace(/[^a-z?]/g, '').slice(0, 20);
      setLetters(cleaned);
    });
  };

  const totalWords = results ? Object.values(results).reduce((s, arr) => s + arr.length, 0) : 0;
  const allSortedLengths = results ? Object.keys(results).map(Number).sort((a, b) => b - a) : [];
  const defaultLengths = [8, 7, 6, 5, 4, 3, 2];
  const sortedLengths = showAllLengths ? allSortedLengths : allSortedLengths.filter(l => defaultLengths.includes(l));
  const hiddenCount = allSortedLengths.filter(l => !defaultLengths.includes(l))
    .reduce((s, l) => s + (results?.[l]?.length || 0), 0);

  return (
    <div>
      {/* Search Box */}
      <div className="search-box p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-black text-slate-800">{title}</h2>
          {loading && (
            <span className="text-xs text-blue-500 font-semibold flex items-center gap-1">
              <svg className="spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Loading dictionary…
            </span>
          )}
        </div>
        {subtitle && <p className="text-slate-500 text-sm mb-4">{subtitle}</p>}

        {/* Input with inline mic + clear icons */}
        <div className="relative mb-3">
          <input
            type="text"
            value={letters}
            onChange={e => setLetters(e.target.value.replace(/[^a-zA-Z?]/g, '').slice(0, 20))}
            onKeyDown={e => e.key === 'Enter' && handleUnscramble()}
            placeholder="Enter up to 20 scrambled letters (use ? for blank tile)"
            className="w-full px-4 py-3 text-lg border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors font-black tracking-wider uppercase placeholder:normal-case placeholder:tracking-normal placeholder:font-normal"
            style={{ paddingRight: voiceSupported ? '5.5rem' : '2.75rem' }}
            disabled={loading}
            maxLength={20}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Mic icon — inside input, right side */}
            {voiceSupported && (
              <button
                type="button"
                onClick={handleVoice}
                title={listening ? 'Stop listening' : 'Voice input'}
                className={`p-1.5 rounded-lg transition-all ${
                  listening
                    ? 'text-red-500 bg-red-50 animate-pulse'
                    : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="12" rx="3" fill={listening ? '#ef4444' : '#3b82f6'} stroke="none"/>
                  <path d="M5 10a7 7 0 0014 0"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="8" y1="22" x2="16" y2="22"/>
                </svg>
              </button>
            )}
            {/* Clear button */}
            {letters && (
              <button
                type="button"
                onClick={() => { setLetters(''); setResults(null); setActiveWord(null); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                title="Clear"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {voiceError && <p className="text-red-500 text-xs mb-2">{voiceError}</p>}

        {/* Letter tiles preview */}
        {letters && (
          <div className="flex flex-wrap gap-1 mb-4">
            {letters.toUpperCase().split('').map((l, i) => (
              <div key={i} className="scrabble-tile">
                {l}
                <span className="score">{l === '?' ? 0 : (LETTER_VALUES[l.toLowerCase()] ?? 0)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            className="btn-primary flex items-center gap-2"
            onClick={handleUnscramble}
            disabled={loading || !letters.trim() || isSearching}
          >
            {isSearching ? (
              <>
                <svg className="spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                {buttonLabel}ing…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {buttonLabel}
              </>
            )}
          </button>
          <button className="btn-secondary flex items-center gap-2" onClick={() => setShowOptions(!showOptions)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Options {showOptions ? '▲' : '▼'}
          </button>
        </div>

        {/* Options panel */}
        {showOptions && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Dictionary</label>
              <select value={dictionary} onChange={e => setDictionary(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white">
                <option value="TWL/SOWPODS">TWL / SOWPODS (Default)</option>
                <option value="SOWPODS">SOWPODS (UK)</option>
                <option value="TWL">TWL (US/Canada)</option>
                <option value="ENABLE">ENABLE</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Starts With</label>
              <input type="text" value={startsWith} onChange={e => setStartsWith(e.target.value.replace(/[^a-zA-Z]/g, ''))} placeholder="e.g. pre" className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" maxLength={6} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Ends With</label>
              <input type="text" value={endsWith} onChange={e => setEndsWith(e.target.value.replace(/[^a-zA-Z]/g, ''))} placeholder="e.g. ing" className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" maxLength={6} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Must Include</label>
              <input type="text" value={mustInclude} onChange={e => setMustInclude(e.target.value.replace(/[^a-zA-Z]/g, ''))} placeholder="e.g. a" className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" maxLength={4} />
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between gap-3 pt-1 border-t border-blue-100 mt-1">
              <button className="text-xs text-blue-500 hover:text-blue-700 font-semibold" onClick={() => { setStartsWith(''); setEndsWith(''); setMustInclude(''); }}>Reset filters</button>
              <button className="btn-primary flex items-center gap-2 text-sm py-2 px-5" onClick={handleUnscramble} disabled={loading || !letters.trim() || isSearching}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Words
              </button>
            </div>
          </div>
        )}

        {error && <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
      </div>

      {/* Results */}
      {results !== null && (
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="font-bold text-slate-700 text-base">
              Results for <span className="text-blue-600 font-black uppercase">{searched}</span>
            </h3>
            <span className="result-badge">{totalWords} words found</span>
            <span className="text-xs text-slate-400 italic">Click any word to see its meaning</span>
          </div>

          {totalWords === 0 && (
            <div className="search-box p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-bold text-slate-700">No words found</p>
              <p className="text-slate-500 text-sm mt-1">Try removing filters or adding more letters</p>
            </div>
          )}

          {totalWords > 0 && <div className="mb-4"><AdBanner size="leaderboard" /></div>}

          {!showAllLengths && hiddenCount > 0 && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <span className="text-amber-700 text-sm font-semibold">+{hiddenCount} longer words hidden</span>
              <button onClick={() => setShowAllLengths(true)} className="text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-lg transition-colors">Show All ▼</button>
            </div>
          )}
          {showAllLengths && hiddenCount > 0 && (
            <div className="mb-4 text-right">
              <button onClick={() => setShowAllLengths(false)} className="text-xs font-bold text-blue-500 hover:text-blue-700">Show fewer ▲</button>
            </div>
          )}

          {sortedLengths.map(len => (
            <div key={len} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="length-header">
                  <span>{len} letter words</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{results[len].length}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {results[len].map(({ word, score }) => (
                  <span
                    key={word}
                    ref={el => { tileRefs.current[word] = el; }}
                    className="word-tile group relative cursor-pointer select-none"
                    onClick={() => setActiveWord(activeWord?.word === word ? null : { word, score })}
                    title="Click for meaning"
                  >
                    {word}
                    <span className="ml-1 text-blue-300 group-hover:text-blue-200 text-xs font-normal">({score})</span>
                    {/* Meaning popup */}
                    {activeWord?.word === word && (
                      <WordMeaning
                        word={word}
                        score={score}
                        onClose={() => setActiveWord(null)}
                      />
                    )}
                  </span>
                ))}
              </div>
              {sortedLengths.indexOf(len) === 2 && sortedLengths.length > 4 && (
                <div className="mt-4"><AdBanner size="small" /></div>
              )}
            </div>
          ))}

          {totalWords > 0 && <div className="mt-6"><AdBanner size="leaderboard" /></div>}
        </div>
      )}
    </div>
  );
}
