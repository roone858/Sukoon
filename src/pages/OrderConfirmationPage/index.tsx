// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Get the order ID from the URL
//   const [order, setOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

  // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const orderDetails = await orderService.getOrderById(orderId);
//         setOrder(orderDetails);
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (isLoading) {
//     return <div>جاري التحميل...</div>;
//   }

//   if (!order) {
//     return <div>لم يتم العثور على الطلب.</div>;
//   }

  return (
    <div className="bg-white mt-10 p-4">
      <div className="md:max-w-5xl max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          تم تأكيد الطلب بنجاح!
        </h1>
        <p className="text-slate-900 text-sm mt-4">
          شكرًا لتسوقك معنا. تفاصيل طلبك كالتالي:
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">تفاصيل الطلب</h2>
          <ul className="text-slate-900 font-medium mt-4 space-y-2">
            <li>رقم الطلب: {orderId}</li>
            {/* <li>اسم العميل: {order.customerName}</li>
            <li>عنوان التوصيل: {order.deliveryAddress}</li>
            <li>طريقة الاستلام: {order.pickupMethod}</li>
            <li>الإجمالي: {order.totalAmount} ريال</li> */}
          </ul>
        </div>

        {/* <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">المنتجات</h2>
          <ul className="text-slate-900 font-medium mt-4 space-y-2">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.productId} - {item.quantity} × {item.price} ريال
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
