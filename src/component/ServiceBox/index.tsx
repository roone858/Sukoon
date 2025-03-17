
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
    <div className="service-box p-4">
      <div className="group cursor-pointer">
        <div className="service-card bg-[#e6e8eb] group-hover:bg-white group-hover:shadow-2xl rounded-2xl transition-all duration-300 flex flex-col items-center text-center px-6 pb-8 pt-16 relative">
          {/* Icon Container */}
          <div className="icon-container bg-white group-hover:bg-[#0e1c3c] rounded-full shadow-2xl p-4 absolute -top-8">
            <img
              loading="lazy"
              decoding="async"
              src={iconSrc}
              className="w-16 h-16"
              alt={altText}
              title={altText}
              srcSet={`${iconSrc} 128w, ${iconSrc.replace(".png", "-100x100.png")} 100w`}
              sizes="(max-width: 128px) 100vw, 128px"
            />
          </div>

          {/* Text Content */}
          <div className="text-content mt-8">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;