import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbLink } from "../../util/types";
import { FiChevronLeft } from "react-icons/fi";

interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <nav className="flex items-center space-x-2 space-x-reverse text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 space-x-reverse">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <FiChevronLeft className="w-4 h-4 text-gray-400 mx-2" aria-hidden="true" />
            )}
            {link.isActive ? (
              <span className="text-gray-500 font-medium truncate max-w-[150px] sm:max-w-[200px]">
                {link.label}
              </span>
            ) : (
              <Link
                to={link.to}
                className="text-purple-600 hover:text-purple-800 font-medium truncate max-w-[150px] sm:max-w-[200px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;