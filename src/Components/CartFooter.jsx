import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { BiUpArrow } from "react-icons/bi";

const DELIVERY_CHARGE = 50; // Flat delivery charge
const TAX_RATE = 0.18; // 18% tax

const calculateTotalPrice = () => {
  const existingData = JSON.parse(localStorage.getItem("cart")) || []; // Safeguard for empty data
  let totalPrice = 0;

  if (Array.isArray(existingData)) {
    for (let i = 0; i < existingData.length; i++) {
      const item = existingData[i];
      const price = item.price ? parseFloat(item.price) : 0;
      const quantity = item.quantity ? parseInt(item.quantity, 10) : 1;
      totalPrice += price * quantity;
    }
  }

  return totalPrice;
};

export default function CartFooter() {
  const [expanded, setExpanded] = React.useState(false);

  const baseTotalPrice = calculateTotalPrice(); // Base total price
  const taxAmount = baseTotalPrice * TAX_RATE; // Calculate tax
  const finalTotalPrice = baseTotalPrice + DELIVERY_CHARGE + taxAmount; // Add delivery charges and tax

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full shadow-xl">
      <Accordion expanded={expanded} onChange={handleChange} className="w-full">
        <AccordionSummary
          sx={{ bgcolor: "secondary.main" }}
          className="font-bold text-2xl sm:text-xl md:text-2xl"
          expandIcon={<BiUpArrow />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Total Price: ₹{finalTotalPrice.toFixed(2)} {/* Final total price */}
        </AccordionSummary>
        <AccordionDetails className="bg-gray-100 p-4 sm:p-3 md:p-5 lg:p-6">
          <p className="text-lg font-semibold sm:text-md md:text-lg lg:text-xl">
            Price Breakdown:
          </p>
          <ul className="list-disc ml-5 text-gray-700 sm:text-sm md:text-base lg:text-lg">
            <li>Base Price: ₹{baseTotalPrice.toFixed(2)}</li>
            <li>Delivery Charges: ₹{DELIVERY_CHARGE}</li>
            <li>Tax (18%): ₹{taxAmount.toFixed(2)}</li>
          </ul>
          <p className="font-bold mt-4 text-xl sm:text-lg md:text-xl lg:text-2xl">
            Final Total: ₹{finalTotalPrice.toFixed(2)}
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 mt-4 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4">
            Proceed to Pay
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
