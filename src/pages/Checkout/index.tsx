import { useEffect, useState } from "react";
import { useCartContext } from "../../context/hooks/useCartContext";
import CartItem from "../../component/CartItem";
import orderService from "../../services/order.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/hooks/useAuthContext";

interface OrderData {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  delivery: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    subtotal: number;
  }[];
  payment: {
    method: "cash" | "card" | "wallet";
    status: "pending" | "completed" | "failed";
    amount: number;
  };
  pickupMethod: "delivery" | "pickup";
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  notes?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: "cash" | "card" | "wallet";
  pickupMethod: "delivery" | "pickup";
  notes: string;
}

const CheckoutPage = () => {
  const { cart, updateCart } = useCartContext();
  const { isAuthenticated, user } = useAuthContext();
  const navigation = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Saudi Arabia",
    paymentMethod: "cash",
    pickupMethod: "delivery",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate the total price of the cart
  const calculatePrices = () => {
    const subtotal = cart.reduce(
      (total, item) => total + (item.finalPrice || item.originalPrice) * item.quantity,
      0
    );
    const tax = subtotal * 0.15; // 15% VAT
    const shippingCost = formData.pickupMethod === "delivery" ? 20 : 0;
    const totalAmount = subtotal + tax + shippingCost;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shippingCost: parseFloat(shippingCost.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    };
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Format phone numbers to include country code
    if (name === "phone") {
      // Remove any non-digit characters
      const cleanedValue = value.replace(/\D/g, "");
      // Add Saudi Arabia country code if not present
      const formattedValue = cleanedValue.startsWith("966")
        ? cleanedValue
        : `966${cleanedValue.replace(/^0+/, "")}`;

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const prices = calculatePrices();

      // Format phone numbers to include country code
      const formattedPhone = formData.phone.startsWith("966")
        ? formData.phone
        : `966${formData.phone.replace(/^0+/, "")}`;

      // Prepare order data according to the new Order interface
      const orderData: OrderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: "+" + formattedPhone,
        delivery: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: "+" + formattedPhone,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity ,
          dimensionId: item.dimensionId,
          price: item.finalPrice || item.originalPrice,
          name: item.name,
          subtotal: (item.finalPrice || item.originalPrice) * item.quantity,
        })),
        payment: {
          method: formData.paymentMethod as "cash" | "card" | "wallet",
          status: "pending",
          amount: prices.totalAmount,
        },
        pickupMethod: formData.pickupMethod as "delivery" | "pickup",
        subtotal: prices.subtotal,
        tax: prices.tax,
        shippingCost: prices.shippingCost,
        totalAmount: prices.totalAmount,
        notes: formData.notes,
      };

      // Add userId if user is authenticated
      if (user?._id) {
        orderData.userId = user._id;
      }
      console.log(orderData.customerPhone);
      const response = await orderService.createOrder(orderData);
      if (response) {
        // Clear cart and redirect to success page
        updateCart([]);
        toast.success("تم تأكيد الطلب بنجاح!");
        navigation("/confirm-order/" + response._id);
      } else {
        setError("فشل في تأكيد الطلب. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء تأكيد الطلب.", error);
      setError("حدث خطأ أثناء تأكيد الطلب. يرجى المحاولة مرة أخرى لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [isAuthenticated, user]);

  const prices = calculatePrices();

  return (
    <div className="bg-white  p-4">
      <div className="md:max-w-5xl max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Order Summary Section */}
          <div className="bg-gray-100 p-6 lg:col-span-2 max-md:order-1 rounded-md">
            <h2 className="text-3xl font-bold text-slate-900">ملخص الطلب</h2>

            <ul className="text-slate-800 font-medium mt-12 space-y-4">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
              <li className="flex flex-wrap gap-4 text-sm">
                المجموع الفرعي{" "}
                <span className="mr-auto font-bold">
                  {prices.subtotal} ريال
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                ضريبة القيمة المضافة (15%){" "}
                <span className="mr-auto font-bold">{prices.tax} ريال</span>
              </li>
              {formData.pickupMethod === "delivery" && (
                <li className="flex flex-wrap gap-4 text-sm">
                  رسوم التوصيل{" "}
                  <span className="mr-auto font-bold">
                    {prices.shippingCost} ريال
                  </span>
                </li>
              )}
              <li className="flex flex-wrap gap-4 text-lg font-bold border-gray-500 border-t-2 pt-4">
                الإجمالي{" "}
                <span className="mr-auto">{prices.totalAmount} ريال</span>
              </li>
            </ul>
          </div>

          {/* Order Details Section */}
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-bold text-slate-900">تفاصيل الطلب</h2>
            <p className="text-slate-900 text-sm mt-4">
              أكمل طلبك عن طريق إدخال معلومات التوصيل أو اختيار طريقة الاستلام.
            </p>

            {/* Order Form */}
            <form onSubmit={handleSubmitOrder} className="mt-12 max-w-lg">
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-4">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">معلومات العميل</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      +966
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="5xxxxxxxx"
                      value={formData.phone.replace(/^966/, "")}
                      onChange={handleInputChange}
                      className="pl-12 pr-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      pattern="[0-9]{9}"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    مثال: 5xxxxxxxx (بدون الرمز +966)
                  </p>
                </div>

                {/* Delivery Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">طريقة الاستلام</h3>
                  <select
                    name="pickupMethod"
                    value={formData.pickupMethod}
                    onChange={handleInputChange}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  >
                    <option value="delivery">توصيل إلى العنوان</option>
                    <option value="pickup">استلام من المتجر</option>
                  </select>
                </div>

                {/* Delivery Information */}
                {formData.pickupMethod === "delivery" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">معلومات التوصيل</h3>
                    <input
                      type="text"
                      name="address"
                      placeholder="العنوان"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="المدينة"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="المنطقة"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="الرمز البريدي"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      required
                    />
                  </div>
                )}

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">طريقة الدفع</h3>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  >
                    <option value="cash">الدفع عند الاستلام</option>
                    <option value="card" disabled>
                      بطاقة ائتمان (غير متاح حالياً)
                    </option>
                    <option value="wallet" disabled>
                      المحفظة الإلكترونية (غير متاح حالياً)
                    </option>
                  </select>
                  <p className="text-sm text-gray-600">
                    ملاحظة: الدفع ببطاقة الائتمان والمحفظة الإلكترونية غير متاح
                    حالياً
                  </p>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">ملاحظات إضافية</h3>
                  <textarea
                    name="notes"
                    placeholder="أي ملاحظات إضافية؟"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-3.5 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "جاري التأكيد..." : "تأكيد الطلب"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
