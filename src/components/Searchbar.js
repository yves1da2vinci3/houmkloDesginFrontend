import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
function Searchbar() {
  const [keyword,setKeyword] =useState('')
  const history = useHistory()
   const searchandler = () => {
     history.push(`/search/?keyword=${keyword}`)
   }
    return (
                 <div className=" w-2/3   self-center  flex flex-row justify-center items-center  mt-5 bg-gray-100 mb-7"> 
               <input onChange={(e) => {setKeyword(e.target.value)}} className=" bg-gray-100 w-full text-gray-500  mx-4 outline-none appareance-none  searchInput" type="text" placeholder="rechercher un mot" />

<div onClick={searchandler} className="flex  items-center justify-center   cursor-pointer  self-end  bg-black  h-16 w-16 md:h-12 md:w-12" > 
  <svg color="white" xmlns="http://www.w3.org/2000/svg" className=" searchIcon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
</div>
            </div>
    )
}

export default Searchbar
