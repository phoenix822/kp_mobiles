import React from "react";

const EmiDetails = ({ emiDetails }) => {
    const { totalMonths, emiAmount, emiDate } = emiDetails;

    const calculateEmiDates = (startDate, months) => {
        const dates = [];

        let currentDate = new Date(startDate);
        dates.push(new Date(currentDate));

        for (let i = 0; i < months - 1; i++) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            dates.push(new Date(currentDate));
        }
        return dates;
    };
    const formatEmiDate = (dateToFormat) => {
        const formatedDate = new Date(dateToFormat);
        return formatedDate.toString();
    };

    const firstEmiDate = formatEmiDate(emiDate)

    const emiDates = calculateEmiDates(firstEmiDate, totalMonths);

    const emiPerMonth = (emiAmount / totalMonths).toFixed(2);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">EMI Details</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 font-semibold border w-16 text-center">S. No.</th>
                        <th className="p-2 font-semibold border text-center">Date</th>
                        <th className="p-2 font-semibold border text-center">Billing Amount</th>
                        <th className="p-2 font-semibold border text-center">Customer's Sign</th>
                        <th className="p-2 font-semibold border text-center">Retailer's Sign</th>
                        <th className="p-2 font-semibold border text-center">Penalty</th>
                    </tr>
                </thead>
                <tbody>
                    {emiDates.map((date, index) => (
                        <tr key={index} className="border">
                            <td className="p-2 border text-center">{String(index + 1).padStart(2, "0")}</td>
                            <td className="p-2 border text-center">
                                {date.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </td>
                            <td className="p-2 border text-center">₹{emiPerMonth}</td>
                            <td className="p-2 border text-center">___________________</td>
                            <td className="p-2 border text-center">___________________</td>
                            <td className="p-2 border text-center">₹ _______</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmiDetails;
