import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/use-content";
import { getIcon } from "@/lib/icon-map";

interface AboutContent {
  heading: string;
  highlightedHeading: string;
  paragraphs: string[];
  heroImage: string;
  services: { title: string; icon: string }[];
  footerText: string;
}

const defaultContent: AboutContent = {
  heading: 'About',
  highlightedHeading: 'GGL',
  paragraphs: [
    'GGL is a proud subsidiary of 1 Global Enterprises, a Singapore-based investment group with a robust and diverse portfolio spanning freight forwarding, supply chain management, and logistics technology. As part of this global network, GGL leverages strategic investments across multiple brands specializing in transportation, warehousing, and integrated supply chain solutions.',
    'With a strong foundation backed by 1 Global Enterprises’ industry expertise and innovation-driven approach, GGL delivers seamless, technology-enabled logistics solutions. This affiliation ensures operational excellence, financial stability, and access to world-class infrastructure—positioning GGL as a leading provider of end-to-end global logistics services.',
    'The 1 Global Group operates in 16 countries with a dedicated team of over 700 professionals. Its business verticals include Supply Chain Solutions, Renewable Energy, Information Technology, and Business Process Outsourcing, each managed by domain experts committed to delivering impactful results.',
  ],
  heroImage: '/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png',
  services: [
    { title: 'Freight Management', icon: 'Truck' },
    { title: 'Warehouse Management', icon: 'Warehouse' },
    { title: 'Transport Management', icon: 'PackageCheck' },
    { title: 'Liquid Logistics', icon: 'Droplet' },
    { title: 'Oversized Shipments & Project Cargo', icon: 'Boxes' },
  ],
  footerText:
    'With the support of our in-house IT company, we are making significant investments in cutting-edge technologies—including Artificial Intelligence, Automation, and Data Analytics—to optimize operations and enhance transparency, efficiency, and client satisfaction.',
};

const About = () => {
  const { content } = useContent('about-page', defaultContent);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow mt-16">
        {/* Hero Section with Image + Paragraphs */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {content.heading} <span className="text-yellow-500">{content.highlightedHeading}</span>
              </h2>
              <div className="space-y-6 text-gray-700 text-base leading-relaxed">
                {content.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  alt="GGL Global Logistics"
                  className="w-full h-[500px] object-cover"
                  src={content.heroImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Cards with Icons */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
              Our Comprehensive Logistics Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {content.services.map((service, index) => {
                const Icon = getIcon(service.icon);
                return (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <Icon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <p className="text-base font-medium text-gray-700 text-center">{service.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final Paragraph */}
        <section className="pb-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-gray-700 text-base leading-relaxed">
            <p>{content.footerText}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
