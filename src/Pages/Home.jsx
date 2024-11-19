import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useAxios from '../Hooks/useAxios';
import ComplexCard from '../Components/ComplexCard';
import { blue } from '@mui/material/colors';
import {Splide, SplideSlide} from "@splidejs/react-splide"
import {CardCarousel, KeywordCarousel} from '../Components/Caraousel';

function Home() {
  return (
    <Container className='p-20' sx={{ px: { 'xs': 1 } }}>
      <div className="flex items-center justify-center">
        <KeywordCarousel/>
      </div>
      <Typography variant='h4' sx={{ fontWeight: "bold",my:"2%" }} >Welcome to ORDER APP,</Typography>
      <CardCarousel/>
    </Container>
  )
}

export default Home