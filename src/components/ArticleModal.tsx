import React, { useState } from 'react';
import { X, Check, Clock, Eye, ThumbsUp, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import { SupportArticle } from '../types/index.ts';

interface ArticleModalProps {
  article: SupportArticle | null;
  onClose: () => void;
  onOpenLiveChat: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenLiveChat
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-zinc-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
              <span className="uppercase text-[11px] font-semibold text-[#0071e3] tracking-wider">
                Apple Support Article
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                {article.readTime}
              </span>
              <span>·</span>
              <span>Updated {article.updatedDate}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
              {article.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed">
            {article.summary}
          </p>

          <div className="space-y-6">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-[#1d1d1f]">
                  {sec.heading}
                </h3>
                <ol className="space-y-2 text-xs sm:text-sm text-zinc-700 list-decimal pl-5">
                  {sec.content.map((point, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ol>

                {sec.callout && (
                  <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs sm:text-sm text-blue-900 leading-relaxed">
                    <strong>Note:</strong> {sec.callout}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="pt-6 border-t border-zinc-100 space-y-3">
            <div className="text-xs font-semibold text-zinc-700">
              Was this page helpful?
            </div>
            {feedbackGiven ? (
              <div className="text-xs text-emerald-700 font-medium">
                Thank you for your feedback. We appreciate your input!
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFeedbackGiven('yes')}
                  className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setFeedbackGiven('no')}
                  className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No</span>
                </button>
              </div>
            )}
          </div>

          {/* Still need help CTA */}
          <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-zinc-600">
              Still need personalized troubleshooting or warranty support?
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenLiveChat();
              }}
              className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm shrink-0 cursor-pointer"
            >
              Connect with Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
