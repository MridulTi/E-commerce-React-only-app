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
    <Card className="flex flex-col lg:flex-row justify-between border p-5 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={props.thumbnail} className="h-64 aspect-square mb-4 md:mb-0" />
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

      {/* Right Section (Price & Discount) */}
      <div className="px-5 min-w-52 text-right mt-4 md:mt-0">
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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("cart"));
    if (existingData) {
      const item = existingData.find((item) => item.id === props.id);
      if (item && item.quantity) {
        setQuantity(item.quantity);
      } else if (item) {
        const updatedData = existingData.map((item) =>
          item.id === props.id ? { ...item, quantity: 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedData));
      }
    }
  }, [props.id]);

  function removeFromLocalStorage() {
    const existingData = localStorage.getItem("cart");
    if (existingData) {
      let dataArray = JSON.parse(existingData);
      dataArray = dataArray.filter((item) => item.id !== props.id);
      localStorage.setItem("cart", JSON.stringify(dataArray));
    }
  }

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

  function handleIncrease() {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  }

  function handleDecrease() {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantity(newQuantity);
    }
  }

  return (
    <Card className="flex flex-col lg:flex-row border p-5 bg-white gap-4 lg:gap-6">
      {/* Product Image & Details */}
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-2/3">
        <img
          src={props.thumbnail}
          className="h-40 w-full lg:h-64 lg:w-64 object-cover rounded-md"
          alt="product"
        />
        <div className="flex flex-col justify-between">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bolder" }}
            className="capitalize font-bold text-lg lg:text-xl"
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "light" }}
            className="capitalize text-gray-600 text-sm lg:text-base"
          >
            {props.description}
          </Typography>
          <p className="flex items-center text-sm gap-2 font-bold text-white bg-green-700 w-fit px-2 my-2">
            {props.rating} <FaStar />
          </p>
          <Typography
            variant="body2"
            className="text-grey-3 w-fit px-2 py-1 bg-red-600 text-white text-xs lg:text-sm"
          >
            {props.shippingInformation}
          </Typography>
          <ul className="list-disc px-4 text-gray-500 text-sm">
            {Object.keys(props.dimensions).map((key) => (
              <li key={key}>
                {key}: {props.dimensions[key]}
              </li>
            ))}
          </ul>
          <p
            className={`text-sm font-bold ${
              props.stock !== 0 ? "text-green-700" : "text-red-600"
            }`}
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
            <span className="text-lg">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-col justify-between items-end w-full lg:w-1/3">
        <button
          onClick={removeFromLocalStorage}
          className="text-red-600 hover:text-red-800 text-xl"
        >
          <MdCancel />
        </button>
        <div className="text-right">
          <Typography variant="h4">
            ₹{Math.round(props.price - (props.price * props.discountPercentage) / 100)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "medium" }}
            className="text-grey-6"
          >
            <span className="line-through text-grey-400">₹{props.price}</span>{" "}
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
      </div>
    </Card>
  );
}

export {
  SearchCard,
  CartCard
}