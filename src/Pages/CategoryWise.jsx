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
        <Container sx={{
            py: { xs: 10, md: "8%", lg: "4%" },
            px: { xs: 2, sm: 15, md: "12%", lg: "5%" }
        }}>
            <Card className='bg-white w-full p-4 md:p-5 border'>
                <Breadcrumbs aria-label="breadcrumb" sx={{
                    fontSize: { xs: "0.7rem", sm: "0.8rem" }, mb: "1rem"
                }} separator={<MdKeyboardArrowRight />}>
                    <Link underline="hover" color="inherit" href="/app/dashboard">
                        Home
                    </Link>
                    <Typography sx={{
                        color: 'text.primary',
                        fontSize: { xs: "0.8rem", sm: "1rem" }
                    }}>{query}</Typography>
                </Breadcrumbs>
                <Typography sx={{
                    fontWeight: "bold", fontSize: { xs: "1.2rem", sm: "1.5rem" }
                }} className='capitalize'>
                    {query}
                </Typography>
                <Typography sx={{
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    marginBottom: 2
                }}>
                    Check each product page for other buying options.
                </Typography>
            </Card>
            {data != null ? (
                data?.products.map((items, index) => <SearchCard key={index} {...items} />)
            ) : <Typography sx={{ textAlign: 'center', color: 'gray' }}>Loading...</Typography>}

            <AppPagination total={data?.total} />
        </Container>
    )
}

export default CategoryWise