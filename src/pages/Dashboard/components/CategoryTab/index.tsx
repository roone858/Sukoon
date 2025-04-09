import React, { useState } from "react";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import { Category } from "../../../../types/category.type";
import { toast } from "react-toastify";
import categoryService from "../../../../services/categories.service";
import { useNavigate } from "react-router-dom";

export default function CategoryTab() {
  const { categories, updateCategories } = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (categoryId: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة؟")) {
      setIsLoading(true);
      try {
        await categoryService.deleteCategory(categoryId);
        updateCategories(categories.filter((cat) => cat._id !== categoryId));
        toast.success("تم حذف الفئة بنجاح!");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("حدث خطأ أثناء حذف الفئة");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (categoryId: string) => {
    navigate(`/dashboard/categories/edit/${categoryId}`);
  };

  const getParentCategoryName = (parentId: string | undefined) => {
    if (!parentId) return "لا يوجد";
    const parent = categories.find((cat) => cat._id === parentId);
    return parent ? parent.name : "لا يوجد";
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">الفئات</h1>
            <p className="mt-2 text-sm text-gray-700">
              قائمة بجميع الفئات في النظام
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
            <button
              onClick={() => navigate("/dashboard/categories/add")}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto"
            >
              إضافة فئة
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        الاسم
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        الفئة الأم
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        الوصف
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        الحالة
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">تعديل</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {categories.map((category: Category) => (
                      <tr key={category._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            {category.imageUrl && (
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={category.imageUrl}
                                  alt={category.name}
                                />
                              </div>
                            )}
                            <div className="mr-4">
                              <div className="font-medium text-gray-900">
                                {category.name}
                              </div>
                              <div className="text-gray-500">{category.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getParentCategoryName(category.parentId)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {category.description || "لا يوجد وصف"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              category.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {category.isActive ? "نشط" : "غير نشط"}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleEdit(category._id)}
                            className="text-purple-600 hover:text-purple-900 ml-4"
                            disabled={isLoading}
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={isLoading}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
