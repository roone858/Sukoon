import { FiClock, FiShare2, FiMessageSquare,  FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  // مقالات المدونة
  const blogPosts = [
    {
      id: 1,
      title: "كيف تختار المرتبة المثالية لنوم صحي؟",
      excerpt: "دليل شامل لاختيار المرتبة المناسبة لنوع جسمك وضعية نومك",
      category: "نصائح المراتب",
      date: "15 نوفمبر 2023",
      readTime: "5 دقائق",
      image: "/blog/mattress-guide.jpg",
      featured: true
    },
    {
      id: 2,
      title: "أسرار النوم العميق: 10 عادات يجب تبنيها",
      excerpt: "تعرف على العادات التي تحسن جودة نومك بشكل ملحوظ",
      category: "صحة النوم",
      date: "5 نوفمبر 2023",
      readTime: "7 دقائق",
      image: "/blog/sleep-habits.jpg",
      featured: true
    },
    {
      id: 3,
      title: "الفرق بين أنواع المراتب: رغوة، زنبركات، لاتكس",
      excerpt: "مقارنة شاملة بين أنواع المراتب المختلفة ومميزات كل نوع",
      category: "نصائح المراتب",
      date: "28 أكتوبر 2023",
      readTime: "8 دقائق",
      image: "/blog/mattress-types.jpg"
    },
    {
      id: 4,
      title: "أفضل وضعيات النوم لتجنب آلام الظهر",
      excerpt: "كيف تنام بطريقة صحيحة لتحافظ على عمودك الفقري",
      category: "صحة النوم",
      date: "20 أكتوبر 2023",
      readTime: "6 دقائق",
      image: "/blog/sleep-positions.jpg"
    },
    {
      id: 5,
      title: "دليل العناية بالمرتبة لإطالة عمرها الافتراضي",
      excerpt: "نصائح عملية للحفاظ على مرتبتك وكأنها جديدة لسنوات",
      category: "عناية بالمراتب",
      date: "10 أكتوبر 2023",
      readTime: "4 دقائق",
      image: "/blog/mattress-care.jpg"
    },
    {
      id: 6,
      title: "تأثير المرتبة على جودة النوم والصحة العامة",
      excerpt: "دراسات علمية توضح كيف تؤثر المرتبة على نومك وصحتك",
      category: "أبحاث النوم",
      date: "1 أكتوبر 2023",
      readTime: "9 دقائق",
      image: "/blog/sleep-health.jpg"
    }
  ];

  // الفئات
//   const categories = [
//     { name: "جميع المقالات", count: blogPosts.length },
//     { name: "نصائح المراتب", count: blogPosts.filter(post => post.category === "نصائح المراتب").length },
//     { name: "صحة النوم", count: blogPosts.filter(post => post.category === "صحة النوم").length },
//     { name: "عناية بالمراتب", count: blogPosts.filter(post => post.category === "عناية بالمراتب").length },
//     { name: "أبحاث النوم", count: blogPosts.filter(post => post.category === "أبحاث النوم").length }
//   ];

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      {/* هيدر الصفحة */}
      <div className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center text-white hover:text-purple-200">
              <FiArrowRight className="ml-1" />
              <span>العودة للمتجر</span>
            </Link>
            <div className="bg-white text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              مدونة سكون
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">مدونة النوم المريح</h1>
          <p className="text-lg text-purple-200 max-w-2xl">
            أحدث المقالات والنصائح حول النوم الصحي واختيار أفضل المراتب من خبراء سكون
          </p>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* الشريط الجانبي */}
          {/* <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800">فئات المدونة</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${index === 0 ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}>
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full mr-2">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4 text-gray-800">النشرة البريدية</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  اشترك ليصلك أحدث مقالاتنا حول النوم الصحي وعروضنا الخاصة
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-r-lg hover:bg-purple-800 transition-colors">
                    اشترك
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          {/* المقالات */}
          <div className="lg:w-3/4">
            {/* المقال المميز */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6 md:p-8">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <span className="mx-4">|</span>
                  <span>{blogPosts[0].date}</span>
                  <span className="mx-4">|</span>
                  <FiClock className="ml-1" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {blogPosts[0].excerpt}
                </p>
                <Link 
                  to={`/blog/${blogPosts[0].id}`}
                  className="inline-block bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  اقرأ المقال
                </Link>
              </div>
            </div>

            {/* بقية المقالات */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.slice(1).map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <FiClock className="ml-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-purple-700 hover:text-purple-800 text-sm font-medium"
                      >
                        اقرأ المزيد
                      </Link>
                      <div className="flex space-x-3 text-gray-400">
                        <button className="hover:text-gray-600">
                          <FiShare2 size={16} />
                        </button>
                        <button className="hover:text-gray-600">
                          <FiMessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ترقيم الصفحات */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-full bg-purple-700 text-white">1</button>
                <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-100">2</button>
                <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-100">3</button>
                <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-100">...</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;