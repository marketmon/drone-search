export interface TeamMember {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  experience: string;
  credentials: string[];
  photo?: string;
  bio: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  ndaaCompliant: boolean;
  certifications: string[];
  location: string;
  website?: string;
  squareFootage?: string;
  email?: string;
  phone?: string;
  capabilities?: string[];
  teamMembers?: TeamMember[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  companyId: string;
  systemId: string;
  subsystemId?: string;
  specifications: Record<string, string>;
  images: string[];
  availability: 'In Stock' | 'Pre-Order' | 'Out of Stock';
  leadTime: string;
  ndaaCompliant: boolean;
  applications?: string[];
  dimensions?: string;
  datasheetUrl?: string;
  cadModelUrl?: string;
  optionSheetUrl?: string;
  userManualUrl?: string;
}

export interface Subsystem {
  id: string;
  name: string;
  description: string;
  systemId: string;
}

export interface UnmannedSystem {
  id: string;
  name: string;
  description: string;
  icon: string;
  domain: 'aerial' | 'marine';
  vehicleType?: string;
}

export interface DroneSystem extends UnmannedSystem {
  domain: 'aerial';
}

export interface MarineSystem extends UnmannedSystem {
  domain: 'marine';
  vehicleCategory: 'surface' | 'undersea';
  hullLengthRange?: {
    min: number;
    max: number;
    unit: 'meters' | 'feet';
  };
}

export const companies: Company[] = [
  {
    id: "aerovironment",
    name: "AeroVironment Inc.",
    description: "Leading US defense contractor specializing in enterprise-scale UAS systems and components at volume",
    ndaaCompliant: true,
    certifications: ["ISO 9001", "AS9100", "CMMC Level 3", "ITAR", "US Final Assembly"],
    location: "California, USA",
    website: "https://aerovironment.com"
  },
  {
    id: "formosa-aerospace",
    name: "Formosa Aerospace Technologies",
    description: "Taiwan-based precision manufacturer transitioning carbon fiber and metal components to US production",
    ndaaCompliant: false,
    certifications: ["ISO 9001", "AS9100", "Taiwan Excellence", "US Transition Program"],
    location: "Taichung, Taiwan → Michigan, USA",
    website: "https://formosa-aerospace.com.tw"
  },
  {
    id: "pacific-drone-systems",
    name: "Pacific Drone Systems",
    description: "Leading Taiwanese flight controller and electronics manufacturer establishing US operations",
    ndaaCompliant: false,
    certifications: ["ISO 9001", "IPC-A-610", "Taiwan Excellence", "US Partnership Program"],
    location: "Hsinchu, Taiwan → Texas, USA",
    website: "https://pacific-drone.com.tw"
  },
  {
    id: "thunder-tiger-industrial",
    name: "Thunder Tiger Industrial",
    description: "40+ year Taiwanese manufacturer of precision drone components expanding to US facilities",
    ndaaCompliant: false,
    certifications: ["ISO 9001", "AS9100", "CE Mark", "US Transition Phase 2"],
    location: "Taipei, Taiwan → North Carolina, USA",
    website: "https://thundertiger.com.tw"
  },
  {
    id: "advanced-drone-systems",
    name: "Advanced Drone Systems",
    description: "Enterprise drone component manufacturing and integration for defense and commercial applications",
    ndaaCompliant: true,
    certifications: ["ISO 9001", "CMMC Level 2", "US Final Assembly", "AS9100"],
    location: "Colorado, USA",
    website: "https://advanceddroneystems.com"
  },
  {
    id: "tactical-aviation-systems",
    name: "Tactical Aviation Systems",
    description: "NDAA-compliant integration of communication and RF systems for large-scale drone deployments",
    ndaaCompliant: true,
    certifications: ["ISO 27001", "CMMC Level 3", "FCC Licensed", "ITAR"],
    location: "Texas, USA",
    website: "https://tacticalaviationsystems.com"
  },
  {
    id: "defense-drone-solutions",
    name: "Defense Drone Solutions",
    description: "Volume supplier of enterprise drone components with established government contract vehicles",
    ndaaCompliant: true,
    certifications: ["ISO 9001", "ITAR", "US Final Assembly", "GSA Schedule"],
    location: "Virginia, USA",
    website: "https://defensedronsolutions.com"
  },
  {
    id: "precision-flight-systems",
    name: "Precision Flight Systems",
    description: "US-based flight control and navigation systems for enterprise and government drone programs",
    ndaaCompliant: true,
    certifications: ["Open Source Verified", "CMMC Level 2", "US Final Assembly", "ISO 9001"],
    location: "Massachusetts, USA",
    website: "https://precisionflightsystems.com"
  },
  {
    id: "secure-propulsion-tech",
    name: "Secure Propulsion Technologies",
    description: "Advanced motor and ESC systems designed for high-volume enterprise drone deployments",
    ndaaCompliant: true,
    certifications: ["ISO 9001", "CMMC Level 2", "ITAR", "AS9100"],
    location: "Michigan, USA",
    website: "https://securepropulsiontech.com"
  },
  {
    id: "patriot-imaging-systems",
    name: "Patriot Imaging Systems",
    description: "Professional-grade imaging and communication systems for enterprise drone operations",
    ndaaCompliant: true,
    certifications: ["FCC Licensed", "CMMC Level 3", "US Final Assembly", "ITAR"],
    location: "California, USA",
    website: "https://patriotimagingsystems.com"
  },
  {
    id: "liberty-power-solutions",
    name: "Liberty Power Solutions",
    description: "Enterprise battery and power management systems for large-scale drone fleet operations",
    ndaaCompliant: true,
    certifications: ["UL Listed", "ISO 9001", "US Final Assembly", "CMMC Level 2"],
    location: "North Carolina, USA",
    website: "https://libertypowersolutions.com"
  },
  {
    id: "apex-propulsion-dynamics",
    name: "Apex Propulsion Dynamics",
    description: "Leading manufacturer of high-performance propulsion systems for enterprise and defense drone applications. Specializing in advanced motor technology, intelligent ESCs, and precision propellers for mission-critical operations.",
    logo: "/images/companies/apex-propulsion-logo.png",
    ndaaCompliant: true,
    certifications: ["AS9100", "ISO 9001", "ITAR", "CMMC Level 3", "FAA TSO", "MIL-STD-810H"],
    location: "Phoenix, Arizona, USA",
    website: "https://apexpropulsiondynamics.com",
    squareFootage: "285,000 sq ft (Manufacturing: 180,000 sq ft, R&D: 45,000 sq ft, Administration: 60,000 sq ft)",
    email: "sales@apexpropulsiondynamics.com",
    phone: "+1 (602) 555-0147",
    capabilities: [
      "High-volume brushless motor manufacturing (50,000 units/month)",
      "Advanced ESC design and production (25,000 units/month)",
      "Precision carbon fiber propeller manufacturing (100,000 units/month)",
      "Automated testing and quality assurance systems",
      "Custom propulsion system integration and optimization",
      "24/7 technical support and field service",
      "Rapid prototyping and design validation services",
      "Supply chain management and component sourcing"
    ]
  },
  {
    id: "voltaic-marine-systems",
    name: "Voltaic Marine Systems",
    description: "Specialized manufacturer of advanced battery systems for both marine and aerial unmanned platforms. Leading innovation in hybrid maritime-aviation power solutions with proven reliability across dual-environment operations.",
    logo: "/images/companies/voltaic-logo.png",
    ndaaCompliant: true,
    certifications: ["ISO 9001", "AS9100", "ITAR", "UL 2089", "IEC 62133", "CMMC Level 2", "Marine Equipment Directive (MED)"],
    location: "San Diego, California, USA",
    website: "https://voltaicmarinesystems.com",
    squareFootage: "180,000 sq ft (Battery Assembly: 85,000 sq ft, Testing: 35,000 sq ft, R&D: 40,000 sq ft, Administration: 20,000 sq ft)",
    email: "info@voltaicmarinesystems.com",
    phone: "+1 (619) 555-0892",
    capabilities: [
      "Multi-environment battery system design and manufacturing",
      "Waterproof battery enclosures rated to IP68",
      "Advanced Battery Management Systems (BMS) with dual-mode operation",
      "Lithium-ion cell manufacturing and testing (15,000 cells/day)",
      "Environmental testing chamber for marine/aerial conditions",
      "Custom charging infrastructure for fleet operations",
      "Rapid deployment field service and maintenance",
      "Hybrid power system integration services"
    ],
    teamMembers: [
      {
        id: "dr-sarah-chen",
        name: "Dr. Sarah Chen",
        title: "Chief Technology Officer & VP Manufacturing",
        expertise: ["Battery Chemistry", "Marine Power Systems", "Aerospace Engineering", "Manufacturing Process Optimization"],
        experience: "15+ years leading battery technology development for dual-environment applications",
        credentials: [
          "Ph.D. Electrochemical Engineering, MIT",
          "Former Senior Battery Engineer, Tesla Marine Division",
          "12 patents in marine-grade battery technology",
          "IEEE Fellow in Energy Storage Systems",
          "Published 45+ peer-reviewed papers on battery systems"
        ],
        photo: "https://picsum.photos/300/400?random=50",
        bio: "Dr. Chen pioneered the development of corrosion-resistant battery systems that operate seamlessly between aerial and marine environments. Her breakthrough work on dual-chemistry battery packs has set new industry standards for unmanned systems operating in harsh maritime conditions. Under her leadership, Voltaic has achieved a 99.7% reliability rate across 2M+ operating hours in marine environments."
      }
    ]
  },
  {
    id: "razor-dynamics-fpv",
    name: "Razor Dynamics FPV",
    description: "Premier manufacturer of high-performance brushless motors specifically engineered for FPV racing and tactical drone applications. Delivering cutting-edge propulsion technology for competitive racing circuits and precision flight operations.",
    logo: "/images/companies/razor-fpv-logo.png",
    ndaaCompliant: true,
    certifications: ["ISO 9001", "AS9100", "ITAR", "CMMC Level 2", "FCC Part 15", "CE Marking"],
    location: "Austin, Texas, USA",
    website: "https://razordynamicsfpv.com",
    squareFootage: "125,000 sq ft (Motor Assembly: 65,000 sq ft, Testing: 25,000 sq ft, R&D: 20,000 sq ft, Administration: 15,000 sq ft)",
    email: "racing@razordynamicsfpv.com",
    phone: "+1 (512) 555-0734",
    capabilities: [
      "Ultra-lightweight racing motor design and production (8,000 units/month)",
      "High-KV motor optimization for FPV applications",
      "Precision-balanced rotor assemblies for minimal vibration",
      "Custom motor winding configurations",
      "Advanced magnetic simulation and testing",
      "Racing team sponsorship and technical support",
      "Real-time performance telemetry integration",
      "Rapid prototyping for competitive racing development"
    ],
    teamMembers: [
      {
        id: "marcus-rodriguez",
        name: "Marcus Rodriguez",
        title: "Lead Manufacturing Engineer & Head of Racing Division",
        expertise: ["Brushless Motor Design", "FPV Racing Technology", "Precision Manufacturing", "Performance Optimization"],
        experience: "12+ years specializing in high-performance FPV motor development and racing applications",
        credentials: [
          "M.S. Electrical Engineering, University of Texas at Austin",
          "Former Lead Engineer, Team BlackSheep Racing",
          "3-time MultiGP National Champion (2019-2021)",
          "8 patents in brushless motor optimization",
          "Certified Level 3 FAI F3U Judge"
        ],
        photo: "https://picsum.photos/300/400?random=2",
        bio: "Marcus combines world-class racing experience with manufacturing expertise to create motors that consistently dominate competitive circuits. His deep understanding of racing dynamics, gained from years of professional competition, drives innovations that have resulted in 47 national racing victories using Razor motors. His team has achieved sub-0.1g motor balance tolerances, setting new industry benchmarks for racing performance."
      }
    ]
  }
];

export const unmannedSystems: (DroneSystem | MarineSystem)[] = [
  // Aerial Systems
  {
    id: "flight-controller",
    name: "Flight Controller Systems",
    description: "Enterprise-grade processors, navigation sensors, and flight management firmware",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "frame",
    name: "Airframe & Structure",
    description: "Industrial carbon fiber frames, mounting systems, and protective housings",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "propulsion",
    name: "Propulsion Systems",
    description: "High-performance motors, speed controllers, and propeller assemblies",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "imaging-comms",
    name: "Imaging & Communications",
    description: "Professional cameras, video transmitters, and secure communication systems",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "control-systems",
    name: "Control & Telemetry",
    description: "Long-range control links, telemetry systems, and command protocols",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "power-systems",
    name: "Power & Energy",
    description: "Enterprise battery systems, power management, and charging infrastructure",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "navigation-sensors",
    name: "Navigation & Sensors",
    description: "Precision GPS, advanced sensors, and mission-critical navigation systems",
    icon: "",
    domain: "aerial",
    vehicleType: "Multi-rotor"
  },
  {
    id: "fpv-systems",
    name: "FPV Systems",
    description: "First-person view systems for racing and tactical applications",
    icon: "",
    domain: "aerial",
    vehicleType: "FPV"
  },
  {
    id: "fixed-wing-systems",
    name: "Fixed Wing Systems",
    description: "Long-range surveillance and mapping aircraft components",
    icon: "",
    domain: "aerial",
    vehicleType: "Fixed Wing"
  },
  {
    id: "vtol-systems",
    name: "VTOL Systems",
    description: "Vertical takeoff and landing hybrid aircraft systems",
    icon: "",
    domain: "aerial",
    vehicleType: "VTOL"
  },

  // Marine Surface Systems
  {
    id: "surface-propulsion",
    name: "Surface Propulsion",
    description: "Electric and hybrid propulsion systems for surface vessels",
    icon: "",
    domain: "marine",
    vehicleCategory: "surface",
    vehicleType: "USV",
    hullLengthRange: { min: 1, max: 50, unit: "meters" }
  },
  {
    id: "surface-navigation",
    name: "Surface Navigation",
    description: "Maritime navigation and positioning systems",
    icon: "",
    domain: "marine",
    vehicleCategory: "surface",
    vehicleType: "USV",
    hullLengthRange: { min: 1, max: 50, unit: "meters" }
  },
  {
    id: "surface-communication",
    name: "Surface Communications",
    description: "Maritime radio, satellite, and mesh networking systems",
    icon: "",
    domain: "marine",
    vehicleCategory: "surface",
    vehicleType: "USV",
    hullLengthRange: { min: 1, max: 50, unit: "meters" }
  },
  {
    id: "surface-hull-structure",
    name: "Hull & Structure",
    description: "Composite hulls, deck structures, and mounting systems",
    icon: "",
    domain: "marine",
    vehicleCategory: "surface",
    vehicleType: "USV",
    hullLengthRange: { min: 1, max: 50, unit: "meters" }
  },

  // Marine Undersea Systems
  {
    id: "undersea-propulsion",
    name: "Undersea Propulsion",
    description: "Thruster systems and underwater propulsion technology",
    icon: "",
    domain: "marine",
    vehicleCategory: "undersea",
    vehicleType: "UUV",
    hullLengthRange: { min: 0.5, max: 30, unit: "meters" }
  },
  {
    id: "undersea-navigation",
    name: "Undersea Navigation",
    description: "Inertial navigation, acoustic positioning, and depth sensors",
    icon: "",
    domain: "marine",
    vehicleCategory: "undersea",
    vehicleType: "UUV",
    hullLengthRange: { min: 0.5, max: 30, unit: "meters" }
  },
  {
    id: "undersea-communication",
    name: "Undersea Communications",
    description: "Acoustic modems, through-water communication systems",
    icon: "",
    domain: "marine",
    vehicleCategory: "undersea",
    vehicleType: "UUV",
    hullLengthRange: { min: 0.5, max: 30, unit: "meters" }
  },
  {
    id: "pressure-hull",
    name: "Pressure Hull Systems",
    description: "Pressure-resistant hulls and watertight enclosures",
    icon: "",
    domain: "marine",
    vehicleCategory: "undersea",
    vehicleType: "UUV",
    hullLengthRange: { min: 0.5, max: 30, unit: "meters" }
  }
];

export const droneSystems: DroneSystem[] = unmannedSystems.filter(system => system.domain === 'aerial') as DroneSystem[];
export const marineSystems: MarineSystem[] = unmannedSystems.filter(system => system.domain === 'marine') as MarineSystem[];

export const subsystems: Subsystem[] = [
  // Flight Controller System subsystems
  {
    id: "mcu-processors",
    name: "MCU Processors",
    description: "ARM Cortex-M series processors (STM32F4/F7/H7)",
    systemId: "flight-controller"
  },
  {
    id: "imu-sensors",
    name: "IMU Sensors",
    description: "Accelerometers, gyroscopes, magnetometers, barometers",
    systemId: "flight-controller"
  },
  {
    id: "firmware-software",
    name: "Firmware & Software",
    description: "Betaflight, KISS, EmuFlight, iNav, ArduPilot",
    systemId: "flight-controller"
  },
  {
    id: "io-interfaces",
    name: "I/O Interfaces",
    description: "UART, I2C, SPI ports, USB, ESC outputs",
    systemId: "flight-controller"
  },

  // Frame subsystems
  {
    id: "main-structure",
    name: "Main Structure",
    description: "Top/bottom plates, arms, carbon fiber components",
    systemId: "frame"
  },
  {
    id: "mounting-hardware",
    name: "Mounting Hardware",
    description: "M2/M3 screws, standoffs, shock-absorbing balls",
    systemId: "frame"
  },
  {
    id: "protective-parts",
    name: "Protective Parts",
    description: "Prop guards, camera mounts, antenna mounts, TPU prints",
    systemId: "frame"
  },

  // Propulsion subsystems
  {
    id: "bldc-motors",
    name: "BLDC Motors",
    description: "Brushless DC motors with stators, rotors, bearings",
    systemId: "propulsion"
  },
  {
    id: "escs",
    name: "Electronic Speed Controllers",
    description: "BLHeli_S/32, AM32, KISS ESCs with MOSFET bridges",
    systemId: "propulsion"
  },
  {
    id: "propellers",
    name: "Propellers",
    description: "PC plastic, nylon, carbon fiber props with various pitch",
    systemId: "propulsion"
  },
  {
    id: "power-distribution",
    name: "Power Distribution",
    description: "PDB boards, XT connectors, high-current wiring",
    systemId: "propulsion"
  },

  // Imaging & Communications subsystems
  {
    id: "video-transmitters",
    name: "Video Transmitters",
    description: "Professional-grade video transmission systems with encryption capabilities",
    systemId: "imaging-comms"
  },
  {
    id: "imaging-systems",
    name: "Imaging Systems",
    description: "High-resolution cameras, thermal imaging, and multi-spectral sensors",
    systemId: "imaging-comms"
  },
  {
    id: "communication-antennas",
    name: "Communication Antennas",
    description: "Directional and omnidirectional antennas for enterprise communications",
    systemId: "imaging-comms"
  },

  // Control & Telemetry subsystems
  {
    id: "control-links",
    name: "Control Links",
    description: "Long-range command and control communication systems",
    systemId: "control-systems"
  },
  {
    id: "telemetry-systems",
    name: "Telemetry Systems",
    description: "Real-time data transmission and mission monitoring systems",
    systemId: "control-systems"
  },

  // Power & Energy subsystems
  {
    id: "battery-systems",
    name: "Battery Systems",
    description: "Enterprise-grade lithium systems with advanced power management",
    systemId: "power-systems"
  },
  {
    id: "power-management",
    name: "Power Management",
    description: "Intelligent power distribution and monitoring systems",
    systemId: "power-systems"
  },
  {
    id: "charging-infrastructure",
    name: "Charging Infrastructure",
    description: "Automated charging systems and fleet power management",
    systemId: "power-systems"
  },

  // Navigation & Sensors subsystems
  {
    id: "gnss-systems",
    name: "GNSS Systems",
    description: "Precision navigation with multi-constellation support",
    systemId: "navigation-sensors"
  },
  {
    id: "sensor-packages",
    name: "Sensor Packages",
    description: "Advanced sensor suites for mission-critical operations",
    systemId: "navigation-sensors"
  },
  {
    id: "navigation-aids",
    name: "Navigation Aids",
    description: "Backup navigation and positioning systems",
    systemId: "navigation-sensors"
  },

  // Marine Surface System subsystems
  {
    id: "surface-thrusters",
    name: "Surface Thrusters",
    description: "Electric and hybrid propulsion units for surface vessels",
    systemId: "surface-propulsion"
  },
  {
    id: "surface-steering",
    name: "Steering Systems",
    description: "Rudder and vectored thrust steering mechanisms",
    systemId: "surface-propulsion"
  },
  {
    id: "marine-gps",
    name: "Marine GPS Systems",
    description: "GNSS navigation systems optimized for maritime operations",
    systemId: "surface-navigation"
  },
  {
    id: "marine-sensors",
    name: "Marine Sensors",
    description: "Sonar, radar, and environmental sensors for surface operations",
    systemId: "surface-navigation"
  },
  {
    id: "maritime-radio",
    name: "Maritime Radio Systems",
    description: "VHF, UHF, and satellite communication systems",
    systemId: "surface-communication"
  },
  {
    id: "mesh-networking",
    name: "Mesh Networking",
    description: "Inter-vessel communication and data sharing systems",
    systemId: "surface-communication"
  },
  {
    id: "hull-materials",
    name: "Hull Materials",
    description: "Composite materials and coatings for marine hulls",
    systemId: "surface-hull-structure"
  },
  {
    id: "deck-systems",
    name: "Deck Systems",
    description: "Deck structures, mounting points, and equipment housings",
    systemId: "surface-hull-structure"
  },

  // Marine Undersea System subsystems
  {
    id: "underwater-thrusters",
    name: "Underwater Thrusters",
    description: "Sealed propulsion systems for underwater operations",
    systemId: "undersea-propulsion"
  },
  {
    id: "ballast-systems",
    name: "Ballast Systems",
    description: "Depth control and buoyancy management systems",
    systemId: "undersea-propulsion"
  },
  {
    id: "inertial-navigation",
    name: "Inertial Navigation",
    description: "IMU and dead reckoning systems for underwater navigation",
    systemId: "undersea-navigation"
  },
  {
    id: "acoustic-positioning",
    name: "Acoustic Positioning",
    description: "USBL and LBL acoustic positioning systems",
    systemId: "undersea-navigation"
  },
  {
    id: "acoustic-modems",
    name: "Acoustic Modems",
    description: "Underwater acoustic communication systems",
    systemId: "undersea-communication"
  },
  {
    id: "through-water-comms",
    name: "Through-Water Communications",
    description: "Advanced underwater communication technologies",
    systemId: "undersea-communication"
  },
  {
    id: "pressure-vessels",
    name: "Pressure Vessels",
    description: "Pressure-resistant housings and sealed compartments",
    systemId: "pressure-hull"
  },
  {
    id: "sealing-systems",
    name: "Sealing Systems",
    description: "O-rings, gaskets, and watertight sealing solutions",
    systemId: "pressure-hull"
  }
];

export const products: Product[] = [
  // Flight Controller System products
  {
    id: "enterprise-flight-controller",
    name: "Enterprise Flight Controller EFC-7000",
    description: "Military-grade flight management system with redundant processors and enterprise firmware",
    price: "$1,850 (Qty 100+: $1,250)",
    companyId: "precision-flight-systems",
    systemId: "flight-controller",
    subsystemId: "mcu-processors",
    specifications: {
      "MCU": "STM32H743VIT6 (480MHz)",
      "IMU": "Dual ICM-42688-P + BMI270",
      "Flash": "256MB",
      "Interfaces": "12x UART, 8x PWM, CAN Bus",
      "Operating Temp": "-40°C to +85°C",
      "Certifications": "MIL-STD-810G",
      "Firmware": "Open Source Verified"
    },
    images: [],
    availability: "In Stock",
    leadTime: "3-4 weeks",
    ndaaCompliant: true
  },
  {
    id: "tactical-autopilot-system",
    name: "Tactical Autopilot System TAS-500",
    description: "Advanced flight control system designed for enterprise and government applications",
    price: "$2,200 (Qty 500+: $1,650)",
    companyId: "aerovironment",
    systemId: "flight-controller",
    subsystemId: "mcu-processors",
    specifications: {
      "MCU": "Dual ARM Cortex-M7",
      "IMU": "Triple redundant sensors",
      "MTBF": "50,000 hours",
      "Interfaces": "14x UART, CAN FD, Ethernet",
      "Encryption": "AES-256",
      "Weight": "85g",
      "Mount": "Standard NATO mounting"
    },
    images: [],
    availability: "In Stock",
    leadTime: "4-6 weeks",
    ndaaCompliant: true
  },

  // Propulsion System products
  {
    id: "industrial-esc-system",
    name: "Industrial ESC System IES-8000",
    description: "Enterprise-grade 8-motor speed controller with advanced telemetry and monitoring",
    price: "$950 (Qty 100+: $695)",
    companyId: "secure-propulsion-tech",
    systemId: "propulsion",
    subsystemId: "escs",
    specifications: {
      "Current": "80A continuous per channel",
      "Channels": "8 independent outputs",
      "Protocols": "DShot1200, CAN Bus, Ethernet",
      "Voltage": "6-12S LiPo",
      "Telemetry": "Full RPM, current, temperature",
      "Protection": "Overcurrent, thermal, short circuit",
      "Mount": "Standard rack mounting"
    },
    images: [],
    availability: "In Stock",
    leadTime: "2-3 weeks",
    ndaaCompliant: true
  },
  {
    id: "enterprise-motor-assembly",
    name: "Enterprise Motor Assembly EMA-2800",
    description: "Professional brushless motor system with integrated sensors and diagnostics",
    price: "$385 (Qty 1000+: $265)",
    companyId: "secure-propulsion-tech",
    systemId: "propulsion",
    subsystemId: "bldc-motors",
    specifications: {
      "KV": "2800 KV",
      "Configuration": "12N14P",
      "Max Power": "2.5kW",
      "Sensors": "Hall effect, temperature",
      "Magnets": "N52SH rare earth",
      "Bearings": "Ceramic hybrid",
      "MTBF": "5,000 flight hours"
    },
    images: [],
    availability: "In Stock",
    leadTime: "3-4 weeks",
    ndaaCompliant: true
  },
  {
    id: "professional-propeller-set",
    name: "Professional Propeller Set PPS-650",
    description: "Carbon fiber propeller assembly optimized for enterprise drone operations",
    price: "$165 (Set of 8, Qty 100+: $125)",
    companyId: "defense-drone-solutions",
    systemId: "propulsion",
    subsystemId: "propellers",
    specifications: {
      "Diameter": "16.5 inches",
      "Pitch": "5.5 inches",
      "Blades": "2-blade",
      "Material": "T700 Carbon Fiber",
      "Balance": "± 0.1g",
      "Thrust": "8.2kg @ 6000 RPM",
      "Hub": "Standard M8 threading"
    },
    images: [],
    availability: "In Stock",
    leadTime: "2-3 weeks",
    ndaaCompliant: true
  },

  // Imaging & Communications products
  {
    id: "professional-imaging-system",
    name: "Professional Imaging System PIS-4K",
    description: "Enterprise-grade imaging system with 4K recording and real-time streaming",
    price: "$3,200 (Qty 50+: $2,450)",
    companyId: "patriot-imaging-systems",
    systemId: "imaging-comms",
    subsystemId: "imaging-systems",
    specifications: {
      "Sensor": "1\" CMOS 20MP",
      "Video": "4K60p, H.265/H.264",
      "Latency": "< 40ms",
      "Zoom": "30x optical",
      "Gimbal": "3-axis stabilized",
      "Storage": "2TB SSD",
      "Streaming": "RTMP/RTSP"
    },
    images: [],
    availability: "In Stock",
    leadTime: "4-6 weeks",
    ndaaCompliant: true
  },
  {
    id: "secure-video-transmitter",
    name: "Secure Video Transmitter SVT-Pro",
    description: "Encrypted video transmission system for sensitive operations",
    price: "$1,850 (Qty 100+: $1,350)",
    companyId: "tactical-aviation-systems",
    systemId: "imaging-comms",
    subsystemId: "video-transmitters",
    specifications: {
      "Frequency": "L-Band/S-Band selectable",
      "Power": "1W-25W variable",
      "Encryption": "AES-256 + RSA",
      "Range": "150km LOS",
      "Latency": "< 120ms",
      "Protocols": "STANAG 4609",
      "Mount": "NATO standard"
    },
    images: [],
    availability: "In Stock",
    leadTime: "6-8 weeks",
    ndaaCompliant: true
  },

  // Control & Telemetry products
  {
    id: "long-range-control-system",
    name: "Long Range Control System LRCS-900",
    description: "Enterprise command and control system with 100km+ range capability",
    price: "$2,750 (Qty 25+: $2,100)",
    companyId: "tactical-aviation-systems",
    systemId: "control-systems",
    subsystemId: "control-links",
    specifications: {
      "Frequency": "900MHz ISM",
      "Range": "100km+ LOS",
      "Protocol": "Custom encrypted",
      "Channels": "32 channels",
      "Latency": "< 22ms",
      "Power": "2W transmission",
      "Diversity": "4x antenna diversity"
    },
    images: [],
    availability: "In Stock",
    leadTime: "4-5 weeks",
    ndaaCompliant: true
  },

  // Power & Energy products
  {
    id: "enterprise-battery-system",
    name: "Enterprise Battery System EBS-22000",
    description: "High-capacity battery system designed for extended enterprise operations",
    price: "$1,450 (Qty 100+: $1,150)",
    companyId: "liberty-power-solutions",
    systemId: "power-systems",
    subsystemId: "battery-systems",
    specifications: {
      "Capacity": "22000mAh",
      "Voltage": "22.2V (6S)",
      "Discharge": "25C continuous",
      "Chemistry": "LiFePO4",
      "Cycles": "3000+ cycles",
      "BMS": "Integrated monitoring",
      "Weight": "2.8kg"
    },
    images: [],
    availability: "In Stock",
    leadTime: "3-4 weeks",
    ndaaCompliant: true
  },

  // Airframe & Structure products
  {
    id: "enterprise-airframe-system",
    name: "Enterprise Airframe System EAS-X8",
    description: "Modular carbon fiber airframe designed for enterprise and government operations",
    price: "$4,850 (Qty 50+: $3,650)",
    companyId: "advanced-drone-systems",
    systemId: "frame",
    subsystemId: "main-structure",
    specifications: {
      "Configuration": "X8 Octocopter",
      "Material": "T800 Carbon Fiber",
      "Payload": "15kg maximum",
      "Folding": "Quick-deploy mechanism",
      "Weather": "IP65 rated",
      "Vibration": "Isolated mount points",
      "Assembly": "Tool-free setup"
    },
    images: [],
    availability: "In Stock",
    leadTime: "6-8 weeks",
    ndaaCompliant: true
  },

  // Navigation & Sensors products
  {
    id: "precision-gnss-system",
    name: "Precision GNSS System PGS-M8P",
    description: "RTK-enabled precision navigation system for survey and mapping applications",
    price: "$2,200 (Qty 100+: $1,650)",
    companyId: "precision-flight-systems",
    systemId: "navigation-sensors",
    subsystemId: "gnss-systems",
    specifications: {
      "Accuracy": "2cm RTK",
      "Constellations": "GPS, GLONASS, Galileo, BeiDou",
      "Update Rate": "20Hz",
      "RTK": "Built-in base station",
      "Anti-Jam": "Advanced algorithms",
      "Interface": "Ethernet, CAN, UART",
      "Operating Temp": "-40°C to +85°C"
    },
    images: [],
    availability: "In Stock",
    leadTime: "4-6 weeks",
    ndaaCompliant: true
  },

  // Apex Propulsion Dynamics products
  {
    id: "titan-x50-motor",
    name: "Titan X50 Brushless Motor",
    description: "High-performance 6000KV brushless motor designed for enterprise reconnaissance drones requiring rapid response capabilities and extended flight times.",
    price: "$485 (Qty 500+: $365)",
    companyId: "apex-propulsion-dynamics",
    systemId: "propulsion",
    subsystemId: "bldc-motors",
    specifications: {
      "KV Rating": "6000 KV",
      "Configuration": "12N14P",
      "Max Power": "3.2kW",
      "Operating Voltage": "14.8V - 25.2V",
      "Max Current": "85A",
      "Efficiency": "92%",
      "Weight": "145g",
      "Shaft": "5mm titanium",
      "Bearings": "Ceramic hybrid NSK",
      "Magnet": "N52SH Neodymium",
      "Stator": "0.35mm silicon steel",
      "Operating Temp": "-40°C to +125°C",
      "MTBF": "8,000 flight hours",
      "Sensors": "Hall effect + temperature",
      "Mounting": "Standard 25mm x 25mm pattern"
    },
    images: ["/images/products/titan-x50-motor-1.jpg", "/images/products/titan-x50-motor-2.jpg"],
    availability: "In Stock",
    leadTime: "2-3 weeks",
    ndaaCompliant: true,
    applications: [
      "Enterprise reconnaissance and surveillance drones",
      "Search and rescue operations",
      "Agricultural monitoring and spraying systems",
      "Infrastructure inspection and mapping",
      "Border patrol and security applications",
      "Emergency response and disaster relief",
      "Military and defense applications",
      "Commercial delivery systems"
    ],
    dimensions: "Ø28mm x 35mm (excluding shaft)",
    datasheetUrl: "/downloads/titan-x50-datasheet.pdf",
    cadModelUrl: "/downloads/titan-x50-cad-model.step",
    optionSheetUrl: "/downloads/titan-x50-options.pdf",
    userManualUrl: "/downloads/titan-x50-manual.pdf"
  },
  {
    id: "quantum-esc-pro",
    name: "Quantum ESC Pro 4-in-1",
    description: "Advanced 4-in-1 electronic speed controller with AI-powered motor optimization, real-time telemetry, and military-grade reliability for critical missions.",
    price: "$750 (Qty 100+: $595)",
    companyId: "apex-propulsion-dynamics",
    systemId: "propulsion",
    subsystemId: "escs",
    specifications: {
      "Current Rating": "60A continuous per channel",
      "Burst Current": "80A for 10 seconds",
      "Input Voltage": "3S-8S LiPo",
      "Protocols": "DShot1200, CAN-FD, Ethernet",
      "Processor": "ARM Cortex-M7 @ 480MHz",
      "Features": "AI optimization, predictive maintenance",
      "Telemetry": "RPM, current, voltage, temperature, vibration",
      "Protection": "Overcurrent, overvoltage, thermal, desync",
      "Firmware": "Open source compatible",
      "Weight": "28g",
      "Dimensions": "36mm x 36mm x 8mm",
      "Operating Temp": "-40°C to +105°C",
      "Efficiency": "97%",
      "PWM Frequency": "48kHz",
      "BEC": "5V/3A, 12V/2A switched"
    },
    images: ["/images/products/quantum-esc-pro-1.jpg", "/images/products/quantum-esc-pro-2.jpg"],
    availability: "In Stock",
    leadTime: "3-4 weeks",
    ndaaCompliant: true,
    applications: [
      "Multi-rotor enterprise drones",
      "High-performance racing and aerobatic drones",
      "Payload delivery systems",
      "Surveillance and reconnaissance platforms",
      "Agricultural spraying and monitoring drones",
      "Search and rescue operations",
      "Industrial inspection drones",
      "Research and development platforms"
    ],
    dimensions: "36mm x 36mm x 8mm",
    datasheetUrl: "/downloads/quantum-esc-pro-datasheet.pdf",
    cadModelUrl: "/downloads/quantum-esc-pro-cad-model.step",
    optionSheetUrl: "/downloads/quantum-esc-pro-options.pdf",
    userManualUrl: "/downloads/quantum-esc-pro-manual.pdf"
  },
  {
    id: "vortex-carbon-props",
    name: "Vortex Carbon Fiber Propellers",
    description: "Precision-balanced carbon fiber propellers engineered for maximum efficiency and minimal noise signature in tactical operations.",
    price: "$195 (Set of 8, Qty 200+: $155)",
    companyId: "apex-propulsion-dynamics",
    systemId: "propulsion",
    subsystemId: "propellers",
    specifications: {
      "Diameter": "15 inches",
      "Pitch": "5 inches",
      "Blade Count": "2",
      "Material": "T800 Carbon Fiber + Kevlar",
      "Hub Material": "7075-T6 Aluminum",
      "Weight": "18g per propeller",
      "Balance": "±0.05g",
      "Max RPM": "8,500 RPM",
      "Thrust": "6.8kg @ 7000 RPM",
      "Efficiency": "94% at cruise",
      "Noise Level": "68dB @ 1m",
      "Thread": "M8 x 1.25 (CW/CCW)",
      "Operating Temp": "-50°C to +85°C",
      "Vibration Resistance": "MIL-STD-810H",
      "Surface Finish": "UV-resistant coating"
    },
    images: ["/images/products/vortex-props-1.jpg", "/images/products/vortex-props-2.jpg"],
    availability: "In Stock",
    leadTime: "1-2 weeks",
    ndaaCompliant: true,
    applications: [
      "Tactical and stealth operations",
      "Long-range surveillance missions",
      "Precision agriculture applications",
      "Scientific research and monitoring",
      "Commercial aerial photography",
      "Emergency response operations",
      "Military reconnaissance missions",
      "Infrastructure inspection tasks"
    ],
    dimensions: "Ø15 inches x 5 inch pitch",
    datasheetUrl: "/downloads/vortex-props-datasheet.pdf",
    cadModelUrl: "/downloads/vortex-props-cad-model.step",
    optionSheetUrl: "/downloads/vortex-props-options.pdf",
    userManualUrl: "/downloads/vortex-props-manual.pdf"
  },
  {
    id: "atlas-power-hub",
    name: "Atlas Power Distribution Hub",
    description: "Intelligent power distribution system with real-time monitoring, fault isolation, and redundant power paths for mission-critical applications.",
    price: "$425 (Qty 250+: $325)",
    companyId: "apex-propulsion-dynamics",
    systemId: "propulsion",
    subsystemId: "power-distribution",
    specifications: {
      "Input Voltage": "12V-60V DC",
      "Max Current": "200A total",
      "Channels": "8 independent outputs",
      "Current Rating": "40A per channel",
      "Monitoring": "Voltage, current, temperature per channel",
      "Protection": "Overcurrent, short circuit, reverse polarity",
      "Connectivity": "XT90, XT60, Anderson Powerpole",
      "Interface": "CAN-FD, RS-485, Ethernet",
      "Features": "Load balancing, fault isolation",
      "Weight": "285g",
      "Dimensions": "95mm x 75mm x 25mm",
      "Operating Temp": "-40°C to +85°C",
      "Efficiency": "99.2%",
      "Enclosure": "IP67 rated",
      "Mounting": "Standard DIN rail compatible"
    },
    images: ["/images/products/atlas-power-hub-1.jpg", "/images/products/atlas-power-hub-2.jpg"],
    availability: "In Stock",
    leadTime: "2-3 weeks",
    ndaaCompliant: true,
    applications: [
      "Enterprise drone fleet management",
      "High-current propulsion systems",
      "Multi-motor aircraft configurations",
      "Redundant power distribution systems",
      "Mission-critical operations",
      "Industrial and commercial drones",
      "Military and defense applications",
      "Research and development platforms"
    ],
    dimensions: "95mm x 75mm x 25mm",
    datasheetUrl: "/downloads/atlas-power-hub-datasheet.pdf",
    cadModelUrl: "/downloads/atlas-power-hub-cad-model.step",
    optionSheetUrl: "/downloads/atlas-power-hub-options.pdf",
    userManualUrl: "/downloads/atlas-power-hub-manual.pdf"
  },

  // Voltaic Marine Systems products
  {
    id: "marine-aerial-dual-battery",
    name: "Marine-Aerial Dual Environment Battery Pack",
    description: "Revolutionary battery system engineered for seamless operation between aerial and marine environments with IP68 waterproof rating and corrosion-resistant housing.",
    price: "$2,850 (Qty 50+: $2,200)",
    companyId: "voltaic-marine-systems",
    systemId: "power-systems",
    subsystemId: "battery-systems",
    specifications: {
      "Capacity": "28000mAh",
      "Voltage": "25.2V (7S)",
      "Discharge": "15C continuous, 30C burst",
      "Chemistry": "LiPo with marine-grade coating",
      "Waterproof Rating": "IP68 (submerged to 50m)",
      "Operating Temp": "-20°C to +60°C",
      "Cycles": "2000+ cycles",
      "BMS": "Dual-mode marine/aerial optimization",
      "Weight": "3.2kg",
      "Dimensions": "185mm x 95mm x 65mm",
      "Connectors": "XT90 (waterproof) + Anderson Powerpole"
    },
    images: ["/images/products/marine-aerial-battery-1.jpg", "/images/products/marine-aerial-battery-2.jpg"],
    availability: "In Stock",
    leadTime: "4-6 weeks",
    ndaaCompliant: true,
    applications: [
      "Amphibious drone operations",
      "Marine surveillance and patrol",
      "Coastal search and rescue",
      "Underwater ROV applications",
      "All-weather aerial missions",
      "Maritime border security",
      "Offshore inspection platforms"
    ],
    dimensions: "185mm x 95mm x 65mm",
    datasheetUrl: "/downloads/marine-aerial-battery-datasheet.pdf",
    cadModelUrl: "/downloads/marine-aerial-battery-cad-model.step",
    optionSheetUrl: "/downloads/marine-aerial-battery-options.pdf",
    userManualUrl: "/downloads/marine-aerial-battery-manual.pdf"
  },
  {
    id: "submersible-charging-dock",
    name: "Submersible Charging Dock System",
    description: "Automated underwater charging station for marine drones with wireless power transfer and weatherproof operation down to 100 meters depth.",
    price: "$8,500 (Qty 10+: $6,800)",
    companyId: "voltaic-marine-systems",
    systemId: "power-systems",
    subsystemId: "charging-infrastructure",
    specifications: {
      "Max Depth": "100 meters",
      "Charging Power": "500W wireless transfer",
      "Dock Capacity": "4 simultaneous vehicles",
      "Communication": "Acoustic + RF hybrid",
      "Material": "Marine-grade titanium alloy",
      "Buoyancy": "Neutral (adjustable ballast)",
      "Operating Time": "6 months autonomous",
      "Efficiency": "92% power transfer",
      "Safety": "Auto-disconnect on fault",
      "Installation": "Anchor or seafloor mount"
    },
    images: ["/images/products/submersible-dock-1.jpg", "/images/products/submersible-dock-2.jpg"],
    availability: "Pre-Order",
    leadTime: "12-16 weeks",
    ndaaCompliant: true,
    applications: [
      "Underwater drone fleet operations",
      "Marine research stations",
      "Offshore monitoring systems",
      "Subsea infrastructure inspection",
      "Autonomous underwater vehicle support",
      "Deep sea exploration missions"
    ],
    dimensions: "2000mm x 1500mm x 800mm",
    datasheetUrl: "/downloads/submersible-dock-datasheet.pdf",
    cadModelUrl: "/downloads/submersible-dock-cad-model.step",
    optionSheetUrl: "/downloads/submersible-dock-options.pdf",
    userManualUrl: "/downloads/submersible-dock-manual.pdf"
  },

  // Razor Dynamics FPV products
  {
    id: "razor-racing-motor-2306",
    name: "Razor Racing Motor 2306",
    description: "Ultra-lightweight competition motor engineered for FPV racing with precision-balanced rotors and championship-winning performance characteristics.",
    price: "$89 (Qty 100+: $72)",
    companyId: "razor-dynamics-fpv",
    systemId: "propulsion",
    subsystemId: "bldc-motors",
    specifications: {
      "KV Rating": "2750 KV",
      "Configuration": "12N14P",
      "Stator": "23mm diameter, 6mm height",
      "Max Power": "850W",
      "Operating Voltage": "11.1V - 22.2V (3S-6S)",
      "Max Current": "42A",
      "Efficiency": "89% at optimal load",
      "Weight": "28.5g",
      "Shaft": "M5 threading, 4mm titanium",
      "Bearings": "Premium Japanese ball bearings",
      "Magnets": "N52SH arc magnets",
      "Wire": "20AWG silicone leads",
      "Operating Temp": "-10°C to +85°C",
      "Balance": "<0.05g deviation"
    },
    images: ["/images/products/razor-motor-2306-1.jpg", "/images/products/razor-motor-2306-2.jpg"],
    availability: "In Stock",
    leadTime: "1-2 weeks",
    ndaaCompliant: true,
    applications: [
      "FPV racing competitions",
      "Freestyle aerobatic flying",
      "High-speed surveillance drones",
      "Tactical reconnaissance platforms",
      "Professional aerial cinematography",
      "Racing team development",
      "Performance testing applications"
    ],
    dimensions: "Ø23mm x 26.8mm (excluding shaft)",
    datasheetUrl: "/downloads/razor-motor-2306-datasheet.pdf",
    cadModelUrl: "/downloads/razor-motor-2306-cad-model.step",
    optionSheetUrl: "/downloads/razor-motor-2306-options.pdf",
    userManualUrl: "/downloads/razor-motor-2306-manual.pdf"
  },
  {
    id: "fpv-racing-esc-45a",
    name: "FPV Racing ESC 45A",
    description: "High-performance electronic speed controller optimized for racing applications with lightning-fast response times and championship-proven reliability.",
    price: "$65 (Set of 4: $220)",
    companyId: "razor-dynamics-fpv",
    systemId: "propulsion",
    subsystemId: "escs",
    specifications: {
      "Current Rating": "45A continuous",
      "Burst Current": "55A for 10 seconds",
      "Input Voltage": "2S-6S LiPo",
      "Protocols": "Multishot, DShot600/1200",
      "MCU": "32-bit ARM processor",
      "PWM Frequency": "96kHz",
      "Response Time": "<1ms",
      "BEC": "None (external required)",
      "Weight": "4.2g",
      "Dimensions": "24mm x 12mm x 4mm",
      "Wire": "16AWG silicone",
      "Features": "Active braking, motor timing adjustment",
      "Firmware": "BLHeli_32 compatible"
    },
    images: ["/images/products/fpv-racing-esc-1.jpg", "/images/products/fpv-racing-esc-2.jpg"],
    availability: "In Stock",
    leadTime: "1-2 weeks",
    ndaaCompliant: true,
    applications: [
      "Professional FPV racing",
      "Competitive drone events",
      "High-performance freestyle",
      "Racing team applications",
      "Speed record attempts",
      "Precision aerobatic maneuvers",
      "Tournament racing circuits"
    ],
    dimensions: "24mm x 12mm x 4mm",
    datasheetUrl: "/downloads/fpv-racing-esc-datasheet.pdf",
    cadModelUrl: "/downloads/fpv-racing-esc-cad-model.step",
    optionSheetUrl: "/downloads/fpv-racing-esc-options.pdf",
    userManualUrl: "/downloads/fpv-racing-esc-manual.pdf"
  }
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find(company => company.id === id);
}

export function getSystemById(id: string): DroneSystem | MarineSystem | undefined {
  return unmannedSystems.find(system => system.id === id);
}

export function getSystemsByDomain(domain: 'aerial' | 'marine'): (DroneSystem | MarineSystem)[] {
  return unmannedSystems.filter(system => system.domain === domain);
}

export function getSystemsByVehicleType(vehicleType: string): (DroneSystem | MarineSystem)[] {
  return unmannedSystems.filter(system => system.vehicleType === vehicleType);
}

export function getSubsystemById(id: string): Subsystem | undefined {
  return subsystems.find(subsystem => subsystem.id === id);
}

export function getProductsBySystem(systemId: string): Product[] {
  return products.filter(product => product.systemId === systemId);
}

export function getProductsBySubsystem(subsystemId: string): Product[] {
  return products.filter(product => product.subsystemId === subsystemId);
}

export function getSubsystemsBySystem(systemId: string): Subsystem[] {
  return subsystems.filter(subsystem => subsystem.systemId === systemId);
}