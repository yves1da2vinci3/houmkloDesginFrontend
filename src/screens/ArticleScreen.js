import React, { useCallback,useRef, useState,useEffect } from 'react'
import Quill from 'quill';
 import {useParams} from 'react-router-dom'
import 'quill/dist/quill.snow.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import Comment from '../components/Comment';
import UserAtom from '../recoil/atoms/userAtom';
import {useRecoilState} from 'recoil';
import { SpinnerCircular } from 'spinners-react';
import dns from '../utils/dns'
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import {io} from 'socket.io-client'
import {useHistory} from 'react-router-dom'

function ArticleScreen() {
const history = useHistory()
console.log('render')
// creation du state pour le socket
const [socket,setSocket] = useState(null)
useEffect(()=>{
  const socket = io (`${dns}`)
  setSocket(socket)
},[])
  // la toute puissance configuration
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  // la configuration pour les quill
  var configEditor = {
    "theme": "snow",
    "modules": {
        "toolbar": false
    }
  };
  // state pour le frontend 
   // like et comments

        // like

        const [isLiked,setIsLiked] = useState(false) //voir si l'utilisatuer a deja liker
        const [Likes,SetLikes] = useState(0) // recupere le tableau des pseudo ayant deja like

       //Comments 
       const [comments,setComments] = useState([]) //  on declaure un state pour les commentaires
       const [numComments,setNumComments] = useState(0)

       
  // recupere les informartions de l'utilisateurs
  let userInfo;
  let Pseudo;
  if(JSON.parse(localStorage.getItem('userInfo'))){
     userInfo = JSON.parse(localStorage.getItem('userInfo'))
    Pseudo = parseInt(userInfo.Pseudo.split('#')[1])
  }
  
 

  // recuperation des valeurs de l'article
  useEffect(() => {
    axios({ method:'get',url:`${dns}/api/articles/${params.articleId}`}).then(response =>{
     console.log(response)
     setArticle(response.data)
     setComments( previousComments =>  [...response.data.comments])
     SetLikes(response.data.LikeUserIds.length)
     setNumComments(response.data.comments.length)
     setIsLiked(response.data.LikeUserIds.includes(Pseudo))
     SetLoading(false)
     wrapperRef.current.innerHTML = ""
     const editor = document.createElement("div")
     wrapperRef.current.append(editor)
     const q = new Quill('#EditorContainer',configEditor)
     q.disable()
     q.setContents(response.data.ArticleContent)
    }).catch(err => console.log(err)) 
    },[])
  
  const params = useParams()
  const [userAtom,setUserAtom] = useRecoilState(UserAtom)
  // useEffect(() => {
  //   const socketClient = io('http://localhost:5000')
  //    socketClient.emit("hello",'ta mercon')
  //    socketClient.on('newArticle',data =>{
  //      setArticle(data)
  //    })
  //    setSocket(socketClient)
  // },[])
 
 
  // verifier si il a toujours une valeur dans le locastorage
 
    useEffect(() => {
     userInfo = JSON.parse(localStorage.getItem('userInfo'))
      userInfo ?  setUserAtom(userInfo) : setUserAtom({}) ;
    },[Pseudo])

    // function pour le like
    const likeHandler = async () => {
      console.log(params.articleId)
      if(Pseudo){
        try {
          setIsLiked(!isLiked)
          SetLikes(isLiked ? Likes - 1 : Likes + 1)
          await axios.put(`${dns}/api/articles/${params.articleId}/like`,{Pseudo : Pseudo},config)
        }catch(err) {
          console.log(err)
        }

      }else{
        console.log("please connect to like")
      }

    }
  
  const [open,setOpen] = useState(false);
  const [loading,SetLoading] = useState(true);
  let wrapperRef = useRef()
  const changeNavStatus = () =>{
      setOpen(!open)
  }


  
  
   const [comment,SetComment] = useState('')
   const [article,setArticle] = useState({})
   const SubmitCommentHandler = () =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const Username= userInfo.Pseudo
      const photoUrl = userInfo.imgURL
      const commentaire = {
        Username : Username,
        photoUrl : photoUrl,
        comment : comment
      }

      console.log(comments.length)
      if(comments.length===0){
        setComments(previousComments => [...previousComments,commentaire])
       window.location.reload()
      }else{
        setComments(previousComments =>
          [...previousComments,commentaire]
          )
      }
     
       SetComment('')
        setNumComments(numComments +1)
        axios.post(`${dns}/api/articles/${params.articleId}/comments`,{Username,photoUrl,comment},config).then(success =>{
        }).catch(err =>console.log(err) )

   

   }
 // premiere fois


    return (
        <div className="flex flex-col"  >
              <Navbar openNav={open} changeNav= {changeNavStatus}  />
        { open ? <Sidebar /> : ''  }
        {loading ? <div class="flex h-screen justify-center " > <SpinnerCircular speed={100} size={50} /></div>  :(  <div><div id='EditorContainer' ref={wrapperRef} >
        </div>
        <div className="flex flex-row items-center" >
            <h1 className="font-semibold uppercase mx-2">Auteur :</h1>
                  <img src={article.userImgUrl} alt="articleImg" className="rounded-full h-10 w-10" />
                  <p className="text-black capitalize ml-2 font-bold"> {article.writter}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>
<p className="text-black capitalize ml-2 font-bold"> { numComments ? numComments : article.numComments}</p>
<div className ='flex flex-row items-center ml-3 cursor-pointer' onClick={likeHandler}  >
   {isLiked ? <FaHeart className="w-10 h-10 text-red-600 fill-current " /> : <FaRegHeart className="w-10 h-10  " />   }
  
   <p className=" text-lg font-bold ml-2"> { Likes ? Likes : article.numLikes  }</p>  </div>

              </div>
        <div className="flex flex-col justify-between mt-2">
            { article.numComments !== 0 ?  
comments.length ? comments.map((commentaire) =>(
  <Comment key={commentaire.comment} img={commentaire.photoUrl}  Text={commentaire.comment} name={commentaire.Username} />
            ) ):  article.comments.map((commentaire) =>(
              <Comment key={commentaire._id} img={commentaire.photoUrl}  Text={commentaire.comment} name={commentaire.Username} />
                        ) )   : <p className="text-black font-semibold font-italic ml-2 " >aucun commentaire pour l'instant soyez le premier</p> }
            
            
        </div>
        
        <div className="flex flex-row justify-center">
          
          <textarea disabled={userInfo ? false : true} value={comment} onChange={(e) => { SetComment(e.target.value)}  }  placeholder="entrer votre commentaire" className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700  shadow-sm bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" />
        </div>
        <div class="flex -mx-1 mb-4 mt-2 justify-center">
        <button disabled={userInfo ? false : true} onClick={SubmitCommentHandler} class={ userInfo ?"inline-block w-1/2 py-4 px-8 mx-1 leading-none text-white bg-yellow-400 font-semibold hover:bg-yellow-100 rounded" :"inline-block w-3/4 py-4 md:py-4 px-2 md:px-8 mx-1 leading-none text-white bg-gray-400 font-semibold  rounded"} >{userInfo ? "Commenter" : 'reserver aux utilisateurs connectes'}</button>
      </div> </div> ) }
     
        </div>
    )
}

export default ArticleScreen
