import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export const AdmissionPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen h-screen md:max-w-4xl md:h-[90vh] p-0 border-none overflow-hidden bg-white shadow-xl flex items-center justify-center">
        
        <div className="relative w-full h-full flex flex-col">
          
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* Scrollable PDF Viewer */}
          <div className="w-full h-full overflow-y-scroll">
            <iframe
              src="/gglindia.pdf"
              title="Admission PDF"
              className="w-full h-full"
            />
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default AdmissionPopup;
