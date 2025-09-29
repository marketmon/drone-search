import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CompanyProfile } from "@/components/company-profile";
import { companies } from "@/lib/data";
import { notFound } from "next/navigation";

interface CompanyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const company = companies.find(c => c.id === id);




  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CompanyProfile companyId={id} />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return companies.map((company) => ({
    id: company.id,
  }));
}

