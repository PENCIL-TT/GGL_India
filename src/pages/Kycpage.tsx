import { useEffect } from "react";

const KycIframe = () => {
  useEffect(() => {
    window.open(
      "https://www.gglindia.com/e-kyc",
      "_blank"
    );
  }, []);

  return null;
};

export default KycIframe;
