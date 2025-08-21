import React from 'react';

function Hero() {
  return (
    <>
      <div className="heading-book">
        {/* Optionally add a heading or subtext if needed */}
      </div>
      <div className="moving-ads">
        <div className="moving-ads-track">
          {[
            "bike",
            "auto",
            "cabnonAc",
            "scooty",
            "parcel",
            "cabAc",
            "bike",
            "auto",
            "cabnonAc",
            "scooty",
            "parcel",
            "cabAc",
          ].map((type, index) => (
            <img key={index} src={`/images/${type}.png`} alt={type.replace(/([A-Z])/g, ' $1').toLowerCase()} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
