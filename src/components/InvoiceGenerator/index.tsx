import React, { useRef, useState } from "react";
import { Order } from "../../util/types";

const DownloadInvoiceButton: React.FC<{ invoiceData: Order }> = ({ invoiceData }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);

    const originalContents = document.body.innerHTML;
    const invoiceContent = invoiceRef.current?.innerHTML || "";

    document.body.innerHTML = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>فاتورة ${invoiceData.orderNumber}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            direction: rtl;
            margin: 0;
            padding: 20px;
            color: #000;
          }
          .invoice-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2980b9;
            padding-bottom: 20px;
          }
          .invoice-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2980b9;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: right;
          }
          th {
            background-color: #2980b9;
            color: white;
          }
          .total {
            font-weight: bold;
            font-size: 18px;
            margin-top: 20px;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
          @media print {
            body {
              padding: 0;
            }
            button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          ${invoiceContent}
        </div>
      </body>
      </html>
    `;

    window.print();

    window.onafterprint = () => {
      document.body.innerHTML = originalContents;
      setIsPrinting(false);
    };
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full" style={{ position: "relative" }}>
      {/* زر التحميل فقط */}
      <button
        onClick={handlePrint}
        disabled={isPrinting}
        className="bg-teal-600 w-full hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
      >
        {isPrinting ? (
          <>
            <span>جاري التحضير للطباعة...</span>
            <div
              className="spinner"
              style={{
                width: "16px",
                height: "16px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                borderTopColor: "white",
                animation: "spin 1s ease-in-out infinite",
              }}
            />
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              ></path>
            </svg>
            <span>تحميل الفاتورة</span>
        
          </>
        )}
      </button>

      {/* الفاتورة المخفية (تظهر فقط عند الطباعة) */}
      <div ref={invoiceRef} style={{ display: "none" }}>
        <div className="header">
          <div className="invoice-title">فاتورة</div>
          <div style={{ fontSize: "16px", color: "#666" }}>
            رقم الفاتورة: {invoiceData.orderNumber}
          </div>
          <div style={{ fontSize: "16px", marginTop: "5px" }}>
            التاريخ: {formatDate(invoiceData.createdAt || new Date())}
          </div>
        </div>

        <div
          style={{
            marginBottom: "30px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: "5px 0" }}>
            اسم العميل: {invoiceData.customerName}
          </p>
          <p style={{ margin: "5px 0" }}>
            البريد الإلكتروني: {invoiceData.customerEmail}
          </p>
          <p style={{ margin: "5px 0" }}>
            رقم الهاتف: {invoiceData.customerPhone}
          </p>
          {invoiceData.pickupMethod === "delivery" && invoiceData.delivery && (
            <>
              <p style={{ margin: "5px 0" }}>
                عنوان التوصيل: {invoiceData.delivery.address}
              </p>
              <p style={{ margin: "5px 0" }}>
                المدينة: {invoiceData.delivery.city}
              </p>
            </>
          )}
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "12px",
                  textAlign: "right",
                  backgroundColor: "#2980b9",
                  color: "white",
                }}
              >
                الصنف
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "right",
                  backgroundColor: "#2980b9",
                  color: "white",
                }}
              >
                الكمية
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "right",
                  backgroundColor: "#2980b9",
                  color: "white",
                }}
              >
                السعر
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "right",
                  backgroundColor: "#2980b9",
                  color: "white",
                }}
              >
                المجموع
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                }}
              >
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.name}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.price} ريال
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.subtotal} ريال
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            <span>المجموع الفرعي:</span>
            <span>{invoiceData.subtotal} ريال</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            <span>ضريبة القيمة المضافة:</span>
            <span>{invoiceData.tax} ريال</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            <span>رسوم الشحن:</span>
            <span>{invoiceData.shippingCost} ريال</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px 0 5px 0",
              paddingTop: "10px",
              borderTop: "2px solid #2980b9",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#2980b9",
            }}
          >
            <span>المجموع الكلي:</span>
            <span>{invoiceData.totalAmount} ريال</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: "5px 0" }}>
            طريقة الدفع:{" "}
            {invoiceData.payment.method === "cash"
              ? "نقدي"
              : invoiceData.payment.method === "card"
              ? "بطاقة ائتمان"
              : "محفظة إلكترونية"}
          </p>
          <p style={{ margin: "5px 0" }}>
            حالة الدفع:{" "}
            {invoiceData.payment.status === "completed"
              ? "مكتمل"
              : invoiceData.payment.status === "pending"
              ? "قيد الانتظار"
              : "فشل"}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DownloadInvoiceButton;
