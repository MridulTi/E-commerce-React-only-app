import { Autocomplete, Avatar, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BiBell, BiNotification } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { FaRegUserCircle } from "react-icons/fa";
import useAxios from "../Hooks/useAxios.js"
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const {userInfo}=useAuth();
  const [query,setQuery]=useState("")
  const [data,setData]=useState(null)
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `/products/search?q=${query}`,
  });

  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/app/search?q=${query}`);
    }
  };

  useEffect(() => {
    if (response !== null) {
      setData(response);
      console.log(response)
    }
  }, [response]);

  return (
    <div className='fixed z-20 bg-white w-full h-16 border-b px-20 flex justify-between items-center'>
      <Typography variant='h5' sx={{fontWeight:"bold"}}>ORDER APP</Typography>
      <div className='w-[30vw] h-10 border rounded-full flex gap-2 items-center px-6 bg-gray-100 '>
        <BsSearch  className='text-grey-1'/>
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder='Search Input'
          className='bg-inherit text-black p-2 w-full h-full outline-0'
        />
      </div>
      <div className='flex items-center gap-6'>
        <Tooltip title="Notification" className='z-20'>
          <BiBell className='text-3xl text-grey-1'/>
        </Tooltip>
        <Tooltip title={userInfo!=null?userInfo.name:"My User"} className='z-20'>
          {userInfo?.picture!=""?<Avatar sizes="sm" src={userInfo.picture}/>:<FaRegUserCircle className='text-3xl text-grey-1'/>}
        </Tooltip>
      </div>
    </div>
  )
}

export default Navbar