import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products, getCompanyById, getSystemById } from "@/lib/data";
import { Shield, Clock, CheckCircle } from "lucide-react";

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our most trusted and battle-tested components from verified NDAA-compliant suppliers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => {
            const company = getCompanyById(product.companyId);
            const system = getSystemById(product.systemId);
            
            return (
              <Card key={product.id} className="bg-gray-900 border-gray-700 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg leading-tight mb-2">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          NDAA
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                          {system?.name}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        {product.price}
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {product.leadTime}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </CardDescription>
                  
                  <Separator className="my-4 bg-gray-700" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Supplier:</span>
                      <span className="text-white font-medium">{company?.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Availability:</span>
                      <div className="flex items-center">
                        <CheckCircle className={`h-3 w-3 mr-1 ${
                          product.availability === 'In Stock' ? 'text-green-400' : 
                          product.availability === 'Pre-Order' ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                        <span className={`text-sm ${
                          product.availability === 'In Stock' ? 'text-green-400' : 
                          product.availability === 'Pre-Order' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {product.availability}
                        </span>
                      </div>
                    </div>
                    
                    {/* Key Specifications */}
                    <div className="bg-gray-800 rounded-lg p-3 mt-4">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Key Specs
                      </h4>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400">{key}:</span>
                            <span className="text-white font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Request Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-600 text-white hover:bg-green-600 hover:border-green-600 hover:text-white px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}