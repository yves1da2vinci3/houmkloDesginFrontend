import React from 'react'
import {Link} from 'react-router-dom'
function Ressource({lien,name,imgUrl}) {
    return (
        <a href={lien} className=" w-full md:w-1/2 lg:w-1/3 px-4 mb-8 break-words transition duration-500 ease-in-out hover:-translate-y-2 transform  cursor-pointer flex flex-row h-24  shadow-lg justify-center items-center rounded-lg">
        <img src={imgUrl} className="w-16 rounded-md justify-start"/>
        <p className="font-semibold text-left text-2xl   m-16"> {name}</p>
         </a>
    )
}

export default Ressource
