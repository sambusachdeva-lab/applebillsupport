import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  MessageSquareText, 
  Menu, 
  X,
  Wrench,
  ShieldCheck,
  CreditCard,
  Users,
  Compass
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLiveSupport: () => void;
  onFocusSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveSupport,
  onFocusSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Support Home', icon: Compass },
    { id: 'troubleshoot', label: 'Guided Diagnostic', icon: Wrench },
    { id: 'repairs', label: 'Genius Bar & Repairs', icon: Wrench },
    { id: 'coverage', label: 'Check Coverage', icon: ShieldCheck },
    { id: 'subscriptions', label: 'Billing & Subscriptions', icon: CreditCard },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#161617]/90 backdrop-blur-md border-b border-white/10 text-white">
      {/* Global Apple Bar */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-11 flex items-center justify-between text-xs tracking-tight text-[#d2d2d7]">
        {/* Apple Wordmark / Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
          title="Apple Support"
        >
          <svg className="w-4 h-4 fill-current text-white transition-transform group-hover:scale-105" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.72-11.72-14.04-5.35-8.26-9.74-17.61-13.15-28.05-3.42-10.43-5.13-20.76-5.13-30.98 0-14.35 3.69-26.2 11.07-35.56 7.38-9.35 16.73-14.13 28.05-14.34 4.8 0 10.05 1.3 15.76 3.91 5.71 2.61 9.4 3.97 11.08 4.08 1.45 0 5.42-1.42 11.9-4.26 6.48-2.83 12.01-4.04 16.6-3.63 12.63.76 22.84 5.37 30.63 13.84-11.08 6.74-16.51 15.98-16.3 27.72.22 9.35 3.91 17.18 11.08 23.48 7.17 6.3 15.66 9.89 25.44 10.76-2.18 6.52-4.9 13.04-8.17 19.57zM119.22 31.43c0-7.18 2.61-13.91 7.83-20.2C132.27 4.94 138.8.76 146.63 0c.22 1.09.33 2.18.33 3.26 0 7.39-2.72 14.35-8.15 20.87-5.44 6.52-12.07 10.33-19.59 11.41z" />
          </svg>
          <span className="font-semibold text-white tracking-normal text-sm ml-1">Support</span>
        </button>

        {/* Global Desktop Navigation items */}
        <div className="hidden lg:flex items-center gap-7 text-[12px] text-zinc-300">
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Mac</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">iPad</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">iPhone</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Watch</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">AirPods</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">TV & Home</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Entertainment</span>
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onFocusSearch}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="Search support articles"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button
            onClick={onOpenLiveSupport}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Get Support</span>
          </button>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Apple Support Portal Navigation Bar */}
      <div className="bg-white/95 text-[#1d1d1f] border-b border-black/10 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-12 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-100 text-[#0071e3] font-semibold' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0071e3]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-500 pl-4 border-l border-zinc-200">
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All Apple Systems Normal
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 border-b border-white/10 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                activeTab === item.id ? 'bg-zinc-800 text-[#2997ff]' : 'text-zinc-300 hover:bg-zinc-800/50'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && <span className="text-xs">Selected</span>}
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => {
                onOpenLiveSupport();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-[#0071e3] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Connect with an Apple Specialist</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
