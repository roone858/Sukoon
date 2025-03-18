import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          من نحن
        </h1>

        {/* مقدمة عن الشركة */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            مرحبًا بكم في شركة سكون
          </h2>
          <p className="text-gray-600 leading-relaxed">
            نحن في شركة سكون نؤمن بأن النوم الجيد هو أساس الحياة
            الصحية والسعيدة. منذ تأسيسنا في عام 2010، كنا ملتزمين بتوفير أفضل
            المراتب التي توفر الراحة والدعم اللازمين لنوم عميق ومريح. نقدم
            مجموعة واسعة من المراتب التي تناسب جميع الاحتياجات والأذواق، بدءًا
            من المراتب الإسفنجية إلى المراتب الفائقة التكنولوجيا.
          </p>
        </div>

        {/* مهمتنا */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">مهمتنا</h2>
          <p className="text-gray-600 leading-relaxed">
            مهمتنا هي تحسين جودة حياة عملائنا من خلال توفير مراتب عالية الجودة
            تساعدهم على النوم بشكل أفضل. نهدف إلى أن نكون الخيار الأول لكل من
            يبحث عن الراحة والرفاهية في نومه.
          </p>
        </div>

        {/* رؤيتنا */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">رؤيتنا</h2>
          <p className="text-gray-600 leading-relaxed">
            نطمح إلى أن نصبح الشركة الرائدة في صناعة المراتب في المنطقة، من خلال
            الابتكار والجودة والاهتمام بتفاصيل راحة عملائنا.
          </p>
        </div>

        {/* قيمنا */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">قيمنا</h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>الجودة: نقدم منتجات عالية الجودة تدوم طويلاً.</li>
            <li>الراحة: نحرص على توفير أقصى درجات الراحة لعملائنا.</li>
            <li>الابتكار: نستخدم أحدث التقنيات في صناعة المراتب.</li>
            <li>خدمة العملاء: نقدم خدمة عملاء مميزة ودعمًا مستمرًا.</li>
          </ul>
        </div>

        {/* معلومات الاتصال */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            تواصل معنا
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            نحن هنا لمساعدتك! إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة في
            اختيار المرتبة المناسبة، فلا تتردد في الاتصال بنا.
          </p>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">الهاتف:</span> +966 555 493 517
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">البريد الإلكتروني:</span>{" "}
              Mahmoddg15@yahoo.com
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">العنوان:</span> الرياض، المملكة
              العربية السعودية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
