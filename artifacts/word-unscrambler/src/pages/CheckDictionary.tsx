import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import { useWordList } from '../hooks/useWordList';
import { scoreWord } from '../utils/wordUtils';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

interface DictEntry {
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms: string[];
    antonyms: string[];
  }[];
}

type DictType = 'TWL' | 'SOWPODS' | 'ENABLE' | 'ALL';

export default function CheckDictionary() {
  const { wordSet, loading } = useWordList();
  const [input, setInput] = useState('');
  const [selectedDict, setSelectedDict] = useState<DictType>('ALL');
  const [result, setResult] = useState<{ word: string; valid: boolean; score: number } | null>(null);
  const [dictData, setDictData] = useState<DictEntry[] | null>(null);
  const [dictLoading, setDictLoading] = useState(false);
  const [dictError, setDictError] = useState('');

  const { listening, supported: voiceSupported, start: startVoice, error: voiceError } = useVoiceSearch();

  const checkWord = async (wordOverride?: string) => {
    const raw = (wordOverride ?? input).trim();
    if (!raw) return;
    const w = raw.toLowerCase();
    setInput(raw);
    const valid = wordSet.has(w);
    setResult({ word: w, valid, score: scoreWord(w) });
    setDictData(null);
    setDictError('');

    if (valid) {
      setDictLoading(true);
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`);
        if (res.ok) {
          const data: DictEntry[] = await res.json();
          setDictData(data);
        } else {
          setDictError('No definition found in general dictionary.');
        }
      } catch {
        setDictError('Could not fetch definition. Check your connection.');
      } finally {
        setDictLoading(false);
      }
    }
  };

  const allSynonyms = dictData?.flatMap(e => e.meanings.flatMap(m => m.synonyms)).filter(Boolean).slice(0, 16) ?? [];
  const allAntonyms = dictData?.flatMap(e => e.meanings.flatMap(m => m.antonyms)).filter(Boolean).slice(0, 16) ?? [];
  const phonetic = dictData?.[0]?.phonetic;

  return (
    <Layout>
      <SEOHead
        title="Dictionary Word Checker — Meanings, Synonyms & Antonyms | UnscrambleWords"
        description="Check if any word is valid in Scrabble (TWL/SOWPODS), Words with Friends, or general English dictionaries. View full definitions, synonyms, antonyms and examples."
        keywords="check word dictionary, word meaning, synonyms antonyms, scrabble word checker, sowpods twl word checker, is it a valid word"
        canonical="https://unscrambleswords.com/check-dictionary"
      />

      <div className="hero-gradient rounded-2xl p-6 md:p-10 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Dictionary Word Checker</h1>
        <p className="text-blue-100">Check if a word is valid + get full definitions, synonyms &amp; antonyms</p>
      </div>

      <div className="search-box p-6 md:p-8 mb-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">Look Up Any Word</h2>

        {/* Dictionary selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['ALL', 'TWL', 'SOWPODS', 'ENABLE'] as DictType[]).map(d => (
            <button
              key={d}
              onClick={() => setSelectedDict(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedDict === d ? 'bg-blue-600 text-white border-blue-600' : 'filter-btn'}`}
            >
              {d === 'ALL' ? 'All Dictionaries' : d === 'TWL' ? 'TWL (US/Canada)' : d === 'SOWPODS' ? 'SOWPODS (UK)' : 'ENABLE'}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value.replace(/[^a-zA-Z]/g, ''))}
              onKeyDown={e => e.key === 'Enter' && checkWord()}
              placeholder="Enter a word to check…"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-semibold uppercase tracking-wider pr-16"
              maxLength={25}
              disabled={loading}
            />
            {/* Voice + Clear inside input */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {voiceSupported && (
                <button
                  type="button"
                  onClick={() => {
                    if (listening) return;
                    startVoice(text => {
                      const word = text.replace(/[^a-z]/g, '');
                      setInput(word);
                      checkWord(word);
                    });
                  }}
                  title="Voice input"
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50'}`}
                >
                  {listening ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="9" y="3" width="6" height="11" rx="3"/>
                      <path d="M5 10a7 7 0 0014 0M12 19v2M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" stroke="none"/>
                      <path d="M5 10a7 7 0 0014 0M12 19v2M8 21h8" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              )}
              {input && (
                <button type="button" onClick={() => { setInput(''); setResult(null); setDictData(null); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all" title="Clear">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <button className="btn-primary px-6" onClick={() => checkWord()} disabled={loading || !input.trim()}>
            {loading ? 'Loading…' : 'Check'}
          </button>
        </div>

        {voiceError && <p className="text-red-500 text-xs mb-2">{voiceError}</p>}
        {listening && <p className="text-blue-500 text-xs mb-2 animate-pulse">🎙️ Listening… speak the word clearly</p>}

        {/* Valid/invalid result */}
        {result && (
          <div className={`p-5 rounded-xl border-2 mb-4 ${result.valid ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{result.valid ? '✅' : '❌'}</span>
                <div>
                  <div className="text-xl font-black uppercase tracking-wider" style={{ color: result.valid ? '#166534' : '#991b1b' }}>
                    {result.word}
                    {phonetic && <span className="ml-2 text-sm font-normal text-slate-500">{phonetic}</span>}
                  </div>
                  <div className={`font-bold ${result.valid ? 'text-green-700' : 'text-red-700'}`}>
                    {result.valid ? 'Valid Word ✓' : 'Not in Dictionary'}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {result.valid
                      ? `Found in our 500,000+ word dictionary (TWL/SOWPODS/ENABLE)`
                      : `"${result.word}" not found. Try checking the spelling.`}
                  </p>
                </div>
              </div>
              {result.valid && (
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-600">{result.score}</div>
                  <div className="text-xs text-slate-500">Scrabble pts</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading definition */}
        {dictLoading && (
          <div className="text-center py-6 text-slate-400 text-sm">
            <svg className="spin w-5 h-5 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            Fetching definition…
          </div>
        )}

        {dictError && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">{dictError}</div>
        )}

        {/* Definitions */}
        {dictData && dictData.length > 0 && (
          <div className="space-y-4 mt-2">
            {dictData[0].meanings.map((meaning, mi) => (
              <div key={mi} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-3">
                  {meaning.partOfSpeech}
                </span>
                <ol className="space-y-2">
                  {meaning.definitions.slice(0, 3).map((def, di) => (
                    <li key={di} className="flex gap-2 text-sm">
                      <span className="text-blue-400 font-bold flex-shrink-0">{di + 1}.</span>
                      <div>
                        <p className="text-slate-700">{def.definition}</p>
                        {def.example && <p className="text-slate-400 italic text-xs mt-0.5">"{def.example}"</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            {/* Synonyms & Antonyms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allSynonyms.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-black text-green-800 text-sm mb-3 uppercase tracking-wide">Synonyms</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {allSynonyms.map(s => (
                      <button key={s} onClick={() => { setInput(s); checkWord(s); }}
                        className="bg-white border border-green-200 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-green-100 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {allAntonyms.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h3 className="font-black text-red-800 text-sm mb-3 uppercase tracking-wide">Antonyms</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {allAntonyms.map(a => (
                      <button key={a} onClick={() => { setInput(a); checkWord(a); }}
                        className="bg-white border border-red-200 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors">
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dictionary info */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-black text-slate-800 text-lg mb-4">Supported Dictionaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'TWL / OTCWL', flag: '🇺🇸🇨🇦', desc: 'Official Scrabble dictionary for US, Canada & Thailand. The standard for North American Scrabble tournaments.', badge: 'US/Canada' },
            { name: 'SOWPODS / CSW', flag: '🇬🇧', desc: 'Used in UK, Australia & international Scrabble tournaments. Larger word list than TWL.', badge: 'UK/International' },
            { name: 'ENABLE', flag: '🌐', desc: 'Enhanced North American Benchmark Lexicon — 172,000+ common English words used in many word games.', badge: 'General' },
          ].map(d => (
            <div key={d.name} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span>{d.flag}</span>
                <span className="font-black text-blue-700 text-sm">{d.name}</span>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold">{d.badge}</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
