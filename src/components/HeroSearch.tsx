import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, ShieldCheck, Wrench, CreditCard, KeyRound } from 'lucide-react';
import { POPULAR_SEARCH_TOPICS, SUPPORT_ARTICLES } from '../data/supportData.ts';
import { SupportArticle } from '../types/index.ts';

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectArticle: (article: SupportArticle) => void;
  onNavigateTab: (tabId: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectArticle,
  onNavigateTab,
  searchRef
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredArticles = searchQuery.trim() === '' 
    ? [] 
    : SUPPORT_ARTICLES.filter(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="relative bg-gradient-to-b from-white to-[#f5f5f7] pt-12 pb-16 px-4 border-b border-zinc-200">
      <div className="max-w-[1020px] mx-auto text-center">
        {/* Apple Support Title */}
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          Apple Support
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto mb-8 font-normal">
          Search for support topics, explore troubleshooting guides, or connect with our advisors.
        </p>

        {/* Search Bar Container */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto text-left mb-6">
          <div 
            className={`relative flex items-center bg-white rounded-2xl shadow-sm border transition-all duration-200 ${
              isFocused 
                ? 'border-[#0071e3] ring-4 ring-[#0071e3]/10 shadow-md' 
                : 'border-zinc-300 hover:border-zinc-400'
            }`}
          >
            <div className="pl-4 text-zinc-400">
              <Search className="w-5 h-5" />
            </div>
            
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search for topics, products, or questions"
              className="w-full py-4 pl-3 pr-10 text-sm sm:text-base text-[#1d1d1f] placeholder-zinc-400 focus:outline-none rounded-2xl bg-transparent"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete / Suggestions Dropdown */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-30 divide-y divide-zinc-100 animate-in fade-in zoom-in-95 duration-150">
              {searchQuery.trim() !== '' && (
                <div className="p-3">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 mb-2">
                    Matching Articles
                  </div>
                  {filteredArticles.length > 0 ? (
                    <div className="space-y-1">
                      {filteredArticles.map(article => (
                        <button
                          key={article.id}
                          onClick={() => {
                            onSelectArticle(article);
                            setIsFocused(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-50 flex items-start justify-between group transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-zinc-900 group-hover:text-[#0071e3] transition-colors">
                              {article.title}
                            </div>
                            <div className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                              {article.summary}
                            </div>
                          </div>
                          <span className="text-xs text-zinc-400 mt-1 whitespace-nowrap pl-2">
                            {article.readTime}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-3 text-sm text-zinc-500">
                      No exact articles found for "{searchQuery}". Try a broader term like "battery", "password", or "screen".
                    </div>
                  )}
                </div>
              )}

              {/* Popular Searches */}
              <div className="p-3 bg-zinc-50/70">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 mb-2">
                  Popular Support Queries
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {POPULAR_SEARCH_TOPICS.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(topic);
                        setIsFocused(false);
                      }}
                      className="text-left px-3 py-2 text-xs text-zinc-700 hover:text-[#0071e3] hover:bg-white rounded-lg flex items-center justify-between group transition-colors"
                    >
                      <span className="line-clamp-1">{topic}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-300 group-hover:text-[#0071e3] shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Help Fast Action Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
          <button
            onClick={() => onNavigateTab('repairs')}
            className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0071e3] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-zinc-800">Genius Bar & Repairs</span>
            <span className="text-[11px] text-zinc-500 mt-0.5">Book store visit</span>
          </button>

          <button
            onClick={() => onNavigateTab('coverage')}
            className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-zinc-800">Check Coverage</span>
            <span className="text-[11px] text-zinc-500 mt-0.5">Warranty & AppleCare+</span>
          </button>

          <button
            onClick={() => onNavigateTab('subscriptions')}
            className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-zinc-800">Billing & Subscriptions</span>
            <span className="text-[11px] text-zinc-500 mt-0.5">Refunds and cancel</span>
          </button>

          <button
            onClick={() => {
              const pwArticle = SUPPORT_ARTICLES.find(a => a.id === 'art-apple-id-reset');
              if (pwArticle) onSelectArticle(pwArticle);
            }}
            className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-zinc-800">Reset Apple Password</span>
            <span className="text-[11px] text-zinc-500 mt-0.5">Account recovery</span>
          </button>
        </div>

        {/* Hero Product Banner image */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-lg border border-black/5 bg-white relative max-w-4xl mx-auto">
          <img 
            src="/src/assets/images/hero_apple_devices_1792014504031.jpg" 
            alt="Apple devices family lineup" 
            className="w-full h-auto object-cover max-h-[380px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-300 font-medium">Apple Ecosystem Care</div>
              <div className="text-lg sm:text-xl font-semibold">Fast, personalized support for every device you love</div>
            </div>
            <button
              onClick={() => onNavigateTab('troubleshoot')}
              className="px-4 py-2 bg-white text-zinc-900 rounded-full text-xs font-semibold hover:bg-zinc-100 transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>Run Guided Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
