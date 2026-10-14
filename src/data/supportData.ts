import {
  DeviceInfo,
  SupportArticle,
  StoreLocation,
  CoverageResult,
  SubscriptionItem,
  CommunityPost
} from '../types/index.ts';

export const DEVICES: DeviceInfo[] = [
  {
    id: 'iphone',
    name: 'iPhone',
    tagline: 'iPhone 16 Pro, 16, 15, and earlier models',
    iconName: 'Smartphone',
    currentOS: 'iOS 18.2',
    popularIssues: [
      'Forgot passcode or device is disabled',
      'Battery health and unexpected shutdowns',
      'Cracked screen or back glass repair',
      'Transfer data to a new iPhone or eSIM setup'
    ],
    batteryReplacementCost: 99,
    screenReplacementCost: 329,
    tradeInUpTo: 650
  },
  {
    id: 'mac',
    name: 'Mac',
    tagline: 'MacBook Pro, MacBook Air, iMac, Mac Studio & mini',
    iconName: 'Laptop',
    currentOS: 'macOS Sequoia 15.3',
    popularIssues: [
      'Mac will not turn on or start up',
      'Battery replacement and power adapter troubleshooting',
      'Reinstall macOS using macOS Recovery',
      'Liquid damage assessment and hardware repair'
    ],
    batteryReplacementCost: 249,
    screenReplacementCost: 599,
    tradeInUpTo: 1100
  },
  {
    id: 'ipad',
    name: 'iPad',
    tagline: 'iPad Pro (M4), iPad Air (M2), iPad, and mini',
    iconName: 'Tablet',
    currentOS: 'iPadOS 18.2',
    popularIssues: [
      'iPad touch screen not responding',
      'Apple Pencil not connecting or charging',
      'Forgot iPad passcode',
      'Battery draining faster than expected'
    ],
    batteryReplacementCost: 119,
    screenReplacementCost: 399,
    tradeInUpTo: 580
  },
  {
    id: 'watch',
    name: 'Watch',
    tagline: 'Apple Watch Ultra 2, Series 10, SE',
    iconName: 'Watch',
    currentOS: 'watchOS 11.2',
    popularIssues: [
      'Unpair and erase Apple Watch',
      'Heart rate sensor or ECG not recording',
      'Battery life optimization and low power mode',
      'Screen scratch or broken crystal repair'
    ],
    batteryReplacementCost: 99,
    screenReplacementCost: 299,
    tradeInUpTo: 360
  },
  {
    id: 'airpods',
    name: 'AirPods',
    tagline: 'AirPods Pro 2, AirPods 4, AirPods Max',
    iconName: 'Headphones',
    currentOS: 'Firmware 7B19',
    popularIssues: [
      'One AirPod is quiet or not playing audio',
      'Active Noise Cancellation or Transparency issues',
      'Charging case not holding charge',
      'Find My AirPods showing offline'
    ],
    batteryReplacementCost: 49,
    screenReplacementCost: 0,
    tradeInUpTo: 90
  },
  {
    id: 'vision-pro',
    name: 'Vision Pro',
    tagline: 'Spatial computing and visionOS',
    iconName: 'Glasses',
    currentOS: 'visionOS 2.2',
    popularIssues: [
      'ZEISS Optical Inserts pairing and calibration',
      'Fit and light seal adjustment guide',
      'Audio Strap or battery pack troubleshooting',
      'Guest user setup and eye tracking recalibration'
    ],
    batteryReplacementCost: 199,
    screenReplacementCost: 799,
    tradeInUpTo: 1400
  },
  {
    id: 'tv-home',
    name: 'TV & Home',
    tagline: 'Apple TV 4K, HomePod, and HomePod mini',
    iconName: 'Tv',
    currentOS: 'tvOS 18.2',
    popularIssues: [
      'Siri Remote not responding or pairing',
      'HomePod audio dropping or Wi-Fi configuration',
      'Apple TV 4K 4K HDR and Dolby Vision setup',
      'Reset Apple TV to factory settings'
    ],
    batteryReplacementCost: 39,
    screenReplacementCost: 0,
    tradeInUpTo: 80
  },
  {
    id: 'services',
    name: 'iCloud & Services',
    tagline: 'Apple Account, iCloud+, Apple Pay, App Store',
    iconName: 'Cloud',
    currentOS: 'Cloud Services',
    popularIssues: [
      'Reset Apple Account password',
      'Manage iCloud storage and backup alerts',
      'Cancel subscription or request App Store refund',
      'Two-factor authentication code not received'
    ],
    batteryReplacementCost: 0,
    screenReplacementCost: 0,
    tradeInUpTo: 0
  }
];

