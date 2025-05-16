import demo from "../../assets/bed-mattress.webp";
const categories = [
  {
    id: 1,
    title: "مرتبــــــة اينريجــي",
    image:
      "https://xtratheme.com/elementor/gadgets/wp-content/uploads/sites/108/2023/04/cat2-1.jpg",
    link: "https://xtratheme.com/elementor/gadgets/product-category/headphones/",
  },
  {
    id: 2,
    title: "مرتبــــــة فيلينـــق",
    image:
      "https://xtratheme.com/elementor/gadgets/wp-content/uploads/sites/108/2023/04/cat3-1.jpg",
    link: "https://xtratheme.com/elementor/gadgets/product-category/smart-phones/",
  },
  {
    id: 3,
    title: "مرتبــــــة مينينـــق",
    image:
      "https://xtratheme.com/elementor/gadgets/wp-content/uploads/sites/108/2023/04/cat5-1.jpg",
    link: "https://xtratheme.com/elementor/gadgets/product-category/laptops/",
  },
  {
    id: 4,
    title: "مرتبــــــة كمفــورت",
    image:
      "https://xtratheme.com/elementor/gadgets/wp-content/uploads/sites/108/2023/04/cat1-1.jpg",
    link: "https://xtratheme.com/elementor/gadgets/product-category/smart-watches/",
  },
  {
    id: 5,
    title: "مرتبــــــة ايليجنـــت",
    image:
      "https://xtratheme.com/elementor/gadgets/wp-content/uploads/sites/108/2023/04/cat4-1.jpg",
    link: "https://xtratheme.com/elementor/gadgets/product-category/tablets/",
  },
];

const CategorySection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <div
              key={category.id}
              className="block overflow-hidden bg-gray-50 w-50 h-50  rounded-full  hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={demo}
                  alt={category.title}
                  className="w-full p-5  object-cover"
                />
              </div>
            </div>
            <div className="px-4 py-4  text-center bg-white rounded-3xl transform -translate-y-8 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
