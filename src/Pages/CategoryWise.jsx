import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAxios from '../Hooks/useAxios';
import { Breadcrumbs, Card, Container, Typography } from '@mui/material';
import { SearchCard } from '../Components/Card';
import { BiRightArrow, BiRightArrowAlt } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa';
import { ArrowRightAlt } from '@mui/icons-material';
import { CgArrowRight } from 'react-icons/cg';
import { MdKeyboardArrowRight } from 'react-icons/md';
import AppPagination from '../Components/AppPagination';
import { useAuth } from '../Context/AuthContext.jsx';
import axios from 'axios';

function CategoryWise() {
    const {currentPage}=useAuth();
    const [data, setData] = useState(null);
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("q");

    const { response, loading, error } = useAxios({
        method: 'get',
        url: `/products/category/${query.toLowerCase()}?limit=50`,
    });


    useEffect(() => {
        if (response !== null) {
            setData(response);
            console.log(data)
        }
    }, [response]);

    return (
        <Container sx={{ py: { 'xs': 1, 'md': "20%", 'lg': "5%", 'xl': "5%" }}}>
            <Card className='bg-white w-full p-5 border'>
                <Breadcrumbs aria-label="breadcrumb" sx={{fontSize:"0.8rem",mb:"1rem"}} separator={<MdKeyboardArrowRight/>}>
                    <Link underline="hover" color="inherit" href="/app/dashboard">
                        Home
                    </Link>
                    <Typography sx={{ color: 'text.primary',fontSize:"0.8rem" }} className='capitalize'>{query}</Typography>
                </Breadcrumbs>
                <Typography sx={{ fontWeight: "bold" }} className='capitalize'>{query}</Typography>
                <Typography className='text-sm'>Check each product page for other buying options.</Typography>
            </Card>
            {data != null ? (
                data?.products.map((items) => <SearchCard
                    {...items}
                />)
            ) : <h1 className='text-grey-2 text-center'>Loading...</h1>}
            
        </Container>
    )
}

export default CategoryWise