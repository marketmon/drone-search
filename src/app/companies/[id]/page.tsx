import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CompanyProfile } from "@/components/company-profile";
import { companies } from "@/lib/data";
import { notFound } from "next/navigation";

interface CompanyPageProps {
  params: {
    id: string;
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = companies.find(c => c.id === params.id);

  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CompanyProfile companyId={params.id} />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return companies.map((company) => ({
    id: company.id,
  }));
}

