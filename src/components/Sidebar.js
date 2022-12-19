import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserAtom from '../recoil/atoms/userAtom';
import {useRecoilValue,useRecoilState} from 'recoil';
import {useHistory} from 'react-router-dom'
function Sidebar() {
  const history = useHistory()
  let userInfo = useRecoilValue(UserAtom) // recpuere la valeur de l'atom de l'utilisateur
const [userData,setUserData] = useRecoilState(UserAtom) // recuperation avec possibilte de modifier les valeurs
  const logoutHandler = () =>{
    setUserData({})
    localStorage.removeItem("userInfo");
    history.push('/login')
  }
 
  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
    return (
        <div>
               <nav className="flex flex-col  flex-wrap items-center justify-between p-4 bg-white shadow-lg "> 
  <div className="navbar-menu flex-col  lg:flex lg:flex-grow lg:items-center w-full lg:w-auto">
    <div className="lg:ml-auto mb-2">
    <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/articles">Articles</Link>
      <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/ressources">Ressources</Link>
      {/* <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/lives">Stream design</Link> */}
      <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/publishs">publications</Link>
    {userData?.firstName ? 
    <div className=""> <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/write">rediger article</Link>
    <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/profile">Informations personnelles</Link> </div>
   : '' }
  
    </div>
    { userData?.Pseudo  ? <div className="flex flex-col items-center"> <img className="rounded-full h-12 w-12" src={userData.imgURL} /> <p className=" ml-2 font-semibold text-black">{userData.Pseudo}</p> <p onClick={logoutHandler} className="inline-block py-3 px-5 mr-4 leading-none text-center text-black  bg-yellow-50 hover:bg-indigo-100 font-semibold cursor-pointer rounded ml-1 shadow"> se deconnecter</p>  </div>  :     <div class="flex flex-col"><Link className="inline-block py-3 px-5 mr-4 leading-none text-center text-black  bg-yellow-50 hover:bg-indigo-100 font-semibold rounded shadow" to="/login">Se connecter</Link><Link className="inline-block py-3 px-6 mt-4 lg:mt-0 text-center leading-none text-white bg-yellow-600 hover:bg-yellow-700 font-semibold rounded shadow" to="/signup">S'enregsitrer</Link></div>  }
  </div>

</nav>
        </div>
    )
}

export default Sidebar
