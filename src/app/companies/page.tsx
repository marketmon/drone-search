import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/components/ui/demo-button";
import { companies } from "@/lib/data";
import { MapPin, Users, Factory, Star } from "lucide-react";
import Link from "next/link";

export default function CompaniesPage() {
  const ndaaCompliantCompanies = companies.filter(company => company.ndaaCompliant);
  const featuredCompanies = companies.filter(company =>
    company.teamMembers && company.teamMembers.length > 0
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Factory className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our Partners
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Trusted manufacturers and suppliers of NDAA-compliant components for unmanned systems
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="text-green-400 border-green-400 px-4 py-2">
              {ndaaCompliantCompanies.length} NDAA Compliant Partners
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400 px-4 py-2">
              {companies.length} Total Partners
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Partners
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Companies with verified expert teams and proven manufacturing capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompanies.map((company) => (
              <Card key={company.id} className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-colors group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{company.name.charAt(0)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                    {company.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {company.description.length > 120
                      ? `${company.description.substring(0, 120)}...`
                      : company.description
                    }
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Location and Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{company.location}</span>
                      </div>
                      <Badge variant={company.ndaaCompliant ? "default" : "secondary"}
                             className={company.ndaaCompliant ? "bg-green-600" : "bg-gray-600"}>
                        {company.ndaaCompliant ? "NDAA Compliant" : "Transitioning"}
                      </Badge>
                    </div>

                    {/* Expert Team Info */}
                    {company.teamMembers && company.teamMembers.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-400">
                          {company.teamMembers.length} Expert Team Member{company.teamMembers.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    {/* Key Certifications */}
                    <div className="flex flex-wrap gap-2">
                      {company.certifications.slice(0, 3).map((cert, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {cert}
                        </Badge>
                      ))}
                      {company.certifications.length > 3 && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          +{company.certifications.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* View Company Button */}
                    <Link href={`/companies/${company.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                      >
                        View Company Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Companies */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              All Partners
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete directory of verified suppliers and manufacturers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{company.name}</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{company.location}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        {company.description.length > 100
                          ? `${company.description.substring(0, 100)}...`
                          : company.description
                        }
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant={company.ndaaCompliant ? "default" : "secondary"}
                               className={company.ndaaCompliant ? "bg-green-600 text-xs" : "bg-gray-600 text-xs"}>
                          {company.ndaaCompliant ? "NDAA" : "Commercial"}
                        </Badge>

                        {company.teamMembers && company.teamMembers.length > 0 && (
                          <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                            Expert Team
                          </Badge>
                        )}

                        {company.certifications.includes("ITAR") && (
                          <Badge variant="outline" className="border-purple-400 text-purple-400 text-xs">
                            ITAR
                          </Badge>
                        )}
                      </div>

                      <Link href={`/companies/${company.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Become a Partner
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join our network of trusted suppliers and connect with buyers seeking quality components
          </p>
          <div className="flex justify-center space-x-4">
            <DemoButton size="lg">
              Apply to Join
            </DemoButton>
            <DemoButton size="lg" variant="outline">
              Learn More
            </DemoButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}