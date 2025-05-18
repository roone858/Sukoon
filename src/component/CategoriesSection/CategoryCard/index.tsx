import { Link } from "react-router-dom";
import "./style.css";
import { useMemo } from "react";

interface CategoryCardProps {
  image: string;
  title: string;
  itemCount: number;
  link: string;
}

const pastelColors = [
  "from-purple-50 to-purple-100",
  "from-pink-50 to-pink-100",
  "from-blue-50 to-blue-100",
  "from-green-50 to-green-100",
  "from-yellow-50 to-yellow-100",
  "from-red-50 to-red-100",
  "from-indigo-50 to-indigo-100",
  "from-teal-50 to-teal-100",
];
 function resizeCloudinaryImage(originalUrl :string, width = 400) {
  return originalUrl.replace('/upload/', `/upload/w_${width}/`);
}
export default function CategoryCard({ image, title, itemCount, link }: CategoryCardProps) {
  // Get random pastel color gradient
  const randomGradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  }, []);

  return (
    <div
      className={`category-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${randomGradient}`}
      style={{ width: "156px" }}
    >
      <figure className="img-hover-scale overflow-hidden flex items-center justify-center p-4">
        <Link to={link}>
          <img 
            src={resizeCloudinaryImage(image, 200)} 
            alt={title}
            className="h-24 w-auto object-contain transform hover:scale-110 transition-transform duration-300"
          />
        </Link>
      </figure>
      <div className="p-3 text-center">
        <h6 className="text-sm font-semibold text-gray-800 mb-1">
          <Link to={link} className="hover:text-purple-600 transition-colors duration-300">
            {title}
          </Link>
        </h6>
        <span className="text-xs text-gray-500">{itemCount} عنصر</span>
      </div>
    </div>
  );
} 