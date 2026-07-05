import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useService } from '@/hooks/use-services';
const OceanFreight = () => {
  const { service } = useService('ocean-freight');
  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Text Section */}
              <div className="md:w-1/2">
                <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  {service?.title || 'Ocean Freight Solutions'}
                </motion.h1>
                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }} className="text-lg text-gray-700 mb-6">
                  {service?.subtitle || 'Connecting you globally with comprehensive ocean freight services'}
                </motion.p>
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }}>
                  <Link to="/contact" className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all">
                    Get a Quote
                  </Link>
                </motion.div>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2">
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.5
              }} className="rounded-xl overflow-hidden shadow-xl">
                  <AspectRatio ratio={16 / 9}>
                    <img alt="Ocean Freight Service" className="w-full h-full object-cover" src={service?.heroImage || "/lovable-uploads/1c085df7-9363-40dc-a724-ff004b473cac.png"} />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 text-gray-800">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-brand-navy">
                Reliable & Tailored Ocean Freight Services
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8" />

              <p className="text-lg mb-6 leading-relaxed text-justify">
                At <strong>GGL India</strong>, we specialize in delivering comprehensive ocean freight solutions tailored to meet the diverse requirements of our clients. Whether you’re shipping bulk cargo or small consignments, our services are built for <strong>efficiency, reliability, and cost-effectiveness</strong>.
              </p>

              <div className="bg-blue-50 border-l-4 border-brand-gold p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Full Container Load (FCL)</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  For businesses with substantial cargo volumes, our FCL services offer dedicated container space, ensuring direct and secure transportation from port to port. This option is ideal for shipments that require exclusive container space, providing flexibility and control over delivery schedules
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-brand-gold p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Less than Container Load (LCL) Consolidation</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Recognizing the need for cost-effective solutions for smaller shipments, we offer LCL consolidation services. This service allows multiple shippers to share container space, reducing costs while maintaining the safety and integrity of each shipment. Our strategic presence in key transshipment hubs ensures timely and efficient consolidation services.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }} className="bg-gradient-to-r from-brand-navy to-blue-700 rounded-xl text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Ship Your Cargo?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored ocean freight solutions.
              </p>
              <Link to="/contact" className="inline-block bg-white text-brand-navy px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default OceanFreight;