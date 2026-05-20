import { useState, useEffect } from 'react';

let cachedWords: string[] | null = null;
let cachedSet: Set<string> | null = null;
let loadingPromise: Promise<string[]> | null = null;

async function fetchWordList(): Promise<string[]> {
  if (cachedWords) return cachedWords;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
    const res = await fetch(url);
    const text = await res.text();
    const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length >= 2 && w.length <= 15 && /^[a-z]+$/.test(w));
    cachedWords = words;
    cachedSet = new Set(words);
    return words;
  })();

  return loadingPromise;
}

export function useWordList() {
  const [words, setWords] = useState<string[]>(cachedWords || []);
  const [wordSet, setWordSet] = useState<Set<string>>(cachedSet || new Set());
  const [loading, setLoading] = useState(!cachedWords);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedWords) {
      setWords(cachedWords);
      setWordSet(cachedSet!);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchWordList()
      .then(w => {
        setWords(w);
        setWordSet(new Set(w));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load word list. Please refresh the page.');
        setLoading(false);
      });
  }, []);

  return { words, wordSet, loading, error };
}
