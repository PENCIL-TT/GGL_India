import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "@/hooks/use-content";

interface AddressInfo {
  title: string;
  address: string;
  phone?: string | string[];
  email?: string;
}

interface OfficeRecord {
  countryCode: string;
  cityName: string;
  address: string;
  contacts: string[];
  email: string | null;
}

interface FooterContent {
  logoImage: string;
  partnerLogoImage: string;
  aboutBlurb: string;
  socialLinks: { linkedin: string; facebook: string };
  copyrightText: string;
}

const defaultFooterContent: FooterContent = {
  logoImage: "/lovable-uploads/GGL.png",
  partnerLogoImage: "/1GlobalEnterprises.png",
  aboutBlurb: "At GGL, we are proud to be one of Singapore's leading logistics companies...",
  socialLinks: { linkedin: "https://www.linkedin.com/company/gglus/", facebook: "https://www.facebook.com/gglusa" },
  copyrightText: "GGL. All Rights Reserved.",
};

export const Footer = () => {
  const { content } = useContent("footer", defaultFooterContent);
  const location = useLocation();
  const isBangladesh = location.pathname.startsWith("/bangladesh");
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);

  useEffect(() => {
    fetch("/api/offices")
      .then((res) => res.json())
      .then((data: OfficeRecord[]) => {
        const indiaOffices = data
          .filter((o) => o.countryCode === "in")
          .map((o) => ({
            title: `${o.cityName} Office`,
            address: o.address,
            phone: o.contacts.length > 1 ? o.contacts : o.contacts[0],
            email: o.email || undefined,
          }));
        setAddresses(indiaOffices);
      })
      .catch(() => setAddresses([]));
  }, []);

  const footerAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const addressVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5
      }
    }
  };

  // Bangladesh office (for Bangladesh pages only)
  const bangladeshAddress: AddressInfo = {
    title: "Bangladesh Office",
    address:
      "ID #9-N (New), 9-M(Old-N), 9th floor, Tower 1, Police Plaza Concord No.2, Road # 144, Gulshan Model Town, Dhaka 1215, Bangladesh",
    phone: "+880 1716 620989"
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % addresses.length);
  };

  // Navigation links: switch to Bangladesh routes when on Bangladesh pages
  const navigationLinks = isBangladesh
    ? [
        { name: "Home", path: "/bangladesh" },
        { name: "About", path: "/bangladesh/about" },
        { name: "Services", path: "/bangladesh/services" },
        { name: "Contact Us", path: "/bangladesh/contact" }
      ]
    : [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact Us", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms And Conditions", path: "/terms-and-conditions" }
      ];

  return (
    <footer className="pt-16 pb-8 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: About */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            className="flex flex-col items-start"
          >
            <div className="mb-4">
              <img
                src={content.logoImage}
                alt="GGL Logo"
                className="h-14 w-auto object-contain"
                loading="lazy"
              />
              <img
                src={content.partnerLogoImage}
                alt="1 Global Enterprises Logo"
                className="h-10 w-auto object-contain mt-2"
              />
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xs text-left">
              {content.aboutBlurb}
            </p>
            <div className="flex space-x-3 mt-4">
              <motion.a
                href={content.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition"
                whileHover={{
                  y: -3,
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.95
                }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href={content.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition"
                whileHover={{
                  y: -3,
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.95
                }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            transition={{
              delay: 0.2
            }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10 px-[110px]"
          >
            <h3 className="font-bold text-lg text-brand-navy mb-4">Navigation</h3>
            <div className="flex flex-col gap-2 px-0 mx-0">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-brand-gold" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            transition={{
              delay: 0.4
            }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <h3 className="font-bold text-lg text-brand-navy mb-4">Contact Us</h3>

            {/* Bangladesh pages: show only Bangladesh office (no slider, no arrow) */}
            {isBangladesh ? (
              <div className="w-full max-w-xs text-gray-600 min-h-[180px] relative">
                <p className="font-semibold mb-1">{bangladeshAddress.title}</p>
                <div className="flex items-start gap-2 mb-1">
                  <MapPin size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                  <p>{bangladeshAddress.address}</p>
                </div>
                {bangladeshAddress.phone && (
                  <div className="flex items-start gap-2 mb-1">
                    <Phone size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{bangladeshAddress.phone}</p>
                  </div>
                )}
                {bangladeshAddress.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-brand-gold flex-shrink-0" />
                    <p>{bangladeshAddress.email}</p>
                  </div>
                )}
              </div>
            ) : addresses.length > 0 ? (
              // Default (non-Bangladesh): slider over India offices
              <div className="w-full max-w-xs text-gray-600 min-h-[180px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    variants={addressVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full pr-8"
                  >
                    <p className="font-semibold mb-1">{addresses[currentIndex % addresses.length].title}</p>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                      <p>{addresses[currentIndex % addresses.length].address}</p>
                    </div>
                    {addresses[currentIndex % addresses.length].phone && (
                      <div className="flex items-start gap-2 mb-1">
                        <Phone size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                        <div className="text-sm leading-relaxed">
                          {Array.isArray(addresses[currentIndex % addresses.length].phone) ? (
                            (addresses[currentIndex % addresses.length].phone as string[]).map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))
                          ) : (
                            <p>{addresses[currentIndex % addresses.length].phone as string}</p>
                          )}
                        </div>
                      </div>
                    )}
                    {addresses[currentIndex % addresses.length].email && (
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-brand-gold flex-shrink-0" />
                        <p>{addresses[currentIndex % addresses.length].email}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Right-side arrow button (only for non-Bangladesh) */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-brand-navy text-white p-1 rounded-full hover:bg-brand-gold transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : null}
          </motion.div>
        </div>

        <div className="text-center text-gray-600 mt-10 text-sm">
          &copy; {new Date().getFullYear()} {content.copyrightText}
        </div>
      </div>
    </footer>
  );
};
