import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PageNav from './PageNav';
import AdBanner from './AdBanner';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function Layout({ children, showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 page-content">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className={`flex gap-6 ${showSidebar ? 'lg:flex-row' : 'flex-col'}`}>
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
            {/* Sidebar */}
            {showSidebar && (
              <aside className="hidden lg:block w-80 flex-shrink-0 space-y-6">
                {/* Sidebar top ad */}
                <AdBanner size="rectangle" />
                {/* Page nav */}
                <PageNav />
                {/* Sidebar mid ad */}
                <AdBanner size="rectangle" />
                {/* Sidebar info card */}
                <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-slate-700 text-sm mb-2">Quick Tips</h4>
                  <ul className="text-xs text-slate-500 space-y-2">
                    <li className="flex gap-2"><span className="text-blue-500 font-bold">?</span> Use ? for blank/wildcard tiles</li>
                    <li className="flex gap-2"><span className="text-blue-500 font-bold">12</span> Max 12 letters + 2 wildcards</li>
                    <li className="flex gap-2"><span className="text-blue-500 font-bold">★</span> Results sorted by Scrabble score</li>
                    <li className="flex gap-2"><span className="text-blue-500 font-bold">⚡</span> Instant results from 500K+ words</li>
                  </ul>
                </div>
                {/* Half page ad */}
                <AdBanner size="halfpage" />
              </aside>
            )}
          </div>
        </div>
      </main>
      {/* Bottom page nav */}
      <div className="max-w-7xl mx-auto w-full px-4 pb-4">
        <PageNav />
      </div>
      <Footer />
    </div>
  );
}
