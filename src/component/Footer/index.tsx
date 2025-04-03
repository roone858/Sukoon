import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

// Types
type FooterLink = { text: string; url: string };
type SocialLink = { name: string; link: string };

// Constants
const HELP_LINKS: FooterLink[] = [
  { text: "سياسة الخصوصية", url: "/privacy-policy" },
  { text: "الإرجاع والاستبدال", url: "/returns-exchanges" },
  { text: "الشحن", url: "/shipping-policy" },
  { text: "الشروط والأحكام", url: "/terms-conditions" },
  { text: "الأسئلة الشائعة", url: "/faq-v2" },
  { text: "مقارنة", url: "/compare" },
  { text: "قائمة الرغبات", url: "/wishlist" },
];

const USEFUL_LINKS: FooterLink[] = [
  { text: "متجرنا", url: "/our-store-2" },
  { text: "زيارة متجرنا", url: "/store-locations" },
  { text: "اتصل بنا", url: "/contact-v1" },
  { text: "من نحن", url: "/about-us" },
  { text: "حسابي", url: "/my-account" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "facebook",
    link: "https://www.facebook.com/share/16AQtjxJ5C/?mibextid=wwXIfr",
  },
  { name: "twitter", link: "https://x.com/mahmodg15?s=21" },
  {
    name: "instagram",
    link: "https://www.instagram.com/suko0n.sa?igsh=MWVsYmVwNXcyaHQwaQ%3D%3D&utm_source=qr",
  },
  {
    name: "snapchat",
    link: "https://www.snapchat.com/add/mahmodg16?share_id=EUyx0HhPRP-buQa8hmMGMA&locale=ar_EG",
  },
];

// Components
const SocialIcon = ({ platform }: { platform: string }) => {
  const icons = useMemo(
    () => ({
      facebook: <FacebookIcon />,
      twitter: <TwitterIcon />,
      instagram: <InstagramIcon />,
      snapchat: <SnapchatIcon />,
    }),
    []
  );

  return icons[platform as keyof typeof icons] || null;
};

const CollapsibleSection = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-200 dark:border-gray-700 py-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full font-medium text-lg text-gray-900"
      aria-expanded={isOpen}
    >
      {title}
      <ChevronIcon isOpen={isOpen} />
    </button>
    {isOpen && <div className="pt-3">{children}</div>}
  </div>
);

const FooterLinksList = ({ links }: { links: FooterLink[] }) => (
  <ul className="space-y-2">
    {links.map((item) => (
      <li key={item.url}>
        <Link
          to={item.url}
          className="block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          {item.text}
        </Link>
      </li>
    ))}
  </ul>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>
        اشترك للحصول على أولوية في عروضنا الجديدة، التخفيضات، محتوى حصري، وأحداث
        خاصة!
      </p>
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="بريدك الإلكتروني"
          className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r transition-colors"
        >
          اشتراك
        </button>
      </div>
    </form>
  );
};

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-right"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <BrandInfo />
            <ContactInfo />
            <SocialLinks links={SOCIAL_LINKS} />
          </div>

          {/* Mobile Collapsible Sections */}
          <div className="md:hidden space-y-0">
            <CollapsibleSection
              title="المساعدة"
              isOpen={openSection === "help"}
              onToggle={() => toggleSection("help")}
            >
              <FooterLinksList links={HELP_LINKS} />
            </CollapsibleSection>

            <CollapsibleSection
              title="روابط مفيدة"
              isOpen={openSection === "links"}
              onToggle={() => toggleSection("links")}
            >
              <FooterLinksList links={USEFUL_LINKS} />
            </CollapsibleSection>

            <CollapsibleSection
              title="النشرة البريدية"
              isOpen={openSection === "newsletter"}
              onToggle={() => toggleSection("newsletter")}
            >
              <NewsletterForm />
            </CollapsibleSection>
          </div>

          {/* Desktop Sections */}
          <div className="hidden md:block space-y-8">
            <div>
              <h3 className="font-medium text-lg mb-4">المساعدة</h3>
              <FooterLinksList links={HELP_LINKS} />
            </div>
          </div>

          <div className="hidden md:block space-y-8">
            <div>
              <h3 className="font-medium text-lg mb-4">روابط مفيدة</h3>
              <FooterLinksList links={USEFUL_LINKS} />
            </div>
          </div>

          <div className="hidden md:block space-y-8">
            <div>
              <h3 className="font-medium text-lg mb-4">النشرة البريدية</h3>
              <NewsletterForm />
              <div className="flex space-x-reverse space-x-4 pt-4">
                <LanguageSelector />
                <CurrencySelector />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterDivider />

      <FooterBottom currentYear={currentYear} />
    </footer>
  );
};

