import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import UserAtom from '../recoil/atoms/userAtom';
import {useParams} from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';
import dns from '../utils/dns'
import axios from 'axios'
function SinglePublishScreen() {
    const [publish,setPublish] = useState()
    const params = useParams()

const [loading,SetLoading] = useState(true);
    console.log(params)
       useEffect(() => {
        axios({ method:'get',url:`${dns}/api/publish/${params.publishId}`}).then(response =>{
            setPublish(response.data)
          SetLoading(false)
           }).catch(err => console.log(err)) 
       },[])
    const [open,setOpen] = useState(false);
    const changeNavStatus = () =>{
        setOpen(!open)
    }
    return (
        <div>
            <Navbar openNav={open} changeNav= {changeNavStatus}  />
            { open ? <Sidebar /> : ''  }
            {loading ? <div class="flex h-screen justify-center " > <SpinnerCircular speed={100} size={50} /></div> : (<div>
                <h1 className=" text-2xl mt-2 md:text-3xl mb-5 ml-3  md:mt-16 italic font-semibold text-center">{publish.Title} </h1>
            <div className=" w-full h-full  ">
           <div   className="h-full  bg-white z-50 flex flex-col relative w-full"> 
           <img src={publish.imageUrl} className="object-contain self-center h-full" />
           </div>
           </div>
           <h1 className=" text-2xl mt-2 md:text-3xl mb-5 ml-3  md:mt-16 italic font-semibold text-center inline-block"> categorie : </h1>  <span className='text-2xl italic font-semibold '> {publish.category}</span>
           <h1 className=" text-2xl mt-2 md:text-3xl mb-5 ml-3  md:mt-16 italic font-semibold text-center"> description : </h1>
           <p className=" break-words font-light text-gray-800 text-center inline-block text-lg">{publish.Description}</p>
            </div>) }
         
        </div>
    )
}

export default SinglePublishScreen
