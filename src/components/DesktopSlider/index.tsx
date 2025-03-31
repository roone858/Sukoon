
const DesktopSlider = () => {
  return (
    <div className="desktop-slider">
      <div className="slideshow__item">
        <a href="/collections/cosmetic" className="media-block-1 block">
          <div className="slideshow__link relative">
            {/* Desktop Image - hidden on mobile */}
            <div className="hidden md:block w-full">
              <img 
                src="//fabulous-ishi.myshopify.com/cdn/shop/files/cosmetic1_732eb2ca-afd0-4105-9429-aa94e9940d4e_1.png?v=1668833031" 
                alt="Desktop Slider Image"
                className="w-full"
              />
            </div>
            
            {/* Mobile Image - hidden on desktop */}
            <div className="md:hidden w-full">
              <img 
                src="//fabulous-ishi.myshopify.com/cdn/shop/files/1_3.png?v=1664183687" 
                alt="Mobile Slider Image"
                className="w-full"
              />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="w-full md:w-5/12 lg:w-5/12 sm:w-6/12 xs:w-9/12 text-right md:text-right  md:ml-0">
                  <div className="sub-title text-[#e38ea5]">Face Beauty</div>
                  <div className="main-title text-[#222222] text-3xl md:text-4xl font-bold my-2">Super Natural</div>
                  <div className="desc text-[#888888] mb-4">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, 
                    graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century.
                  </div>
                  <div className="slider-btn btn inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                    SHOP NOW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DesktopSlider;