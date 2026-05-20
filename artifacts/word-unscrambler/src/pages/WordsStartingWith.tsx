import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { useWordList } from '../hooks/useWordList';
import { scoreWord } from '../utils/wordUtils';

interface WordsStartingWithProps {
  prefix?: string;
}

const PAGE_SIZE = 200;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const LENGTH_OPTIONS = [2,3,4,5,6,7,8,9,10];

export default function WordsStartingWith({ prefix = 'a' }: WordsStartingWithProps) {
  const { words, loading } = useWordList();
  const [lengthFilter, setLengthFilter] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'alpha' | 'score' | 'length'>('alpha');

  const filtered = useMemo(() => {
    if (!words.length) return [];
    return words
      .filter(w => w.startsWith(prefix) && (lengthFilter === 0 || w.length === lengthFilter))
      .sort((a, b) =>
        sortBy === 'alpha' ? a.localeCompare(b) :
        sortBy === 'score' ? scoreWord(b) - scoreWord(a) :
        a.length - b.length || a.localeCompare(b)
      );
  }, [words, prefix, lengthFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const lengthCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    words.filter(w => w.startsWith(prefix)).forEach(w => {
      counts[w.length] = (counts[w.length] || 0) + 1;
    });
    return counts;
  }, [words, prefix]);

  return (
    <Layout>
      <SEOHead
        title={`Words Starting With ${prefix.toUpperCase()} — Full List | UnscrambleWords`}
        description={`Browse all words that start with the letter ${prefix.toUpperCase()}. Filter by word length (2–10 letters), sort alphabetically or by Scrabble score.`}
        keywords={`words starting with ${prefix}, ${prefix} words, words beginning with ${prefix}`}
        canonical={`https://unscrambleswords.com/words-starting-with-${prefix}`}
      />

      <div className="hero-gradient rounded-2xl p-8 md:p-12 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          Words Starting With <span className="text-yellow-300 uppercase">{prefix}</span>
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Complete list of all valid words beginning with "{prefix.toUpperCase()}"
        </p>
      </div>

      {/* A–Z letter picker */}
      <div className="search-box p-5 mb-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Browse by letter:</p>
        <div className="flex flex-wrap gap-1">
          {alphabet.map(l => (
            <a
              key={l}
              href={`/words-starting-with-${l}`}
              className={`w-8 h-8 rounded text-xs font-bold uppercase flex items-center justify-center transition-all
                ${l === prefix
                  ? 'bg-blue-600 text-white'
                  : 'filter-btn'}`}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <div className="search-box p-6 mb-6">
        {/* Stats + Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <div className="text-2xl font-black text-blue-600">{loading ? '…' : filtered.length.toLocaleString()}</div>
            <div className="text-xs text-slate-500">words starting with "{prefix.toUpperCase()}"</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['alpha','score','length'] as const).map(s => (
              <button
                key={s}
                onClick={() => { setSortBy(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                  ${sortBy === s ? 'bg-blue-600 text-white border-blue-600' : 'filter-btn'}`}
              >
                {s === 'alpha' ? 'A–Z' : s === 'score' ? 'By Score' : 'By Length'}
              </button>
            ))}
          </div>
        </div>

        {/* Fixed 2–10 letter filter */}
        <div className="mb-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Filter by word length:</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { setLengthFilter(0); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lengthFilter === 0 ? 'bg-blue-600 text-white' : 'filter-btn'}`}
            >
              All
            </button>
            {LENGTH_OPTIONS.map(len => {
              const count = lengthCounts[len] || 0;
              if (!loading && count === 0) return null;
              return (
                <button
                  key={len}
                  onClick={() => { setLengthFilter(len); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lengthFilter === len ? 'bg-blue-600 text-white' : 'filter-btn'}`}
                >
                  {len} letters {count > 0 && <span className="opacity-60">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading dictionary…</div>
        ) : (
          <>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {paged.map(word => (
                <span key={word} className="word-tile text-xs">
                  <strong className="text-blue-500">{word.slice(0, prefix.length)}</strong>
                  {word.slice(prefix.length)}
                  <span className="ml-1 text-blue-300 text-xs">({scoreWord(word)})</span>
                </span>
              ))}
              {paged.length === 0 && <p className="text-slate-400 text-sm">No words found for this filter.</p>}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors">← Prev</button>
                <span className="text-xs text-slate-400">Page {page} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors">Next →</button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
