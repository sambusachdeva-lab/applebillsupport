import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Download, 
  X, 
  ShieldCheck, 
  Smartphone,
  ChevronRight,
  Info
} from 'lucide-react';
import { STORE_LOCATIONS } from '../data/supportData.ts';
import { StoreLocation, Appointment } from '../types/index.ts';

interface GeniusBarBookingProps {
  initialDevice?: string;
  initialIssue?: string;
}

export const GeniusBarBooking: React.FC<GeniusBarBookingProps> = ({
  initialDevice = 'iPhone 16 Pro',
  initialIssue = 'Screen & Hardware Service'
}) => {
  const [device, setDevice] = useState(initialDevice);
  const [issue, setIssue] = useState(initialIssue);
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);
  const [searchCity, setSearchCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Oct 16');
  const [selectedTime, setSelectedTime] = useState('2:40 PM');
  
  // Customer info
  const [fullName, setFullName] = useState('Alex Rivers');
  const [email, setEmail] = useState('alex.rivers@icloud.com');
  const [phone, setPhone] = useState('(555) 234-5678');
  const [serialNumber, setSerialNumber] = useState('F17K9034QP9');

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = [
    '10:15 AM', '11:30 AM', '1:00 PM', '2:40 PM', '3:20 PM', '4:15 PM', '5:30 PM', '6:45 PM'
  ];

  const dates = [
    'Today, Oct 15',
    'Tomorrow, Oct 16',
    'Saturday, Oct 17',
    'Sunday, Oct 18',
    'Monday, Oct 19'
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMsg('Please complete all contact information.');
      return;
    }
    setErrorMsg('');

    const newAppt: Appointment = {
      id: `G-${Math.floor(10000000 + Math.random() * 90000000)}`,
      product: device,
      issue: issue,
      store: selectedStore,
      date: selectedDate,
      time: selectedTime,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      serialNumber: serialNumber,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    setAppointment(newAppt);
  };

  const handleDownloadCalendar = () => {
    if (!appointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Apple Support Genius Bar//EN
BEGIN:VEVENT
SUMMARY:Genius Bar Appointment - ${appointment.product}
DESCRIPTION:Apple Store Appointment at ${appointment.store.name} for ${appointment.issue}. Reservation code: ${appointment.id}
LOCATION:${appointment.store.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Genius_Bar_${appointment.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStores = STORE_LOCATIONS.filter(store => 
    store.name.toLowerCase().includes(searchCity.toLowerCase()) ||
    store.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    store.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <section className="py-12 px-4 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Genius Bar Reservation
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mt-2">
          Schedule hands-on technical support, hardware repairs, and screen replacements at an Apple Store near you.
        </p>
      </div>

      {/* Confirmation Card if already booked */}
      {appointment ? (
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-md p-6 sm:p-10 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
          <div className="text-center pb-6 border-b border-zinc-100">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Confirmed Reservation
            </span>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mt-1">
              You're all set for the Genius Bar
            </h3>
            <div className="text-xs text-zinc-500 mt-1">
              Reservation ID: <strong className="font-mono text-zinc-800">{appointment.id}</strong>
            </div>
          </div>

          <div className="py-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/60">
              <div>
                <span className="text-zinc-500 block mb-0.5">Date & Time</span>
                <span className="font-semibold text-zinc-900 text-sm">
                  {appointment.date} at {appointment.time}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-0.5">Device & Service</span>
                <span className="font-semibold text-zinc-900 text-sm">
                  {appointment.product}
                </span>
                <span className="text-zinc-600 block">{appointment.issue}</span>
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/60 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-zinc-900 text-sm">{appointment.store.name}</div>
                <div className="text-zinc-600">{appointment.store.address}</div>
                <div className="text-zinc-500 mt-1">{appointment.store.hours}</div>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="border border-zinc-200 rounded-2xl p-4 space-y-2">
              <div className="font-semibold text-zinc-800 text-xs flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>How to prepare before your visit:</span>
              </div>
              <ul className="text-zinc-600 space-y-1 pl-4 list-disc">
                <li>Back up your {appointment.product} to iCloud or your computer.</li>
                <li>Turn off Find My (required for all hardware repairs).</li>
                <li>Bring a valid government-issued photo ID.</li>
                <li>Know your Apple ID and password to authorize service.</li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleDownloadCalendar}
              className="w-full sm:w-auto flex-1 py-2.5 px-4 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Add to Apple Calendar (.ics)</span>
            </button>
            <button
              onClick={() => setAppointment(null)}
              className="w-full sm:w-auto py-2.5 px-5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold transition-colors cursor-pointer"
            >
              Book Another Visit
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Store visual and details card */}
          <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-zinc-200/90 shadow-sm">
            <img 
              src="/src/assets/images/genius_bar_experience_1792014505409.jpg" 
              alt="Apple Store Genius Bar" 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6">
              <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider block mb-1">
                Selected Location
              </span>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">
                {selectedStore.name}
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                {selectedStore.address}
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{selectedStore.hours}</span>
              </div>
              <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-center justify-between">
                <span>Fastest opening today:</span>
                <strong className="text-[#0071e3]">{selectedStore.nextSlotToday}</strong>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-100">
                <div className="text-xs font-semibold text-zinc-700 mb-2">Switch Store Location:</div>
                <input
                  type="text"
                  placeholder="Filter store or city..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl mb-2 focus:outline-none focus:border-[#0071e3]"
                />
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {filteredStores.map(store => (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => setSelectedStore(store)}
                      className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedStore.id === store.id 
                          ? 'bg-zinc-100 font-semibold text-[#0071e3]' 
                          : 'hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <div>
                        <div>{store.name}</div>
                        <div className="text-[10px] text-zinc-400">{store.city}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Inputs */}
          <form onSubmit={handleBook} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-6">
            <h3 className="text-xl font-semibold text-[#1d1d1f]">
              Reservation Details
            </h3>

            {/* Device & Issue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1.5">
                  Device Model
                </label>
                <select
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="iPhone 16 Pro Max">iPhone 16 Pro Max</option>
                  <option value="iPhone 16 / 16 Plus">iPhone 16 / 16 Plus</option>
                  <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                  <option value="MacBook Pro 14 or 16">MacBook Pro 14" / 16"</option>
                  <option value="MacBook Air (M2/M3)">MacBook Air (M2/M3)</option>
                  <option value="iPad Pro (M4)">iPad Pro (M4)</option>
                  <option value="Apple Watch Ultra 2">Apple Watch Ultra 2</option>
                  <option value="AirPods Pro (2nd gen)">AirPods Pro (2nd gen)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1.5">
                  Type of Service Needed
                </label>
                <select
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="Screen & Glass Damage">Screen & Glass Damage</option>
                  <option value="Battery Health & Power">Battery Health & Power</option>
                  <option value="Camera or Audio Malfunction">Camera or Audio Malfunction</option>
                  <option value="Hardware Logic Board Diagnostic">Hardware Logic Board Diagnostic</option>
                  <option value="Setup, Migration & Data Transfer">Setup, Migration & Data Transfer</option>
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-2">
                Select Date
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {dates.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedDate === d
                        ? 'bg-[#0071e3] text-white shadow-sm'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-2">
                Available Times for {selectedDate}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                      selectedTime === time
                        ? 'border-2 border-[#0071e3] bg-blue-50 text-[#0071e3] font-semibold'
                        : 'border border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Mobile Phone (for SMS notifications)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Device Serial Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. F17K9034QP9"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono uppercase text-zinc-900 focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="text-xs text-red-600">{errorMsg}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Genius Bar Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
