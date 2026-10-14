import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  ThumbsUp, 
  Search, 
  Plus, 
  X,
  BadgeCheck,
  Filter
} from 'lucide-react';
import { COMMUNITY_POSTS } from '../data/supportData.ts';
import { CommunityPost, DeviceCategory } from '../types/index.ts';

export const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [meTooTrack, setMeTooTrack] = useState<Record<string, boolean>>({});
  
  // Ask Question Modal
  const [isAsking, setIsAsking] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DeviceCategory>('iphone');
  const [newDetails, setNewDetails] = useState('');

  const handleToggleMeToo = (postId: string) => {
    const isClicked = meTooTrack[postId];
    setMeTooTrack(prev => ({ ...prev, [postId]: !isClicked }));
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          meTooCount: isClicked ? p.meTooCount - 1 : p.meTooCount + 1
        };
      }
      return p;
    }));
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDetails.trim()) return;

    const newPost: CommunityPost = {
      id: `comm-${Date.now()}`,
      title: newTitle,
      author: 'You (Apple User)',
      avatar: 'ME',
      date: 'Just now',
      product: newCategory,
      repliesCount: 0,
      meTooCount: 1,
      question: newDetails
    };

    setPosts([newPost, ...posts]);
    setIsAsking(false);
    setNewTitle('');
    setNewDetails('');
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedProduct === 'all' || post.product === selectedProduct;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 px-4 max-w-[1100px] mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5 text-[#0071e3]" />
          <span>Apple Support Community</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Find answers from users and specialists
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mt-2">
          Connect with millions of customers worldwide and get verified advice marked with Apple Recommended Answers.
        </p>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search community questions & answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <button
            onClick={() => setIsAsking(true)}
            className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Ask the Community</span>
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar border-t border-zinc-100">
          <span className="text-xs font-medium text-zinc-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Product:
          </span>
          {[
            { id: 'all', label: 'All Products' },
            { id: 'iphone', label: 'iPhone' },
            { id: 'mac', label: 'Mac' },
            { id: 'airpods', label: 'AirPods' },
            { id: 'ipad', label: 'iPad' },
            { id: 'watch', label: 'Watch' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedProduct(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedProduct === f.id
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Community Posts */}
      <div className="space-y-6">
        {filteredPosts.map(post => {
          const hasVoted = meTooTrack[post.id];
          return (
            <div key={post.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-4">
              {/* Question header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-semibold text-xs shrink-0">
                    {post.avatar}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#1d1d1f]">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                      <span className="font-medium text-zinc-700">{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="uppercase text-[10px] tracking-wider font-semibold text-[#0071e3]">
                        {post.product}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-500 shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{post.repliesCount} replies</span>
                </div>
              </div>

              {/* Question body */}
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed pl-12">
                {post.question}
              </p>

              {/* Me too & Actions */}
              <div className="pl-12 flex items-center gap-3 pt-1">
                <button
                  onClick={() => handleToggleMeToo(post.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    hasVoted 
                      ? 'bg-blue-50 text-[#0071e3] border border-blue-200' 
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                  <span>Me too ({post.meTooCount})</span>
                </button>
              </div>

              {/* Official Recommended Answer */}
              {post.recommendedAnswer && (
                <div className="mt-4 pt-4 border-t border-zinc-100 pl-4 sm:pl-12">
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                        <BadgeCheck className="w-4 h-4 text-emerald-600" />
                        <span>{post.recommendedAnswer.badge}</span>
                        <span className="text-zinc-400 font-normal">by {post.recommendedAnswer.specialistName}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500">{post.recommendedAnswer.date}</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      {post.recommendedAnswer.answerText}
                    </p>
                    <div className="text-[11px] text-emerald-700 font-medium pt-1">
                      {post.recommendedAnswer.helpfulCount} people found this helpful
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ask Question Modal */}
      {isAsking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <form onSubmit={handleAskSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-zinc-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <h3 className="text-lg font-semibold text-zinc-900">
                Ask a question to the Apple Community
              </h3>
              <button 
                type="button"
                onClick={() => setIsAsking(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Question Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. iPad Pro screen freeze when using Procreate"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Product Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as DeviceCategory)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
              >
                <option value="iphone">iPhone</option>
                <option value="mac">Mac</option>
                <option value="ipad">iPad</option>
                <option value="watch">Apple Watch</option>
                <option value="airpods">AirPods</option>
                <option value="services">iCloud & Apple Account</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Provide details and steps you've tried
              </label>
              <textarea
                rows={4}
                required
                placeholder="Include OS version, exact symptoms, and what you've already attempted..."
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                Post Question
              </button>
              <button
                type="button"
                onClick={() => setIsAsking(false)}
                className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
