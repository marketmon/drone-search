import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SystemsOverview } from "@/components/systems-overview";
import { DroneForgeEvaluation } from "@/components/evaluation_process";
import { RFQTool } from "@/components/rfq-tool";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <SystemsOverview />
      <DroneForgeEvaluation />
      <RFQTool />
      <Footer />
    </div>
  );
}
