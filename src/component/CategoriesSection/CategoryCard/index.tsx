import { Link } from "react-router-dom";
import "./style.css";
import { useMemo } from "react";
import { resizeCloudinaryImage } from "../../../util/cloudinaryUtils";

interface CategoryCardProps {
  image: string;
  title: string;
  itemCount?: number;
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

export default function CategoryCard({
  image,
  title,
  link,
}: CategoryCardProps) {
  // Get random pastel color gradient
  const randomGradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  }, []);
 
  return (
    <div
      className={`category-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${randomGradient} flex flex-col`}
      style={{ width: "156px", height: image ? "auto" : "156px" }}
    >
      {image && image !== "" ? (
        <>
          <figure className="img-hover-scale overflow-hidden flex items-center justify-center p-4 flex-1">
            <Link to={link}>
              <img
                src={resizeCloudinaryImage(image, 200)}
                alt={title}
                loading="lazy"
                width={56}
                height={56}
                className="h-24 w-auto object-contain transform hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </figure>
          <div className="p-3 text-center">
            <h6 className="text-sm text-center font-semibold text-gray-800 mb-1">
              <Link
                to={link}
                className="hover:text-purple-600 text-center transition-colors duration-300"
              >
                {title}
              </Link>
            </h6>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full p-3">
          <h6 className="text-sm text-center font-semibold text-gray-800">
            <Link
              to={link}
              className="hover:text-purple-600 text-center transition-colors duration-300"
            >
              {title}
            </Link>
          </h6>
        </div>
      )}
    </div>
  );
}