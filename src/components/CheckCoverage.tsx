import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Wrench, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_SERIAL_NUMBERS } from '../data/supportData.ts';
import { CoverageResult } from '../types/index.ts';

interface CheckCoverageProps {
  onScheduleRepair: (deviceName: string) => void;
  onOpenLiveChat: () => void;
}

export const CheckCoverage: React.FC<CheckCoverageProps> = ({
  onScheduleRepair,
  onOpenLiveChat
}) => {
  const [serialInput, setSerialInput] = useState('');
  const [result, setResult] = useState<CoverageResult | null>(SAMPLE_SERIAL_NUMBERS['F17K9034QP9']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLookup = (serialToUse?: string) => {
    const sn = (serialToUse || serialInput).trim().toUpperCase();
    if (!sn) {
      setErrorMsg('Please enter a serial number.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (SAMPLE_SERIAL_NUMBERS[sn]) {
        setResult(SAMPLE_SERIAL_NUMBERS[sn]);
      } else {
        // Fallback realistic dynamic generation
        setResult({
          serialNumber: sn,
          deviceName: 'Apple Device (Verified Hardware)',
          modelNumber: 'A3102',
          purchaseDate: 'November 2024',
          hasAppleCare: true,
          planName: 'Apple Limited 1-Year Warranty',
          expirationDate: 'November 2025',
          daysRemaining: 180,
          telephoneSupport: 'Active',
          repairsCoverage: 'Active',
          accidentalDamageCoverage: false,
          theftAndLoss: false,
          batteryHealthCovered: true,
          incidentFee: 'Coverage subject to hardware inspection'
        });
      }
    }, 600);
  };

  return (
    <section className="py-12 px-4 max-w-[1100px] mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Check Your Service and Support Coverage
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mt-2">
          Review your AppleCare+ status, warranty expiration date, and eligibility for repairs or phone support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left card: Input & Quick Demos */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-6">
          <div className="rounded-2xl overflow-hidden border border-zinc-100 mb-2">
            <img 
              src="/src/assets/images/applecare_protection_1792014505510.jpg" 
              alt="AppleCare Protection" 
              className="w-full h-44 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Enter Device Serial Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. F17K9034QP9"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                className="flex-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono uppercase text-zinc-900 focus:outline-none focus:border-[#0071e3]"
              />
              <button
                onClick={() => handleLookup()}
                disabled={isLoading}
                className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                {isLoading ? 'Checking...' : 'Submit'}
              </button>
            </div>
            {errorMsg && <p className="text-xs text-red-600 mt-1">{errorMsg}</p>}
          </div>

          {/* Quick Demo Serial Numbers */}
          <div className="pt-2 border-t border-zinc-100">
            <span className="text-xs font-semibold text-zinc-500 block mb-2">
              Or test with sample serial numbers:
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setSerialInput('F17K9034QP9');
                  handleLookup('F17K9034QP9');
                }}
                className="w-full text-left p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200/70 text-xs transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-zinc-800">iPhone 16 Pro Max</div>
                  <div className="text-[11px] text-zinc-500 font-mono">F17K9034QP9 (AppleCare+ Active)</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSerialInput('C02G8013MD6');
                  handleLookup('C02G8013MD6');
                }}
                className="w-full text-left p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200/70 text-xs transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-zinc-800">MacBook Pro 16" (M3 Max)</div>
                  <div className="text-[11px] text-zinc-500 font-mono">C02G8013MD6 (AppleCare+ Active)</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSerialInput('H93W2098LK1');
                  handleLookup('H93W2098LK1');
                }}
                className="w-full text-left p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200/70 text-xs transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-zinc-800">Apple Watch Ultra 2</div>
                  <div className="text-[11px] text-zinc-500 font-mono">H93W2098LK1 (Coverage Expired)</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl text-[11px] text-zinc-500 leading-relaxed">
            Where to find your serial number? Look on your original packaging, or go to <strong>Settings &gt; General &gt; About</strong> on your device.
          </div>
        </div>

        {/* Right card: Coverage Results */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm">
          {result ? (
            <div className="space-y-6">
              {/* Device Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-medium text-zinc-400">
                      Serial: {result.serialNumber}
                    </span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-xs text-zinc-400 font-mono">
                      Model: {result.modelNumber}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f]">
                    {result.deviceName}
                  </h3>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    Estimated Purchase Date: {result.purchaseDate}
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto ${
                  result.hasAppleCare 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                }`}>
                  {result.hasAppleCare ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{result.planName}</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-zinc-500" />
                      <span>Warranty Expired</span>
                    </>
                  )}
                </div>
              </div>

              {/* Coverage Breakdown Items */}
              <div className="space-y-4">
                {/* 1: Telephone Support */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-50/70 border border-zinc-100">
                  <div className="p-2 bg-white rounded-xl border border-zinc-200 text-[#0071e3]">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-900">
                        Complimentary Telephone Technical Support
                      </span>
                      <span className={`text-xs font-semibold ${
                        result.telephoneSupport === 'Active' ? 'text-emerald-600' : 'text-zinc-400'
                      }`}>
                        {result.telephoneSupport}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Direct access to Apple experts for questions about iOS, macOS, setup, and connecting accessories.
                    </p>
                  </div>
                </div>

                {/* 2: Repairs & Hardware */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-50/70 border border-zinc-100">
                  <div className="p-2 bg-white rounded-xl border border-zinc-200 text-[#0071e3]">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-900">
                        Repairs and Service Coverage
                      </span>
                      <span className={`text-xs font-semibold ${
                        result.repairsCoverage === 'Active' ? 'text-emerald-600' : 'text-zinc-400'
                      }`}>
                        {result.repairsCoverage}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      {result.hasAppleCare 
                        ? `Covered under ${result.planName} through ${result.expirationDate} (${result.daysRemaining} days remaining).` 
                        : 'Hardware coverage has ended. Paid repairs and part replacements remain available at Apple Stores.'}
                    </p>
                    {result.hasAppleCare && (
                      <div className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                        Deductibles: {result.incidentFee}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3: AppleCare+ Extra Benefits */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-50/70 border border-zinc-100">
                  <div className="p-2 bg-white rounded-xl border border-zinc-200 text-purple-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-zinc-900 mb-1">
                      Express Replacement & Special Protection
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 mt-1">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${result.accidentalDamageCoverage ? 'text-emerald-600' : 'text-zinc-300'}`} />
                        <span>Accidental Damage</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${result.theftAndLoss ? 'text-emerald-600' : 'text-zinc-300'}`} />
                        <span>Theft & Loss Protection</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${result.batteryHealthCovered ? 'text-emerald-600' : 'text-zinc-300'}`} />
                        <span>Battery &lt;80% Free Swap</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${result.hasAppleCare ? 'text-emerald-600' : 'text-zinc-300'}`} />
                        <span>Express Replacement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onScheduleRepair(result.deviceName)}
                  className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Schedule Service for this Device</span>
                </button>
                <button
                  onClick={onOpenLiveChat}
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Contact Advisor</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <ShieldAlert className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
              <p className="text-sm">Enter a serial number or choose one of the sample devices to view coverage.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
