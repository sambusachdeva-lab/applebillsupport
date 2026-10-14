import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { ChatMessage } from '../types/index.ts';

interface LiveSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDevice?: string;
  defaultIssue?: string;
}

export const LiveSupportModal: React.FC<LiveSupportModalProps> = ({
  isOpen,
  onClose,
  defaultDevice = 'iPhone',
  defaultIssue = 'General Support'
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'call'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'specialist',
      text: `Hello! I'm Sarah, an Apple Support Senior Specialist. I see you are inquiring about ${defaultDevice} (${defaultIssue}). How can I assist you today?`,
      timestamp: 'Just now',
      specialistName: 'Sarah — Apple Senior Specialist'
    }
  ]);

  // Phone Call Callback state
  const [phoneNumber, setPhoneNumber] = useState('(555) 349-8102');
  const [callTime, setCallTime] = useState('now');
  const [callConfirmed, setCallConfirmed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputMessage,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Realistic intelligent response after delay
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I understand completely. Let's get this sorted out for you right away.";
      const lower = currentInput.toLowerCase();

      if (lower.includes('battery') || lower.includes('drain') || lower.includes('charge')) {
        replyText = "For battery performance questions, I can initiate a remote diagnostic check on your device, or we can check if your maximum capacity has dropped below 80%. If covered by AppleCare+, battery service is completely free with zero deductible.";
      } else if (lower.includes('screen') || lower.includes('crack') || lower.includes('damage') || lower.includes('broken')) {
        replyText = "I'm sorry to hear about the screen damage. All Apple Store locations carry genuine OLED and Retina displays. You can bring it directly to a Genius Bar appointment, or we can send an Express Replacement box to your doorstep.";
      } else if (lower.includes('password') || lower.includes('apple id') || lower.includes('locked') || lower.includes('account')) {
        replyText = "For account security and password resets, you can safely reset your credentials at iforgot.apple.com or via Settings on any trusted iPad or iPhone signed into your account.";
      } else if (lower.includes('refund') || lower.includes('subscription') || lower.includes('money')) {
        replyText = "I can guide you to our Report a Problem billing portal. Subscriptions can be canceled with one tap, and refund requests are typically reviewed by our finance team within 24 to 48 hours.";
      } else {
        replyText = `Thank you for sharing that detail. I've noted this in your Apple Support case file. Would you like me to book an in-store reservation at the nearest Genius Bar, or provide step-by-step diagnostic instructions right here?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'specialist',
          text: replyText,
          timestamp: 'Just now',
          specialistName: 'Sarah — Apple Senior Specialist'
        }
      ]);
    }, 1200);
  };

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    setCallConfirmed(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[620px] flex flex-col border border-zinc-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-semibold text-xs shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold flex items-center gap-1.5">
                <span>Apple Support Live</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-xs text-zinc-400">
                Case #AP-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-zinc-200 bg-zinc-50">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'chat' 
                ? 'bg-white text-[#0071e3] border-b-2 border-[#0071e3]' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Online Now</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'call' 
                ? 'bg-white text-[#0071e3] border-b-2 border-[#0071e3]' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Schedule Phone Call</span>
          </button>
        </div>

        {/* Body */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-zinc-50/50">
            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-zinc-200/60 rounded-full text-[10px] text-zinc-600 font-medium">
                  Encrypted End-to-End with Apple Advisor
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'specialist' && (
                    <span className="text-[10px] text-zinc-400 font-medium mb-1 pl-1">
                      {msg.specialistName}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0071e3] text-white rounded-br-xs'
                        : 'bg-white text-zinc-900 border border-zinc-200/80 shadow-xs rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] ml-1">Sarah is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-zinc-200 flex gap-2">
              <input
                type="text"
                placeholder="Type your message to Apple Specialist..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-zinc-100 rounded-full text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Phone Call Callback Scheduler */
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            {callConfirmed ? (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-150">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-zinc-900">
                  Call Request Confirmed
                </h4>
                <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                  An Apple Support Specialist will call you at <strong className="text-zinc-900">{phoneNumber}</strong> {callTime === 'now' ? 'in approximately 2 minutes' : `at ${callTime}`}.
                </p>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-500 max-w-xs mx-auto">
                  Reference Code: <span className="font-mono font-semibold text-zinc-900">CALL-98214</span>
                </div>
                <button
                  onClick={() => setCallConfirmed(false)}
                  className="px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold"
                >
                  Change Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookCall} className="space-y-5">
                <div>
                  <h4 className="font-semibold text-base text-zinc-900">
                    Have Apple Support Call You
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Connect directly to a tier-2 Apple advisor without waiting on hold.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    When would you like to speak?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs cursor-pointer hover:bg-zinc-100/70">
                      <input 
                        type="radio" 
                        name="callTime" 
                        checked={callTime === 'now'} 
                        onChange={() => setCallTime('now')}
                        className="text-[#0071e3]"
                      />
                      <div>
                        <span className="font-semibold text-zinc-900 block">Call me now</span>
                        <span className="text-zinc-500 text-[11px]">Current wait time: ~2 minutes</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs cursor-pointer hover:bg-zinc-100/70">
                      <input 
                        type="radio" 
                        name="callTime" 
                        checked={callTime === 'Later today at 5:00 PM'} 
                        onChange={() => setCallTime('Later today at 5:00 PM')}
                        className="text-[#0071e3]"
                      />
                      <div>
                        <span className="font-semibold text-zinc-900 block">Later today at 5:00 PM</span>
                        <span className="text-zinc-500 text-[11px]">Specialist scheduled in advance</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Request Callback</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
