import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Article from '../components/Article';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import UserAtom from '../recoil/atoms/userAtom';
import {useRecoilState} from 'recoil';
import SearchBar from '../components/Searchbar'
import dns from '../utils/dns'
import {useLocation} from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';
import axios from 'axios'
function SearchScreen(){
    const [loading,SetLoading] = useState(true);
    const Query = useLocation().search
    console.log(Query)
    // const keyword = location.search.split('=')[1]
    const keyword = new URLSearchParams(Query).get('keyword')
   
    const [articles,setArticles] = useState([])
     // recuperation de l'atome pour le user
  const [userAtom,setUserAtom] = useRecoilState(UserAtom)
  // verifier si il a toujours une valeur dans le locastorage
    useEffect(() => {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      userInfo ?  setUserAtom(userInfo) : setUserAtom({}) ;
    },[])
//  const  fetchAricles = async () =>{
//     try { 
//         const {data} = await axios.get('http://localhost:5000/api/articles')
//           SetLoading(false)
//          setArticles(data)
       
//     }catch(error) {
//         console.log(error)
//     }
//  }
   
console.log()
 useEffect(() => {
  SetLoading(true)
 axios({ method:'get',url:`${dns}/api/articles/?keyword=${keyword}`}).then(response =>{
   console.log(response)
   setArticles(response.data)
   SetLoading(false)
 }).catch(err => console.log(err))
 },[keyword])
  // fetchAricles()
  
   
    const [open,setOpen] = useState(false);
    const changeNavStatus = () =>{
        setOpen(!open)
    }
    return (
         <div  className="flex flex-col">
           <Navbar openNav={open} changeNav= {changeNavStatus}  />
            { open ? <Sidebar /> : ''  }
            <SearchBar /> 
 

             <div className="flex flex-wrap gap-4 p-3 justify-center ">
               { loading ? <div class="flex h-screen justify-center " > <SpinnerCircular speed={100} size={50} /></div> : articles.length !==0 ?  (   articles.map(article => (
              <Article key={article._id} Title={article.Title} coverImage={article.CoverImage} date={article.publishedDate} numLikes={article.numLikes}  NumComments={article.numComments} ArticleId={article._id} />
            ))) :   <div className='flex items-center justify-center h-96 ' >
            <h1 className="text-2xl"> aucun article trouvé </h1>
       </div>}
     
    
     
      </div>

  
        
        </div>
    )
}

export default SearchScreen
