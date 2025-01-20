import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";

export default function Invoice() {
  const printRef = React.useRef(null);

  const [formData, setFormData] = useState({
    customerDetails: {
      customerName: '',
      dob: '',
      gender: '',
      fatherName: '',
      permanentAddress: '',
      currentAddress: '',
      aadharNumber: '',
      phoneNumber: ''
    },
    accountDetails: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      panNumber: ''
    },
    phoneDetails: {
      phoneName: '',
      modelNumber: '',
      imei1: '',
      imei2: '',
      serialNumber: '',
      price: '',
      fileCharges: '',
      billingAmount: '',
      downPayment: '',
      loanAmount: ''
    }
  });

  const emiDates = ["2023-01-01", "2023-02-01", "2023-03-01"]; // Example dates
  const emiAmount = 5000; // Example EMI amount

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      alert("No content to download");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 1,
      });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
        <div className="w-full max-w-4xl mx-auto p-6">
          <div>
            <div className="text-2xl font-bold">Customer EMI Form</div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-8 p-6 bg-white shadow-md rounded-lg">
              {/* Customer Details Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'customerName', label: "Name", type: "text", value: formData.customerDetails.customerName },
                    { id: 'dob', label: "Date of Birth", type: "date", value: formData.customerDetails.dob },
                    { id: 'gender', label: "Gender", type: "select", options: ["", "male", "female", "other"], value: formData.customerDetails.gender },
                    { id: 'fatherName', label: "Father's Name", type: "text", value: formData.customerDetails.fatherName },
                    { id: 'permanentAddress', label: "Permanent Address", type: "textarea", value: formData.customerDetails.permanentAddress },
                    { id: 'currentAddress', label: "Current Address", type: "textarea", value: formData.customerDetails.currentAddress },
                    { id: 'aadharNumber', label: "Aadhar Number", type: "text", value: formData.customerDetails.aadharNumber },
                    { id: 'phoneNumber', label: "Phone Number", type: "tel", value: formData.customerDetails.phoneNumber },
                  ].map(({ id, label, type, options, value }) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="text-gray-700">{label}</label>
                      {type === "select" ? (
                        <select
                          id={id}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={value}
                          onChange={(e) => handleInputChange('customerDetails', id, e.target.value)}
                          required
                        >
                          {options.map((option, index) => (
                            <option key={index} value={option} disabled={option === ""}>{option}</option>
                          ))}
                        </select>
                      ) : type === "textarea" ? (
                        <textarea
                          id={id}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={value}
                          onChange={(e) => handleInputChange('customerDetails', id, e.target.value)}
                          required
                        />
                      ) : (
                        <input
                          type={type}
                          id={id}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={value}
                          onChange={(e) => handleInputChange('customerDetails', id, e.target.value)}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Details Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'bankName', label: "Bank Name", type: "text", value: formData.accountDetails.bankName },
                    { id: 'accountNumber', label: "Account Number", type: "text", value: formData.accountDetails.accountNumber },
                    { id: 'ifscCode', label: "IFSC Code", type: "text", value: formData.accountDetails.ifscCode },
                    { id: 'panNumber', label: "PAN Number", type: "text", value: formData.accountDetails.panNumber },
                  ].map(({ id, label, type, value }) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="text-gray-700">{label}</label>
                      <input
                        type={type}
                        id={id}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={value}
                        onChange={(e) => handleInputChange('accountDetails', id, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone Details Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Phone Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'phoneName', label: "Phone Name", type: "text", value: formData.phoneDetails.phoneName },
                    { id: 'modelNumber', label: "Model Number", type: "text", value: formData.phoneDetails.modelNumber },
                    { id: 'imei1', label: "IMEI 1", type: "text", value: formData.phoneDetails.imei1 },
                    { id: 'imei2', label: "IMEI 2", type: "text", value: formData.phoneDetails.imei2 },
                    { id: 'serialNumber', label: "Serial Number", type: "text", value: formData.phoneDetails.serialNumber },
                    { id: 'price', label: "Price", type: "number", value: formData.phoneDetails.price },
                    { id: 'fileCharges', label: "File Charges", type: "number", value: formData.phoneDetails.fileCharges },
                    { id: 'billingAmount', label: "Billing Amount", type: "number", value: formData.phoneDetails.billingAmount },
                    { id: 'downPayment', label: "Down Payment", type: "number", value: formData.phoneDetails.downPayment },
                    { id: 'loanAmount', label: "Loan Amount", type: "number", value: formData.phoneDetails.loanAmount },
                  ].map(({ id, label, type, value }) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="text-gray-700">{label}</label>
                      <input
                        type={type}
                        id={id}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={value}
                        onChange={(e) => handleInputChange('phoneDetails', id, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">Submit</button>
            </form>
          </div>
        </div>
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="w-full max-w-6xl mx-auto bg-white p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8 border-b pb-6">
              <div className="logo w-24 h-24 bg-gray-200 flex items-center justify-center">
                <img src="/api/placeholder/96/96" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold">KP Mobiles</h1>
                <h3 className="text-gray-600">Mobile Point, Raikera Chowk</h3>
                <h3 className="text-gray-600">Kotrimal, Ghargoda, Raigarh, Chhattisgarh</h3>
                <h3 className="text-gray-600">PIN-496111</h3>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Section */}
              <div className="w-full md:w-1/3">
                {/* Customer Details */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {formData.customerDetails.customerName}</p>
                    <p><strong>Date of Birth:</strong> {formData.customerDetails.dob}</p>
                    <p><strong>Gender:</strong> {formData.customerDetails.gender}</p>
                    <p><strong>Father's Name:</strong> {formData.customerDetails.fatherName}</p>
                    <p><strong>Permanent Address:</strong> {formData.customerDetails.permanentAddress}</p>
                    <p><strong>Current Address:</strong> {formData.customerDetails.currentAddress}</p>
                    <p><strong>Aadhar:</strong> {formData.customerDetails.aadharNumber}</p>
                    <p><strong>Phone:</strong> {formData.customerDetails.phoneNumber}</p>
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Details</h2>
                  <div className="space-y-2">
                    <p><strong>Bank Name:</strong> {formData.accountDetails.bankName}</p>
                    <p><strong>Account Number:</strong> {formData.accountDetails.accountNumber}</p>
                    <p><strong>IFSC Code:</strong> {formData.accountDetails.ifscCode}</p>
                    <p><strong>PAN Number:</strong> {formData.accountDetails.panNumber}</p>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-2/3">
                {/* Phone Details */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Phone Details</h2>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border">
                        <td className="p-2 font-semibold">Phone Name</td>
                        <td className="p-2">{formData.phoneDetails.phoneName}</td>
                        <td className="p-2 font-semibold">Model Number</td>
                        <td className="p-2">{formData.phoneDetails.modelNumber}</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2 font-semibold">IMEI 1</td>
                        <td className="p-2">{formData.phoneDetails.imei1}</td>
                        <td className="p-2 font-semibold">IMEI 2</td>
                        <td className="p-2">{formData.phoneDetails.imei2}</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2 font-semibold">Serial Number</td>
                        <td className="p-2">{formData.phoneDetails.serialNumber}</td>
                        <td className="p-2 font-semibold">Price</td>
                        <td className="p-2">₹{formData.phoneDetails.price}</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2 font-semibold">File Charges</td>
                        <td className="p-2">₹{formData.phoneDetails.fileCharges}</td>
                        <td className="p-2 font-semibold">Billing Amount</td>
                        <td className="p-2">₹{formData.phoneDetails.billingAmount}</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2 font-semibold">Down Payment</td>
                        <td className="p-2">₹{formData.phoneDetails.downPayment}</td>
                        <td className="p-2 font-semibold">Loan Amount</td>
                        <td className="p-2">₹{formData.phoneDetails.loanAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* EMI Details */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">EMI Details</h2>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">S. No.</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Billing Amount</th>
                        <th className="p-2 border">Customer's Sign</th>
                        <th className="p-2 border">Retailer's Sign</th>
                        <th className="p-2 border">Penalty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiDates.map((date, index) => (
                        <tr key={index} className="border">
                          <td className="p-2 text-center">{String(index + 1).padStart(2, '0')}</td>
                          <td className="p-2 text-center">{date}</td>
                          <td className="p-2 text-center">₹{emiAmount}</td>
                          <td className="p-2 text-center">________</td>
                          <td className="p-2 text-center">________</td>
                          <td className="p-2 text-center">₹0</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Signature Section */}
                <div className="flex justify-between items-end">
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Customer's Final Signature:</p>
                      <p className="mt-4">______________________</p>
                    </div>
                    <div>
                      <p className="font-semibold">Retailer's Final Signature:</p>
                      <p className="mt-4">______________________</p>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                    QR Code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}