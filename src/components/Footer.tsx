import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#f5f5f7] border-t border-zinc-300/80 text-zinc-500 text-xs py-12 px-4">
      <div className="max-w-[1020px] mx-auto space-y-8">
        {/* Footnote notes */}
        <div className="text-[11px] leading-relaxed text-zinc-400 space-y-2 border-b border-zinc-200 pb-8">
          <p>
            1. AppleCare+ benefits are in addition to any legal rights provided by consumer protection laws in your jurisdiction. Service coverage is available only for iPhone, Mac, Apple Watch, iPad, and its original included accessories.
          </p>
          <p>
            2. Repair pricing estimates reflect current out-of-warranty fees at Apple Retail Stores in the United States and may vary at Apple Authorized Service Providers.
          </p>
          <p>
            3. Apple Account password recovery countdown periods depend on whether two-factor authentication and Account Recovery Contacts are verified.
          </p>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 text-xs">Product Support</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">iPhone Support</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">Mac Support</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">iPad Support</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">Watch Support</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">AirPods Support</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">Apple Vision Pro</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 text-xs">Service & Repair</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><button onClick={() => onNavigateTab('repairs')} className="hover:text-zinc-900 transition-colors">Genius Bar Appointments</button></li>
              <li><button onClick={() => onNavigateTab('repairs')} className="hover:text-zinc-900 transition-colors">Apple Repair Status</button></li>
              <li><button onClick={() => onNavigateTab('coverage')} className="hover:text-zinc-900 transition-colors">AppleCare+ Coverage</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">Apple Trade In Program</button></li>
              <li><button onClick={() => onNavigateTab('repairs')} className="hover:text-zinc-900 transition-colors">Express Replacement Service</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 text-xs">Billing & Accounts</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><button onClick={() => onNavigateTab('subscriptions')} className="hover:text-zinc-900 transition-colors">Manage Subscriptions</button></li>
              <li><button onClick={() => onNavigateTab('subscriptions')} className="hover:text-zinc-900 transition-colors">Request App Store Refund</button></li>
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-zinc-900 transition-colors">Apple Account Recovery</button></li>
              <li><button onClick={() => onNavigateTab('subscriptions')} className="hover:text-zinc-900 transition-colors">Payment Methods & Apple Pay</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 text-xs">Connect & Help</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><button onClick={() => onNavigateTab('community')} className="hover:text-zinc-900 transition-colors">Apple Support Community</button></li>
              <li><button onClick={() => onNavigateTab('troubleshoot')} className="hover:text-zinc-900 transition-colors">Guided Diagnostics</button></li>
              <li><span className="text-zinc-400">Apple Support App (iOS)</span></li>
              <li><span className="text-zinc-400">Accessibility Support</span></li>
              <li><span className="text-zinc-400">System Status Dashboard</span></li>
            </ul>
          </div>
        </div>

        {/* Legal & Locale bar */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Copyright © 2026 Apple Inc. All rights reserved.</span>
            <span className="text-zinc-400 hover:text-zinc-700 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="text-zinc-400 hover:text-zinc-700 cursor-pointer">Terms of Use</span>
            <span>·</span>
            <span className="text-zinc-400 hover:text-zinc-700 cursor-pointer">Sales and Refunds</span>
            <span>·</span>
            <span className="text-zinc-400 hover:text-zinc-700 cursor-pointer">Legal</span>
            <span>·</span>
            <span className="text-zinc-400 hover:text-zinc-700 cursor-pointer">Site Map</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 cursor-pointer shrink-0">
            <Globe className="w-3.5 h-3.5" />
            <span>United States (English)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
