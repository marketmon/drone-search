import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PropulsionSystemPage() {
  const motorComponents = [
    {
      name: "Stator",
      description: "The fixed part, consisting of a laminated iron core and copper coils wound on it (coil winding method KV value)."
    },
    {
      name: "Rotor (Bell)",
      description: "The rotating part, containing permanent magnets (N poles and S poles arranged alternately), is installed on the motor shaft."
    },
    {
      name: "Motor Shaft",
      description: "Connects the rotor and propeller."
    },
    {
      name: "Bearings",
      description: "Support the rotor to rotate (top and bottom)."
    },
    {
      name: "Motor Base",
      description: "Fixes the stator and provides mounting holes."
    },
    {
      name: "Cooling Vents",
      description: "Helps dissipate heat."
    },
    {
      name: "Motor Wires",
      description: "Three phase wires (usually silicone wires) that connect the ESC."
    }
  ];

  const escComponents = [
    {
      name: "Main MCU",
      description: "Processes the speed signal (PWM/DShot/ProShot) from the flight controller."
    },
    {
      name: "Power MOSFET tubes",
      description: "Form a three-phase H-bridge to switch high currents to drive the motor (usually 2 or more per phase in parallel)."
    },
    {
      name: "Capacitor Bank",
      description: "Filters voltage spikes and noise on the battery supply line (very important!)."
    },
    {
      name: "Current Sensor",
      description: "Measures motor phase current (for telemetry and overcurrent protection)."
    },
    {
      name: "Voltage Regulator Circuit (BEC)",
      description: "Optional, provides 5V power to the flight controller or other devices (many modern ESCs do not have this integrated, so it is provided by the flight controller)."
    },
    {
      name: "Firmware (ESC Firmware)",
      description: "Such as BLHeli_S, BLHeli_32, AM32, KISS, Bluejay, to implement motor commutation algorithms and protocol support."
    },
    {
      name: "Heat sink/thermal pad",
      description: "Helps dissipate heat from the MOSFET."
    },
    {
      name: "Connectors",
      description: "Main power cable (XT30/XT60) connected to the battery and pins/plugs (for flight control signals and motor cables)."
    }
  ];

  const propellerComponents = [
    {
      name: "Blades",
      description: "Airfoil-shaped structures that generate thrust. Materials typically include PC plastic, nylon composites, or carbon fiber."
    },
    {
      name: "Hub",
      description: "The center part with mounting holes (usually 5mm or M5/M6 threads)."
    },
    {
      name: "Prop Nut/Prop Lock",
      description: "Secures the propeller to the motor shaft."
    },
    {
      name: "Key Parameters",
      description: "Diameter and Pitch, such as 5x3x3 = 5 inches in diameter, 3 inches in pitch, and 3 blades."
    }
  ];

  const powerComponents = [
    {
      name: "Main Power Leads",
      description: "Thicker silicone wires (such as 12/14/16AWG) connect the battery, ESC, and power distribution board (if any)."
    },
    {
      name: "XT Connector",
      description: "XT30, XT60, XT90, etc., used to connect the battery."
    },
    {
      name: "Power Distribution Board (PDB)",
      description: "Optional (modern racks often have the PDB integrated into the baseboard). This board distributes the main battery power to the ESCs in parallel. Includes solder pads/binding posts and high-current traces."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
              Propulsion System
            </h1>
            <div className="max-w-4xl">
              <p className="text-xl text-white mb-6">
                Generate thrust to drive the drone to fly.
              </p>
              <p className="text-lg text-gray-300">
                The propulsion system is the heart of any drone, responsible for converting electrical energy
                into mechanical thrust. This system consists of four main subsystems working in perfect harmony:
                motors, electronic speed controllers, propellers, and power distribution components.
              </p>
            </div>
          </div>

          {/* Motor Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8">Motor (Brushless DC Motor - BLDC)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {motorComponents.map((component, index) => (
                <div key={index} className="border border-white p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{component.name}</h3>
                  <p className="text-gray-300">{component.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ESC Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8">Electronic Speed Controller (ESC)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {escComponents.map((component, index) => (
                <div key={index} className="border border-white p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{component.name}</h3>
                  <p className="text-gray-300">{component.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Propeller Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8">Propeller</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {propellerComponents.map((component, index) => (
                <div key={index} className="border border-white p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{component.name}</h3>
                  <p className="text-gray-300">{component.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Power Wire Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8">Power Wire</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {powerComponents.map((component, index) => (
                <div key={index} className="border border-white p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{component.name}</h3>
                  <p className="text-gray-300">{component.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Available Products Section */}
          <section>
            <h2 className="text-4xl font-bold text-white mb-8">Available Propulsion Components</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white p-6">
                <h3 className="text-xl font-bold text-white mb-3">Industrial ESC System IES-8000</h3>
                <p className="text-gray-300 mb-4">Enterprise-grade 8-motor speed controller with advanced telemetry and monitoring</p>
                <div className="text-sm text-gray-400 mb-4">
                  <div>Current: 80A continuous per channel</div>
                  <div>Channels: 8 independent outputs</div>
                  <div>Protocols: DShot1200, CAN Bus, Ethernet</div>
                </div>
                <div className="text-white font-bold">$950 (Qty 100+: $695)</div>
              </div>

              <div className="border border-white p-6">
                <h3 className="text-xl font-bold text-white mb-3">Enterprise Motor Assembly EMA-2800</h3>
                <p className="text-gray-300 mb-4">Professional brushless motor system with integrated sensors and diagnostics</p>
                <div className="text-sm text-gray-400 mb-4">
                  <div>KV: 2800 KV</div>
                  <div>Configuration: 12N14P</div>
                  <div>Max Power: 2.5kW</div>
                </div>
                <div className="text-white font-bold">$385 (Qty 1000+: $265)</div>
              </div>

              <div className="border border-white p-6">
                <h3 className="text-xl font-bold text-white mb-3">Professional Propeller Set PPS-650</h3>
                <p className="text-gray-300 mb-4">Carbon fiber propeller assembly optimized for enterprise drone operations</p>
                <div className="text-sm text-gray-400 mb-4">
                  <div>Diameter: 16.5 inches</div>
                  <div>Pitch: 5.5 inches</div>
                  <div>Material: T700 Carbon Fiber</div>
                </div>
                <div className="text-white font-bold">$165 (Set of 8, Qty 100+: $125)</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}