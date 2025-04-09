import { Category } from "../../../types/category.type";

interface CategoriesTabsProps {
  categories: (Category & { productCount: number; fullPath: string })[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const CategoriesTabs = ({
  categories,
  activeTab,
  onTabChange,
}: CategoriesTabsProps) => (
  <ul className="list-inline nav nav-tabs links flex flex-wrap gap-2 xs:gap-4">
    {categories.map((category) => (
      <li key={category._id} className="list-inline-item nav-item">
        <a
          className={`nav-link text-sm xs:text-base ${
            activeTab === category._id ? "active" : ""
          }`}
          href={category.slug}
          onClick={(e) => {
            e.preventDefault();
            onTabChange(category._id);
          }}
          title={category.fullPath}
        >
          {category.name}
        </a>
      </li>
    ))}
  </ul>
);
