const PromoSection = () => {
     return (
       <div className="bg-purple-800 text-white py-12">
         <div className="container mx-auto px-4 text-center">
           <h2 className="text-2xl md:text-3xl font-bold mb-4">
             تسوق بثقة مع ضمان سكون
           </h2>
           <p className="text-purple-100 max-w-2xl mx-auto mb-6">
             استمتع بتجربة تسوق فريدة وضمان 10 سنوات على جميع منتجاتنا
           </p>
           <button className="bg-white text-purple-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold shadow-lg transition-colors">
             تصفح جميع المنتجات
           </button>
         </div>
       </div>
     );
   };
   
   export default PromoSection;