import ServiceBox from "../ServiceBox";

const ServicesSection = () => {
  const services = [
    {
      iconSrc: "https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/03/icon11.png",
      title: "شحن مجاني في جميع أنحاء المملكة",
      description: "نحن نقدم الشحن المجاني عبر الشحن القياسي للطلبات التي تزيد عن ٢٠٠.٠٠ دولار",
      altText: "شحن مجاني",
    },
    {
      iconSrc: "https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/03/icon13.png",
      title: "ضمان استعادة الاموال",
      description: "إذا لم تكن راضيًا عن منتجنا، فسنعيد لك ثمن الشراء.",
      altText: "ضمان استعادة الأموال",
    },
    {
      iconSrc: "https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/03/icon12.png",
      title: "دعم على مدار ٢٤ ساعة",
      description: "فريق الدعم الودود لدينا متاح لمساعدتك على مدار ٢٤ ساعة يوميًا",
      altText: "دعم عملاء",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          data-aos="flip-left"
          data-aos-delay={index * 100}
          className="h-full"
        >
          <ServiceBox
            iconSrc={service.iconSrc}
            title={service.title}
            description={service.description}
            altText={service.altText}
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;