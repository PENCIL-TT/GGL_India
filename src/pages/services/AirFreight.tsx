import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Plane, Clock, Globe, Headset } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useService } from '@/hooks/use-services';
const AirFreight = () => {
  const { service } = useService('air-freight');
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
                  {service?.title || 'Air Freight Solutions'}
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
                  {service?.subtitle || 'Tailored air freight solutions to meet your unique requirements'}
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
                    <img alt="Air Freight Service" className="w-full h-full object-cover" src={service?.heroImage || "/lovable-uploads/054acf94-b58e-4129-8153-ab170b147e03.png"} />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                Comprehensive Air Freight Services
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                At GGL India, we offer a comprehensive range of air freight services designed to meet all your shipping needs. Our expert air freight teams provide seamless air import, export, and express options, all on a convenient door-to-door basis.
              </p>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                <strong>Global Reach with Strategic Hubs:</strong> With a strong presence in key transshipment hubs such as Singapore, Malaysia, Sri Lanka, and Dubai, GGL India ensures direct weekly sailings to all major destinations worldwide. This strategic network allows us to offer reliable and timely air freight services to and from India.
              </p>

              <div className="text-gray-700 text-left font-normal">
                <strong>Comprehensive Air Freight Solutions:</strong>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>
                    <strong>Import & Export Shipments:</strong> Handling shipments to and from major international destinations.
                  </li>
                  <li>
                    <strong>Express Services:</strong> Fast-track options for time-sensitive deliveries.
                  </li>
                  <li>
                    <strong>Consolidation Services:</strong> Combining smaller shipments to optimize costs and efficiency.
                  </li>
                </ul>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {(service?.whyChooseUs && service.whyChooseUs.length > 0
                ? service.whyChooseUs.map((point) => ({
                    icon: <Plane className="h-10 w-10 text-brand-gold" />,
                    title: point,
                    description: '',
                  }))
                : [{
              icon: <Clock className="h-10 w-10 text-brand-gold" />,
              title: "Time-Definite Deliveries",
              description: "Flexible options including next-flight-out, express, and deferred services to meet critical timelines."
            }, {
              icon: <Plane className="h-10 w-10 text-brand-gold" />,
              title: "Cargo Consolidation",
              description: "Efficient consolidation services to optimize costs and reduce handling time."
            }, {
              icon: <Globe className="h-10 w-10 text-brand-gold" />,
              title: "Specialized Handling",
              description: "Capabilities to manage high-value, sensitive, or perishable cargo with care and compliance."
            }, {
              icon: <Clock className="h-10 w-10 text-brand-gold" />,
              title: "Real-Time Shipment Tracking",
              description: "Full visibility and status updates through integrated tracking systems."
            }, {
              icon: <Headset className="h-10 w-10 text-brand-gold" />,
              title: "Customs Clearance Support",
              description: "End-to-end handling of documentation, customs brokerage, and compliance to streamline international transit."
            }]).map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  {feature.description && <p className="text-gray-600 text-sm">{feature.description}</p>}
                </div>
              ))}
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
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Ship with Us?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored air freight solutions.
              </p>
              <Link to="/contact" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default AirFreight;