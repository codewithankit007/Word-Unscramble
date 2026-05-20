import { Link } from 'wouter';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-white font-black text-lg mb-3">
              Unscramble<span className="text-yellow-400">Words</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Free word unscrambler with 500K+ word dictionary. Best tool for Scrabble, Wordle, Words with Friends — USA, Canada &amp; UK.
            </p>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400"><span className="text-yellow-400 font-bold">500,000+</span> words · TWL · SOWPODS · ENABLE</p>
            </div>
          </div>

          {/* Word Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Word Tools</h4>
            <ul className="space-y-2">
              {[
                ['/', 'Word Unscrambler'],
                ['/word-descrambler', 'Word Descrambler'],
                ['/anagram-solver', 'Anagram Solver'],
                ['/scrabble-word-finder', 'Scrabble Word Finder'],
                ['/wordle-helper', 'Wordle Helper'],
                ['/random-word', 'Random Word Generator'],
                ['/word-scramble', 'Word Scramble'],
                ['/daily-challenge', 'Daily Challenge'],
                ['/favorites', 'Saved Words'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Word Lists by Length */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Words by Length</h4>
            <ul className="space-y-2">
              {[
                ['/2-letter-words', '2 Letter Words'],
                ['/3-letter-words', '3 Letter Words'],
                ['/4-letter-words', '4 Letter Words'],
                ['/5-letter-words', '5 Letter Words'],
                ['/6-letter-words', '6 Letter Words'],
                ['/7-letter-words', '7 Letter Words'],
                ['/8-letter-words', '8 Letter Words'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Words by Pattern */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Word Patterns</h4>
            <ul className="space-y-2">
              {[
                ['/words-starting-with-a', 'Words Starting With A'],
                ['/words-starting-with-s', 'Words Starting With S'],
                ['/words-starting-with-p', 'Words Starting With P'],
                ['/words-ending-in-ing', 'Words Ending in -ING'],
                ['/words-ending-in-er', 'Words Ending in -ER'],
                ['/words-ending-in-tion', 'Words Ending in -TION'],
                ['/words-ending-in-able', 'Words Ending in -ABLE'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Helpers + Features */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Game Helpers</h4>
            <ul className="space-y-2 mb-5">
              {[
                ['/wordle-solver', 'Wordle Solver'],
                ['/quordle-solver', 'Quordle Solver'],
                ['/wordfeud-helper', 'Wordfeud Helper'],
                ['/check-dictionary', 'Check Dictionary'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Features</h4>
            <ul className="space-y-2">
              <li><Link href="/daily-challenge" className="text-slate-400 hover:text-white text-sm transition-colors">🎮 Daily Word Challenge</Link></li>
              <li><Link href="/favorites" className="text-slate-400 hover:text-white text-sm transition-colors">⭐ Save Favorite Words</Link></li>
              <li><span className="text-slate-500 text-sm">🌙 Dark Mode <span className="text-xs opacity-60">(use navbar)</span></span></li>
              <li><span className="text-slate-500 text-sm">📱 Mobile Optimized ✓</span></li>
              <li><span className="text-slate-500 text-sm">🎙️ Voice Input <span className="text-xs opacity-60">Coming soon</span></span></li>
              <li><span className="text-slate-500 text-sm">🏆 Multiplayer <span className="text-xs opacity-60">Coming soon</span></span></li>
            </ul>
          </div>
        </div>

        {/* A–Z letter browser */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-3">Browse by Starting Letter:</p>
          <div className="flex flex-wrap gap-1">
            {'abcdefghijklmnopqrstuvwxyz'.split('').map(l => (
              <Link key={l} href={`/words-starting-with-${l}`} className="w-7 h-7 flex items-center justify-center rounded text-xs font-bold uppercase bg-white/5 text-slate-500 hover:bg-white/15 hover:text-white transition-all">
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* Info bar */}
        <div className="border-t border-white/10 pt-5 mb-4">
          <p className="text-slate-400 text-xs leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-slate-300">UnscrambleWords.com</strong> — Free online tool to unscramble and descramble words. Perfect for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies &amp; Anagrams. Serving players in USA, Canada &amp; UK.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            &copy; {year} UnscrambleWords.com — All Rights Reserved
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              ['/', 'Home'],
              ['/scrabble-word-finder', 'Scrabble'],
              ['/wordle-helper', 'Wordle Helper'],
              ['/daily-challenge', 'Daily Challenge'],
              ['/2-letter-words', '2-Letter Words'],
              ['/5-letter-words', '5-Letter Words'],
              ['/check-dictionary', 'Dictionary'],
              ['/sitemap', 'Sitemap'],
              ['/about', 'About'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
