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
    <div className="service_box    ">
      <div className="container">
        <div className="group  cursor-pointer">
          <div className="services group-hover:-translate-y-5 group-hover:bg-[#fff] group-hover:shadow-2xl transition-all duration-300 relative bg-[#e6e8eb] rounded-2xl flex flex-col justify-center items-center text-center min-w-24 px-10 pb-10 ">
            <div className="service_img  bg-white group-hover:bg-[#0e1c3c] rounded-full transform  -translate-y-1/2  shadow-2xl p-2">
              <img
                loading="lazy"
                decoding="async"
                width="64"
                height="64"
                src={iconSrc}
                className="p-6 w-28"
                alt={altText}
                title={altText}
                srcSet={`${iconSrc} 128w, ${iconSrc.replace(
                  ".png",
                  "-100x100.png"
                )} 100w`}
                sizes="(max-width: 128px) 100vw, 128px"
              />
            </div>
            <div className="service_text   transform -translate-y-1/4 p-1  ">
              <h3 className="text-2xl font-bold">{title}</h3>
              <div className="cz_wpe_content text-16 pt-5">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
