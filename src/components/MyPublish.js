import React from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import dns from '../utils/dns'
function MyPublish({publishId,Title,Description,ImageUrl}) {
    const history = useHistory();
    const ViewHandler =  () => {
     history.push(`/publish/${publishId}`)
    }
    const deleteHandler = async () => {
        let confirmBool ;
         confirmBool =  window.confirm('etes vous sur de vouloir supprimer ?') 
         if(confirmBool) {
           axios.delete(`${dns}/api/publish/${publishId}`)
         }
         history.push('/')
      }
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8  cursor-pointer ">
        <div className="p-6 bg-yellow-50  shadow-md transform hover:-translate-y-4 hover:transition duration-300 " >
         <img src={ImageUrl} className="h-24 object-contain w-full" /> 
          <h2 className="mb-2 text-2xl font-bold font-heading">{Title}</h2>
          <p className="mb-4 text-lg text-gray-500 leading-loose">{Description}</p>
        <div className="flex flex-row" >
        <svg onClick={ViewHandler} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 hover:fill-current hover:text-green-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>
{/* <svg  onClick={updateHandler} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 hover:fill-current hover:text-blue-600" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
</svg> */}
        <svg onClick={deleteHandler} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-current hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
        </div>
        </div>
      </div>
    )
}

export default MyPublish
