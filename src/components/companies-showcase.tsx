import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companies, products } from "@/lib/data";
import { Shield, MapPin, ExternalLink, Award } from "lucide-react";

export function CompaniesShowcase() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Enterprise Defense Contractors
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our verified network of US defense contractors specializing in enterprise-scale 
            drone component manufacturing and integration at volume
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => {
            const companyProducts = products.filter(p => p.companyId === company.id);
            
            return (
              <Card key={company.id} className="bg-gray-900 border-gray-700 hover:border-green-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">
                            {company.name}
                          </CardTitle>
                          <div className="flex items-center text-gray-400 text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {company.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          NDAA Compliant
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                          {companyProducts.length} Products
                        </Badge>
                      </div>
                    </div>
                    
                    {company.website && (
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <CardDescription className="text-gray-300">
                    {company.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Certifications */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {company.certifications.map((cert) => (
                          <Badge 
                            key={cert} 
                            variant="outline" 
                            className="text-xs border-gray-600 text-gray-300"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Featured Products Preview */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Featured Products
                      </h4>
                      <div className="space-y-2">
                        {companyProducts.slice(0, 2).map((product) => (
                          <div 
                            key={product.id}
                            className="flex items-center justify-between p-2 rounded border border-gray-700 hover:border-gray-600 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-sm text-white font-medium">{product.name}</div>
                              <div className="text-xs text-gray-400">{product.price}</div>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                product.availability === 'In Stock' ? 'bg-green-900 text-green-300' : 
                                product.availability === 'Pre-Order' ? 'bg-yellow-900 text-yellow-300' : 
                                'bg-red-900 text-red-300'
                              }`}
                            >
                              {product.availability}
                            </Badge>
                          </div>
                        ))}
                        {companyProducts.length > 2 && (
                          <div className="text-xs text-gray-400 text-center py-1">
                            +{companyProducts.length - 2} more products
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                      >
                        View Profile
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Contact Supplier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}