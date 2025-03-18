import React from "react";
import logo from "../../assets/logo.png";
import ScrollToTopLink from "../MyLink";

// Define types for social media links
type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

// Define types for footer links
type FooterLinkProps = {
  href: string;
  label: string;
};

// Reusable Social Media Link Component
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <li>
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">{label}</span>
      {icon}
    </a>
  </li>
);

// Reusable Footer Link Component
const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => (
  <li>
    <ScrollToTopLink className="text-gray-700 transition hover:text-gray-700/75" to={href}>
      {label}
    </ScrollToTopLink>
  </li>
);

// Main Footer Component
const Footer: React.FC = () => {
  const footerLinks = [
    { href: "#", label: "من نحن" },
    { href: "shipping-policy", label: "سياسة الشحن والتسليم" },
    { href: "#", label: "تاريخنا" },
    { href: "#", label: "خدماتنا" },
    { href: "#", label: "مشاريعنا" },
    { href: "#", label: "المدونة" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/16AQtjxJ5C/?mibextid=wwXIfr",
      icon: (
        <svg
          className="size-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "فيسبوك",
    },
    {
      href: "https://www.instagram.com/suko0n.sa?igsh=MWVsYmVwNXcyaHQwaQ%3D%3D&utm_source=qr",
      icon: (
        <svg
          className="size-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "إنستغرام",
    },
    {
      href: "https://x.com/mahmodg15?s=21",
      icon: (
        <svg
          className="size-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      label: "تويتر",
    },
    {
      href: "https://www.snapchat.com/add/mahmodg16?share_id=EUyx0HhPRP-buQa8hmMGMA&locale=ar_EG",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={24}
          height={24}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C8.06 2 4.85 5.21 4.85 9.15C4.85 11.78 5.74 12.93 7.33 13.93C7.76 14.2 7.67 14.57 7.42 14.95C7.07 15.49 6.47 16.37 4.94 16.68C4.68 16.73 4.5 16.96 4.5 17.22C4.5 17.69 5.34 18.13 6.03 18.22C6.38 18.26 6.69 18.19 6.98 18.09C7.17 18.03 7.42 17.94 7.52 17.95C7.57 18.25 7.61 18.59 7.67 18.88C7.89 19.95 8.52 20.63 9.63 21.14C10.24 21.41 11.14 21.65 12.02 21.65H12.04C12.92 21.65 13.82 21.41 14.43 21.14C15.54 20.63 16.17 19.95 16.39 18.88C16.45 18.59 16.49 18.25 16.54 17.95C16.64 17.94 16.89 18.03 17.08 18.09C17.37 18.19 17.68 18.26 18.03 18.22C18.72 18.13 19.56 17.69 19.56 17.22C19.56 16.96 19.38 16.73 19.12 16.68C17.59 16.37 16.99 15.49 16.64 14.95C16.39 14.57 16.3 14.2 16.73 13.93C18.32 12.93 19.21 11.78 19.21 9.15C19.21 5.21 15.94 2 12 2Z"
          />
        </svg>
      ),
      label: "سناب شات",
    },
  ];

  return (
    <footer className="bg-gray-100 mt-20">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center bg-gray-100 text-teal-600">
          <img src={logo} className="w-24 bg-gray-100" alt="Logo" />
        </div>

        <p className="mx-auto max-w-md text-center leading-relaxed text-gray-500">
          نوفر لكم أفضل المراتب التي توفر الراحة والدعم المثالي للجسم. تصفح
          مجموعتنا واكتشف المراتب التي تناسب احتياجاتك.
        </p>

    

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {footerLinks.map((link, index) => (
            <FooterLink key={index} href={link.href} label={link.label} />
          ))}
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
