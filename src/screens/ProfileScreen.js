import React, { useState ,useEffect} from 'react'
import UserArticle from '../components/UserArticle'
import LikeArticle from '../components/LikeArticle'; 
import {useSetRecoilState} from 'recoil';
import userAtom from '../recoil/atoms/userAtom'
import { useHistory } from 'react-router';
import axios from 'axios'
import dns from '../utils/dns'
import '../css/profileScreen.css'
import {FaUser,FaHeart, FaBookOpen,FaImage} from 'react-icons/fa'
import { SpinnerCircular } from 'spinners-react';
import MyPublish from '../components/MyPublish'
function ProfileScreen() {

  

  const [UserLikedArticles,setUserLikedArticles] = useState([])
 const history = useHistory()
 // recuperation de l'atom userInfo

 const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  // declaration des valeurs
 const [Email,setEmail] = useState(userInfo.Email)
 const [firstName,setFirstName] = useState(userInfo.firstName)
 const [lastName,setLastName] = useState(userInfo.lastName)
 const [password,setpassword] = useState('')
 const [confirmPassword,setconfirmPassword] = useState('');
 const [Message,setMessage] = useState(false)
 const [loading1,SetLoading1] = useState(true);
 const [loading2,SetLoading2] = useState(true);
 const [loading3,SetLoading3] = useState(true);
 const [imgURL,setImgUrl] = useState('');
 const [ErrorMessage,setErrorMessage] = useState("");
const [userArticles,setUserArticles] =useState([])
const [userPublishing,setuserPublishing] =useState([])
// setState pour les options

const [option,setOption] = useState(1)

useEffect(() => {
  setImgUrl(userInfo.imgURL)
},[])
    // import pour chahnger le grand state
    const setUserInfo = useSetRecoilState(userAtom) 
// ADD IMAGE TO USER
const addImageToPost = (e) =>{
    
  const reader = new FileReader();
  if(e.target.files[0]){
    reader.readAsDataURL(e.target.files[0])
  }
  reader.onload = (readEvent) => {
    setImgUrl(readEvent.target.result)
  }
}
 // token faut authorization
 const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`,
  },
}
    const [open,setOpen] = useState(false);
    useEffect(() => {
       
    },[])
    const changeNavStatus = () =>{
        setOpen(!open)
    }

    // recuperation des articles liker par l'utilisatuer
    const pseudo = parseInt(userInfo.Pseudo.split('#')[1])
    const FethUserLikeArticle = async () => {
      try {
        const {data} = await axios.get(`${dns}/api/articles/like/${pseudo}`)
        setUserLikedArticles(data)
        SetLoading2(false)
      }catch(err){ 
        console.log(err)
      }
          }
    // usereff for arcile
    const FethUserArticle = async () => {
try {
  const {data} = await axios.get(`${dns}/api/articles/article/${userInfo._id}`)
  setUserArticles(data)
  SetLoading1(false)
}catch(err){ 
  console.log(err)
}
    }

    //  fetch user publish l
        
        const FethUserPublishing = async () => {
          try {
            const {data} = await axios.get(`${dns}/api/publish/publish/${userInfo._id}`)
            setuserPublishing(data)
            SetLoading3(false)
          }catch(err){ 
            console.log(err)
          }
              }
    useEffect(() => {
      FethUserArticle()
      FethUserLikeArticle()
      FethUserPublishing()
    },[])
    // handlerSubmit 
    const handlerSubmit = (e) =>{
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage(true)
      }else{
        ( async () => {
          try {
            const {data} = await axios.put(`${dns}/api/users/profile`,
            {firstName,lastName,Email,password,imgURL
            },config)
            setUserInfo(data)
            localStorage.removeItem('userInfo')
            localStorage.setItem('userInfo',JSON.stringify(data))
            history.push('/')
          }catch(error) { 
            const erreur = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            setErrorMessage(erreur);
            console.log('error', erreur)
          }
        } )()
      }
    }

    // change options 
     const  changeOptions = (e) => {
       const dataOptions = e.target.parentNode.getAttribute('data-options') ?  e.target.parentNode.getAttribute('data-options') : e.target.parentNode.parentNode.getAttribute('data-options')
       const optionsId = parseInt(dataOptions)
      setOption(optionsId)
     }
    return (
        <div className="flex flex-row h-screen">
          {/* sidebar */}
          <div className="flex flex-col flex-1 text-center items-center   mr-2 border-r-2 border-gray-400">
          <h1 className="   text-black  text-lg md:text-2xl capitalize font-bold mt-4">Profil utilisateur</h1>

          <ul className=" h-full list-none flex flex-col  mt-8 self-center justify-start   ">
            <li className= {option ==1 ? " cursor-pointer flex flex-row  w-full items-center  my-8   text-yellow-500"  : " cursor-pointer flex flex-row  w-full items-center text-gray-600 my-8  hover:text-yellow-500  " } onClick={changeOptions}  data-options="1" > <FaUser className='w-6 h-6' /> <p className=' textInfo ml-4   capitalize font-semibold' > informations utilisateur</p> </li>
            <li className= {option ==2 ? " cursor-pointer flex flex-row  w-full items-center  my-8   text-yellow-500"  : " cursor-pointer flex flex-row  w-full items-center text-gray-600 my-8  hover:text-yellow-500  " }  onClick={changeOptions} data-options="2"> <FaHeart className='w-6 h-6 ' /> <p className='textInfo ml-4  capitalize     font-semibold' >articles aimes</p> </li>

            <li className={option ==3 ? " cursor-pointer flex flex-row  w-full items-center  my-8   text-yellow-500"  : " cursor-pointer flex flex-row  w-full items-center text-gray-600 my-8  hover:text-yellow-500  " }  onClick={changeOptions } data-options="3"> <FaBookOpen className='w-6 h-6 ' /> <p className='textInfo ml-4  capitalize    font-semibold' > articles ecrits</p> </li>
            <li className={option ==4 ? " cursor-pointer flex flex-row  w-full items-center  my-8   text-yellow-500"  : " cursor-pointer flex flex-row  w-full items-center text-gray-600 my-8  hover:text-yellow-500  " }  onClick={changeOptions } data-options="4"> <FaImage className='w-6 h-6 ' /> <p className='textInfo ml-4  capitalize    font-semibold' > Mes publications </p> </li>


          </ul>
          </div>
              {/* options */}
              { option ===1 ?    (      <div className="flex flex-col flex-3">
            {ErrorMessage ? <p className="text-red-400 border-4 border-red-700 py-2 px-2 ">{ErrorMessage}</p> : "" }
            <div className="flex flex-wrap justify-center mb-4">
            <form className=" bg-white shadow-md p-12 rounded-sm" onSubmit={handlerSubmit} >
    <div className="mb-4">
      <input required value={Email} onChange={(e) => { setEmail(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="email" placeholder="Email"/>
    </div>
    <div className="mb-4">
      <input required value={firstName} onChange={(e) => { setFirstName(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="username" placeholder="votre prenom "/>
    </div>
    <div className="mb-4">
      <input required value={lastName} onChange={(e) => { setLastName(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="username" placeholder="votre nom"/>
    </div>
    <div className="mb-4">
      <input   value={password} onChange={(e) => { setpassword(e.target.value)}  } className=  { !Message ? 
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" :
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border  focus:border-gray-500 rounded focus:outline-none border-red-500" } type="password" placeholder="mot de passe"/>
    </div>
    <div className="mb-4">
      <input  value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value)}  } className= { !Message ? 
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" :
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border  focus:border-gray-500 rounded focus:outline-none border-red-500" } type="password" placeholder="confirmer le  mot de passe"/>
    </div>
    { Message ? <div className="mb-4">
       <p className="text-red-600 font-medium  text-sm">Les mot de passes ne correspondent pas</p>
    </div> : "" }
    <div className="mb-4  flex-col md:flex-row flex items-center justify-between"> 
        <label htmlFor="imgURL" className="bg-yellow-600 hover:bg-yellow-700 rounded-sm order-2  align-middle text-white px-2 py-3 cursor-pointer" > 
       choisir un fichier 
        </label>
      <input   onChange={addImageToPost} className="appearance-none hidden "  id='imgURL' type="file" />
      <img src={imgURL} className="rounded-full w-14 h-14" />
    </div>
    <div className="flex -mx-1 mb-4 justify-center">
      <button className="inline-block w-2/3 md:w-1/3  py-3 md:py-4 px-2  md:px-8 mx-1 leading-none text-white bg-yellow-600 hover:bg-yellow-700 font-semibold rounded shadow">mettre a jour</button>
    </div>
    <p className="text-sm text-center text-gray-400">Soyez le bienvenue dans notre communaute,sachez que cest un plaisir pour nous de vous accueilir</p>
    
  </form> 
  </div>
  </div>
            ) : ""  }

            {/* particles articles ecrits */}
            {option ===3 ? loading1 ? <div className="flex h-full w-full items-center justify-center">  <SpinnerCircular speed={100} size={50} /></div>  : ( <div className="flex flex-col flex-3 flex-wrap">
              {userArticles.map((article) => (
                <UserArticle key={article._id} title={article.Title} date={article.publishedDate} description={article.Description} articleId={article._id} />
              ))}
              </div>
 
 
 
    ) : ""}
            {/* particles articles aimes */}
            {option ===2 ?  loading2 ? <div className="flex h-full w-full items-center justify-center">  <SpinnerCircular speed={100} size={50} /></div> : ( <div className="flex flex-col flex-3 flex-wrap">
              {UserLikedArticles.map((article) => (
                <LikeArticle key={article._id} title={article.Title} date={article.publishedDate} description={article.Description} articleId={article._id} />
              ))}
              
              </div>
 
 
 
    ) : ""}

   {/* mes plublications */}
   {option ===4 ?  loading3 ? <div className="flex h-full w-full items-center justify-center">  <SpinnerCircular speed={100} size={50} /></div> : ( <div className="flex flex-col flex-3 flex-wrap">
              {userPublishing.map((publishing) => (
                <MyPublish key={publishing._id} Title={publishing.Title}  ImageUrl={publishing.imageUrl} description={publishing.Description} publishId={publishing._id} />
              ))}
              
              </div>
 
 
 
    ) : ""}

</div>
    )
      }

export default ProfileScreen

