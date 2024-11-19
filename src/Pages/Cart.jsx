import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CartCard, SearchCard } from '../Components/Card';
import CartFooter from '../Components/CartFooter';

function Cart() {
  const [cartData,setCartData]=useState([]);
  useEffect(()=>{
    setCartData(JSON.parse(localStorage.getItem('cart')));
  })
  return (

    <Container sx={{ py: { 'xs': 1, 'md': "20%", 'lg': "5%", 'xl': "5%" } }}>
      {cartData.length!=0?
      cartData?.map((items)=>{
        return(<CartCard {...items}/>)
      })
      :
      <Typography variant='body1' sx={{color:"gray.500",textAlign:"center"}}>No Items in Cart</Typography>}
      <div className='fixed bottom-0 w-7/12'>
        <CartFooter/>
      </div>
    </Container>
  )
}

export default Cart