import { Link } from 'wouter';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Check Dictionary', href: '/check-dictionary' },
  { label: 'Word Descrambler', href: '/word-descrambler' },
  { label: 'Word Scramble', href: '/word-scramble' },
  { label: 'Wordfeud Helper', href: '/wordfeud-helper' },
  { label: 'Anagram Solver', href: '/anagram-solver' },
  { label: 'Random Word Generator', href: '/random-word' },
  { label: 'Wordle Solver', href: '/wordle-solver' },
  { label: 'Quordle Solver', href: '/quordle-solver' },
  { label: 'Sitemap', href: '/sitemap' },
  { label: 'About', href: '/about' },
];

export default function PageNav() {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-slate-700 text-sm mb-3 uppercase tracking-wide">Page Navigator</h3>
      <div className="flex flex-wrap gap-2">
        {pages.map(p => (
          <Link
            key={p.href}
            href={p.href}
            className="nav-pill bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-xs"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
