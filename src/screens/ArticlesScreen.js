import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Article from '../components/Article';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import UserAtom from '../recoil/atoms/userAtom';
import {useRecoilState} from 'recoil';
import SearchBar from '../components/Searchbar'
import dns from '../utils/dns'
import axios from 'axios'
import { SpinnerCircular } from 'spinners-react';
function ArticlesScreen() {
    const [loading,SetLoading] = useState(true);
    // recuperation de l'atome pour le user
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
   
 useEffect(() => {
 axios({ method:'get',url:`${dns}/api/articles`}).then(response =>{
   console.log(response)
   setArticles(response.data)
   SetLoading(false)
 }).catch(err => console.log(err))
 },[])
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
               { loading ? <div class="flex h-screen justify-center " > <SpinnerCircular speed={100} size={50} /></div> : (   articles.map(article => (
              <Article key={article._id} Title={article.Title} coverImage={article.CoverImage} date={article.publishedDate} numLikes={article.numLikes}  NumComments={article.numComments} ArticleId={article._id} />
            )))}
         
     
    
     
      </div>
           {/* {loading ? <p className="text-black italic text-2xl text-center mt-10">Chargement ....</p> : (   <div>   <div className="flex flex-wrap -mx-4 mb-12 mt-9">
{
 articles.map (article => (
   <Article Title={article.Title} coverImage={article.CoverImage} date={article.publishedDate} description={article.Description} ArticleId={article._id} />
   ))
}


        </div>
      </div>)} */}
  
        
        </div>
    )
}

export default ArticlesScreen
