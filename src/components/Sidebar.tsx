import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, MapPin, Globe, ExternalLink, Phone, Mail, Home, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface City {
  name: string;
  lat: number;
  lng: number;
  address: string;
  contacts: string[];
  email?: string | null;
}

interface Country {
  code: string;
  name: string;
  lat: number;
  lng: number;
  cities: City[];
}

interface OfficeRecord {
  countryCode: string;
  countryName: string;
  countryLat: number | null;
  countryLng: number | null;
  cityName: string;
  lat: number | null;
  lng: number | null;
  address: string;
  contacts: string[];
  email: string | null;
}

function groupOfficesByCountry(offices: OfficeRecord[]): Country[] {
  const byCountry = new Map<string, Country>();

  for (const office of offices) {
    if (!byCountry.has(office.countryName)) {
      byCountry.set(office.countryName, {
        code: office.countryCode,
        name: office.countryName,
        lat: Number(office.countryLat) || 0,
        lng: Number(office.countryLng) || 0,
        cities: [],
      });
    }
    byCountry.get(office.countryName)!.cities.push({
      name: office.cityName,
      lat: Number(office.lat) || 0,
      lng: Number(office.lng) || 0,
      address: office.address,
      contacts: office.contacts,
      email: office.email,
    });
  }

  return [...byCountry.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null);
  const [selectedCityIndexes, setSelectedCityIndexes] = useState<{ [countryName: string]: number }>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    iframeRef.current = document.querySelector('iframe');
  }, []);

  useEffect(() => {
    fetch('/api/offices')
      .then((res) => res.json())
      .then((data: OfficeRecord[]) => setSortedCountries(groupOfficesByCountry(data)))
      .catch(() => setSortedCountries([]));
  }, []);

  // Set default selected location to the first city of the first country
  useEffect(() => {
    if (sortedCountries.length > 0 && sortedCountries[0].cities.length > 0) {
      const firstCountry = sortedCountries[0];
      const firstCity = firstCountry.cities[0];
      setSelectedLocation(firstCity);
      setExpandedCountry(firstCountry.name);

      // Initialize selected city indexes for all countries to 0 (first city)
      const initialIndexes: { [countryName: string]: number } = {};
      sortedCountries.forEach(country => {
        initialIndexes[country.name] = 0;
      });
      setSelectedCityIndexes(initialIndexes);

      // Navigate to the first location on map
      navigateToLocation(firstCity.lat, firstCity.lng, firstCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedCountries]);

  const navigateToLocation = (lat: number, lng: number, city: City | null = null) => {
    // Find the iframe in the ContactMapContainer
    const iframe = document.querySelector('iframe[title="Interactive Map"]') as HTMLIFrameElement;
    if (iframe) {
      try {
        // Use higher zoom level for city-specific locations
        const zoomLevel = city ? 10 : 10;
        const baseUrl = "https://www.google.com/maps/d/u/0/embed?mid=1d5jZQlEjnKqnsGHvdJWR5wB_-fcQ_Zk&ehbc=2E312F";
        const newSrc = `${baseUrl}&z=${zoomLevel}&ll=${lat},${lng}&hl=en&ehbc=2E312F&output=embed`;
        iframe.src = newSrc;
        if (city) {
          setSelectedLocation(city);
        }
      } catch (e) {
        console.error("Navigation failed:", e);
      }
    }
  };

  const handleCitySelection = (country: Country, cityIndex: number) => {
    setSelectedCityIndexes(prev => ({
      ...prev,
      [country.name]: cityIndex
    }));

    const selectedCity = country.cities[cityIndex];
    navigateToLocation(selectedCity.lat, selectedCity.lng, selectedCity);
  };

  const isSelectedCity = (countryName: string, cityIndex: number) => {
    return selectedCityIndexes[countryName] === cityIndex;
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div className={`my-3 w-full ${isMobile ? 'max-w-[95%]' : 'max-w-[520px]'} mx-auto px-2 md:px-0`}>
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-t-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <h2 className="font-bold text-lg">Global Locations</h2>
          </div>
          {isMobile}
        </div>

        {/* Content area */}
        <ScrollArea className={`h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] bg-white rounded-b-xl shadow-md`}>
          <div className="p-4">
            <div className="mt-4 space-y-3">
              <Accordion type="single" collapsible value={expandedCountry || ""} className="w-full space-y-3">
                {sortedCountries.map(country => {
                  return (
                    <AccordionItem
                      key={country.name}
                      value={country.name}
                      className="border border-red-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
                    >
                      <AccordionTrigger
                        onClick={() => {
                          setExpandedCountry(expandedCountry === country.name ? null : country.name);
                          navigateToLocation(country.lat, country.lng);
                        }}
                        className="rounded-t-md hover:bg-amber-50 transition-colors px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={`/${country.code}.svg`}
                            alt={`${country.name} flag`}
                            className="w-6 h-6 rounded-sm object-cover shadow-sm"
                          />
                          <span className="font-medium">{country.name}</span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="bg-gradient-to-b from-red-50/30 to-white px-3 py-2">
                        <div className="space-y-2">
                          {/* All cities displayed as buttons */}
                          <div className="space-y-2">
                            {country.cities.map((city, index) => (
                              <div key={index} className="w-full">
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    "w-full justify-start text-sm p-2 h-auto rounded-md border transition-all shadow-sm",
                                    isSelectedCity(country.name, index)
                                      ? "bg-red-100 hover:bg-red-150 border-red-300 text-red-800"
                                      : "bg-white hover:bg-red-50 border-gray-100 hover:border-red-200"
                                  )}
                                  onClick={() => {
                                    handleCitySelection(country, index);
                                    if (isMobile) {
                                      setTimeout(() => setSelectedLocation({ ...city }), 50);
                                    }
                                  }}
                                >
                                  <MapPin className="w-4 h-4 mr-2 text-red-600 flex-shrink-0" />
                                  <span className="font-medium truncate">{city.name}</span>
                                  <ChevronRight className="w-4 h-4 ml-auto text-red-300" />
                                </Button>

                                {/* Show address details for selected city */}
                                {isSelectedCity(country.name, index) && city.address && (
                                  <div className="mt-2 p-3 bg-gradient-to-br from-red-50 to-white rounded-lg border border-red-200 shadow text-sm animate-in fade-in duration-300 w-full">
                                    <h4 className="font-semibold text-red-700 mb-2 pb-1 border-b border-red-100 flex items-center">
                                      <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">{city.name} Office</span>
                                    </h4>

                                    <div className="flex items-start mb-2 group hover:bg-red-50/50 p-2 rounded-md transition-colors w-full">
                                      <Home className="w-4 h-4 mr-2 text-red-500 mt-1 flex-shrink-0 group-hover:text-red-600 transition-colors" />
                                      <p className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm break-words w-full overflow-hidden">{city.address}</p>
                                    </div>

                                    {city.contacts && city.contacts.length > 0 && (
                                      <div className="flex items-start mb-2 group hover:bg-red-50/50 p-2 rounded-md transition-colors w-full">
                                        <Phone className="w-4 h-4 mr-2 text-red-500 mt-1 flex-shrink-0 group-hover:text-red-600 transition-colors" />
                                        <div className="space-y-1 w-full overflow-hidden">
                                          {city.contacts.map((contact, idx) => (
                                            <p key={idx} className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm break-words">{contact}</p>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {city.email && (
                                      <div className="flex items-start group hover:bg-red-50/50 p-2 rounded-md transition-colors w-full">
                                        <Mail className="w-4 h-4 mr-2 text-red-500 mt-1 flex-shrink-0 group-hover:text-red-600 transition-colors" />
                                        <a
                                          href={`mailto:${city.email}`}
                                          className="text-red-600 hover:text-red-800 hover:underline flex items-center text-sm break-words w-full overflow-hidden"
                                        >
                                          {city.email}
                                          <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
