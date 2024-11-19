import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { useAuth } from '../Context/AuthContext.jsx';
import {jwtDecode} from "jwt-decode"
import { ShoppingBag } from '@mui/icons-material';
import { Typography } from '@mui/material';

function Login() {
    const {update,setUserInfo}=useAuth();
    return (
        <div className="bg-orange-50 w-screen h-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl p-6 py-10 bg-white flex flex-col gap-4 items-center">
        <div className="aspect-square w-16 bg-orange-200 rounded-full grid place-items-center"><ShoppingBag className='text-red-600 text-4xl'/></div>
        <Typography variant='h4' sx={{fontWeight:"bold"}} className="text-2xl sm:text-3xl font-bold text-center">Order App Login</Typography>
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const decoded=jwtDecode(credentialResponse?.credential)
                    setUserInfo(decoded)
                    update(true);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
                auto_select
            />
            
        </div>
      </div>
    </div>
        
    )
}

export default Login