export const POPULAR_SEARCH_TOPICS = [
  'Forgot Apple Account password',
  'Cancel a subscription',
  'iPhone battery drain & replacement',
  'Trade in an old Apple device',
  'Transfer data to new iPhone with eSIM',
  'Mac won\'t start up or black screen',
  'Check AppleCare warranty coverage',
  'Clean AirPods or fix quiet audio'
];

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: 'art-apple-id-reset',
    title: 'If you forgot your Apple Account password',
    category: 'services',
    summary: 'Learn how to reset your Apple Account password and regain access to your account on iPhone, iPad, Mac, or the web.',
    readTime: '3 min read',
    updatedDate: 'October 2026',
    views: '1.4M views',
    sections: [
      {
        heading: 'Reset your password on an iPhone or iPad',
        content: [
          'Go to Settings > [Your Name] > Sign-In & Security.',
          'Tap Change Password.',
          'Enter your device passcode, then type a new password and confirm it.',
          'Tap Change or Change Password in the upper-right corner.'
        ],
        callout: 'If you are signed into iCloud and have a device passcode enabled, you can reset your password immediately without receiving an email.'
      },
      {
        heading: 'Reset your password on a Mac',
        content: [
          'Choose Apple menu > System Settings, then click your name at the top of the sidebar.',
          'Click Sign-In & Security, then click Change Password.',
          'Enter the password you use to unlock your Mac, then follow the onscreen instructions to enter a new password.'
        ]
      },
      {
        heading: 'If you do not have a trusted device',
        content: [
          'Visit iforgot.apple.com in any web browser.',
          'Enter your email address or phone number associated with your Apple Account.',
          'If requested, enter the phone number you use with your account, then follow instructions to send a recovery prompt.'
        ]
      }
    ]
  },
  {
    id: 'art-battery-health',
    title: 'iPhone Battery and Performance Guide',
    category: 'iphone',
    summary: 'Understand your iPhone battery health, maximum capacity, performance management, and when replacement is recommended.',
    readTime: '4 min read',
    updatedDate: 'September 2026',
    views: '2.1M views',
    sections: [
      {
        heading: 'Checking Battery Health',
        content: [
          'Open Settings > Battery > Battery Health & Charging.',
          'Review your Maximum Capacity percentage. A normal battery retains up to 80% of its original capacity at 500 complete charge cycles under normal conditions (or 1,000 cycles for iPhone 15 and iPhone 16 series).',
          'If the capacity drops below 80% or an "Important Battery Message" is displayed, service is recommended.'
        ],
        callout: 'AppleCare+ covers battery replacement at no extra charge if your device\'s battery holds less than 80% of its original capacity.'
      },
      {
        heading: 'Tips to Maximize Battery Life',
        content: [
          'Keep your device updated with the latest version of iOS.',
          'Enable "Optimized Battery Charging" or "80% Limit" to slow battery aging.',
          'Avoid extreme ambient temperatures higher than 95° F (35° C).',
          'Turn on Auto-Brightness or dim your screen when possible.'
        ]
      }
    ]
  },
  {
    id: 'art-cancel-sub',
    title: 'How to cancel a subscription from Apple',
    category: 'services',
    summary: 'Step-by-step instructions for canceling Apple Music, iCloud+, Apple TV+, or third-party app subscriptions.',
    readTime: '2 min read',
    updatedDate: 'October 2026',
    views: '980K views',
    sections: [
      {
        heading: 'Cancel on iPhone or iPad',
        content: [
          'Open the Settings app on your device.',
          'Tap your name at the top of the screen.',
          'Tap Subscriptions.',
          'Tap the subscription that you want to manage.',
          'Tap Cancel Subscription. If you don\'t see Cancel, the subscription is already canceled and won\'t renew.'
        ]
      },
      {
        heading: 'Cancel on Mac',
        content: [
          'Open the App Store app.',
          'Click your name or the sign-in button at the bottom of the sidebar.',
          'Click Account Settings at the top of the window.',
          'Scroll down to the Manage section, then click Manage next to Subscriptions.',
          'Click Edit next to the subscription, then click Cancel Subscription.'
        ]
      }
    ]
  },
  {
    id: 'art-mac-startup',
    title: 'If your Mac doesn\'t turn on or start up',
    category: 'mac',
    summary: 'Resolve power, blank screen, flashing question mark, and boot issues on Apple Silicon and Intel-based Mac computers.',
    readTime: '5 min read',
    updatedDate: 'August 2026',
    views: '740K views',
    sections: [
      {
        heading: 'Step 1: Check Power and Connections',
        content: [
          'Press and hold the power button for about 10 seconds, then release.',
          'Ensure your MagSafe or USB-C power cable is securely connected to a working wall outlet.',
          'Check that the MagSafe indicator light glows amber or green.',
          'Unplug all accessories (external hard drives, displays, USB hubs) and try starting up again.'
        ]
      },
      {
        heading: 'Step 2: Startup on Apple Silicon (M1, M2, M3, M4)',
        content: [
          'Press and hold the power button on your Mac until you see "Loading startup options".',
          'Click Options, then click Continue to launch macOS Recovery.',
          'Use Disk Utility to run First Aid on your internal Macintosh HD.'
        ],
        callout: 'If your Mac shows a black screen and chime does not sound, schedule a diagnostic check at your local Apple Store Genius Bar.'
      }
    ]
  },
  {
    id: 'art-airpods-audio',
    title: 'If Active Noise Cancellation isn\'t working as expected on your AirPods Pro',
    category: 'airpods',
    summary: 'Fix crackling, degraded noise cancellation, or muffled transparency mode on AirPods Pro.',
    readTime: '3 min read',
    updatedDate: 'July 2026',
    views: '510K views',
    sections: [
      {
        heading: 'Inspect the mesh and microphone grilles',
        content: [
          'Clean the black mesh on the outside of your AirPods Pro using a dry, clean cotton swab.',
          'Debris or earwax can block the inward and outward microphones, causing bass reduction or ANC loss.',
          'Ensure the firmware is up to date by connecting your AirPods to power while your iPhone is nearby.'
        ]
      },
      {
        heading: 'Ear Tip Fit Test',
        content: [
          'Go to Settings > Bluetooth > tap the Info (i) button next to your AirPods Pro.',
          'Tap Ear Tip Fit Test and tap Continue.',
          'If the test suggests adjusting or trying a different ear tip size (XS, S, M, L), switch tips for a snug acoustic seal.'
        ]
      }
    ]
  }
];

