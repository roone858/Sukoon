import { ReactNode } from "react";
type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    
      <div className="bg-gray-50  flex  flex-col items-center   gap-10 p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8">
        {children}
      </div>
  );
};

export default Layout;
