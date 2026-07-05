import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

const IndiaKycForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative min-h-[800px]">
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                <Loader2 className="h-12 w-12 animate-spin text-brand-navy" />
              </div>
            )}

            <iframe 
              src="/india_kyc/" 
              className="w-full min-h-[1000px] border-0 bg-white"
              title="India KYC Form"
              onLoad={() => setIsLoading(false)}
              allow="camera; microphone; geolocation"
              sandbox="allow-forms allow-scripts allow-popups allow-top-navigation allow-same-origin allow-modals"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IndiaKycForm;