export const SAMPLE_SERIAL_NUMBERS: Record<string, CoverageResult> = {
  'F17K9034QP9': {
    serialNumber: 'F17K9034QP9',
    deviceName: 'iPhone 16 Pro Max 256GB - Natural Titanium',
    modelNumber: 'A3296',
    purchaseDate: 'September 20, 2024',
    hasAppleCare: true,
    planName: 'AppleCare+ with Theft and Loss',
    expirationDate: 'September 20, 2026',
    daysRemaining: 706,
    telephoneSupport: 'Active',
    repairsCoverage: 'Active',
    accidentalDamageCoverage: true,
    theftAndLoss: true,
    batteryHealthCovered: true,
    incidentFee: '$29 screen damage / $99 other accidental'
  },
  'C02G8013MD6': {
    serialNumber: 'C02G8013MD6',
    deviceName: 'MacBook Pro 16" (M3 Max, 36GB, 1TB) - Space Black',
    modelNumber: 'A2991',
    purchaseDate: 'November 14, 2024',
    hasAppleCare: true,
    planName: 'AppleCare+ for Mac (Annual Plan)',
    expirationDate: 'November 14, 2026',
    daysRemaining: 761,
    telephoneSupport: 'Active',
    repairsCoverage: 'Active',
    accidentalDamageCoverage: true,
    theftAndLoss: false,
    batteryHealthCovered: true,
    incidentFee: '$99 screen or enclosure / $299 other accidental'
  },
  'H93W2098LK1': {
    serialNumber: 'H93W2098LK1',
    deviceName: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium)',
    modelNumber: 'A2986',
    purchaseDate: 'October 12, 2023',
    hasAppleCare: false,
    planName: 'Apple Limited Warranty (Expired)',
    expirationDate: 'October 12, 2024',
    daysRemaining: 0,
    telephoneSupport: 'Expired',
    repairsCoverage: 'Expired',
    accidentalDamageCoverage: false,
    theftAndLoss: false,
    batteryHealthCovered: false,
    incidentFee: 'Standard out-of-warranty rates apply'
  }
};

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-5th-ave',
    name: 'Apple Fifth Avenue',
    city: 'New York, NY',
    address: '767 Fifth Avenue, New York, NY 10153',
    distance: '0.8 miles away',
    hours: 'Open 24 hours daily',
    nextSlotToday: 'Today at 3:40 PM'
  },
  {
    id: 'store-grand-central',
    name: 'Apple Grand Central',
    city: 'New York, NY',
    address: '45 Grand Central Terminal, New York, NY 10017',
    distance: '1.2 miles away',
    hours: 'Mon-Fri 8:00 AM - 8:00 PM',
    nextSlotToday: 'Today at 4:15 PM'
  },
  {
    id: 'store-soho',
    name: 'Apple SoHo',
    city: 'New York, NY',
    address: '103 Prince Street, New York, NY 10012',
    distance: '2.5 miles away',
    hours: 'Mon-Sat 10:00 AM - 8:00 PM, Sun 11:00 AM - 6:00 PM',
    nextSlotToday: 'Tomorrow at 10:30 AM'
  },
  {
    id: 'store-union-square',
    name: 'Apple Union Square',
    city: 'San Francisco, CA',
    address: '300 Post Street, San Francisco, CA 94108',
    distance: 'Flagship store',
    hours: 'Mon-Sat 10:00 AM - 8:00 PM, Sun 11:00 AM - 6:00 PM',
    nextSlotToday: 'Today at 2:20 PM'
  },
  {
    id: 'store-michigan-ave',
    name: 'Apple Michigan Avenue',
    city: 'Chicago, IL',
    address: '401 N Michigan Ave, Chicago, IL 60611',
    distance: 'Downtown Chicago',
    hours: 'Mon-Sat 10:00 AM - 8:00 PM, Sun 11:00 AM - 7:00 PM',
    nextSlotToday: 'Today at 5:00 PM'
  },
  {
    id: 'store-regent-st',
    name: 'Apple Regent Street',
    city: 'London, UK',
    address: '235 Regent St., London W1B 2EL',
    distance: 'Central London',
    hours: 'Mon-Sat 10:00 AM - 8:00 PM, Sun 12:00 PM - 6:00 PM',
    nextSlotToday: 'Today at 4:30 PM'
  }
];

