import React, { useEffect, useState } from "react";

interface Office {
  id: number;
  countryCode: string;
  cityName: string;
  address: string;
  contacts: string[];
  email: string | null;
  mapEmbedUrl: string | null;
}

const LocationsSection: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/offices")
      .then((res) => res.json())
      .then((data: Office[]) => {
        const indiaOffices = data.filter((o) => o.countryCode === "in");
        setOffices(indiaOffices);
        if (indiaOffices.length > 0) setSelectedId(indiaOffices[0].id);
      })
      .catch(() => setOffices([]));
  }, []);

  const selected = offices.find((o) => o.id === selectedId);

  if (offices.length === 0 || !selected) {
    return null;
  }

  return (
    <section className="py-12 bg-white relative">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-gray-800">
          Visit Our Locations
        </h2>
        <p className="text-lg text-gray-600">
          Find us at our convenient office locations across India
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4">
        <div className="w-full md:w-[30%] p-6 shadow rounded-lg flex flex-col gap-4 bg-slate-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Select Location
          </h3>
          {offices.map((office) => (
            <button
              key={office.id}
              onClick={() => setSelectedId(office.id)}
              className={`p-4 text-left border rounded transition-all duration-200 ${
                selectedId === office.id
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
              }`}
            >
              {office.cityName}
            </button>
          ))}
        </div>

        <div className="w-full md:w-[70%] space-y-6">
          <div className="transition-all duration-500 p-6 border border-gray-300 rounded-lg shadow-sm bg-slate-100">
            <h4 className="text-xl font-bold text-gray-800 mb-2">Address:</h4>
            <p className="whitespace-pre-line text-gray-700 mb-4">{selected.address}</p>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Phone:</h4>
            <p className="whitespace-pre-line text-gray-700 mb-4">{selected.contacts.join("\n\n")}</p>
            {selected.email && (
              <>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Email:</h4>
                <p className="text-gray-700">
                  <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">
                    {selected.email}
                  </a>
                </p>
              </>
            )}
          </div>

          {selected.mapEmbedUrl && (
            <div className="relative shadow-2xl rounded-lg overflow-hidden h-[480px]">
              <div className="absolute top-0 left-0 w-full h-[80px] bg-white z-20"></div>
              <div className="absolute top-0 left-0 w-full text-center font-semibold text-black py-2 z-30 bg-[#f6b100]">
                GGL - {selected.cityName} Location
              </div>
              <iframe
                src={selected.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${selected.cityName} Map`}
                className="absolute top-0 left-0 w-full h-full z-10"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
