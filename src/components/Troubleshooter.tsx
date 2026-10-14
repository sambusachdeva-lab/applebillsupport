import React, { useState } from 'react';
import { 
  Wrench, 
  Battery, 
  Smartphone, 
  Wifi, 
  KeyRound, 
  Volume2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  MessageSquare,
  Calendar,
  Sparkles
} from 'lucide-react';
import { DEVICES } from '../data/supportData.ts';
import { DeviceInfo } from '../types/index.ts';

interface TroubleshooterProps {
  initialDevice?: DeviceInfo | null;
  onBookGeniusBar: (device: string, issue: string) => void;
  onOpenLiveChat: (device: string, issue: string) => void;
}

type IssueCategory = 'battery' | 'screen' | 'startup' | 'connectivity' | 'password' | 'audio';

export const Troubleshooter: React.FC<TroubleshooterProps> = ({
  initialDevice,
  onBookGeniusBar,
  onOpenLiveChat
}) => {
  const [selectedDevice, setSelectedDevice] = useState<string>(initialDevice?.name || 'iPhone');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>('battery');
  const [diagnosticRunning, setDiagnosticRunning] = useState<boolean>(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState<number>(0);
  const [diagnosticPhase, setDiagnosticPhase] = useState<string>('');
  const [diagnosticComplete, setDiagnosticComplete] = useState<boolean>(false);
  const [resolved, setResolved] = useState<boolean>(false);

  const categories = [
    { id: 'battery' as IssueCategory, label: 'Battery & Power', icon: Battery, desc: 'Draining fast, not charging, heating up' },
    { id: 'screen' as IssueCategory, label: 'Screen & Display', icon: Smartphone, desc: 'Cracked, flickering, touch unresponsive' },
    { id: 'startup' as IssueCategory, label: 'Startup & Freezes', icon: RefreshCw, desc: 'Will not turn on, Apple logo loop' },
    { id: 'connectivity' as IssueCategory, label: 'Wi-Fi & Cellular', icon: Wifi, desc: 'No service, dropping Wi-Fi, Bluetooth' },
    { id: 'password' as IssueCategory, label: 'Apple ID & Passcode', icon: KeyRound, desc: 'Forgot password, device disabled' },
    { id: 'audio' as IssueCategory, label: 'Sound & Speakers', icon: Volume2, desc: 'Muffled call audio, mic not working' },
  ];

  const runDiagnosticSimulation = () => {
    setDiagnosticRunning(true);
    setDiagnosticProgress(15);
    setDiagnosticComplete(false);
    setResolved(false);
    setDiagnosticPhase('Connecting to Apple Diagnostic Engine...');

    setTimeout(() => {
      setDiagnosticProgress(45);
      setDiagnosticPhase('Checking hardware sensors & telemetry...');
    }, 700);

    setTimeout(() => {
      setDiagnosticProgress(75);
      setDiagnosticPhase('Analyzing subsystem battery health & crash logs...');
    }, 1500);

    setTimeout(() => {
      setDiagnosticProgress(100);
      setDiagnosticPhase('Diagnostics complete. Evaluation ready.');
      setDiagnosticRunning(false);
      setDiagnosticComplete(true);
    }, 2200);
  };

  const getRecommendations = () => {
    switch (selectedCategory) {
      case 'battery':
        return {
          title: 'Battery Health Evaluation',
          healthScore: '83% Maximum Capacity',
          status: 'Service Recommended Soon',
          steps: [
            'Enable "Optimized Battery Charging" in Settings > Battery.',
            'Review Battery Usage by App to detect heavy background activity.',
            'Perform a simulated Force Restart (Volume Up, Volume Down, hold Side Button) to clear cache.',
            'Keep ambient operating temperature between 32° to 95° F (0° to 35° C).'
          ],
          officialServiceOption: 'Battery Service is covered at $0 with AppleCare+, or $99 out of warranty.'
        };
      case 'screen':
        return {
          title: 'Display & Multi-Touch Diagnostics',
          healthScore: 'Display Digitizer: Functional',
          status: 'Physical Damage Check Required',
          steps: [
            'Remove any third-party screen protectors or bulky cases to rule out touch interference.',
            'Clean screen surface with a 70% isopropyl alcohol wipe and micro-fiber cloth.',
            'Check for physical cracks along edge bezels that may breach moisture barrier.'
          ],
          officialServiceOption: 'Same-day genuine Apple screen repair available at Genius Bar.'
        };
      case 'startup':
        return {
          title: 'Power & Boot Controller Diagnostics',
          healthScore: 'Bootrom / Firmware: Clean',
          status: 'Power Cycle Required',
          steps: [
            'Plug into genuine Apple USB-C or MagSafe charger for at least 30 minutes.',
            'Attempt a hard forced reboot while connected to power.',
            'Connect to a computer running macOS Finder or Apple Configurator to attempt recovery mode.'
          ],
          officialServiceOption: 'Genius Bar technicians can run hardware logic board tests.'
        };
      case 'connectivity':
        return {
          title: 'RF & Wireless Controller Diagnostics',
          healthScore: 'Wi-Fi 6E & Bluetooth 5.3: Responding',
          status: 'Network Settings Refresh Advised',
          steps: [
            'Toggle Airplane Mode ON for 15 seconds, then turn back OFF.',
            'Go to Settings > General > Transfer or Reset > Reset Network Settings.',
            'Contact carrier to ensure eSIM provisioning profile is current.'
          ],
          officialServiceOption: 'Apple Advisors can remotely verify modem registration.'
        };
      case 'password':
        return {
          title: 'Apple Account Security Check',
          healthScore: 'Account Security: 2FA Active',
          status: 'Self-Service Recovery Enabled',
          steps: [
            'Use your trusted device to reset passcode in Settings > [Your Name] > Sign-In & Security.',
            'If locked out, visit iforgot.apple.com to initiate an automated account recovery countdown.',
            'Ensure you have access to your recovery phone number.'
          ],
          officialServiceOption: 'Apple Advisors cannot bypass Activation Lock without proof of purchase.'
        };
      case 'audio':
        return {
          title: 'Acoustic Mesh & Transducer Diagnostics',
          healthScore: 'Acoustic Transducers: Nominal',
          status: 'Microphone Grille Inspection',
          steps: [
            'Clean receiver mesh and microphone openings using a dry, soft-bristled brush.',
            'Disconnect all Bluetooth audio devices to ensure audio isn\'t routing elsewhere.',
            'Test with Voice Memos to isolate hardware mic from app-specific permission bugs.'
          ],
          officialServiceOption: 'Audio components can be inspected under microscope at Genius Bar.'
        };
    }
  };

  const rec = getRecommendations();

  return (
    <section className="py-12 px-4 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0071e3] rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Apple Diagnostic Assistant</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Guided Troubleshooting
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mt-2">
          Run automated tests, identify root causes, and find the fastest solution.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-8">
        {/* Step 1: Device Selection */}
        <div>
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
            1. Select Device
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods'].map((dev) => (
              <button
                key={dev}
                onClick={() => {
                  setSelectedDevice(dev);
                  setDiagnosticComplete(false);
                  setResolved(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                  selectedDevice === dev
                    ? 'border-[#0071e3] bg-blue-50/50 text-[#0071e3] font-semibold'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                }`}
              >
                {dev}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Issue Category */}
        <div>
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
            2. What issue are you experiencing?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setDiagnosticComplete(false);
                    setResolved(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0071e3] bg-blue-50/40 ring-2 ring-[#0071e3]/20'
                      : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#0071e3] text-white' : 'bg-white text-zinc-700 border border-zinc-200'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm text-[#1d1d1f]">
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 pl-11">
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Run Diagnostic Test */}
        <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-base text-[#1d1d1f]">
                Apple Remote Diagnostic Suite
              </h4>
              <p className="text-xs text-zinc-500">
                Simulate official hardware and operating system check for {selectedDevice}
              </p>
            </div>
            <button
              onClick={runDiagnosticSimulation}
              disabled={diagnosticRunning}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                diagnosticRunning 
                  ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' 
                  : 'bg-[#0071e3] hover:bg-[#0077ed] text-white'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${diagnosticRunning ? 'animate-spin' : ''}`} />
              <span>{diagnosticRunning ? 'Scanning Device...' : 'Run Diagnostics'}</span>
            </button>
          </div>

          {/* Progress bar */}
          {diagnosticRunning && (
            <div className="space-y-2 pt-2">
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0071e3] h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${diagnosticProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
                <span>{diagnosticPhase}</span>
                <span className="tabular-nums font-semibold">{diagnosticProgress}%</span>
              </div>
            </div>
          )}

          {/* Diagnostic Result */}
          {diagnosticComplete && (
            <div className="mt-4 pt-4 border-t border-zinc-200 animate-in fade-in duration-300">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-zinc-200 mb-5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-zinc-900 text-sm">
                    {rec.title} — {rec.status}
                  </div>
                  <div className="text-zinc-600 mt-1">
                    System Telemetry Metric: <strong className="text-zinc-900">{rec.healthScore}</strong>
                  </div>
                </div>
              </div>

              {/* Actionable Steps */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Recommended Steps:
                </div>
                {rec.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 bg-white p-3 rounded-xl border border-zinc-200/70">
                    <span className="font-bold text-[#0071e3]">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-zinc-500 italic mb-5">
                {rec.officialServiceOption}
              </div>

              {/* Resolution or Escalation */}
              {resolved ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold">Issue marked as resolved!</span> Keep your software updated to maintain optimal performance.
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setResolved(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>This Solved My Issue</span>
                  </button>

                  <button
                    onClick={() => onBookGeniusBar(selectedDevice, categories.find(c => c.id === selectedCategory)?.label || 'Hardware')}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Genius Bar</span>
                  </button>

                  <button
                    onClick={() => onOpenLiveChat(selectedDevice, categories.find(c => c.id === selectedCategory)?.label || 'General')}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Chat with Specialist</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
