import React, { useEffect, useState ,useRef} from 'react'
import {useRecoilState} from 'recoil'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import UserAtom from '../recoil/atoms/userAtom';
import {useLocation,useHistory,Link} from 'react-router-dom'
import {AiOutlineSearch,AiFillLike,AiFillEye,AiFillFileAdd} from 'react-icons/ai'
import Publishing from '../components/Publishing';
import dns from '../utils/dns'
import axios from 'axios'
import '../css/publish.css'
import { SpinnerCircular } from 'spinners-react';
function PublishScreen() {
  const location = useLocation()
  const history = useHistory()
const [sticky,setSticky] = useState(false) 
const [publishs,setPublishs] = useState()
const [category,setCategory] = useState('')
const [userStatus,setUserStatus] = useState(false)
  // recuperation du contanaier
    const [loading,SetLoading] = useState(true);
    const Query = useLocation().search
    console.log(Query)
    // const keyword = location.search.split('=')[1]

   

     // recuperation de l'atome pour le user
     // bring publishing
     useEffect(() => {
      axios({ method:'get',url:`${dns}/api/publish`}).then(response =>{
        console.log(response)
        setPublishs(response.data)
        SetLoading(false)
      }).catch(err => console.log(err))
      },[])
  const [userAtom,setUserAtom] = useRecoilState(UserAtom)
  // verifier si il a toujours une valeur dans le locastorage
    useEffect(() => {
   // bring publishing

      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
   if(userInfo){
     setUserStatus(true)
   }
      userInfo ?  setUserAtom(userInfo) : setUserAtom({}) ;
      window.addEventListener("scroll",(e)=>{
        console.log(window.scrollY)
      if(window.scrollY < 112){
        setSticky(false)
        console.log(" non depasser")

      } else{
        console.log("depasser")
      setSticky(true)
      }

      })
      

    },[])

    useEffect(() => {
      SetLoading(true)
      axios({ method:'get',url:`${dns}/api/publish?category=${category}`}).then(response =>{
        console.log(response)
        setPublishs(response.data)
        SetLoading(false)
      }).catch(err => console.log(err))
    },[location])
    const  selectHandler = (e)  =>{
         console.log(e.target.value)
         console.log(location)
         history.push(`?category=${e.target.value}`)
         setCategory(e.target.value)
    }
   
   const inputHandler = (e) => {
    SetLoading(true)
    axios({ method:'get',url:`${dns}/api/publish?keyword=${e.target.value}`}).then(response =>{
      console.log(response)
      setPublishs(response.data)
      SetLoading(false)
    }).catch(err => console.log(err))
 console.log(e.target.value)
}

  // fetchAricles()

   
    const [open,setOpen] = useState(false);
    const [popup,setPopup] = useState(false);
    
    const changeNavStatus = () =>{
        setOpen(!open)
    }
    return (
        <div className="flex flex-col relative  ">
          
        
         {userStatus ?    <Link to="/publishing">
           <div className=" w-24 h-24 z-40 fixed bg-yellow-500 rounded-full flex items-center justify-center shadow-md bottom-10 right-0 mr-3 cursor-pointer hover:bg-yellow-800">
               <AiFillFileAdd className="text-white fill-current w-10 h-10" />
           </div>
           </Link>: '' }
        
            <Navbar openNav={open} changeNav= {changeNavStatus}  />
            { open ? <Sidebar /> : ''  }
            {/* search bar */}
            <div id="searchBar"       className={ sticky ? "  flex flex-row h-16  w-full mt-7 rounded-full  border-2 border-gray-400  z-50 shadow-md items-center  bg-gray-100 pl-2 md:pl-5 fixed " :  "  flex flex-row h-16  w-full mt-7 rounded-full  border-2 border-gray-400  shadow-md items-center  bg-gray-100 pl-2 md:pl-5  "}>
              <div className="h-full w-3/5  flex items-center border-r-2 border-gray-400">
                <AiOutlineSearch className=" w-1/3 h-1/3 md:h-10 md:w-10 ml-3 "  />
                <input  onChange={inputHandler} className=" bg-gray-100 text-gray-900 text-sm md:text-2xl outline-none pl-8 w-full  "  placeholder="veuillez entrer un mot clé"  />
                </div>
                <div className=" bg-white h-full w-2/5 rounded-r-full  ">
                  <select onChange={ selectHandler } className=" flex items-center justify-center  w-11/12  h-full ml-2 bg-white outline-none  rounded-r-full font-semibold text-sm  md:text-lg md:uppercase">
                    <option className="font-semibold " value="XD"> categorie: adode xd</option>
                    <option className="font-semibold " value="AI"> categorie: illustrator</option>
                    <option className="font-semibold " value="PS"> categorie: photoshop</option>
                    <option className="font-semibold " value="ID"> categorie: indesign</option>
                    <option className="font-semibold " value="3D"> categorie: Modelisation 3d</option>
                  </select>
                  {/* <div className="h-full  hidden text-sm lg:flex items-center justify-center gap-x-2  ">
                      <p className="font-bold bg-black   p-2 rounded-full text-white  cursor-pointer ">adode xd</p>
                      <p className="font-semibold   rounded-full text-black  cursor-pointer "> illustrator</p>
                      <p className="font-semibold   rounded-full text-black  cursor-pointer ">photoshop</p>
                      <p className="font-semibold   rounded-full text-black  cursor-pointer ">indesign</p>
                      <p className="font-semibold   rounded-full text-black  cursor-pointer ">Modelisation 3d</p>
                      </div> */}
                </div>
            </div>
            {/* gallerire d'images  */}
            <div className="flex flex-wrap  gap-3 pt-6 justify-center  ">
            { loading ? <div class="flex h-screen justify-center " > <SpinnerCircular speed={100} size={50} /></div> : publishs.length !==0 ? (   publishs.map(publish => (
              <Publishing key={publish._id} Title={publish.Title}imageUrl={publish.imageUrl} userImgUrl={publish.userImgUrl} username={publish.username}  publishId={publish._id} />
            ))) :  <h1 className="text-2xl"> aucune publication trouvée </h1>}
           
            </div>
        </div>
    )
}

export default PublishScreen