export const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: 'sub-icloud',
    name: 'iCloud+ with 2TB Storage',
    plan: 'Family Sharing enabled',
    price: '$9.99/month',
    renewsOn: 'November 18, 2026',
    iconBg: 'bg-blue-500',
    active: true
  },
  {
    id: 'sub-music',
    name: 'Apple Music',
    plan: 'Individual plan (Lossless & Spatial Audio)',
    price: '$10.99/month',
    renewsOn: 'November 24, 2026',
    iconBg: 'bg-red-500',
    active: true
  },
  {
    id: 'sub-tv',
    name: 'Apple TV+',
    plan: 'Monthly Subscription',
    price: '$9.99/month',
    renewsOn: 'December 02, 2026',
    iconBg: 'bg-zinc-800',
    active: true
  },
  {
    id: 'sub-arcade',
    name: 'Apple Arcade',
    plan: '200+ ad-free games',
    price: '$6.99/month',
    renewsOn: 'November 15, 2026',
    iconBg: 'bg-orange-500',
    active: true
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'comm-1',
    title: 'iPhone battery percentage dropping suddenly from 30% to 10%',
    author: 'TechTraveller88',
    avatar: 'TT',
    date: '2 days ago',
    product: 'iphone',
    repliesCount: 38,
    meTooCount: 142,
    question: 'My iPhone 15 Pro has started shutting down or suddenly jumping from 32% down to 11% when taking 4K video outdoors in cool weather. Battery health shows 89%. Is this normal voltage sag or should I book Genius Bar service?',
    recommendedAnswer: {
      specialistName: 'Marcus_AppleExpert',
      badge: 'Community Specialist',
      date: '1 day ago',
      answerText: 'Hi TechTraveller88, when recording 4K ProRES or high-bitrate video, the A17/A18 chip draws peak power. In colder temperatures, lithium-ion battery internal impedance temporarily rises, causing sudden voltage drops. However, dropping directly from 30% to 10% can also indicate an uneven chemical aging cell. We recommend running an Apple Remote Diagnostic via Apple Support or scheduling an in-store battery capacity test.',
      helpfulCount: 89
    }
  },
  {
    id: 'comm-2',
    title: 'External monitor flickers intermittently on MacBook Pro M3 via USB-C',
    author: 'StudioVisuals',
    avatar: 'SV',
    date: '3 days ago',
    product: 'mac',
    repliesCount: 24,
    meTooCount: 85,
    question: 'Connected to a 4K 144Hz display via Thunderbolt cable. Every 20-30 minutes the display flashes black for one second. Have updated to macOS 15.3 and reset display refresh rate to 60Hz.',
    recommendedAnswer: {
      specialistName: 'Elena_macOS_Advisor',
      badge: 'Apple Recommended Answer',
      date: '2 days ago',
      answerText: 'This behavior is commonly traced to DisplayPort handshake renegotiation or cable bandwidth saturation. Ensure your cable is certified Thunderbolt 4 / USB4 (40Gbps) and test disabling "True Tone" and HDR on the external display in System Settings > Displays > Advanced. Also test connecting to the opposite side Thunderbolt port to eliminate bus contention.',
      helpfulCount: 57
    }
  },
  {
    id: 'comm-3',
    title: 'How to clean AirPods Pro ear tips without damaging the acoustic mesh',
    author: 'AudiophileSam',
    avatar: 'AS',
    date: '5 days ago',
    product: 'airpods',
    repliesCount: 19,
    meTooCount: 64,
    question: 'What is the approved procedure for cleaning the silicone tips and speaker mesh on AirPods Pro (2nd Generation)? Can I use 70% isopropyl alcohol?',
    recommendedAnswer: {
      specialistName: 'Nathan_SupportSpecialist',
      badge: 'Apple Recommended Answer',
      date: '4 days ago',
      answerText: 'You can pull the silicone ear tips off the AirPods and rinse them with fresh water (do not use soap or cleaning agents on the silicone). Dry thoroughly with a soft lint-free cloth before reattaching. For the speaker mesh itself: NEVER use liquids or alcohol wipes directly on the mesh. Use a clean, dry, soft-bristled brush or dry cotton swab to gently sweep debris away.',
      helpfulCount: 112
    }
  }
];