// Sub-components
const BrandInfo = () => (
  <>
    <img
      src={logo}
      alt="شعار إيكوماس"
      className="w-24 -mr-3 -mb-1"
      loading="lazy"
      width={96}
      height={40}
    />
  </>
);

const ContactInfo = () => (
  <ul className="space-y-2 text-sm lg:text:xl">
    <li>العنوان: الرياض، المملكة العربية السعودية</li>
    <li>
      البريد الإلكتروني: <strong>Mahmoddg15@yahoo.com</strong>
    </li>
    <li>
      الهاتف: <strong>+966 555 493 517</strong>
    </li>
    <li>
      <Link
        to="/store-locations"
        className="inline-flex items-center text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        احصل على الاتجاهات
        <ArrowIcon />
      </Link>
    </li>
  </ul>
);

const SocialLinks = ({ links }: { links: SocialLink[] }) => (
  <div className="flex space-x-reverse space-x-4 pt-2">
    {links.map((social) => (
      <Link
        key={social.name}
        to={social.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-purple-600 m-0 ml-5 border-1 border-black rounded-full p-2 dark:hover:text-purple-400 transition-colors"
        aria-label={social.name}
      >
        <SocialIcon platform={social.name} />
      </Link>
    ))}
  </div>
);

const FooterDivider = () => (
  <div className="border-t border-gray-200 dark:border-gray-800"></div>
);

const FooterBottom = ({ currentYear }: { currentYear: number }) => (
  <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
    <p>© {currentYear} سكون. جميع الحقوق محفوظة</p>
    <PaymentMethods />
  </div>
);

const PaymentMethods = () => (
  <img
    src="https://wpecomus.com/furniture/wp-content/uploads/sites/11/2024/07/footer-payment-img.png"
    alt="طرق الدفع"
    className="h-6 mt-4 md:mt-0"
    loading="lazy"
    width={200}
    height={24}
  />
);

// Icons
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 transform transition-transform ${
      isOpen ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-3 h-3 mr-3" viewBox="0 0 8 8" fill="currentColor">
    <path d="M0.861539 8L0 7.13846L5.90769 1.23077H0.615385V0H8V7.38462H6.76923V2.09231L0.861539 8Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 320 512">
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 512 512">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
    />
    <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
    />
  </svg>
);

const SnapchatIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 468.339 468.339" fill="currentColor">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const LanguageSelector = () => (
  <div className="relative group">
    <button className="flex items-center text-sm" aria-label="Select language">
      العربية
      <ChevronIcon isOpen={false} />
    </button>
    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded mt-1 z-10 min-w-[120px] left-0">
      <ul>
        <li>
          <Link
            to="?lang=ar"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-right"
          >
            العربية
          </Link>
        </li>
        <li>
          <Link
            to="?lang=en"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-right"
          >
            English
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

const CurrencySelector = () => (
  <div className="relative group">
    <button className="flex items-center text-sm" aria-label="Select currency">
      <img
        src="https://wpecomus.com/fashion/wp-content/uploads/sites/2/2024/08/sa.svg"
        alt="SAR"
        className="w-4 h-4 ml-1"
        loading="lazy"
      />
      ر.س
      <ChevronIcon isOpen={false} />
    </button>
    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded mt-1 z-10 min-w-[180px] left-0">
      <ul>
        <li>
          <Link
            to="?currency=SAR"
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 justify-end"
          >
            ريال سعودي (ر.س)
            <img
              src="https://wpecomus.com/fashion/wp-content/uploads/sites/2/2024/08/sa.svg"
              alt="SAR"
              className="w-4 h-4 mr-2"
              loading="lazy"
            />
          </Link>
        </li>
        <li>
          <Link
            to="?currency=USD"
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 justify-end"
          >
            دولار أمريكي ($)
            <img
              src="https://wpecomus.com/fashion/wp-content/uploads/sites/2/2024/08/us.svg"
              alt="USD"
              className="w-4 h-4 mr-2"
              loading="lazy"
            />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
