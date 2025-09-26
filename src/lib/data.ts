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

export interface DroneSystem {
  id: string;
  name: string;
  description: string;
  icon: string;
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
  }
];

export const droneSystems: DroneSystem[] = [
  {
    id: "flight-controller",
    name: "Flight Controller Systems",
    description: "Enterprise-grade processors, navigation sensors, and flight management firmware",
    icon: ""
  },
  {
    id: "frame",
    name: "Airframe & Structure",
    description: "Industrial carbon fiber frames, mounting systems, and protective housings",
    icon: ""
  },
  {
    id: "propulsion",
    name: "Propulsion Systems",
    description: "High-performance motors, speed controllers, and propeller assemblies",
    icon: ""
  },
  {
    id: "imaging-comms",
    name: "Imaging & Communications",
    description: "Professional cameras, video transmitters, and secure communication systems",
    icon: ""
  },
  {
    id: "control-systems",
    name: "Control & Telemetry",
    description: "Long-range control links, telemetry systems, and command protocols",
    icon: ""
  },
  {
    id: "power-systems",
    name: "Power & Energy",
    description: "Enterprise battery systems, power management, and charging infrastructure",
    icon: ""
  },
  {
    id: "navigation-sensors",
    name: "Navigation & Sensors",
    description: "Precision GPS, advanced sensors, and mission-critical navigation systems",
    icon: ""
  }
];

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
  }
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find(company => company.id === id);
}

export function getSystemById(id: string): DroneSystem | undefined {
  return droneSystems.find(system => system.id === id);
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