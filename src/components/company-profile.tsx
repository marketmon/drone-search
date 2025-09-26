"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Company, Product, getCompanyById } from "@/lib/data";
import { products } from "@/lib/data";

interface CompanyProfileProps {
  companyId: string;
}

export function CompanyProfile({ companyId }: CompanyProfileProps) {
  const company = getCompanyById(companyId);
  const companyProducts = products.filter(product => product.companyId === companyId);

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Company Not Found</h1>
          <p className="text-gray-300">The requested company profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Company Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              {company.logo && (
                <div className="w-32 h-32 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-4xl font-bold text-white">{company.name.charAt(0)}</div>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-4">{company.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{company.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={company.ndaaCompliant ? "default" : "secondary"} className="bg-green-600 hover:bg-green-700">
                  {company.ndaaCompliant ? "NDAA Compliant" : "NDAA Transitioning"}
                </Badge>
                {company.certifications.slice(0, 3).map((cert, index) => (
                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                    {cert}
                  </Badge>
                ))}
                {company.certifications.length > 3 && (
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    +{company.certifications.length - 3} more
                  </Badge>
                )}
              </div>
              <div className="text-gray-400">
                <p className="mb-2">📍 {company.location}</p>
                {company.website && (
                  <p className="mb-2">🌐 <a href={company.website} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">{company.website}</a></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Information Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Details */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {company.email && (
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{company.email}</p>
                </div>
              )}
              {company.phone && (
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{company.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400">Website</p>
                {company.website ? (
                  <a href={company.website} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                ) : (
                  <p className="text-gray-500">Not provided</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Facilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">{company.location}</p>
              </div>
              {company.squareFootage && (
                <div>
                  <p className="text-sm text-gray-400">Square Footage</p>
                  <p className="text-white">{company.squareFootage}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {company.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capabilities */}
        {company.capabilities && company.capabilities.length > 0 && (
          <Card className="bg-gray-900 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-white">Manufacturing Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {company.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 mt-2 flex-shrink-0 rounded-full"></div>
                    <p className="text-gray-300">{capability}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-8">Products</h2>
          {companyProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="text-center py-12">
                <p className="text-gray-400">No products available for this company yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-white text-lg">{product.name}</CardTitle>
          <Badge variant={product.ndaaCompliant ? "default" : "secondary"} className="bg-green-600 hover:bg-green-700 text-xs">
            NDAA
          </Badge>
        </div>
        <CardDescription className="text-gray-400">{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <div className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">Product Image</div>
            </div>
          )}

          {/* Price and Availability */}
          <div>
            <p className="text-2xl font-bold text-white mb-1">{product.price}</p>
            <div className="flex items-center gap-2">
              <Badge variant={product.availability === 'In Stock' ? 'default' : 'secondary'}
                     className={product.availability === 'In Stock' ? 'bg-green-600' : 'bg-yellow-600'}>
                {product.availability}
              </Badge>
              <span className="text-sm text-gray-400">Lead time: {product.leadTime}</span>
            </div>
          </div>

          {/* Applications */}
          {product.applications && product.applications.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white mb-2">Applications</p>
              <div className="flex flex-wrap gap-1">
                {product.applications.slice(0, 3).map((app, index) => (
                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                    {app}
                  </Badge>
                ))}
                {product.applications.length > 3 && (
                  <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                    +{product.applications.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions && (
            <div>
              <p className="text-sm font-semibold text-white">Dimensions</p>
              <p className="text-sm text-gray-400">{product.dimensions}</p>
            </div>
          )}

          {/* Toggle Details */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>

          {/* Detailed Specifications */}
          {showDetails && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-sm font-semibold text-white mb-2">Specifications</p>
                <div className="space-y-1">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downloads */}
              <div>
                <p className="text-sm font-semibold text-white mb-2">Downloads</p>
                <div className="grid grid-cols-2 gap-2">
                  {product.datasheetUrl && (
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs">
                      Datasheet
                    </Button>
                  )}
                  {product.userManualUrl && (
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs">
                      Manual
                    </Button>
                  )}
                  {product.cadModelUrl && (
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs">
                      CAD Model
                    </Button>
                  )}
                  {product.optionSheetUrl && (
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs">
                      Options
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}