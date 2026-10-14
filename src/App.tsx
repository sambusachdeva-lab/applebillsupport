import React, { useState, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSearch } from './components/HeroSearch.tsx';
import { DeviceSelector } from './components/DeviceSelector.tsx';
import { Troubleshooter } from './components/Troubleshooter.tsx';
import { GeniusBarBooking } from './components/GeniusBarBooking.tsx';
import { CheckCoverage } from './components/CheckCoverage.tsx';
import { SubscriptionsManager } from './components/SubscriptionsManager.tsx';
import { CommunityForum } from './components/CommunityForum.tsx';
import { LiveSupportModal } from './components/LiveSupportModal.tsx';
import { ArticleModal } from './components/ArticleModal.tsx';
import { Footer } from './components/Footer.tsx';
import { SUPPORT_ARTICLES } from './data/supportData.ts';
import { DeviceInfo, SupportArticle } from './types/index.ts';
import { ArrowRight, BookOpen, Clock, ShieldCheck, Wrench, MessageSquare, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<SupportArticle | null>(null);
  const [liveSupportOpen, setLiveSupportOpen] = useState<boolean>(false);
  const [supportDevice, setSupportDevice] = useState<string>('iPhone 16 Pro');
  const [supportIssue, setSupportIssue] = useState<string>('Hardware Diagnostic');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleFocusSearch = () => {
    setActiveTab('home');
    setTimeout(() => {
      searchInputRef.current?.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleStartDiagnosticForDevice = (device: DeviceInfo) => {
    setSupportDevice(device.name);
    setActiveTab('troubleshoot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookRepairForDevice = (device: DeviceInfo) => {
    setSupportDevice(device.name);
    setSupportIssue('Hardware Service');
    setActiveTab('repairs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFromTroubleshooter = (device: string, issue: string) => {
    setSupportDevice(device);
    setSupportIssue(issue);
    setActiveTab('repairs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatFromTroubleshooter = (device: string, issue: string) => {
    setSupportDevice(device);
    setSupportIssue(issue);
    setLiveSupportOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveSupport={() => setLiveSupportOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero & Live Search */}
            <HeroSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              searchRef={searchInputRef}
            />

            {/* Product Grid / Device Hub */}
            <DeviceSelector
              onSelectDevice={(device) => setSupportDevice(device.name)}
              onStartDiagnosticForDevice={handleStartDiagnosticForDevice}
              onBookRepairForDevice={handleBookRepairForDevice}
            />

            {/* Featured Official Guides Section */}
            <section className="py-12 px-4 max-w-[1200px] mx-auto border-t border-zinc-200/80">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider block mb-1">
                    Knowledge Base
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                    Recommended Support Guides
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    Step-by-step verified procedures directly from Apple Engineering
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUPPORT_ARTICLES.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-3xl p-6 border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                        <span className="uppercase text-[10px] font-semibold text-[#0071e3] tracking-wider">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-zinc-900 group-hover:text-[#0071e3] transition-colors leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-[#0071e3]">
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AppleCare & Service Promotion Banner */}
            <section className="py-12 px-4 max-w-[1200px] mx-auto">
              <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-4 text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>AppleCare+ Protection Plan</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
                    Accidents happen. We have you covered.
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Get unlimited incidents of accidental damage protection, 24/7 priority technical access, and battery service if your capacity falls below 80%.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('coverage');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-white text-zinc-900 hover:bg-zinc-100 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Check Device Coverage
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('repairs');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Genius Bar Repair
                    </button>
                  </div>
                </div>

                <div className="relative z-10 shrink-0 w-44 sm:w-56">
                  <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-20 h-20 text-[#2997ff]" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'troubleshoot' && (
          <Troubleshooter
            onBookGeniusBar={handleBookFromTroubleshooter}
            onOpenLiveChat={handleChatFromTroubleshooter}
          />
        )}

        {activeTab === 'repairs' && (
          <GeniusBarBooking
            initialDevice={supportDevice}
            initialIssue={supportIssue}
          />
        )}

        {activeTab === 'coverage' && (
          <CheckCoverage
            onScheduleRepair={(device) => {
              setSupportDevice(device);
              setActiveTab('repairs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLiveChat={() => setLiveSupportOpen(true)}
          />
        )}

        {activeTab === 'subscriptions' && (
          <SubscriptionsManager />
        )}

        {activeTab === 'community' && (
          <CommunityForum />
        )}
      </main>

      {/* Global Apple Support Live Modal */}
      <LiveSupportModal
        isOpen={liveSupportOpen}
        onClose={() => setLiveSupportOpen(false)}
        defaultDevice={supportDevice}
        defaultIssue={supportIssue}
      />

      {/* Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenLiveChat={() => setLiveSupportOpen(true)}
      />

      {/* Footer */}
      <Footer onNavigateTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
