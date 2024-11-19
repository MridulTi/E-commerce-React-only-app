import React, { useEffect, useRef, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ComplexCard from "./ComplexCard";
import useAxios from "../Hooks/useAxios";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const KeywordCarousel = () => {
    const navigate=useNavigate();
    const keywords = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "skin-care",
        "smartphones",
        "sports-accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches"
    ]
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (direction) => {
        const scrollAmount = 200; // Pixels to scroll
        const container = containerRef.current;

        if (direction === "left") {
            container.scrollLeft -= scrollAmount;
            setScrollPosition(container.scrollLeft - scrollAmount);
        } else {
            container.scrollLeft += scrollAmount;
            setScrollPosition(container.scrollLeft + scrollAmount);
        }
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2">
            {/* Left Scroll Button */}
            <BsArrowLeftCircleFill
                onClick={() => handleScroll("left")}
                disabled={scrollPosition <= 0}
                className={`text-3xl text-grey-2 cursor-pointer rounded-full shadow-md ${scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : "hover:text-grey-1"
                    }`}
            />

            {/* Keywords Container */}
            <div
                ref={containerRef}
                className="flex w-[55vw] overflow-x-hidden whitespace-nowrap scrollbar-hide gap-3 flex-1"
            >
                {keywords.map((keyword, index) => (
                    <span
                        key={index}
                        draggable={false}
                        onClick={()=>navigate(`/app/category?q=${keyword}`)}
                        className="cursor-pointer capitalize px-4 py-2 bg-gray-300 rounded-full text-sm hover:bg-gray-400 hover:text-grey-5 active:bg-blue-500 active:text-white"
                    >
                        {keyword}
                    </span>
                ))}
            </div>

            {/* Right Scroll Button */}
            <BsArrowRightCircleFill
                onClick={() => handleScroll("right")}
                disabled={scrollPosition >= containerRef.current?.scrollWidth - containerRef.current?.clientWidth}
                className={`text-3xl text-grey-2 cursor-pointer rounded-full shadow-md ${scrollPosition >= containerRef.current?.scrollWidth - containerRef.current?.clientWidth
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-grey-1"
                    }`}
            />
        </div>
    );
};


export const CardCarousel = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState({});

    const { response, loading, error } = useAxios({
        method: 'get',
        url: '/products', // Make sure this endpoint provides category data.
    });

    useEffect(() => {
        if (response && response.products) {
            setData(response.products);

            // Group products by category
            const groupedCategories = response.products.reduce((acc, product) => {
                if (!acc[product.category]) acc[product.category] = [];
                acc[product.category].push(product);
                return acc;
            }, {});

            setCategories(groupedCategories);
        }
    }, [response]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    if (loading) {
        return (
            <Typography variant="body1" sx={{ color: "grey.60", textAlign: "center" }}>
                Loading...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography variant="body1" sx={{ color: "grey.60", textAlign: "center" }}>
                Error: {error}
            </Typography>
        );
    }

    return (
        <div>
            {Object.keys(categories).map((category) => (
                <div key={category} className="mb-8">
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }} className="capitalize">
                        {category}
                    </Typography>
                    <Carousel className="gap-2 shadow-none" responsive={responsive}
                        swipeable={true}
                        draggable={false}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                        {categories[category].map((item) => (
                            <ComplexCard {...item} />
                        ))}
                    </Carousel>
                </div>
            ))}
        </div>
    );
};
