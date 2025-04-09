import React, { useState } from "react";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import { Category } from "../../../../services/categories.service";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import categoryService from "../../../../services/categories.service";
import { Link } from "react-router-dom";

const CategoryTab: React.FC = () => {
  const { categories, updateCategories } = useStoreContext();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      setIsLoading(true);
      const updatedCategory = await categoryService.updateCategory(
        editingCategory._id,
        editingCategory
      );
      if (updatedCategory) {
        updateCategories(
          categories.map((cat) =>
            cat._id === updatedCategory._id ? updatedCategory : cat
          )
        );
        setEditingCategory(null);
        toast.success("تم تحديث التصنيف بنجاح");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تحديث التصنيف");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التصنيف؟")) return;

    try {
      setIsLoading(true);
      await categoryService.deleteCategory(categoryId);
      updateCategories(categories.filter((cat) => cat._id !== categoryId));
      toast.success("تم حذف التصنيف بنجاح");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حذف التصنيف");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            إدارة التصنيفات
          </h2>
          <Link
            to={"/add-category"}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus />
            إضافة تصنيف جديد
          </Link>
        </div>
      </div>

      {/* Categories List */}
      <div className="p-6">
        <div className="grid gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                  disabled={isLoading}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  disabled={isLoading}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">تعديل التصنيف</h3>
            <form onSubmit={handleUpdateCategory}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    اسم التصنيف
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    الوصف (اختياري)
                  </label>
                  <textarea
                    value={editingCategory.description || ""}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  disabled={isLoading}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري التحديث..." : "تحديث"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTab;
