import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ScrollToTopLinkProps extends LinkProps {
  children: React.ReactNode; // children هي عنصر React أو نص
}

const ScrollToTopLink: React.FC<ScrollToTopLinkProps> = ({ to, children, ...rest }) => (
  <Link
    to={to}
    onClick={() => window.scrollTo(0, 0)}
    {...rest} // تمرير أي خصائص إضافية إلى Link
  >
    {children}
  </Link>
);

export default ScrollToTopLink;