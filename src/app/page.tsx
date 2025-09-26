import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { DroneSchematic } from "@/components/drone-schematic";
import { DroneForgeEvaluation } from "@/components/evaluation_process";
import { RFQTool } from "@/components/rfq-tool";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <DroneSchematic />
      <DroneForgeEvaluation />
      <RFQTool />
      <Footer />
    </div>
  );
}
