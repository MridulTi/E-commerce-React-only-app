import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CartCard, SearchCard } from '../Components/Card';
import CartFooter from '../Components/CartFooter';

function Cart() {
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem('cart')));
  }, []);

  return (
    <Container
      className="p-4 md:p-8"
      sx={{
        py: { xs: 10, md: "20%", lg: "25%", xl: "5%" },
        px: { xs: 5, sm: "12%", md: "15%", lg: "5%" },
      }}
    >
      {cartData.length !== 0 ? (
        cartData.map((items, index) => {
          return <CartCard key={index} {...items} />;
        })
      ) : (
        <Typography variant="body1" sx={{ color: "gray.500", textAlign: "center" }}>
          No Items in Cart
        </Typography>
      )}

      <div className="fixed bottom-0 left-0 sm:left-28 lg:left-64 w-full md:w-8/12 pl-0 md:pl-10">
        <CartFooter />
      </div>
    </Container>
  );
}

export default Cart;
