import React from 'react'
import {Link} from 'react-router-dom'
import "../css/cardArticle.css"
import {FaHeart} from 'react-icons/fa'
function Article({Title,coverImage,date,numLikes,NumComments,ArticleId}) {
  const ArticleLink =`/article/${ArticleId}`
    return (
      <Link to={ArticleLink} className="transform hover:-translate-y-4 hover:transition duration-300" > 
      <div className="Card relative   bg-white shadow-lg break-words">
       <img className='h-4/6' src={coverImage} />
       <div className="cardInfo  flex flex-row gap-x-14 ">
         <p className=" text-yellow-400 font-semibold ">Design</p>
         <p className="text-yellow-400 font-semibold">{date}</p>
         </div>
         <p className="italic font-semibold text-black text-xl self-start ml-3 ">{Title}</p>
        <div className=" mb-5 flex flex-row absolute bottom-0 self-start left-0 ml-3">
          <div className=" text-black flex flex-row " >
           <FaHeart className="w-5 h-5" />
            <span className="ml-3">{numLikes}</span> </div>
            <div className=" text-black flex flex-row ml-4 " >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
<path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
</svg>
            <span className="ml-3">{NumComments}</span> </div>
            
          </div>  
</div>
</Link>
    )
}

export default Article
