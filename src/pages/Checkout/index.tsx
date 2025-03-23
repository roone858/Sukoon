import { useEffect, useState } from "react";
import { useCartContext } from "../../context/useContext/useCartContext";
import CartItem from "../../component/CartItem";
import orderService from "../../services/order.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import { Order } from "../../util/types";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  const [shippingAddress, setShippingAddress] = useState("");
  const [pickupMethod, setPickupMethod] = useState("delivery");
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  // Calculate the total price of the cart
  const calculateTotal = () => {
    const number = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const rounded = parseFloat(number.toFixed(1)); // 242.2
    return rounded;
  };

  // Handle form submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare order data

    const orderData: Partial<Order> = {
      customerName,
      deliveryAddress: shippingAddress,
      items: cart,
      totalAmount: calculateTotal(),
      notes,
      pickupMethod: pickupMethod as "delivery" | "pickup",
    };
    if (isAuthenticated && user?._id) {
      orderData.userId = user._id;
    }

    setIsSubmitting(true);

    try {
      // Call the API to submit the order
      const createdOrder = await orderService.createOrder(orderData as Order);
      console.log(createdOrder);

      if (createdOrder) {
        toast.success("تم تأكيد الطلب بنجاح!");
        console.log("Order created:", createdOrder);
        navigation("/orders/" + createdOrder._id);
        // Optionally, you can clear the cart or redirect the user
      } else {
        toast.error("فشل في تأكيد الطلب. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("حدث خطأ أثناء تأكيد الطلب.");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
     if (isAuthenticated && user?.name) {
       setCustomerName(user.name);
     }
   }, [isAuthenticated, user]);
  return (
    <div className="bg-white mt-10 p-4">
      <div className="md:max-w-5xl max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Order Details Section */}
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-bold text-slate-900">تفاصيل الطلب</h2>
            <p className="text-slate-900 text-sm mt-4">
              أكمل طلبك عن طريق إدخال معلومات التوصيل أو اختيار طريقة الاستلام.
            </p>

            {/* Order Form */}
            <form onSubmit={handleSubmitOrder} className="mt-12 max-w-lg">
              <div className="grid gap-4">
                {/* Customer Name */}
                <div>
                  <input
                    type="text"
                    placeholder="اسم العميل"
                    value={customerName}
                    defaultValue={isAuthenticated ? user.name : ""}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  />
                </div>

                {/* Shipping Address */}
                <div>
                  <input
                    type="text"
                    placeholder="عنوان التوصيل"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <select
                    value={pickupMethod}
                    onChange={(e) => setPickupMethod(e.target.value)}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    required
                  >
                    <option value="">اختر طريقة الاستلام</option>
                    <option value="delivery">توصيل إلى العنوان</option>
                    <option value="pickup">استلام من المتجر</option>
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <textarea
                    placeholder="ملاحظات إضافية (اختياري)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full py-3 text-[15px] font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "جاري التحميل..." : "تأكيد الطلب"}
              </button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="bg-gray-100 p-6 lg:col-span-2 max-md:order-1 rounded-md">
            <h2 className="text-3xl font-bold text-slate-900">
              {calculateTotal()} ريال
            </h2>

            <ul className="text-slate-800 font-medium mt-12 space-y-4">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
              <li className="flex flex-wrap gap-4 text-sm">
                الضريبة <span className="ml-auto font-bold">00.00 ريال</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm font-bold border-gray-500 border-t-2 pt-4">
                الإجمالي{" "}
                <span className="ml-auto">{calculateTotal()} ريال</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
