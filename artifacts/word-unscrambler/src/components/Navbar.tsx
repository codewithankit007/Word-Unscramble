import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme, Theme } from '../contexts/ThemeContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Check Dictionary', href: '/check-dictionary' },
  { label: 'Word Descrambler', href: '/word-descrambler' },
  { label: 'Word Scramble', href: '/word-scramble' },
  { label: 'Wordfeud Helper', href: '/wordfeud-helper' },
  { label: 'Anagram Solver', href: '/anagram-solver' },
  { label: 'Random Word', href: '/random-word' },
  { label: 'Wordle Solver', href: '/wordle-solver' },
  { label: 'Quordle Solver', href: '/quordle-solver' },
  { label: 'About', href: '/about' },
];

const COLOR_PRESETS = [
  { label: 'Blue',   hue: 221, color: '#2563eb' },
  { label: 'Purple', hue: 270, color: '#7c3aed' },
  { label: 'Green',  hue: 142, color: '#16a34a' },
  { label: 'Teal',   hue: 174, color: '#0d9488' },
  { label: 'Orange', hue: 25,  color: '#ea580c' },
  { label: 'Red',    hue: 4,   color: '#dc2626' },
  { label: 'Pink',   hue: 328, color: '#db2777' },
  { label: 'Indigo', hue: 243, color: '#4338ca' },
];

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light',  icon: '☀️', label: 'Light'  },
  { value: 'dark',   icon: '🌙', label: 'Dark'   },
  { value: 'custom', icon: '🎨', label: 'Custom' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const { theme, setTheme, custom, setCustom } = useTheme();

  const current = themeOptions.find(t => t.value === theme)!;

  const handleThemeSelect = (val: Theme) => {
    setTheme(val);
    if (val !== 'custom') setShowTheme(false);
  };

  return (
    <nav className="navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          {/* Logo — compact */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            {/* Single W tile + brand text */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-slate-900 text-base shadow"
              style={{ background: 'linear-gradient(145deg,#fbbf24,#f59e0b)', boxShadow: '0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)' }}
            >
              W
            </div>
            <span className="text-white font-black text-base tracking-tight hidden sm:inline leading-none">
              Word<span className="text-yellow-300">Unscrambler</span>
            </span>
          </Link>

          {/* Desktop nav — tighter gap */}
          <div className="hidden xl:flex items-center gap-0.5 ml-5 pl-5 border-l border-white/20 overflow-hidden">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  location === link.href
                    ? 'bg-white/20 text-white'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: theme + hamburger */}
          <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
            <div className="relative">
              <button
                onClick={() => setShowTheme(!showTheme)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
              >
                <span className="text-sm">{current.icon}</span>
                <span className="hidden sm:inline text-xs">{current.label}</span>
                <svg className={`w-3 h-3 transition-transform ${showTheme ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showTheme && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 w-72 overflow-hidden">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mode</p>
                    <div className="grid grid-cols-3 gap-2">
                      {themeOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleThemeSelect(opt.value)}
                          className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                            theme === opt.value
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-xl">{opt.icon}</span>
                          <span>{opt.label}</span>
                          {theme === opt.value && <span className="text-blue-500 text-xs">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {theme === 'custom' && (
                    <div className="p-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Accent Color</p>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {COLOR_PRESETS.map(preset => (
                          <button
                            key={preset.hue}
                            onClick={() => setCustom({ ...custom, hue: preset.hue })}
                            className="flex flex-col items-center gap-1 group"
                            title={preset.label}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl transition-all shadow-sm ${custom.hue === preset.hue ? 'ring-2 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                              style={{ background: preset.color, ringColor: preset.color }}
                            />
                            <span className="text-xs text-slate-500 group-hover:text-slate-700 font-medium">{preset.label}</span>
                          </button>
                        ))}
                      </div>

                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Custom Hue</p>
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="range" min={0} max={359} value={custom.hue}
                          onChange={e => setCustom({ ...custom, hue: +e.target.value })}
                          className="flex-1 h-2 rounded-full cursor-pointer"
                          style={{ background: `linear-gradient(to right, hsl(0,80%,55%), hsl(60,80%,55%), hsl(120,80%,40%), hsl(180,80%,45%), hsl(240,80%,60%), hsl(300,80%,55%), hsl(360,80%,55%))` }}
                        />
                        <div className="w-7 h-7 rounded-lg shadow border border-white/50 flex-shrink-0" style={{ background: `hsl(${custom.hue}, 75%, 50%)` }} />
                      </div>

                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Background</p>
                      <div className="grid grid-cols-2 gap-2">
                        {(['light', 'dark'] as const).map(base => (
                          <button
                            key={base}
                            onClick={() => setCustom({ ...custom, base })}
                            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                              custom.base === base ? 'border-current' : 'border-slate-200 hover:border-slate-300'
                            }`}
                            style={custom.base === base ? { color: `hsl(${custom.hue},75%,45%)`, borderColor: `hsl(${custom.hue},75%,45%)`, background: `hsl(${custom.hue},75%,97%)` } : { color: '#64748b' }}
                          >
                            <span>{base === 'light' ? '☀️' : '🌙'}</span>
                            <span className="capitalize">{base} Base</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden text-white p-1.5 rounded-md hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="xl:hidden mobile-menu pb-4 border-t border-blue-700 mt-1 pt-3">
            <div className="grid grid-cols-2 gap-1 mb-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                    location === link.href
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-blue-700 pt-3">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-2 px-1">Theme</p>
              <div className="flex gap-2 mb-3">
                {themeOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setTheme(opt.value); setOpen(false); }}
                    className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      theme === opt.value ? 'bg-white text-blue-700' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
              {theme === 'custom' && (
                <div>
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-2 px-1">Color</p>
                  <div className="flex flex-wrap gap-2 px-1">
                    {COLOR_PRESETS.map(preset => (
                      <button
                        key={preset.hue}
                        onClick={() => setCustom({ ...custom, hue: preset.hue })}
                        className={`w-8 h-8 rounded-lg shadow transition-all ${custom.hue === preset.hue ? 'ring-2 ring-white scale-110' : ''}`}
                        style={{ background: preset.color }}
                        title={preset.label}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2 px-1">
                    {(['light', 'dark'] as const).map(base => (
                      <button
                        key={base}
                        onClick={() => setCustom({ ...custom, base })}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          custom.base === base ? 'bg-white text-blue-700' : 'bg-white/10 text-white'
                        }`}
                      >
                        {base === 'light' ? '☀️ Light' : '🌙 Dark'} Base
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showTheme && (
        <div className="fixed inset-0 z-40" onClick={() => setShowTheme(false)} />
      )}
    </nav>
  );
}
