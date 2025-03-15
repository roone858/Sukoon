import { Link } from "react-router-dom";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, link }) => {
  return (
    <div className="max-w-sm bg-white border-0 rounded-lg dark:bg-gray-800">
      <Link to={link} className=" h-32">
        <img className="rounded-t-lg" src={imageUrl} alt={title} />
      </Link>
      <div className="p-5">
        <Link to={link}>
          <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-700 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="inline-flex group cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white border-1 border-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 w-full">
          <Link
            to={link}
            className="flex items-center justify-center text-purple-700 transition-all duration-300 group-hover:text-amber-50 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 15H11C8.17157 15 6.75736 15 5.87868 14.1213C5 13.2426 5 11.8284 5 9V5C5 3.89543 4.10457 3 3 3M10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM18 19.5C18 20.3284 17.3284 21 16.5 21C15.6716 21 15 20.3284 15 19.5C15 18.6716 15.6716 18 16.5 18C17.3284 18 18 18.6716 18 19.5ZM12.5 11H16.5C17.9045 11 18.6067 11 19.1111 10.6629C19.3295 10.517 19.517 10.3295 19.6629 10.1111C20 9.60669 20 8.90446 20 7.5C20 6.09554 20 5.39331 19.6629 4.88886C19.517 4.67048 19.3295 4.48298 19.1111 4.33706C18.6067 4 17.9045 4 16.5 4H12.5C11.0955 4 10.3933 4 9.88886 4.33706C9.67048 4.48298 9.48298 4.67048 9.33706 4.88886C9 5.39331 9 6.09554 9 7.5C9 8.90446 9 9.60669 9.33706 10.1111C9.48298 10.3295 9.67048 10.517 9.88886 10.6629C10.3933 11 11.0955 11 12.5 11Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            اضافة اللى السلة
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
