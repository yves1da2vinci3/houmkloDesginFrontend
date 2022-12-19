import React,{useRef,useState} from 'react'
import '../css/publishing.css'
import axios from 'axios'
import dns from '../utils/dns'
import {useHistory} from "react-router-dom"
function PublishingScreen() {
  let history = useHistory()
  //get userInfo

  const userInfo =  JSON.parse(localStorage.getItem('userInfo'))
  console.log(userInfo)
    const [Title,setTitle] = useState("")
  const [Description,setDescription] = useState('')
  const [category,setCategory] = useState('XD')
   
    const [show,SetShow] = useState(false);
    const [imageUrl,setImageUrl] = useState("https://media.istockphoto.com/vectors/beautiful-flowers-design-vector-id853969712");
     const fileRef = useRef()
    const UploadHandler = () =>{
        fileRef.current.click()
    }
    const addImageToPost = (e) =>{
    
        const reader = new FileReader();
        if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readEvent) => {
            SetShow(true)
          setImageUrl(readEvent.target.result)
        }
      }
      // defintion du type a envoyer

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }


        const SavePublisHandler = async (e) =>{
             e.preventDefault()
             const username = userInfo.Pseudo
             const userImgUrl = userInfo.imgURL
             const userId = userInfo._id
            //  const unValidated = {
            //   username,userImgUrl,userId
            // }
            // console.table(unValidated)
          
          
         axios.post(`${dns}/api/publish`,{username,Title,Description,imageUrl,userImgUrl,category,userId},config).then(history.push('/')).catch(err => console.log(err))
            
        }
      
    return (
        <div className="flex h-screen items-center justify-center flex-col ">
            <div className="    border-2 h-96 w-96 rounded-lg border-yellow-400 ring-2">
                <img src={imageUrl} className="object-cover h-full w-full" />
            </div>
 <input type="file" onChange={addImageToPost} className=" hidden" ref={fileRef} />
            <button onClick={UploadHandler} type="submit" class="mt-6 w-48 bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">importer</button>

      {show ? (      <form className=" bg-white shadow-md p-12 rounded-sm  form mt-6"  >
    <div className="mb-4">
      <input required value={Title} onChange={(e) => { setTitle(e.target.value)}  } className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" type="text" placeholder="veuillez entrer le titre"/>
    </div>
    <div className="mb-4">
     <select  onChange={(e) => {
       setCategory(e.target.value)
     }  } name="category" className=" block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none">selectioner  votre categore 
     <option value="XD">adode xd</option>
                    <option value="AI">illustrator</option>
                    <option value="PS">photoshop</option>
                    <option value="ID">indesign</option>
                    <option value="3D">Modelisation 3d</option>
     </select>
     <textarea placeholder="entrer une desciption pour votre publication"  onChange={(e) => { setDescription(e.target.value)}  } className=" mt-4 block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none">

     </textarea>
    </div>
    
   
   
    

   
    <div className="flex -mx-1 mb-4 justify-center">
      <button onClick={SavePublisHandler} className="inline-block w-2/3 md:w-1/3  py-3 md:py-4 px-2  md:px-8 mx-1 leading-none text-white bg-yellow-600 hover:bg-yellow-700 font-semibold rounded shadow">enregsitrer</button>
    </div>
  </form> ) :  ""}
        </div>
    )
}

export default PublishingScreen
