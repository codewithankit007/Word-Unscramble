export const LETTER_VALUES: Record<string, number> = {
  a:1, b:3, c:3, d:2, e:1, f:4, g:2, h:4, i:1, j:8, k:5, l:1, m:3,
  n:1, o:1, p:3, q:10, r:1, s:1, t:1, u:1, v:4, w:4, x:8, y:4, z:10
};

export function scoreWord(word: string): number {
  return word.toLowerCase().split('').reduce((sum, c) => sum + (LETTER_VALUES[c] || 0), 0);
}

export function sortLetters(word: string): string {
  return word.toLowerCase().split('').sort().join('');
}

export function canFormWord(word: string, letters: string): boolean {
  const wordChars = word.toLowerCase().split('');
  const letterChars = letters.toLowerCase().split('');
  const wildcards = letterChars.filter(c => c === '?').length;
  const available = letterChars.filter(c => c !== '?');
  let wildcardsUsed = 0;
  for (const char of wordChars) {
    const idx = available.indexOf(char);
    if (idx !== -1) {
      available.splice(idx, 1);
    } else if (wildcardsUsed < wildcards) {
      wildcardsUsed++;
    } else {
      return false;
    }
  }
  return true;
}

export interface UnscrambleOptions {
  letters: string;
  startsWith?: string;
  endsWith?: string;
  mustInclude?: string;
  maxLength?: number;
  minLength?: number;
}

export interface WordResult {
  word: string;
  score: number;
  length: number;
}

export interface GroupedResults {
  [length: number]: WordResult[];
}

export function unscrambleWords(wordList: string[], options: UnscrambleOptions): GroupedResults {
  const { letters, startsWith = '', endsWith = '', mustInclude = '', maxLength, minLength } = options;
  const cleanLetters = letters.replace(/\s/g, '').toLowerCase();
  if (!cleanLetters) return {};

  const results: WordResult[] = [];

  for (const word of wordList) {
    const w = word.toLowerCase();
    if (w.length < 2 || w.length > cleanLetters.length) continue;
    if (minLength && w.length < minLength) continue;
    if (maxLength && w.length > maxLength) continue;
    if (startsWith && !w.startsWith(startsWith.toLowerCase())) continue;
    if (endsWith && !w.endsWith(endsWith.toLowerCase())) continue;
    if (mustInclude && !w.includes(mustInclude.toLowerCase())) continue;
    if (canFormWord(w, cleanLetters)) {
      results.push({ word: w, score: scoreWord(w), length: w.length });
    }
  }

  const grouped: GroupedResults = {};
  for (const r of results) {
    if (!grouped[r.length]) grouped[r.length] = [];
    grouped[r.length].push(r);
  }
  for (const len in grouped) {
    grouped[len].sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
  }
  return grouped;
}

export function scrambleWord(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

export function isValidWord(word: string, wordSet: Set<string>): boolean {
  return wordSet.has(word.toLowerCase());
}

export function getWordleMatches(
  wordList: string[],
  pattern: string,
  presentLetters: string,
  absentLetters: string
): string[] {
  const len = pattern.length;
  return wordList.filter(w => {
    if (w.length !== len) return false;
    const wl = w.toLowerCase();
    for (let i = 0; i < len; i++) {
      if (pattern[i] !== '?' && pattern[i] !== wl[i]) return false;
    }
    for (const c of presentLetters.toLowerCase()) {
      if (c && !wl.includes(c)) return false;
    }
    for (const c of absentLetters.toLowerCase()) {
      if (c && wl.includes(c)) return false;
    }
    return true;
  });
}

export function getAnagrams(wordList: string[], letters: string): string[] {
  const sorted = sortLetters(letters.replace(/\s/g, ''));
  return wordList.filter(w => w.length === sorted.length && sortLetters(w) === sorted);
}

export function getWordsByPattern(wordList: string[], pattern: string): string[] {
  const regex = new RegExp(
    '^' + pattern.toLowerCase().split('').map(c => c === '?' ? '[a-z]' : c).join('') + '$'
  );
  return wordList.filter(w => regex.test(w.toLowerCase()));
}
