import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  X, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { INITIAL_SUBSCRIPTIONS } from '../data/supportData.ts';
import { SubscriptionItem } from '../types/index.ts';

export const SubscriptionsManager: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(INITIAL_SUBSCRIPTIONS);
  const [selectedSubForCancel, setSelectedSubForCancel] = useState<SubscriptionItem | null>(null);
  const [refundStep, setRefundStep] = useState<'form' | 'submitted'>('form');
  const [refundItem, setRefundItem] = useState('Apple Music - Monthly');
  const [refundReason, setRefundReason] = useState('Unintentional purchase / Renewed by mistake');
  const [refundNote, setRefundNote] = useState('');
  const [refundCaseId, setRefundCaseId] = useState('');

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(prev => prev.map(sub => sub.id === id ? { ...sub, active: false } : sub));
    setSelectedSubForCancel(null);
  };

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const caseId = `CAS-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setRefundCaseId(caseId);
    setRefundStep('submitted');
  };

  return (
    <section className="py-12 px-4 max-w-[1100px] mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Billing & Subscriptions
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mt-2">
          Manage recurring Apple subscriptions, view payment history, and request refunds for App Store purchases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Subscriptions list */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">
                Active Subscriptions
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Billed via Apple ID (alex.rivers@icloud.com)
              </p>
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              Apple Card Ending in 4092
            </span>
          </div>

          <div className="space-y-3">
            {subscriptions.map(sub => (
              <div 
                key={sub.id} 
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  sub.active ? 'bg-zinc-50/50 border-zinc-200' : 'bg-zinc-100/50 border-zinc-200/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${sub.iconBg} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-zinc-900">{sub.name}</div>
                    <div className="text-xs text-zinc-500">{sub.plan}</div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {sub.active ? `Renews: ${sub.renewsOn}` : 'Expires at end of current period'}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-1">
                  <span className="font-semibold text-xs text-zinc-900 tabular-nums">
                    {sub.price}
                  </span>
                  {sub.active ? (
                    <button
                      onClick={() => setSelectedSubForCancel(sub)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-xs text-zinc-400 font-medium">Canceled</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/70 text-xs text-zinc-600 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-900">Apple In-App Purchase Guarantee:</span> If you cancel, you can keep using the subscription until the next billing date. Subscriptions renew automatically unless canceled at least 24 hours before the end of the current period.
            </div>
          </div>
        </div>

        {/* Request a Refund Tool */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-100">
            <RotateCcw className="w-5 h-5 text-[#0071e3]" />
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">
                Request a Refund
              </h3>
              <p className="text-xs text-zinc-500">
                Official Apple Report a Problem tool
              </p>
            </div>
          </div>

          {refundStep === 'form' ? (
            <form onSubmit={handleRefundSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Select Recent Purchase
                </label>
                <select
                  value={refundItem}
                  onChange={(e) => setRefundItem(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="Apple Music - Monthly ($10.99)">Apple Music - Monthly ($10.99)</option>
                  <option value="Procreate for iPad ($12.99)">Procreate for iPad ($12.99)</option>
                  <option value="In-App Purchase - Game Credits ($4.99)">In-App Purchase - Game Credits ($4.99)</option>
                  <option value="iCloud+ 2TB ($9.99)">iCloud+ 2TB ($9.99)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Tell us why you want a refund
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="Unintentional purchase / Renewed by mistake">Unintentional purchase / Renewed by mistake</option>
                  <option value="A minor made purchase without permission">A child or minor made purchase without permission</option>
                  <option value="Subscription did not meet expectations">Subscription did not meet expectations</option>
                  <option value="App does not function or crashes constantly">App does not function or crashes constantly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={refundNote}
                  onChange={(e) => setRefundNote(e.target.value)}
                  placeholder="Provide context for our review team..."
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Refund Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="space-y-4 py-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-base text-zinc-900">
                  Refund Request Received
                </h4>
                <div className="text-xs text-zinc-500 mt-1">
                  Case ID: <span className="font-mono text-zinc-800 font-semibold">{refundCaseId}</span>
                </div>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80 text-xs text-zinc-600 space-y-1.5">
                <div><strong>Item:</strong> {refundItem}</div>
                <div><strong>Reason:</strong> {refundReason}</div>
                <div><strong>Estimated Response:</strong> Within 48 hours to your Apple ID email.</div>
              </div>

              <button
                onClick={() => setRefundStep('form')}
                className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {selectedSubForCancel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-zinc-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-zinc-900">
                Cancel {selectedSubForCancel.name}?
              </h4>
              <button 
                onClick={() => setSelectedSubForCancel(null)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              If you cancel now, you can still access your subscription until <strong>{selectedSubForCancel.renewsOn}</strong>. You won't be charged after that date.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleCancelSubscription(selectedSubForCancel.id)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Confirm Cancellation
              </button>
              <button
                onClick={() => setSelectedSubForCancel(null)}
                className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Keep Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
