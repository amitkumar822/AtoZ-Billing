import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const dummyData = {
  storeName: "AtoZ",
  address: "100 West road, Coimbatore New, New City",
  gst: "JHGFD6543FGH",
  phone: "7627396483",
  date: "2025-06-01 15:26:18",
  invoice: "INV202506011526189339",
  customer: "Cash",
  items: [
    { name: "Face Mask", qty: 1, price: 10, gst: 5, discount: 0, total: 10.5 },
    { name: "Coffee Powder 50g", qty: 1, price: 55, gst: 5, discount: 3, total: 56.1 }
  ],
  subtotal: 65,
  gstTotal: 3.25,
  discountTotal: 3,
  finalTotal: 66.6
};

const formats = [
  "A4 Full Page",
  "Thermal 58mm",
  "Thermal 76mm",
  "Thermal 80mm",
  "Thermal 110mm",
  "Half A4 Portrait",
  "Half A4 Landscape",
  "Dot Matrix"
];

const widthMap = {
  "A4 Full Page": "w-[210mm]",
  "Thermal 58mm": "w-[58mm]",
  "Thermal 76mm": "w-[76mm]",
  "Thermal 80mm": "w-[80mm]",
  "Thermal 110mm": "w-[110mm]",
  "Half A4 Portrait": "w-[105mm]",
  "Half A4 Landscape": "w-[297mm] h-[148.5mm]",
  "Dot Matrix": "w-[250mm]"
};

const Bill = React.forwardRef(({ format }, ref) => {
  return (
    <div ref={ref} className={`mx-auto p-6 bg-white text-gray-900 rounded shadow text-[12px] ${widthMap[format]}`}>
      <div className="text-center border-b pb-2">
        <h1 className="text-xl font-bold">{dummyData.storeName}</h1>
        <p>{dummyData.address}</p>
        <p className="text-sm">GST: {dummyData.gst} | Phone: {dummyData.phone}</p>
      </div>

      <div className="flex justify-between text-sm mt-2">
        <div>Date: {dummyData.date}</div>
        <div>Invoice #: {dummyData.invoice}</div>
      </div>

      <div className="mt-3 border-t border-b py-2">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left py-1">Item</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">GST</th>
              <th className="text-right">Discount</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.items.map((item, idx) => (
              <tr key={idx} className="border-b border-dashed">
                <td>{item.name}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-right">₹{item.price.toFixed(2)}</td>
                <td className="text-right">{item.gst}%</td>
                <td className="text-right">₹{item.discount.toFixed(2)}</td>
                <td className="text-right">₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right text-sm mt-2">
        <p>Subtotal: ₹{dummyData.subtotal.toFixed(2)}</p>
        <p>GST Total: ₹{dummyData.gstTotal.toFixed(2)}</p>
        <p>Discount: -₹{dummyData.discountTotal.toFixed(2)}</p>
        <p className="text-base font-semibold">Final Total: ₹{dummyData.finalTotal.toFixed(2)}</p>
      </div>

      <div className="text-center mt-4 text-sm italic">
        <p>Thank you for shopping with us!</p>
        <p>Please visit again.</p>
      </div>
    </div>
  );
});

export default function Bill() {
  const [selectedFormat, setSelectedFormat] = useState("A4 Full Page");
  const billRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;font-size:12px;margin:0;padding:0;}table{border-collapse:collapse;width:100%;}th,td{padding:4px 8px;}th{background:#f3f3f3;}@media print{@page{margin:0;}}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(billRef.current.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4 items-center print:hidden">
        <select
          className="border px-2 py-1 rounded"
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          {formats.map((format, i) => (
            <option key={i} value={format}>{format}</option>
          ))}
        </select>
        <Button onClick={handlePrint}>Print</Button>
      </div>
      <Card>
        <CardContent>
          <Bill ref={billRef} format={selectedFormat} />
        </CardContent>
      </Card>
    </div>
  );
}
