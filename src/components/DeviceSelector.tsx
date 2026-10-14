import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Headphones, 
  Glasses, 
  Tv, 
  Cloud,
  ArrowRight,
  ShieldAlert,
  Battery,
  Monitor
} from 'lucide-react';
import { DEVICES } from '../data/supportData.ts';
import { DeviceInfo } from '../types/index.ts';

interface DeviceSelectorProps {
  onSelectDevice: (device: DeviceInfo) => void;
  onStartDiagnosticForDevice: (device: DeviceInfo) => void;
  onBookRepairForDevice: (device: DeviceInfo) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  onSelectDevice,
  onStartDiagnosticForDevice,
  onBookRepairForDevice
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(DEVICES[0]);

  const getDeviceIcon = (id: string) => {
    switch (id) {
      case 'iphone': return Smartphone;
      case 'mac': return Laptop;
      case 'ipad': return Tablet;
      case 'watch': return Watch;
      case 'airpods': return Headphones;
      case 'vision-pro': return Glasses;
      case 'tv-home': return Tv;
      case 'services': return Cloud;
      default: return Smartphone;
    }
  };

  return (
    <section className="py-12 px-4 max-w-[1200px] mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
          Select your product
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 mt-1">
          Get customized troubleshooting, service pricing, and official guides
        </p>
      </div>

      {/* Device Icons Row */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-8">
        {DEVICES.map((device) => {
          const Icon = getDeviceIcon(device.id);
          const isSelected = selectedDevice?.id === device.id;
          return (
            <button
              key={device.id}
              onClick={() => {
                setSelectedDevice(device);
                onSelectDevice(device);
              }}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white shadow-md border-2 border-[#0071e3] scale-105'
                  : 'bg-white/80 hover:bg-white border border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <div className={`p-2.5 rounded-full mb-2 ${
                isSelected ? 'bg-blue-50 text-[#0071e3]' : 'text-zinc-600'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-semibold ${isSelected ? 'text-[#0071e3]' : 'text-zinc-800'}`}>
                {device.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Device Expanded Card */}
      {selectedDevice && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm transition-all animate-in fade-in duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
                  Device Hub
                </span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs text-zinc-500 font-medium">
                  Latest Software: {selectedDevice.currentOS}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f]">
                {selectedDevice.name} Support & Service
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                {selectedDevice.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartDiagnosticForDevice(selectedDevice)}
                className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Run {selectedDevice.name} Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onBookRepairForDevice(selectedDevice)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Schedule Genius Bar
              </button>
            </div>
          </div>

          {/* Grid of Common Topics & Service Estimates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {/* Common Issues */}
            <div className="bg-zinc-50/80 rounded-2xl p-5 border border-zinc-200/60">
              <div className="flex items-center gap-2 text-zinc-800 font-semibold text-sm mb-3">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Common {selectedDevice.name} Topics</span>
              </div>
              <ul className="space-y-2.5">
                {selectedDevice.popularIssues.map((issue, idx) => (
                  <li key={idx} className="text-xs text-zinc-600 flex items-start gap-2">
                    <span className="text-[#0071e3] font-bold text-sm leading-none">•</span>
                    <span className="hover:text-[#0071e3] cursor-pointer transition-colors">
                      {issue}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Apple Repair Pricing Preview */}
            <div className="bg-zinc-50/80 rounded-2xl p-5 border border-zinc-200/60">
              <div className="flex items-center gap-2 text-zinc-800 font-semibold text-sm mb-3">
                <Battery className="w-4 h-4 text-emerald-600" />
                <span>Standard Repair Estimates</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-200/60">
                  <span className="text-zinc-600">Battery Replacement (Out of warranty)</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">
                    {selectedDevice.batteryReplacementCost > 0 ? `$${selectedDevice.batteryReplacementCost}` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-200/60">
                  <span className="text-zinc-600">Screen Repair (Out of warranty)</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">
                    {selectedDevice.screenReplacementCost > 0 ? `$${selectedDevice.screenReplacementCost}` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600">With AppleCare+ Coverage</span>
                  <span className="font-semibold text-emerald-600">$0 to $29 deductible</span>
                </div>
              </div>
            </div>

            {/* Trade In & OS status */}
            <div className="bg-zinc-50/80 rounded-2xl p-5 border border-zinc-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-zinc-800 font-semibold text-sm mb-2">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Apple Trade In</span>
                </div>
                <p className="text-xs text-zinc-600 mb-3">
                  Upgrade and save. Get up to <strong className="text-zinc-900 tabular-nums">${selectedDevice.tradeInUpTo}</strong> credit toward a new device or receive an Apple Gift Card.
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block text-[11px] text-zinc-500 font-medium">
                  Tested and verified by Apple certified technicians using genuine parts.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
