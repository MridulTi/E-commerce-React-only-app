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

function SearchResult() {
    const {currentPage}=useAuth();
    const [data, setData] = useState(null);
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("q");

    const { response, loading, error } = useAxios({
        method: 'get',
        url: `/products/search?q=${query}&limit=10`,
    });
    function paginationFetch(){
        axios(`/products/search?q=${query}&limit=10&skip=${Number(currentPage)*10}`)
        .then(res=>{
            setData(res.data);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        paginationFetch();
        console.log(typeof(currentPage))
        console.log(currentPage)
        // console.log(data)
    },[currentPage])

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
                    <Link
                        underline="hover"
                        color="inherit"
                        className='capitalize'
                        href="#"
                    >
                        {data?.products[0]?.category?data?.products[0]?.category:"..."}
                    </Link>
                    <Typography sx={{ color: 'text.primary',fontSize:"0.8rem" }}>{query}</Typography>
                </Breadcrumbs>
                <Typography sx={{ fontWeight: "bold" }}>Results</Typography>
                <Typography className='text-sm'>Check each product page for other buying options.</Typography>
            </Card>
            {data != null ? (
                data?.products.map((items) => <SearchCard
                    {...items}
                />)
            ) : <h1 className='text-grey-2 text-center'>Loading...</h1>}
            
            <AppPagination total={data?.total}/>
        </Container>
    )
}

export default SearchResult