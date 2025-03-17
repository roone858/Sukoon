import React from "react";

const ExploreSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="widget-container">
          <div className="cz_image">
            <div className="cz_image_in">
              <div className="cz_main_image">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2.jpg"
                  className="w-full h-auto rounded-lg shadow-lg"
                  srcSet="https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2.jpg 623w, https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2-269x300.jpg 269w, https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2-600x670.jpg 600w"
                  sizes="(max-width: 623px) 100vw, 623px"
                  alt="Furniture"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text and Button Section */}
      <div className="w-full lg:w-1/2 lg:pl-8">
        <div className="elementor-element elementor-element-7a61092 elementor-widget elementor-widget-cz_title">
          <div className="elementor-widget-container">
            <div className="cz_title clr cz_mobile_text_center cz_title_pos_inline">
              <div className="cz_title_content">
                <div className="cz_wpe_content">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-right">
                    يستكشف<br />
                    اكسترا <span className="text-purple-900">أثاث</span>{" "}
                    <span className="text-purple-900">المنتجر</span> لآخر<br />
                    مجموعة
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="widget-cz_title mt-6">
          <div className="widget-container">
            <div className="title">
              <div className="title_content">
                <div className="wpe_content">
                  <p className="text-lg text-gray-700 mb-6 text-center lg:text-right">
                    الأريكة، والسرير، والمكتب، والكراسي، والطاولات، هناك شيء
                    ممتع جدًا في التجول ببطء عبر متاجر الأثاث.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="elementor-element elementor-element-dfa3f06 elementor-widget elementor-widget-cz_button">
          <div className="elementor-widget-container">
            <div className="text-center lg:text-right">
              <a
                href="https://xtratheme.com/arabic-elementor/furniture-shop-2/products/"
                className="cz_btn cz_btn_txt_no_fx cz_btn_no_fx inline-block bg-purple-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-500 transition-colors"
              >
                <span>
                  <strong>انظر المجموعة</strong>
                </span>
           
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;