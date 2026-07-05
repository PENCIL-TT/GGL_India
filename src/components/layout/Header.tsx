import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Linkedin, Facebook } from "lucide-react";

// ORIGINAL COUNTRY SELECTOR (India)
import CountrySelector from "../common/CountrySelector";

// NEW BANGLADESH COUNTRY SELECTOR
import BCountrySelector from "../common/BCountrySelector";
import { useContent } from "@/hooks/use-content";

interface HeaderContent {
  logoImage: string;
  partnerLogoImage: string;
  partnerLogoLink: string;
  ctaButtonText: string;
  socialLinks: { linkedin: string; facebook: string };
}

const defaultHeaderContent: HeaderContent = {
  logoImage: "/lovable-uploads/GGL.png",
  partnerLogoImage: "/1GlobalEnterprises.png",
  partnerLogoLink: "https://1ge.sg",
  ctaButtonText: "Contact / Quote",
  socialLinks: { linkedin: "https://www.linkedin.com/company/gglus/", facebook: "https://www.facebook.com/gglusa" },
};

export const Header = () => {
  const { content } = useContent("header", defaultHeaderContent);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect Bangladesh section
  const isBangladesh = location.pathname.startsWith("/bangladesh");
  const base = isBangladesh ? "/bangladesh" : "";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);

  // Build target path based on base (India vs Bangladesh)
  const buildPath = (path: string) => {
    if (path === "" || path === "/") return base || "/";
    return `${base}${path}`;
  };

  const homePath = base || "/";

  // Sticky scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setIsInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (path: string, scrollToId?: string) => {
    const targetPath = buildPath(path);
    setIsMobileMenuOpen(false);

    if (location.pathname === targetPath && scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(targetPath);
      setTimeout(() => {
        if (scrollToId) {
          const el = document.getElementById(scrollToId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    }
  };

  const handleLogoClick = () => {
    navigate(homePath);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white py-2 shadow-md" : "bg-white/95 py-2"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <img
              src={content.logoImage}
              alt="GGL Logo"
              onClick={handleLogoClick}
              className="h-16 w-auto cursor-pointer transition-all duration-300 object-fill"
            />
            <div className="h-8 w-px bg-gray-200 hidden md:block" />

            <a
              href={content.partnerLogoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit 1 Global Enterprises Website"
            >
              <img
                src={content.partnerLogoImage}
                alt="1 Global Enterprises Logo"
                className="hidden md:block h-10 w-auto object-contain transition-all duration-300"
              />
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-md p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex gap-6 items-center relative">

            {/* HOME */}
            <button
              onClick={() => handleNavClick("")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname === homePath ? "text-brand-gold" : ""
              }`}
            >
              Home
            </button>

            {/* INFO DROPDOWN */}
            <div className="relative" ref={infoRef}>
              <button
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                className={`text-gray-800 hover:text-brand-gold font-medium ${
                  [buildPath("/about"), buildPath("/careers")].includes(location.pathname)
                    ? "text-brand-gold"
                    : ""
                }`}
              >
                Info
              </button>

              {isInfoOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-50 min-w-[160px]">
                  <button
                    onClick={() => {
                      handleNavClick("/about");
                      setIsInfoOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    About Us
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick("/careers");
                      setIsInfoOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Careers
                  </button>
                </div>
              )}
            </div>

            {/* SERVICES */}
            <button
              onClick={() => handleNavClick("/services")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname.startsWith(buildPath("/services"))
                  ? "text-brand-gold"
                  : ""
              }`}
            >
              Services
            </button>

            {/* GLOBAL PRESENCE */}
            <button
              onClick={() => handleNavClick("/global-presence")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname === buildPath("/global-presence")
                  ? "text-brand-gold"
                  : ""
              }`}
            >
              Global Presence
            </button>

            {/* INDIA ONLY – eKYC */}
            {!isBangladesh && (
              <Link
                to="/kyc-details"
                className={`text-gray-800 hover:text-brand-gold font-medium ${
                  location.pathname === "/kyc-details" ? "text-brand-gold" : ""
                }`}
              >
                e-KYC
              </Link>
            )}

            {/* COUNTRY SELECTOR SWITCH */}
            {isBangladesh ? <BCountrySelector /> : <CountrySelector />}

            {/* CONTACT BUTTON */}
            <button
              onClick={() => handleNavClick("/contact", "contact-form")}
              className="px-5 py-2 bg-[#F6B100] text-black rounded-full hover:bg-[#FFCC33] font-medium"
            >
              {content.ctaButtonText}
            </button>
          </nav>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300`}
        >
          <nav className="flex flex-col gap-4 border-t mt-4 border-gray-100">

            <button onClick={() => handleNavClick("")}>Home</button>
            <button onClick={() => handleNavClick("/about")}>About Us</button>
            <button onClick={() => handleNavClick("/services")}>Services</button>
            <button onClick={() => handleNavClick("/careers")}>Careers</button>
            <button onClick={() => handleNavClick("/global-presence")}>Global Presence</button>

            {!isBangladesh && (
              <Link to="/e-kyc" onClick={() => setIsMobileMenuOpen(false)} className="text-left">
                e-KYC
              </Link>
            )}

            {/* MOBILE COUNTRY SELECTOR */}
            {isBangladesh ? <BCountrySelector /> : <CountrySelector />}

            <button
              onClick={() => handleNavClick("/contact")}
              className="px-4 py-2 bg-brand-gold rounded-md"
            >
              Get A Quote
            </button>

            <div className="flex items-center gap-4 py-3">
              <a href={content.socialLinks.linkedin} target="_blank">
                <Linkedin size={20} />
              </a>
              <a href={content.socialLinks.facebook} target="_blank">
                <Facebook size={20} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
