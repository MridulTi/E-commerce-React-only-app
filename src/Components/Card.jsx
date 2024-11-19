import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function SearchCard(props) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Check local storage for existing quantity
    const existingData = JSON.parse(localStorage.getItem("cart")) || [];
    const foundItem = existingData.find((item) => item.id === props.id);
    if (foundItem && foundItem.quantity) {
      setQuantity(foundItem.quantity);
    }
  }, [props.id]);

  const addToCart = () => {
    const existingData = JSON.parse(localStorage.getItem("cart")) || [];
    const foundItem = existingData.find((item) => item.id === props.id);

    if (!foundItem) {
      const newItem = { ...props, quantity: 1 };
      existingData.push(newItem);
      localStorage.setItem("cart", JSON.stringify(existingData));
      setQuantity(1);
    }
  };

  const updateQuantity = (newQuantity) => {
    const existingData = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedData = existingData.map((item) => {
      if (item.id === props.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    if (newQuantity > 0) {
      localStorage.setItem("cart", JSON.stringify(updatedData));
      setQuantity(newQuantity);
    } else {
      // Remove item if quantity is 0
      const filteredData = existingData.filter((item) => item.id !== props.id);
      localStorage.setItem("cart", JSON.stringify(filteredData));
      setQuantity(0);
    }
  };

  return (
    <Card className="flex justify-between border p-5 bg-white">
      <div className="flex gap-6">
        <img src={props.thumbnail} className="h-64 aspect-square" />
        <div>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bolder" }}
            className="capitalize font-bold text-xl"
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "light" }}
            className="capitalize text-gray-600 font-bold text-xl"
          >
            {props.description}
          </Typography>
          <p className="flex text-sm my-1 gap-2 font-bold text-white bg-green-700 w-fit px-2 items-center">
            {props.rating} <FaStar />
          </p>

          <Typography
            variant="body2"
            className="text-grey-3 w-fit px-2 py-1 bg-red-600 text-white"
          >
            {props.shippingInformation}
          </Typography>
          <ul className="list-disc px-4 text-gray-500">
            {Object.keys(props.dimensions).map((key) => (
              <li key={key}>
                {key} : {props.dimensions[key]}
              </li>
            ))}
          </ul>
          <p
            className={`flex text-sm my-1 gap-2 font-bold ${
              props.stock !== 0 ? "text-green-700" : "text-red-600"
            } w-fit px-2 items-center`}
          >
            {props.stock !== 0 ? "In Stock" : "Out of Stock"}
          </p>
          {quantity === 0 ? (
            <button
              onClick={addToCart}
              disabled={props.stock !== 0 ? false : true}
              className={`rounded-full px-4 py-1 ${
                props.stock !== 0
                  ? "opacity-100"
                  : "opacity-50 cursor-not-allowed"
              } bg-yellow-500 text-black hover:bg-yellow-400`}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateQuantity(quantity - 1)}
                className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => updateQuantity(quantity + 1)}
                className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 min-w-52 text-right">
        <Typography variant="h4">
          ₹{Math.round(props.price - (props.price * props.discountPercentage) / 100)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "medium" }}
          className="text-grey-6"
        >
          <span className="line-through text-grey-1 font-extralight">
            ₹{props.price}
          </span>{" "}
          {props.discountPercentage}% Off
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold" }}
          className="text-green-600"
        >
          {props.returnPolicy}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold" }}
          className="text-yellow-600"
        >
          {props.warrantyInformation}
        </Typography>
      </div>
    </Card>
  );
}



function CartCard(props) {
  const [quantity, setQuantity] = useState(1); // Default quantity

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("cart"));
    if (existingData) {
      const item = existingData.find((item) => item.id === props.id);
      if (item && item.quantity) {
        setQuantity(item.quantity);
      } else if (item) {
        // If quantity is missing, initialize it
        const updatedData = existingData.map((item) =>
          item.id === props.id ? { ...item, quantity: 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedData));
      }
    }
  }, [props.id]);
  // Remove item from localStorage
  function removeFromLocalStorage() {
    const existingData = localStorage.getItem("cart");
    if (existingData) {
      let dataArray = JSON.parse(existingData);
      dataArray = dataArray.filter((item) => item.id !== props.id); // Use id for uniqueness
      localStorage.setItem("cart", JSON.stringify(dataArray));
      console.log("Updated array:", dataArray);
    }
  }

  // Update quantity for an item in localStorage
  function updateQuantity(newQuantity) {
    const existingData = JSON.parse(localStorage.getItem("cart"));
    if (existingData) {
      const updatedData = existingData.map((item) =>
        item.id === props.id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedData));
      setQuantity(newQuantity);
    }
  }

  // Handle quantity increase
  function handleIncrease() {
    const newQuantity = props.quantity + 1;
    updateQuantity(newQuantity);
  }

  // Handle quantity decrease
  function handleDecrease() {
    if (props.quantity > 1) {
      const newQuantity = props.quantity - 1;
      updateQuantity(newQuantity);
    }
  }

  return (
    <Card className="flex justify-between border p-5 bg-white">
      <div className="flex gap-6">
        <img src={props.thumbnail} className="h-64 aspect-square" alt="product" />
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bolder" }} className="capitalize font-bold text-xl">
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "light" }} className="capitalize text-gray-600 font-bold text-xl">
            {props.description}
          </Typography>
          <p className="flex text-sm my-1 gap-2 font-bold text-white bg-green-700 w-fit px-2 items-center">
            {props.rating} <FaStar />
          </p>
          <Typography variant="body2" className="text-grey-3 w-fit px-2 py-1 bg-red-600 text-white">
            {props.shippingInformation}
          </Typography>
          <ul className="list-disc px-4 text-gray-500">
            {Object.keys(props.dimensions).map((key) => (
              <li key={key}>
                {key}: {props.dimensions[key]}
              </li>
            ))}
          </ul>
          <p
            className={`flex text-sm my-1 gap-2 font-bold ${
              props.stock !== 0 ? "text-green-700" : "text-red-600"
            } w-fit px-2 items-center`}
          >
            {props.stock !== 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleDecrease}
            className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-xl ">{props.quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>
        </div>
        
      </div>
      <div className="px-5 min-w-52 text-right flex flex-col justify-between items-end h-64">
        <button onClick={removeFromLocalStorage} className="px-4 py-1 text-red-600 hover:text-red-800 text-xl">
          <MdCancel />
        </button>
        <div>
          <Typography variant="h4">₹{Math.round(props.price - (props.price * props.discountPercentage) / 100)}</Typography>
          <Typography variant="body1" sx={{ fontWeight: "medium" }} className="text-grey-6">
            <span className="line-through text-grey-1 font-extralight">₹{props.price}</span> {props.discountPercentage}% Off
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }} className="text-green-600">
            {props.returnPolicy}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }} className="text-yellow-600">
            {props.warrantyInformation}
          </Typography>
        </div>
        
      </div>
    </Card>
  );
}
export {
  SearchCard,
  CartCard
}