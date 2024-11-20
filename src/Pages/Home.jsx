import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useAxios from '../Hooks/useAxios';
import ComplexCard from '../Components/ComplexCard';
import { blue } from '@mui/material/colors';
import {Splide, SplideSlide} from "@splidejs/react-splide"
import {CardCarousel, KeywordCarousel} from '../Components/Caraousel';

function Home() {
  return (
    <Container
      className="p-4 md:p-8"
      sx={{
        py: { 'xs': 1, 'md': "8%", 'lg': "5%", 'xl': "5%" },
        px: { xs: 5, sm: "12%", md: "15%",lg:"5%"},
      }}
    >
      <div className="flex items-center justify-center mb-4">
        <KeywordCarousel />
      </div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: { xs: "center", sm: "center", md: "left" },
          my: "2%",
        }}
        className="capitalize"
      >
        Welcome to ORDER APP,
      </Typography>
      <CardCarousel />
    </Container>
  );
}


export default Home