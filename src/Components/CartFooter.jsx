import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { BiUpArrow } from "react-icons/bi";

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

export default function UpwardAccordion() {
  const [expanded, setExpanded] = React.useState(false);
  const totalPrice=calculateTotalPrice()
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full">
      {/* Content pushed below the accordion */}
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        className={``}
      >
        <AccordionSummary
          className="font-bold text-xl flex justify-between"
          expandIcon={<BiUpArrow />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Total Price: ₹{totalPrice} {/* Example total price */}
        </AccordionSummary>
        <AccordionDetails className="bg-gray-100">
          <p>Expanded content goes here, such as cart details.</p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-2 py-1">Proceed to Pay</button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
