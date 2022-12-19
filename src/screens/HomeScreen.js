import React, { useState,useEffect } from 'react'
import '../css/HomeScreen.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {Link} from 'react-router-dom'
import UserAtom from '../recoil/atoms/userAtom';
import {useRecoilState} from 'recoil';
import axios from 'axios'
import dns from '../utils/dns'
import Footer from '../components/Footer'
function Home() {
  
  // recuperation de l'atome pour le user
  const [userAtom,setUserAtom] = useRecoilState(UserAtom)
  // verifier si il a toujours une valeur dans le locastorage
    useEffect(() => {
      console.log(dns)
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      userInfo ?  setUserAtom(userInfo) : setUserAtom({}) ;
    },[])
    const [open,setOpen] = useState(false);
    const changeNavStatus = () =>{
        setOpen(!open)
    }
    return (
     
      
        <div className=" ">
        <Navbar openNav={open} changeNav= {changeNavStatus}  />
        { open ? <Sidebar /> : ''  }
        
        <div className="HeaderContainer grid-cols-2 pt-12 md:pt-48 sm:flex justify-center  md:h-screen ">
          {/* premiere colone */}
           <div className=" ml-8 flex flex-col">
            <h1 className=" text-2xl md:text-5xl text-black font-semibold">
              Laissez vous seduire par
            </h1>
            <h1 className=" text-3xl mb-1 md:text-8xl text-black capitalize font-bold">
              Houmklo design
            </h1>
            <p className="text-gray-800 text-2xl mt-1 ">La plateforme ,guide  web<br/> que n'importe quel designer devrait avoir  qu'il soit professionel <br/>ou neophytes.</p>
            <Link  className=" self-center md:self-start duration-100 text-white flex items-center mt-5 justify-center transition-all transform hover:-translate-y-2 bg-black hover:shadow w-32 h-12 font-bold rounded-full py-1 px-1">commencer</Link>
           </div>

           {/* deuxieme colone */}
           <div className="md:flex  hidden md:flex-col items-center  relative w-48" >
           <div className=" absolute z-10 transform translate-x-32 -translate-y-32 ">
             <img className="rounded-full shadow-md   w-64 h-64" src="https://yt3.ggpht.com/ytc/AKedOLTaEATd7YIMHzgl5s1MsQQ1OUrdNUY1I0nZbs4Z=s176-c-k-c0x00ffffff-no-rj-mo"/>
           </div>
           <div className="absolute transform -translate-x-48 -translate-y-32 ">
             <img className="rounded-full w-12 h-12 shadow-md  " src="https://teresasempere.neocities.org/Susan/portrait.jpg"/>
           </div>
           <div className="absolute">
             <img className="rounded-full w-72 h-72 shadow-md " src="https://pbs.twimg.com/profile_images/1364268291485622275/w2axzhBT_400x400.jpg"/>
           </div>
           </div>
       </div> 
       <div className=" flex flex-col">
       <p className=" font-semibold text-center mt-4 capitalize  text-3xl kaushin italic">  Houmklo Design </p>
       <p className=" text-center font-bold  capitalize text-4xl">mais d'ou vient <span className="kaushin italic "> Houmklo Design</span>  ?</p>
       <p className=" font-semibold text-center text-gray-700  text-2xl"> Houmklo signifie en langue baoule ce que l'on desire ,et design designe la conception <br/>
       Choissisez houmkloDesign si vous faites du
       </p>
       </div>
       {/* features */}
       <section className="p-4 mb-9 mt-10">
  <div className="flex flex-wrap items-center justify-center ">
    <div className="md:w-1/4 p-4 mb-4 md:mb-0 flex flex-col justify-center items-center">
      <div className="bg-blue-400 w-16 h-16 flex items-center self-center justify-center rounded-lg text-white shadow-lg" ><svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 0 24 24" width="42px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg> </div>
      <h3 className="text-xl my-3 font-semibold text-center font-heading">De la Veille technologique</h3>
      <p className="mb-3 text-gray-400 leading-relaxed text-center">Etre tenue des dernieres tendances</p>
      
    </div>
    <div className="md:w-1/4 p-4 mb-4 md:mb-0 flex flex-col justify-center items-center">
      <div className="bg-red-400 w-16 h-16 flex items-center self-center justify-center rounded-lg text-white shadow-lg" ><svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 0 24 24" width="42px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> </div>
      <h3 className="text-xl my-3 font-semibold text-center font-heading">UX Design</h3>
      <p className="mb-3 text-gray-400 leading-relaxed text-center">Design oriente experience utilisateur</p>
      
    </div>
    <div className="md:w-1/4 p-4 mb-4 md:mb-0 flex flex-col justify-center items-center">
      <div className="bg-yellow-400 w-16 h-16 flex items-center self-center justify-center rounded-lg text-white shadow-lg" ><svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 0 24 24" width="42px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> </div>
      <h3 className="text-xl my-3 font-semibold text-center font-heading">UI Design</h3>
      <p className="mb-3 text-gray-400 leading-relaxed text-center">Conception de belles interfaces</p>
      
    </div>
    <div className="md:w-1/4 p-4 mb-4 md:mb-0 flex flex-col justify-center items-center">
      <div className="bg-green-700 w-16 h-16 flex items-center self-center justify-center rounded-lg text-white shadow-lg" >
      <svg className="fill-current text-white " xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="42px" viewBox="0 0 24 24" width="42px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M19.93,8.21l-3.6,1.68L14,7.7V6.3l2.33-2.19l3.6,1.68c0.38,0.18,0.82,0.01,1-0.36c0.18-0.38,0.01-0.82-0.36-1L16.65,2.6 c-0.38-0.18-0.83-0.1-1.13,0.2l-1.74,1.6C13.6,4.16,13.32,4,13,4c-0.55,0-1,0.45-1,1v1H8.82C8.34,4.65,6.98,3.73,5.4,4.07 C4.24,4.32,3.25,5.32,3.04,6.5C2.82,7.82,3.5,8.97,4.52,9.58L7.08,18H4v3h13v-3h-3.62L8.41,8.77C8.58,8.53,8.72,8.28,8.82,8H12v1 c0,0.55,0.45,1,1,1c0.32,0,0.6-0.16,0.78-0.4l1.74,1.6c0.3,0.3,0.75,0.38,1.13,0.2l3.92-1.83c0.38-0.18,0.54-0.62,0.36-1 C20.75,8.2,20.31,8.03,19.93,8.21z M6,8C5.45,8,5,7.55,5,7s0.45-1,1-1s1,0.45,1,1S6.55,8,6,8z"/></g></g></g></svg>
         </div>
      <h3 className="text-xl my-3 font-semibold text-center font-heading">Prototype</h3>
      <p className="mb-3 text-gray-400 leading-relaxed text-center">Version testable de votre application</p>
      
    </div>
  </div>
</section>
      <h1 className="text-black bold  text-center text-3xl  md:text-5xl "> Mais pourquoi houmkloDesign ?</h1>
    {/* houmklo features */}
    {/* houmklo tendance feature */}
    <div className="HeaderContainer grid-rows-2  gap-x-8   md:grid-cols-2 pt-12 md:pt-48 sm:flex justify-center   md:h-screen ">
          {/* premiere colone */}
           <div className=" ml-8 flex flex-col  mt-8" >
            <h1 className=" text-2xl md:text-5xl text-black font-semibold">
              Tendances
            </h1>
            <h1 className=" text-3xl mb-1 md:text-6xl text-black capitalize font-bold">
              Avec  Houmklo design 
            </h1>
            <p className="text-gray-800 text-2xl mt-1 ">soyez tenu au courant des dernieres nouvelles sur le monde  du design</p>
            <p className="text-gray-800 text-2xl mt-1 ">Des articles ecrit pour vous par vous.</p>
         <div className=" flex flex-col">
            <Link to='/articles' className="  text-black  font-bold  text-xl mt-4 flex items-center ">Decouvrez des articles <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg></Link>
<span className="h-1 w-48 bg-yellow-400"></span>
</div>
           </div>

           {/* deuxieme colone */}
           <div className="md:flex  mt-5 md:mt-0  md:flex-col items-center  relative w-auto" >
          
             <img className="rounded-lg shadow-md  imgTendances " src="https://digitalsynopsis.com/wp-content/uploads/2019/08/beautiful-illustrations-design-inspiration-24.png"/>
           
           </div>
       </div>
    {/* houmklo team feature */}
    <div className="HeaderContainer grid-rows-2 pl-5 gap-x-8   md:grid-cols-2 pt-12 md:pt-48 sm:flex justify-center   md:h-screen ">
          {/* premiere colone */}
           <div className=" ml-8 flex flex-col order-3   mt-8" >
            <h1 className=" text-2xl md:text-5xl text-black font-semibold">
           Decouvrez des créations
            </h1>
            <h1 className=" text-3xl mb-1 md:text-6xl text-black capitalize font-bold">
              sur Houmklo design 
            </h1>
            <p className="text-gray-800 text-xl md:text-2xl mt-1 ">des créations faites <br/> par des jeunes ivoriens comme vous</p>
           
         <div className=" flex flex-col">
            <Link  to="/publishs"   className="  text-black  font-bold  text-lg md:text-xl mt-4 flex items-center ">Acceder à la gallerie<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg></Link>
<span className="h-1 w-64 md:w-56 bg-yellow-400"></span>
</div>
           </div>

           {/* deuxieme colone */}
           <div className="md:flex  mt-48 md:mt-0 mr-0 md:mr-32     md:flex-col items-center w-full relative md:w-72" >
           <div className=" absolute z-10 hidden md:block transform translate-x-32 -translate-y-32 ">
             <img className="rounded-lg shadow-md   w-64 h-64" src="https://v7v2n5e8.rocketcdn.me/wp-content/uploads/IMG_73522pp_w768_h512.jpg"/>
           </div>
           <div className="absolute  hidden md:block -translate-x-0 -translate-y-0 transform md:-translate-x-32 md:-translate-y-32 ">
             <img className="rounded-lg w-48 h-48 shadow-md  " src="https://previews.123rf.com/images/rawpixel/rawpixel1510/rawpixel151019625/46819708-hommes-d-affaires-design-team-brainstorming-r%C3%A9union-concept.jpg"/>
           </div>
           <div className=" md:absolute  ">
             <img className="rounded-lg w-72 h-72 shadow-md " src="http://cdn.shopify.com/s/files/1/0135/0280/8123/articles/John_D._Saunders_1024x1024.jpg?v=1586371961"/>
           </div>
           </div>
       </div>
       {/* houmklo ressource feature */}
       <div className="RessourcesContainer mt-48 md:mt-0  flex flex-col justify-center items-center   md:h-screen  ">
          {/* premiere colone */}
           <div className=" ml-8 flex flex-col order-3   mt-8" >
            <h1 className=" text-2xl md:text-5xl text-black font-semibold">
             Les ressources 
            </h1>
            <h1 className=" text-3xl mb-1 md:text-6xl text-black capitalize font-bold">
              Avec  Houmklo design 
            </h1>
            <p className="text-white text-xl md:text-2xl mt-1 ">Vous aurez les ressources pour pouvoir parfaire vos designs</p>
            <p className="text-white text-xl md:text-2xl mt-1 "> Il sera votre live-share.</p>
         <div className=" flex flex-col">
         <Link to="/ressources"  className=" self-center  duration-100 text-white flex items-center mt-5 justify-center transition-all transform hover:-translate-y-2 bg-black hover:shadow w-32 h-12 font-bold rounded-full py-1 px-1">Explorez </Link>

</div>
           </div>

         
           
       </div>
       <Footer />
       </div>
    )
}

export default Home
