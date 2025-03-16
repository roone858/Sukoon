import ServiceBox from "../ServiceBox";

const ServicesSection = () => {
  const services = [
    {
      iconSrc:
        "https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/03/icon11.png",
      title: "شحن مجاني في جميع أنحاء المملكة",
      description:
        "نحن نقدم الشحن المجاني عبر الشحن القياسي للطلبات التي تزيد عن ٢٠٠.٠٠ دولار",
      altText: "قالب ووردبريس متجر أثاث 2 16",
    },
    {
      iconSrc:
        "https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/03/icon13.png",
      title: "ضمان استعادة الاموال فسنعيد لك",
      description: "إذا لم تكن راضيًا عن منتجنا، فسنعيد لك ثمن الشراء.",
      altText: "قالب ووردبريس متجر أثاث 2 24",
    },
    {
      iconSrc:
        "https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/03/icon12.png",
      title: "دعم ودود عبر الإنترنت على مدار ٢٤",
      description:
        "فريق الدعم الودود لدينا متاح لمساعدتك على مدار ٢٤ ساعة يوميًا",
      altText: "قالب ووردبريس متجر أثاث 2 62",
    },
  ];

  return (
    <div className="flex flex-row gap-y-20 gap-10 px-10 flex-wrap">
      {services.map((service, index) => (
        <div
          data-aos="fade-up"
          key={index}
          className="flex-1 h-full"
          data-id={`service-${index}`}
          data-element_type="container"
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
