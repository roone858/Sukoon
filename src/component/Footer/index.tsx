import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaSnapchat } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

// Types
type FooterLink = { text: string; url: string };
type SocialLink = { name: string; link: string; icon: React.ReactNode };

// Constants
const HELP_LINKS: FooterLink[] = [
  { text: "سياسة الخصوصية", url: "/privacy-policy" },
  { text: "الإرجاع والاستبدال", url: "/returns-exchanges" },
  { text: "الشحن", url: "/shipping-policy" },
  { text: "الشروط والأحكام", url: "/terms-conditions" },
  { text: "الأسئلة الشائعة", url: "/faq" },
];

const COMPANY_LINKS: FooterLink[] = [
  { text: "متجرنا", url: "/our-store" },
  { text: "زيارة متجرنا", url: "/store-locations" },
  { text: "اتصل بنا", url: "/contact" },
  { text: "من نحن", url: "/about-us" },
  { text: "حسابي", url: "/my-account" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "facebook",
    link: "https://facebook.com",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    name: "twitter",
    link: "https://twitter.com",
    icon: <FaTwitter className="w-5 h-5" />,
  },
  {
    name: "instagram",
    link: "https://instagram.com",
    icon: <FaInstagram className="w-5 h-5" />,
  },
  {
    name: "snapchat",
    link: "https://snapchat.com",
    icon: <FaSnapchat className="w-5 h-5" />,
  },
];

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    help: false,
    company: false,
    newsletter: false,
  });

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="شعار سكون" 
                className="h-12 w-auto" 
                loading="lazy"
              />
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MdLocationOn className="flex-shrink-0 mt-1 text-purple-600" />
                <p>الرياض، المملكة العربية السعودية</p>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="flex-shrink-0 text-purple-600" />
                <a href="mailto:Mahmoddg15@yahoo.com" className="hover:text-purple-600">
                  Mahmoddg15@yahoo.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="flex-shrink-0 text-purple-600" />
                <a href="tel:+966555493517" className="hover:text-purple-600">
                  +966 555 493 517
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className="md:hidden space-y-4">
            <AccordionSection 
              title="المساعدة" 
              isOpen={expandedSections.help}
              onToggle={() => toggleSection('help')}
            >
              <FooterLinks links={HELP_LINKS} />
            </AccordionSection>

            <AccordionSection 
              title="الشركة" 
              isOpen={expandedSections.company}
              onToggle={() => toggleSection('company')}
            >
              <FooterLinks links={COMPANY_LINKS} />
            </AccordionSection>

            <AccordionSection 
              title="النشرة البريدية" 
              isOpen={expandedSections.newsletter}
              onToggle={() => toggleSection('newsletter')}
            >
              <NewsletterForm />
            </AccordionSection>
          </div>

          {/* Desktop Columns */}
          <div className="hidden md:block">
            <h3 className="text-lg font-medium mb-4">المساعدة</h3>
            <FooterLinks links={HELP_LINKS} />
          </div>

          <div className="hidden md:block">
            <h3 className="text-lg font-medium mb-4">الشركة</h3>
            <FooterLinks links={COMPANY_LINKS} />
          </div>

          <div className="hidden md:block">
            <h3 className="text-lg font-medium mb-4">النشرة البريدية</h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {currentYear} سكون. جميع الحقوق محفوظة
            </p>
            
            <div className="flex items-center gap-4">
              <img 
                src="https://wpecomus.com/furniture/wp-content/uploads/sites/11/2024/07/footer-payment-img.png" 
                alt="طرق الدفع" 
                className="h-6"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components
const AccordionSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-left font-medium"
      aria-expanded={isOpen}
    >
      <span>{title}</span>
      <svg
        className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    {isOpen && <div className="pt-3">{children}</div>}
  </div>
);

const FooterLinks = ({ links }: { links: FooterLink[] }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link.url}>
        <Link
          to={link.url}
          className="block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
        >
          {link.text}
        </Link>
      </li>
    ))}
  </ul>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    setEmail("");
    toast.success("تم الاشتراك بنجاح!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm">
        اشترك للحصول على عروض حصرية وأحدث المنتجات
      </p>
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="بريدك الإلكتروني"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 text-sm"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-l-lg transition-colors text-sm"
        >
          اشتراك
        </button>
      </div>
    </form>
  );
};

export default Footer;