// components/Common/SectionTitle.tsx
interface SectionTitleProps {
     title: string;
     children?: React.ReactNode;
   }
   
   export const SectionTitle = ({ title, children }: SectionTitleProps) => (
     <div className="section-title">
       <div className="title">
         <h3 className="text-xl xs:text-2xl font-bold text-gray-800 mb-2 xs:mb-4">{title}</h3>
         {children}
       </div>
     </div>
   );