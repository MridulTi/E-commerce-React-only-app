import { Pagination } from '@mui/material'
import React from 'react'
import { useAuth } from '../Context/AuthContext.jsx'

function AppPagination(props) {
  const {setcurrentPage}=useAuth();
  return (
    <div className='w-full grid place-items-center my-2'>
      <div>
        <Pagination 
        onChange={(page)=>setcurrentPage(page.target.firstChild.data)}
        count={Math.floor(props.total/10)} 
        size="large" 
        shape="rounded"/>
      </div>
    </div>
  )
}

export default AppPagination