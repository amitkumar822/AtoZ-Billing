import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InvoiceGenerator = () => {
  // Enhanced format options with better initial styling
  const formats = [
    {
      id: "a4-full",
      name: "A4 Full Page",
      width: "210mm",
      height: "297mm",
      fontSize: "14px",
      padding: "20px",
      lineHeight: "1.5",
      shopNameSize: "1.5em",
    },
    {
      id: "a4-half-portrait",
      name: "Half A4 Portrait",
      width: "105mm",
      height: "297mm",
      fontSize: "12px",
      padding: "15px",
      lineHeight: "1.4",
      shopNameSize: "1.3em",
    },
    {
      id: "a4-half-landscape",
      name: "Half A4 Landscape",
      width: "148mm",
      height: "210mm",
      fontSize: "12px",
      padding: "15px",
      lineHeight: "1.4",
      shopNameSize: "1.3em",
    },
    {
      id: "thermal-58mm",
      name: "Thermal 58mm",
      width: "58mm",
      height: "auto",
      fontSize: "10px",
      padding: "8px",
      lineHeight: "1.2",
      shopNameSize: "1.2em",
      thermal: true,
    },
    {
      id: "thermal-76mm",
      name: "Thermal 76mm",
      width: "76mm",
      height: "auto",
      fontSize: "11px",
      padding: "10px",
      lineHeight: "1.3",
      shopNameSize: "1.3em",
      thermal: true,
    },
    {
      id: "thermal-80mm",
      name: "Thermal 80mm",
      width: "80mm",
      height: "auto",
      fontSize: "11px",
      padding: "10px",
      lineHeight: "1.3",
      shopNameSize: "1.3em",
      thermal: true,
    },
    {
      id: "thermal-110mm",
      name: "Thermal 110mm",
      width: "110mm",
      height: "auto",
      fontSize: "12px",
      padding: "12px",
      lineHeight: "1.4",
      shopNameSize: "1.4em",
      thermal: true,
    },
    {
      id: "dot-matrix",
      name: "Dot Matrix",
      width: "210mm",
      height: "297mm",
      fontSize: "14px",
      padding: "20px",
      lineHeight: "1.5",
      shopNameSize: "1.5em",
      fontFamily: "monospace",
    },
  ];

  // Dummy data
  const initialInvoiceData = {
    shopName: "AtoZ",
    address: "100 West road, Coimbatore New, New City",
    gst: "JHGF06543FGH",
    phone: "7627396483",
    date: new Date().toISOString(),
    invoiceNumber: `INV${new Date().getTime()}`,
    customer: "Cash",
    mobile: "",
    items: [
      {
        id: 1,
        name: "Face Mask",
        qty: 1,
        price: 10.0,
        gst: 5,
        discount: 0.0,
        total: 10.5,
      },
      {
        id: 2,
        name: "Coffee Powder 50g",
        qty: 1,
        price: 55.0,
        gst: 5,
        discount: 3.0,
        total: 56.1,
      },
    ],
    subtotal: 66.5,
    gstTotal: 5.6,
    discount: 3.0,
    save: 0.0,
    finalTotal: 69.1,
  };

  const [selectedFormat, setSelectedFormat] = useState(formats[0].id);
  const [invoiceData] = useState(initialInvoiceData);
  const invoiceRef = useRef(null);

  // Get current format with proper initialization
  const getCurrentFormat = () => {
    return formats.find((f) => f.id === selectedFormat) || formats[0];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const [printData, setPrintData] = useState("");

  // Handle print with perfect format preservation
  const handlePrint = () => {
    const currentFormat = getCurrentFormat();
    const printWindow = window.open("", "_blank");

    // const printContent = `
    //     <!DOCTYPE html>
    //     <html>
    //         <head>
    //         <title>Invoice Print</title>
    //         <style>
    //             @page {
    //             size: ${currentFormat.id.includes("a4") ? "A4" : "auto"};
    //             margin: 0;
    //             }
    //             body {
    //             margin: 0;
    //             padding: 0;
    //             font-family: ${currentFormat.fontFamily || "Arial, sans-serif"};
    //             -webkit-print-color-adjust: exact;
    //             print-color-adjust: exact;
    //             }
    //             .invoice-container {
    //             width: ${currentFormat.width};
    //             height: ${currentFormat.height};
    //             margin: 0 auto;
    //             padding: ${currentFormat.padding};
    //             font-size: ${currentFormat.fontSize};
    //             line-height: ${currentFormat.lineHeight};
    //             ${currentFormat.thermal ? "border: 1px dashed #ccc;" : ""}
    //             ${
    //               currentFormat.fontFamily
    //                 ? `font-family: ${currentFormat.fontFamily};`
    //                 : ""
    //             }
    //             }
    //             .shop-header {
    //             text-align: center;
    //             margin-bottom: 10px;
    //             }
    //             .shop-name {
    //             font-weight: bold;
    //             font-size: ${currentFormat.shopNameSize};
    //             margin-bottom: 2px;
    //             }
    //             .shop-details {
    //             font-size: 0.9em;
    //             line-height: 1.3;
    //             }
    //             .invoice-meta {
    //             border-top: 1px solid #000;
    //             border-bottom: 1px solid #000;
    //             padding: 5px 0;
    //             margin: 5px 0;
    //             font-size: 0.9em;
    //             }
    //             .meta-row {
    //             display: flex;
    //             justify-content: space-between;
    //             margin: 2px 0;
    //             }
    //             table {
    //             width: 100%;
    //             border-collapse: collapse;
    //             margin: 10px 0;
    //             font-size: 0.9em;
    //             }
    //             th {
    //             text-align: left;
    //             padding: 3px;
    //             border-bottom: 1px solid #000;
    //             }
    //             td {
    //             padding: 3px;
    //             border-bottom: 1px solid #ddd;
    //             }
    //             .text-right {
    //             text-align: right;
    //             }
    //             .summary-row {
    //             display: flex;
    //             justify-content: space-between;
    //             padding: 3px 0;
    //             border-bottom: 1px solid #ddd;
    //             }
    //             .footer {
    //             text-align: center;
    //             margin-top: 10px;
    //             padding-top: 5px;
    //             border-top: 1px solid #000;
    //             font-size: 0.9em;
    //             }
    //             @media print {
    //             body {
    //                 background: white;
    //             }
    //             .invoice-container {
    //                 border: none !important;
    //             }
    //             }
    //         </style>
    //         </head>
    //         <body>
    //         <div class="invoice-container">
    //             ${invoiceRef.current.innerHTML}
    //         </div>
    //         <script>
    //             setTimeout(() => {
    //             window.print();
    //             window.close();
    //             }, 200);
    //         </script>
    //         </body>
    //     </html>
    //     `;

    printWindow.document.open();
    printWindow.document.write(printData);
    printWindow.document.close();
  };

  // Set initial styles on mount
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "print-style";
    style.textContent = `
        @media print {
            body * {
            visibility: hidden;
            }
            .invoice-print-container, .invoice-print-container * {
            visibility: visible;
            }
            .invoice-print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: ${getCurrentFormat().width};
            height: ${getCurrentFormat().height};
            margin: 0;
            padding: ${getCurrentFormat().padding};
            font-size: ${getCurrentFormat().fontSize};
            line-height: ${getCurrentFormat().lineHeight};
            ${
              getCurrentFormat().fontFamily
                ? `font-family: ${getCurrentFormat().fontFamily};`
                : ""
            }
            }
        }
        `;

    document.head.appendChild(style);
    return () => {
      const existingStyle = document.getElementById("print-style");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [selectedFormat]);

  useEffect(() => {
    const currentFormat = getCurrentFormat();
    const printContent = `
        <!DOCTYPE html>
        <html>
            <head>
            <title>Invoice Print</title>
            <style>
                @page {
                size: ${currentFormat.id.includes("a4") ? "A4" : "auto"};
                margin: 0;
                }
                body {
                margin: 0;
                padding: 0;
                font-family: ${currentFormat.fontFamily || "Arial, sans-serif"};
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                }
                .invoice-container {
                width: ${currentFormat.width};
                height: ${currentFormat.height};
                margin: 0 auto;
                padding: ${currentFormat.padding};
                font-size: ${currentFormat.fontSize};
                line-height: ${currentFormat.lineHeight};
                ${currentFormat.thermal ? "border: 1px dashed #ccc;" : ""}
                ${
                  currentFormat.fontFamily
                    ? `font-family: ${currentFormat.fontFamily};`
                    : ""
                }
                }
                .shop-header {
                text-align: center;
                margin-bottom: 10px;
                }
                .shop-name {
                font-weight: bold;
                font-size: ${currentFormat.shopNameSize};
                margin-bottom: 2px;
                }
                .shop-details {
                font-size: 0.9em;
                line-height: 1.3;
                }
                .invoice-meta {
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
                padding: 5px 0;
                margin: 5px 0;
                font-size: 0.9em;
                }
                .meta-row {
                display: flex;
                justify-content: space-between;
                margin: 2px 0;
                }
                table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
                font-size: 0.9em;
                }
                th {
                text-align: left;
                padding: 3px;
                border-bottom: 1px solid #000;
                }
                td {
                padding: 3px;
                border-bottom: 1px solid #ddd;
                }
                .text-right {
                text-align: right;
                }
                .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 3px 0;
                border-bottom: 1px solid #ddd;
                }
                .footer {
                text-align: center;
                margin-top: 10px;
                padding-top: 5px;
                border-top: 1px solid #000;
                font-size: 0.9em;
                }
                @media print {
                body {
                    background: white;
                }
                .invoice-container {
                    border: none !important;
                }
                }
            </style>
            </head>
            <body>
            <div class="invoice-container">
                ${invoiceRef?.current?.innerHTML}
            </div>
            <script>
                setTimeout(() => {
                window.print();
                window.close();
                }, 200);
            </script>
            </body>
        </html>
        `;
    setPrintData(printContent);
  }, [selectedFormat]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Select Bill Format</label>
            <Select
              value={selectedFormat}
              onValueChange={(value) => {
                setSelectedFormat(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={handlePrint}>Print Invoice</Button>
          </div>
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="flex justify-center">
        <div
          ref={invoiceRef}
          className={`invoice-print-container bg-white shadow-md 
            ${
              getCurrentFormat().thermal
                ? "border border-dashed border-gray-300"
                : ""
            }
          `}
          style={{
            width: getCurrentFormat().width,
            height: getCurrentFormat().height,
            fontSize: getCurrentFormat().fontSize,
            padding: getCurrentFormat().padding,
            lineHeight: getCurrentFormat().lineHeight,
            fontFamily: getCurrentFormat().fontFamily || "",
            minHeight: getCurrentFormat().thermal ? "auto" : "297mm",
          }}
        >
          <div className="shop-header">
            <h2
              className="shop-name"
              style={{ fontSize: getCurrentFormat().shopNameSize }}
            >
              {invoiceData.shopName}
            </h2>
            <div className="shop-details">
              <p>{invoiceData.address}</p>
              <p>GST: {invoiceData.gst}</p>
              <p>Phone: {invoiceData.phone}</p>
            </div>
          </div>

          <div className="invoice-meta">
            <div className="meta-row">
              <span>Date: {formatDate(invoiceData.date)}</span>
              <span>Invoice #: {invoiceData.invoiceNumber}</span>
            </div>
            <div className="meta-row">
              <span>Customer: {invoiceData.customer}</span>
              <span>Mobile: {invoiceData.mobile}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">GST</th>
                <th className="text-right">Discount</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="text-right">{item.qty}</td>
                  <td className="text-right">₹{item.price.toFixed(2)}</td>
                  <td className="text-right">{item.gst}%</td>
                  <td className="text-right">₹{item.discount.toFixed(2)}</td>
                  <td className="text-right">₹{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary-section">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{invoiceData.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>GST Total</span>
              <span>₹{invoiceData.gstTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>₹{invoiceData.discount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Save</span>
              <span>₹{invoiceData.save.toFixed(2)}</span>
            </div>
            <div className="summary-row font-bold">
              <span>Final Total</span>
              <span>₹{invoiceData.finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="footer">
            <p>Thank you for shopping with us!</p>
            <p>Visit again!</p>
          </div>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: printData }} className="hidden" />
    </div>
  );
};

export default InvoiceGenerator;
