import React from 'react';

function PromoSection() {
  return (
    <section className="section2">
      <div className="section2-text">
        <h1 className="p1">Get Quick Rides, Low Fares</h1>
        <p className="p2">
          In Rapido we ensure our <br />
          customers get rides quickly at the <br />
          most affordable prices.
        </p>
        <button>BOOK A RIDE</button>
      </div>

      <div className="section2-img">
        {[
          {
            src: "https://indian-drivers.com/wp-content/uploads/elementor/thumbs/1-1-qa7nt1qiji0e7f3he390he0nxxxsbmlewgxljwpy8w.png",
            alt: "Promo 1",
            className: "img1",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2XiokmGbUkwwQ7-QuIdHOjqkKVkE5_gevg&s",
            alt: "Promo 2",
            className: "img2",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl1t5qQTGY4iSqqDmeL2xbmcoUjgtKa8aC9g&s",
            alt: "Promo 3",
            className: "img3",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMyQaXd_slk03gvBp0Ftlro5cAX_Fs4aqeCA&s",
            alt: "Promo 4",
            className: "img4",
          },
        ].map((img, index) => (
          <img key={index} className={img.className} src={img.src} alt={img.alt} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

export default PromoSection;
