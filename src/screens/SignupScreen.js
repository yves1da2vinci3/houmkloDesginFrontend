import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import UserAtom from '../recoil/atoms/userAtom';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import dns from '../utils/dns'
 import {useHistory,useLocation} from 'react-router-dom'
function SignupScreen() {
  const history = useHistory()
 const [userInfo,setUserInfo] = useRecoilState(UserAtom)
 // definition des valeurs du champ
  const [Email,setEmail] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [password,setpassword] = useState('')
  const [confirmPassword,setconfirmPassword] = useState('');
  const [Message,setMessage] = useState(false)
  const [imgURL,setImgUrl] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
  const [ErrorMessage,setErrorMessage] = useState("");

    // verifier s'il veut venir including

  // defintion de la config pour axios
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  // fonction qui permet d'ajouter l'image
  const addImageToPost = (e) =>{
    
     const reader = new FileReader();
     if(e.target.files[0]){
       reader.readAsDataURL(e.target.files[0])
     }
     reader.onload = (readEvent) => {
       setImgUrl(readEvent.target.result)
     }
  }
// fonction qui
  const [open,setOpen] = useState(false);
    const changeNavStatus = () =>{
        setOpen(!open)
    }
    const handlerSubmit = (e) =>{
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage(true)
      }else{
        ( async () => {
          try {
            const {data} = await axios.post(`${dns}/api/users`,
            {firstName,lastName,Email,password,imgURL
            },config)
            setUserInfo(data)
            
            localStorage.setItem('userInfo',JSON.stringify(data))
            history.push('/')
          }catch(error) { 
            const erreur = error.response.data.message
            setErrorMessage(erreur);
            console.log('error', erreur)
          }
        } )()
      }
    }
    return (
        <>   <Navbar openNav={open} changeNav= {changeNavStatus}  />
        { open ? <Sidebar /> : ''  }

        {ErrorMessage ? <p className="text-red-400 border-4 text-center border-red-700 py-2 px-2 ">{ErrorMessage}</p> : "" }
        
        <div className=" flex items-center justify-center py-8 flex-col h-screen ">
          
          <h1 className=" mb-3 text-xl uppercase" > Enregistement</h1>
          <form className=" bg-white shadow-md p-12 rounded-sm" onSubmit={handlerSubmit} >
    <div className="mb-4">
      <input required value={Email}  onChange={(e) => { setEmail(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="email" placeholder="Email"/>
    </div>
    <div className="mb-4">
      <input required  value={firstName} onChange={(e) => { setFirstName(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="text" placeholder="Enter votre Nom"/>
    </div>
    <div className="mb-4">
      <input required  value={lastName} onChange={(e) => {setLastName(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="text" placeholder="Entrer votre prenom"/>
    </div>
    <div className="mb-4">
      <input  required value={password} onChange={(e) => { setpassword(e.target.value)}  } className=  { !Message ? 
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" :
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border  focus:border-gray-500 rounded focus:outline-none border-red-500" } type="password" placeholder="Password"/>
    </div>
    <div className="mb-4">
      <input  value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value)}  } className= { !Message ? 
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" :
      "appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border  focus:border-gray-500 rounded focus:outline-none border-red-500" } type="password" placeholder="confirmer le  Password"/>
    </div>
     { Message ? <div className="mb-4">
       <p className="text-red-600 font-medium  text-sm">Les mot de passes ne correspondent pas</p>
    </div> : "" }
    
    <div className="mb-4  flex items-center justify-between">
        <label htmlFor="imgURL" className="bg-yellow-600 hover:bg-yellow-700 rounded-sm  align-middle text-white px-2 py-3 cursor-pointer" > 
       choisir une image
        </label>
      <input className="appearance-none hidden " onChange={addImageToPost}  id='imgURL' type="file" />
      <img required src={imgURL} className="rounded-full w-14 h-14" />
    </div>
    <div className="flex -mx-1 mb-4 justify-center">
      <button className="inline-block w-1/2 py-4 px-8 mx-1 leading-none text-white bg-yellow-600 hover:bg-yellow-700 font-semibold rounded shadow">S'enregsitrer</button>
    </div>
    <p className="text-sm text-center text-gray-400">Soyez le bienvenue dans notre communaute,sachez que cest un plaisir pour nous de vous accueilir</p>
    
  </form> 
      </div>
         </>
 
    )
}

export default SignupScreen
