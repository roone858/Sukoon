const ServiceBox = ({
  iconSrc,
  title,
  description,
  altText,
}: {
  iconSrc: string;
  title: string;
  description: string;
  altText: string;
}) => {
  return (
    <div className="w-full p-2 xs:p-3 sm:p-4">
      <div className="group cursor-pointer h-full">
        <div className="bg-gray-100 group-hover:bg-white group-hover:shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 flex flex-col sm:flex-row md:flex-col items-center text-center sm:text-left md:text-center px-4 py-12 sm:py-6 md:py-12 relative">
          {/* Icon Container - Responsive positioning */}
          <div className="bg-white group-hover:bg-[#0e1c3c] rounded-full shadow-lg sm:shadow-xl p-3 absolute -top-6 sm:static sm:top-auto sm:mr-4 md:mr-0 md:absolute md:-top-8">
            <img
              loading="lazy"
              decoding="async"
              src={iconSrc}
              className="w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
              alt={altText}
              title={altText}
              srcSet={`${iconSrc} 128w, ${iconSrc.replace(".png", "-100x100.png")} 100w`}
              sizes="(max-width: 128px) 100vw, 128px"
            />
          </div>

          {/* Text Content - Responsive spacing */}
          <div className="mt-8 sm:mt-0 md:mt-8 px-2 sm:px-0">
            <h3 className="text-lg xs:text-xl sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-1 md:mb-3">
              {title}
            </h3>
            <p className="text-gray-600 text-sm xs:text-base sm:text-xs md:text-sm lg:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;