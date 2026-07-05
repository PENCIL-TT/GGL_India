import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useService } from '@/hooks/use-services';
const LCLConsolidation = () => {
  const { service } = useService('lcl-consolidation');
  const lclServices = ["Collecting smaller shipments from multiple clients", "Combining them into a single container at origin", "Managing customs clearance and documentation", "Ensuring secure and timely deconsolidation and final delivery", "Real-time tracking and shipment visibility", "Competitive pricing for cost-effective solutions"];
  const defaultHandlingSteps = [{
    title: "1. Cargo Collection & Preparation",
    description: "We collect your goods from your location and prepare them for consolidation, including proper labelling, packaging, and documentation."
  }, {
    title: "2. Consolidation at Our Facilities",
    description: "Your cargo is consolidated with other shipments at our facilities in Mumbai, Chennai, and key cities—optimizing space and minimizing costs."
  }, {
    title: "3. Sea Freight Shipping",
    description: "Once consolidated, your cargo is shipped via sea freight to major ports worldwide through regular, timely sailings."
  }, {
    title: "4. Deconsolidation & Final Delivery",
    description: "Upon arrival, we deconsolidate your cargo and handle the final-mile delivery to your specified location."
  }];
  const handlingSteps = service?.handlingSteps && service.handlingSteps.length > 0 ? service.handlingSteps : defaultHandlingSteps;
  const defaultWhyChooseUs = ["Cost Efficiency: Share container space and reduce shipping costs.", "Flexibility: Ship smaller quantities without waiting to fill a full container.", "Global Reach: Access major ports worldwide through our extensive network.", "Expert Handling: Experienced team ensuring safe and timely delivery."];
  const whyChooseUs = service?.whyChooseUs && service.whyChooseUs.length > 0 ? service.whyChooseUs : defaultWhyChooseUs;
  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
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
                  {service?.title || 'LCL Consolidation Services'}
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
                  {service?.subtitle || 'Cost-effective consolidation solutions for your smaller shipments'}
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
                    <img alt="LCL Consolidation Service" className="w-full h-full object-cover" src={service?.heroImage || "/lovable-uploads/d9182c2f-aeba-4d3d-98be-fc726e16a3ed.png"} />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Handling Steps */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto mb-20">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                How GGL India Handles LCL Consolidation
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {handlingSteps.map((step, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.2
              }} viewport={{
                once: true
              }} className="bg-white shadow-md rounded-xl p-6 border-t-4 border-brand-gold">
                    <h4 className="font-bold mb-2 text-brand-navy">{step.title}</h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </motion.div>)}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-blue-50 rounded-xl p-10 mb-20">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Why Choose GGL India for LCL Consolidation?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {whyChooseUs.map((point, idx) => <div key={idx} className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-brand-gold rounded-full mt-2" />
                    <p className="text-gray-700">{point}</p>
                  </div>)}
              </div>
            </div>

            {/* Auto Fade Banner */}
          {/* Global Trade Network Section */}
          <section className="my-20 px-4">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
    
    {/* Import Origins */}
    <div className="rounded-3xl p-6 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-800 border border-blue-400/30 shadow-2xl">
      <h3 className="text-2xl font-bold mb-5 tracking-wide text-[#f6b100]">
        Import Origins <span className="text-amber-400">to India</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        {["Japan", "Taiwan", "Korea", "China", "Hong Kong", "Vietnam", "Malaysia", "Thailand", "Singapore", "Dubai", "Italy", "Germany", "Netherlands", "UK", "USA", "Slovenia/Koper", "Jebel Ali", "Saudi Arabia", "Hamad-Qatar", "Karachi", "Colombo", "Chittagong", "Port Klang", "Bangkok", "Jakarta", "Ho Chi Minh City"].map((location, i) => <span key={i} className="bg-amber-400/10 border border-amber-300/30 text-sm px-3 py-1 rounded-full hover:bg-amber-400/20 transition-all shadow-sm text-white font-semibold">
            {location}
          </span>)}
      </div>
    </div>

    {/* Export Destinations */}
    <div className="rounded-3xl p-6 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-800 border border-blue-400/30 shadow-2xl">
      <h3 className="text-2xl font-bold mb-5 tracking-wide text-[#f6b100]">
        Export Destinations <span className="text-[#f6b100]">from India</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        {["Japan", "Taiwan", "Korea", "China", "Hong Kong", "Vietnam", "Malaysia", "Thailand", "Singapore", "Dubai", "Italy", "Germany", "Netherlands", "UK", "USA", "Slovenia/Koper", "Jebel Ali", "Saudi Arabia", "Hamad-Qatar", "Karachi", "Colombo", "Chittagong", "Port Klang", "Bangkok", "Jakarta", "Ho Chi Minh City", "Shanghai"].map((location, i) => <span key={i} className="bg-amber-400/10 border border-amber-300/30 text-sm px-3 py-1 rounded-full hover:bg-amber-400/20 transition-all shadow-sm text-white font-semibold">
            {location}
          </span>)}
      </div>
    </div>

  </div>
          </section>
        
            {/* CTA */}
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
          }} className="bg-gradient-to-r from-brand-navy to-brand-navy rounded-xl text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-slate-50">
                Ready to Consolidate Your Shipments?
              </h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored LCL consolidation solutions.
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
export default LCLConsolidation;

// Smooth fade banner with no glitch
const AutoFadeBanner = () => {
  const images = ["/banner-1.jpg", "/banner-2.jpg" // Add more if needed
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);
  return <div className="relative w-full h-full rounded-xl overflow-hidden">
      <AnimatePresence>
        <motion.img key={images[index]} src={images[index]} alt={`Banner ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" initial={{
        opacity: 0,
        scale: 1.05
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 1.05
      }} transition={{
        duration: 1
      }} />
      </AnimatePresence>
    </div>;
};
