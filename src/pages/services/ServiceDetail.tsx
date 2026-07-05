import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useService } from "@/hooks/use-services";

const ServiceDetail = () => {
  // Extract the slug from the URL (e.g., "lcl-consolidation")
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const { service, isLoaded, notFound } = useService(serviceSlug);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // If the URL slug doesn't exist, redirect back to the main services list
  if (notFound || !service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={service.heroImage || "/oceanf.png"}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 to-brand-navy/70" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {service.title}
            </motion.h1>
            {service.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/90"
              >
                {service.subtitle}
              </motion.p>
            )}
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content (Left Column) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Handling Steps */}
              {service.handlingSteps && service.handlingSteps.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-brand-navy mb-8">Process & Handling</h2>
                  <div className="space-y-6">
                    {service.handlingSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar (Right Column) */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              {service.whyChooseUs && service.whyChooseUs.length > 0 && (
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-2xl font-bold text-brand-navy mb-6">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    {service.whyChooseUs.map((point, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-brand-gold to-yellow-500 p-8 rounded-xl shadow-md text-brand-navy text-center">
                <h3 className="text-2xl font-bold mb-4">Need this service?</h3>
                <p className="mb-6 font-medium">Get in touch with our experts to request a quote.</p>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-navy/90 transition-colors w-full">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
