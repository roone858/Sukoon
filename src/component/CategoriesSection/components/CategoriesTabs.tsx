// components/Categories/CategoriesTabs.tsx

interface CategoriesTabsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const CategoriesTabs = ({ categories, activeTab, onTabChange }: CategoriesTabsProps) => (
  <ul className="list-inline nav nav-tabs links">
    {categories.map((category) => (
      <li key={category.id} className="list-inline-item nav-item">
        <a
          className={`nav-link ${activeTab === category.id ? "active" : ""}`}
          href={category.link}
          onClick={(e) => {
            e.preventDefault();
            onTabChange(category.id);
          }}
        >
          {category.name}
        </a>
      </li>
    ))}
  </ul>
);