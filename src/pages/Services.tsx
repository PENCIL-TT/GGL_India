import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useServices } from "@/hooks/use-services";
import { useContent } from "@/hooks/use-content";
import { getIcon } from "@/lib/icon-map";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const ServiceCard = ({ iconName, title, description, image, link }: { iconName: string; title: string; description: string; image: string; link: string }) => {
  const Icon = getIcon(iconName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group grid grid-cols-1 md:grid-cols-2"
    >
      <div className="w-full h-48 md:h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col justify-center">
        <div className="bg-brand-gold text-brand-navy p-2 rounded-full inline-block mb-2 w-fit">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-brand-navy mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-4">{description}</p>
        <Link
          to={link}
          className="text-brand-gold font-medium hover:text-amber-500 inline-flex items-center text-sm"
        >
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

interface ServicesPageContent {
  heroHeading: string;
  heroSubtitle: string;
  heroImage: string;
}

const defaultContent: ServicesPageContent = {
  heroHeading: 'Our Logistics Services',
  heroSubtitle: 'From air and ocean freight to specialized transportation solutions, we offer end-to-end logistics expertise to meet your global shipping needs.',
  heroImage: '/lovable-uploads/gp.jpg',
};

const Services = () => {
  useIsMobile();
  const { services } = useServices();
  const { content } = useContent('services-page', defaultContent);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="bg-gradient-to-r from-gray-900 to-brand-navy text-white relative overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img src={content.heroImage} alt="Services" className="w-full h-full object-cover opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-brand-navy opacity-90" />
  </div>

  <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-slate-50">{content.heroHeading}</h1>
      <div className="w-16 h-1 bg-brand-gold mx-auto mb-4"></div>
      <p className="text-base md:text-lg text-white/90 mb-4">
        {content.heroSubtitle}
      </p>
    </motion.div>
  </div>
</section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">All Services</h2>
              <div className="w-20 h-1 bg-brand-gold mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of services designed to meet all your logistics requirements.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <ServiceCard
                  key={service.slug}
                  iconName={service.iconName}
                  title={service.title}
                  description={service.subtitle}
                  image={service.heroImage}
                  link={`/services/${service.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
