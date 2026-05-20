import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';
import { scoreWord } from '../utils/wordUtils';

interface WordsByLengthProps {
  length: number;
}

const PAGE_SIZE = 200;

export default function WordsByLength({ length }: WordsByLengthProps) {
  const { words, loading } = useWordList();
  const [letter, setLetter] = useState('all');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'alpha' | 'score'>('alpha');

  const filtered = useMemo(() => {
    if (!words.length) return [];
    return words
      .filter(w => w.length === length && (letter === 'all' || w[0] === letter))
      .sort((a, b) => sortBy === 'alpha' ? a.localeCompare(b) : scoreWord(b) - scoreWord(a));
  }, [words, length, letter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const ordinal = length === 2 ? '2nd' : length === 3 ? '3rd' : `${length}th`;

  return (
    <Layout>
      <SEOHead
        title={`${length} Letter Words — Complete List | Word Unscrambler`}
        description={`Browse all ${length}-letter words in our dictionary. Filter by starting letter, sort alphabetically or by Scrabble score. ${filtered.length}+ words listed.`}
        keywords={`${length} letter words, ${length}-letter words list, ${length} letter scrabble words`}
        canonical={`https://wordunscrambler.me/${length}-letter-words`}
      />

      <div className="hero-gradient rounded-2xl p-8 md:p-12 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          {length} Letter <span className="text-yellow-300">Words</span>
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Complete list of all valid {length}-letter words from our 500K+ dictionary
        </p>
      </div>

      <AdBanner size="leaderboard" className="mb-6" />

      <div className="search-box p-6 mb-6">
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">{loading ? '…' : filtered.length.toLocaleString()}</div>
              <div className="text-xs text-slate-500">{length}-letter words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-600">{length}</div>
              <div className="text-xs text-slate-500">letters each</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setSortBy('alpha'); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${sortBy === 'alpha' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>A–Z</button>
            <button onClick={() => { setSortBy('score'); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${sortBy === 'score' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>By Score</button>
          </div>
        </div>

        {/* A–Z filter */}
        <div className="mb-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Filter by first letter:</p>
          <div className="flex flex-wrap gap-1">
            <button onClick={() => { setLetter('all'); setPage(1); }} className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${letter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-blue-50'}`}>All</button>
            {alphabet.map(l => (
              <button key={l} onClick={() => { setLetter(l); setPage(1); }} className={`w-7 h-7 rounded text-xs font-bold uppercase transition-all ${letter === l ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-blue-50'}`}>{l}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading dictionary…</div>
        ) : (
          <>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {paged.map(word => (
                <span key={word} className="word-tile text-xs">
                  {word}
                  <span className="ml-1 text-blue-300 text-xs">({scoreWord(word)})</span>
                </span>
              ))}
              {paged.length === 0 && <p className="text-slate-400 text-sm">No words found for this filter.</p>}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors">← Prev</button>
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  const p = page <= 4 ? i + 1 : page + i - 3;
                  if (p < 1 || p > totalPages) return null;
                  return (
                    <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${page === p ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{p}</button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors">Next →</button>
                <span className="text-xs text-slate-400 ml-2">Page {page} of {totalPages}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="info-box mb-6">
        <p className="text-slate-700 text-sm leading-relaxed">
          <strong className="text-blue-700">{length}-letter words</strong> are crucial for word games. Memorizing high-scoring {length}-letter words can significantly boost your Scrabble, Words with Friends, or Wordle performance. Use the score sort to find the most valuable words.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[2,3,5].filter(n => n !== length).map(n => (
          <a key={n} href={`/${n}-letter-words`} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-center">
            <div className="text-2xl font-black text-blue-600 mb-1">{n}</div>
            <div className="text-sm font-semibold text-slate-700">{n}-Letter Words</div>
            <div className="text-xs text-slate-400 mt-1">Browse full list →</div>
          </a>
        ))}
      </div>

      <AdBanner size="leaderboard" />
    </Layout>
  );
}
