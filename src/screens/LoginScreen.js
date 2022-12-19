import React, { useState ,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useHistory,useLocation} from 'react-router-dom'
import UserAtom from '../recoil/atoms/userAtom';
import {useSetRecoilState,useRecoilValue} from 'recoil';
import dns from '../utils/dns'
import axios from 'axios'
function LoginScreen() {
 const location = useLocation()
 const history = useHistory()
 const userInfo = useRecoilValue(UserAtom);
 const setUserInfo = useSetRecoilState(UserAtom);
  const [Email,setEmail] = useState('')
  const [password,setpassword] = useState('')
  const [ErrorMessage,setErrorMessage] = useState("");
  const redirect = location.search ? location.search.split('=')[1] : '/'
  // verifier s'il veut venir including
useEffect(() => {
  console.log(Object.keys(userInfo).length)
  if(Object.keys(userInfo).length > 0){
    history.push(redirect)
  }
  
}, [redirect,history,userInfo])
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const handlerSubmit = async (e) => {
    e.preventDefault()

  try  {
    const {data} = await axios.post(`${dns}/api/users/login`,
    {Email,password},config)
  setUserInfo(data)         
  localStorage.setItem('userInfo',JSON.stringify(data)) 
  history.push(redirect)
  } catch(error){
    const erreur = error.response.data.message ?  error.response.data.message : " mot de passe ou email incorrect"
     
            setErrorMessage(erreur);
            console.log('error', erreur)
  }
   

  }
  const [open,setOpen] = useState(false);
    const changeNavStatus = () =>{
        setOpen(!open)
    }
    return (
        <> 
        <Navbar openNav={open} changeNav= {changeNavStatus}  />
        { open ? <Sidebar /> : ''  }
        {ErrorMessage ? <p className="text-red-400 border-4 border-red-700 py-2 px-2 ">{ErrorMessage}</p> : "" }
        <div className=" flex items-center justify-center py-8 flex-col h-screen ">
            <h1 className=" mb-3 text-xl uppercase" > Connexion</h1>
            <form className=" bg-white shadow-md p-12 rounded-sm" onSubmit={handlerSubmit}>
      <div class="mb-4">
        <input required value={Email} onChange={(e) => { setEmail(e.target.value)}  }  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="email" placeholder="Entrer votre Email"/>
      </div>
      <div class="mb-4">
        <input  value={password} onChange={(e) => { setpassword(e.target.value)}  }  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="password" placeholder="Entrer votre Password"/>
      </div>
      <div class="flex -mx-1 mb-4 justify-center">
        <button type="submit"  class="inline-block w-1/2 py-4 px-8 mx-1 leading-none text-black shadow-sm font-semibold bg-yellow-100 hover:bg-yellow-300 rounded">Se connecter</button>
      </div>
      <p class="text-sm text-center text-gray-400">Nous tenons encore une fois a vous souhaiter un bon retour parmi nous</p>
    </form> 
        </div>
        </>
    )
}

export default LoginScreen
