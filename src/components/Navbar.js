import React ,{useEffect} from 'react';
import {Link} from 'react-router-dom'
import UserAtom from '../recoil/atoms/userAtom';
import {useRecoilValue,useRecoilState} from 'recoil';
import {useHistory} from 'react-router-dom'
function Navbar({openNav,changeNav}) {
  const history = useHistory()
  const [userInfo,setUserinfo] = useRecoilState(UserAtom) // recuperation avec possibilte de modifier les valeurs
const  userData = userInfo ? userInfo : localStorage.getItem('userInfo') 
  const logoutHandler = () =>{
    setUserinfo({})
    localStorage.removeItem("userInfo");
    history.push('/login')
  }

  let open = openNav
    return (
  <div >
      <nav className="flex flex-wrap items-center justify-between p-4 bg-white shadow-lg border-b-4">
  <div className="flex flex-shrink-0 mr-6 flex-row "><Link className="text-xl text-black font-semibold font-heading" to="/" ><svg xmlns="http://www.w3.org/2000/svg" className='inline-block' width="18" height="18" viewBox="0 0 36 36">
  <path id="Icon_awesome-pen-nib" data-name="Icon awesome-pen-nib" d="M9.6,9.759a4.5,4.5,0,0,0-3.045,2.907L0,32.344l1.033,1.033L11.587,22.822a3.407,3.407,0,1,1,1.59,1.59L2.623,34.967,3.656,36l19.678-6.559A4.5,4.5,0,0,0,26.241,26.4L29.25,15.75l-9-9ZM35.011,5.215,30.785.989a3.377,3.377,0,0,0-4.775,0L22.034,4.965l9,9L35.011,9.99a3.377,3.377,0,0,0,0-4.775Z" transform="translate(0 0)"/>
</svg>
 <span class="text-black font-bold capitalize hover:text-yellow-500 "> humklo design </span></Link></div>
  <div className="block lg:hidden">
    <button onClick={changeNav} className="navbar-burger flex items-center py-2 px-3 text-yellow-500 rounded border border--500">
     { !open ?   <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
       <title>Menu</title>
       <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
     </svg> :   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
     } 
   
   {/* Object.keys(userInfo)  === 0  && Object.getPrototypeOf(userInfo) === Object.prototype */}
    </button>
  </div>
  <div className="navbar-menu hidden lg:flex lg:flex-grow lg:items-center w-full lg:w-auto">
    <div className="lg:ml-auto">
      <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/articles">Articles</Link>
      <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/ressources">Ressources</Link>
      {/* <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/lives">Stream design</Link> */}
      <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/publishs">publications</Link>
      {userData?.firstName ? 
    <div className="inline-block"> <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/write">rediger article</Link>
    <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-black font-semibold hover:text-yellow-300" to="/profile">Informations personnelles</Link> </div>
   : '' }</div>
    { userData?.Pseudo  ? <div className="flex flex-row items-center"> <img className="rounded-full h-12 w-12" src={userData.imgURL} /> <p className=" ml-2 font-semibold text-black">{userData.Pseudo}</p> <p onClick={logoutHandler} className="inline-block py-3 px-5 mr-4 leading-none text-center text-black  bg-yellow-50 hover:bg-indigo-100 font-semibold cursor-pointer rounded ml-1 shadow"> se deconnecter</p>  </div>  :     <div><Link className="inline-block py-3 px-5 mr-4 leading-none text-center text-black  bg-yellow-50 hover:bg-indigo-100 font-semibold rounded shadow" to="/login">Se connecter</Link><Link className="inline-block py-3 px-6 mt-4 lg:mt-0 leading-none text-white bg-yellow-600 hover:bg-yellow-700 font-semibold rounded shadow" to="/signup">S'enregsitrer</Link></div>
}
  </div>
</nav>
  </div>

    )
}

export default Navbar
