import React from 'react'
import {AiFillLike,AiFillEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import '../css/publishing.css'
function Publishing({Title,username,imageUrl,userImgUrl,publishId}) {
  const PublishLink =`/publish/${publishId}`
    return (
<Link to={PublishLink} className="transform hover:-translate-y-4 hover:transition duration-300" > 
        <div className='flex flex-col publish shadow-md border-2 hover:shadow-2xl cursor-pointer   pb-4'>
        <img src={imageUrl} className="h-4/5 rounded-sm " />
        <div className="flex flex-row justify-between gap-x-2 items-center mt-2">
          <p className="text-gray-800 italic uppercase ml-2">{Title}</p>
          {/* <div className="flex flex-row items-center justify-center">
        <AiFillLike className="text-gray-900 fill-current" />
        <p>12</p>
          </div> */}
          {/* <div className="flex flex-row items-center justify-center">
        <AiFillEye className="text-gray-900 fill-current" />
        <p>200</p>
          </div> */}
        </div>
        <div className="flex flex-row justify-start gap-x-2 items-center mt-2 ml-2" ><img className="w-6 h-6 rounded-full" src={userImgUrl} />  
        <p className="font-bold capitalize">{username}</p>
        </div>
      </div>
      </Link>
    )
}

export default Publishing
