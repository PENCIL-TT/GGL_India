import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useService } from '@/hooks/use-services';

const Transportation = () => {
  const { service } = useService('liquid-transportation');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                >
                  {service?.title || 'Transportation & Distribution'}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-700 mb-6"
                >
                  {service?.subtitle || 'Reliable domestic and international transportation services'}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-xl"
                >
                  <AspectRatio ratio={16 / 9}>
                    <img
                      alt="Transportation Service"
                      className="w-full h-full object-cover"
                      src={service?.heroImage || "/trucks.png"}
                    />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Card Content Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 md:p-14 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                TRANSPORTATION & DISTRIBUTION
              </h2>
              <div className="w-20 h-1 bg-brand-gold mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify">
                At GGL India, we understand that efficient transportation and distribution are the backbone of a seamless supply chain. Our dedicated fleet and robust infrastructure ensure that your goods reach their destination on time, every time.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-8">Domestic Distribution Network</h3>
              <p className="text-gray-700 mb-6 text-justify">
                With a strategically located network of offices in Mumbai, New Delhi, Kolkata, Bangalore, and Chennai, GGL India offers comprehensive domestic transportation solutions. Our fleet is equipped to handle various cargo types, ensuring safe and timely deliveries across the country.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-8">Fleet & Operational Excellence</h3>
              <p className="text-gray-700 mb-4 text-justify">
                Our fleet comprises a diverse range of vehicles, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Full Truck Load (FTL)</li>
                <li>Less than Truck Load (LTL)</li>
                <li>Refrigerated Vehicles (for temperature-sensitive goods)</li>
                <li>Flatbed Trucks (for oversized cargo)</li>
              </ul>
              <p className="text-gray-700 mb-6 text-justify">
                Each vehicle is maintained to the highest standards, ensuring reliability and safety during transit.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-8">Distribution Services</h3>
              <p className="text-gray-700 mb-4 text-justify">
                We offer a range of distribution services tailored to meet the specific needs of our clients:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Last-Mile Delivery: Ensuring timely deliveries to end customers.</li>
                <li>Cross-Docking: Minimizing storage time and speeding up the distribution process.</li>
                <li>Milk Run Services: Efficient collection and delivery from multiple suppliers to a single destination.</li>
              </ul>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-brand-navy to-blue-700 rounded-xl text-white p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Transport Your Cargo?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for reliable transportation solutions.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-brand-navy px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Transportation;
