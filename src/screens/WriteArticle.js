import React, { useState } from 'react'
import TextEditor from '../components/TextEditor'
import TextEditorUpdate from '../components/TextEditorUpdate'
import '../css/articleScreen.css'
import Modal from '../components/Modal'
import { useParams } from 'react-router-dom'
import {useRecoilValue} from 'recoil'
function WriteArticle() {
    const params = useParams()
    const [showModal,setShowModal] = useState(false);
    return (
        <div className="flex flex-col relative justify-center bg-gray-50 items-center">
           { showModal ? <Modal  cancelRegister={setShowModal}  /> : ""  }
             <TextEditor  /> 
            
            <div className="flex justify-center">
                <button onClick={()=> setShowModal(true) } className="inline-block py-3 px-6 mt-4 lg:mt-0 leading-none text-white bg-yellow-600 hover:bg-yellow-700 font-semibold rounded shadow" > enregsitrer article</button>
            </div>
        </div>
    )
}

export default WriteArticle
