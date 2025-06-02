import React, { useState, useRef } from 'react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

const InvoiceGenerator = () => {
  // Format options
  const formats = [
    { id: 'a4-full', name: 'A4 Full Page', width: '210mm', height: '297mm' },
    { id: 'a4-half-portrait', name: 'Half A4 Portrait', width: '105mm', height: '297mm' },
    { id: 'a4-half-landscape', name: 'Half A4 Landscape', width: '148mm', height: '210mm' },
    { id: 'thermal-58mm', name: 'Thermal 58mm', width: '58mm', height: 'auto' },
    { id: 'thermal-76mm', name: 'Thermal 76mm', width: '76mm', height: 'auto' },
    { id: 'thermal-80mm', name: 'Thermal 80mm', width: '80mm', height: 'auto' },
    { id: 'thermal-110mm', name: 'Thermal 110mm', width: '110mm', height: 'auto' },
    { id: 'dot-matrix', name: 'Dot Matrix', width: '210mm', height: '297mm', font: 'monospace' },
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
      { id: 1, name: "Face Mask", qty: 1, price: 10.00, gst: 5, discount: 0.00, total: 10.50 },
      { id: 2, name: "Coffee Powder 50g", qty: 1, price: 55.00, gst: 5, discount: 3.00, total: 56.10 }
    ],
    subtotal: 66.50,
    gstTotal: 5.60,
    discount: 3.00,
    save: 0.00,
    finalTotal: 69.10
  };

  const [selectedFormat, setSelectedFormat] = useState(formats[0].id);
  const [invoiceData] = useState(initialInvoiceData);
  const invoiceRef = useRef(null);

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: Arial, sans-serif;
            }
            .invoice-container {
              width: ${getCurrentFormat().width};
              height: ${getCurrentFormat().height};
              margin: 0 auto;
              padding: 10px;
              ${selectedFormat === 'dot-matrix' ? 'font-family: monospace;' : ''}
              ${selectedFormat.includes('thermal') ? 'font-size: 12px;' : 'font-size: 14px;'}
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 4px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .text-right {
              text-align: right;
            }
            .text-center {
              text-align: center;
            }
            .border-b {
              border-bottom: 1px solid #ddd;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          ${invoiceRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Get current format
  const getCurrentFormat = () => {
    return formats.find(f => f.id === selectedFormat) || formats[0];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto p-4 no-print">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Select Bill Format</label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map(format => (
                  <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
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
          className={`bg-white shadow-md p-4 ${selectedFormat === 'dot-matrix' ? 'font-mono' : ''}`}
          style={{
            width: getCurrentFormat().width,
            height: getCurrentFormat().height,
            fontSize: selectedFormat.includes('thermal') ? '12px' : '14px',
            minHeight: selectedFormat.includes('thermal') ? 'auto' : '297mm'
          }}
        >
          {/* Invoice Header */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-lg">{invoiceData.shopName}</h2>
            <p className="text-sm">{invoiceData.address}</p>
            <p className="text-sm">GST: {invoiceData.gst}</p>
            <p className="text-sm">Phone: {invoiceData.phone}</p>
          </div>

          <div className="border-t border-b border-gray-300 py-2 my-2">
            <div className="flex justify-between text-sm">
              <span>Date: {formatDate(invoiceData.date)}</span>
              <span>Invoice #: {invoiceData.invoiceNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Customer: {invoiceData.customer}</span>
              <span>Mobile: {invoiceData.mobile}</span>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full my-2">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-1">Name</th>
                <th className="text-right py-1">Qty</th>
                <th className="text-right py-1">Price</th>
                <th className="text-right py-1">GST</th>
                <th className="text-right py-1">Discount</th>
                <th className="text-right py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map(item => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-1">{item.name}</td>
                  <td className="text-right py-1">{item.qty}</td>
                  <td className="text-right py-1">₹{item.price.toFixed(2)}</td>
                  <td className="text-right py-1">{item.gst}%</td>
                  <td className="text-right py-1">₹{item.discount.toFixed(2)}</td>
                  <td className="text-right py-1">₹{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="mt-4">
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>Subtotal</span>
              <span>₹{invoiceData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>GST Total</span>
              <span>₹{invoiceData.gstTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>Discount</span>
              <span>₹{invoiceData.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>Save</span>
              <span>₹{invoiceData.save.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold py-1">
              <span>Final Total</span>
              <span>₹{invoiceData.finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4 pt-2 border-t border-gray-300">
            <p>Thank you for shopping with us!</p>
            <p>Visit again!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;