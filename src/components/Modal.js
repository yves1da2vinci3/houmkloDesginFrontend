import React, { useRef, useState } from 'react'
import '../css/Modal.css'
import {useRecoilValue,useResetRecoilState} from 'recoil';
import articleAtom from '../recoil/atoms/articleAtom';
import axios from  'axios'
import {useHistory} from 'react-router-dom'
import dns from '../utils/dns'
function Modal({cancelRegister}) {
    const history = useHistory()
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo._id
    const writter = userInfo.firstName
    const userImgUrl = userInfo.imgURL
    // recuperation des states
    const [CoverImage,SetCoverImage] = useState("https://graphiste.com/blog/wp-content/uploads/2018/04/graphiste-video-motion-design-810x403.png")
    const [Title,setTitle] = useState('')
    const [Description,setDescription] = useState('')
    const resetArticleData = useResetRecoilState(articleAtom)
    const ArticleContent = useRecoilValue(articleAtom)
    const CancelArticleHandler = () =>{
       cancelRegister(false)
       
    }
    const SaveArticleHandler = async () =>{
        try {
             axios.post(`${dns}/api/articles/article`,{writter,userImgUrl,Title,Description,userId,ArticleContent,CoverImage},config)
            resetArticleData()
            history.push('/')
        }catch(erreur){
            console.log(erreur)
        }
    }
    const filePickRef = useRef(null);
    const addImageToPost = (e) =>{
        // creer un objet file reader
    const Reader = new FileReader();
    // si il existe
    if(e.target.files[0]){
        // lire 'image comme uen chaine de caracteres
        Reader.readAsDataURL(e.target.files[0]) 
    }

    Reader.onload = (readEvent) => {
        console.log(readEvent.target.result)
        SetCoverImage(readEvent.target.result)
    }
    }
   
    return (
        <div className="bg-white z-40 rounded shadow-md  absolute modal flex-col flex px-2 " >
            <h1 className="font-bold text-center uppercase text-lg md:text-xl">Infromations a afficher lors de la publication</h1>
            <div className="mb-4">
        <input value={Title} onChange={(e) => { setTitle(e.target.value)}  } required class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="text" placeholder="Entrer un titre"/>
      </div>
    
      <div className="mb-4">
        <textarea value={Description} onChange={(e) => { setDescription(e.target.value)}  } required className="appearance-none Description block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="text" placeholder="Entrer une description"/>
      </div>
      <p className="font-bold italic"> Image de couverture de l'article </p>
      <div  onClick={()=> filePickRef.current.click() } className="mb-4 cursor-pointer flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<input className="hidden" type="file" ref={filePickRef} onChange={addImageToPost} />
        <img className=" h-36 w-full" src={CoverImage} />
      </div>
      <div className="flex -mx-1 mb-4 justify-center">
      <button onClick={SaveArticleHandler} className="inline-block w-1/2 py-4 px-8 mx-1 leading-none text-white bg-green-600 hover:bg-green-700 font-semibold rounded shadow">valider</button>
      <button onClick={CancelArticleHandler} className="inline-block w-1/2 py-4 px-8 mx-1 leading-none text-white bg-red-600 hover:bg-red-700 font-semibold rounded shadow">annuler</button>
    </div>
        </div>
    )
}

export default Modal
