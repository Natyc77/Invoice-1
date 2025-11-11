import React, { useEffect } from 'react';

const AdPlaceholder = ({ adSlot, adClient = 'ca-pub-XXXXXXXXXXXXXXXX', className, style, adFormat = "auto", fullWidthResponsive = "true" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      ></ins>
    </div>
  );
};

export default AdPlaceholder;