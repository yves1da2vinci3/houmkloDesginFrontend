import {useCallback, useEffect, useState} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import articleAtom from '../recoil/atoms/articleAtom';
import { useParams } from "react-router-dom"
import { useSetRecoilState } from 'recoil'; 
import axios from 'axios';
const SAVE_INTERVAL_MS = 2000;
let Font = Quill.import('formats/font');
Font.whitelist =  ['Ubuntu', 'Raleway', 'Roboto'];
Quill.register(Font, true);
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline",'strike'],
    [{ color: ['#000000','#434343','#666666','#999999','#b7b7b7','#cccccc','#d9d9d9',
    '#efefef','#f3f3ff3','#ffffff','#980000','#ff9900','#ffff00','#00ff00','#00ffff',
    '#4a86e8','	#0000ff','#9900ff','#ff00ff','#e6b8af','#f4cccc','#fce5cd','#fff2cc',
    '#d9ead3','#d0e0e3','#c9daf8','#cfe2f3','#d9d2e9','#ead1dc','#dd7e6b','	#ea9999','#f9cb9c',
    '#ffe599','#b6d7a8','#a2c4c9','#a4c2f4','#9fc5e8','#b4a7d6','#d5a6bd','#cc4125','#e06666',
    '#f6b26b','#ffd966','#93c47d','#76a5af','	#6d9eeb','#6fa8dc','#8e7cc3','#c27ba0','#a61c00',
    '#cc0000','#e69138','#f1c232','#6aa84f','#45818e','#3c78d8','#3d85c6','	#674ea7','#a64d79',
    '#85200c','	#990000','#b45f06','#bf9000','#38761d','#134f5c','#1155cc','#0b5394','#351c75',
    '#741b47','#5b0f00','#660000','#783f04','#7f6000','#274e13','#0c343d','#1c4587','#073763',
    '#20124d','#4c1130'
] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{"size":['14px','16px','24px']}]
    [{ align: [] }],
    ["image", "blockquote",'link','video'],
    ["clean"],
  ]
  export default function TextEditor({id}) {
    const setArticleData = useSetRecoilState(articleAtom)
    const [quill, setQuill] = useState()
    const wrapperRef = useCallback(wrapper => {
      if (wrapper == null) return
      wrapper.innerHTML = ""
      const editor = document.createElement("div")
      wrapper.append(editor)
      var Font = Quill.import('formats/font');
      // We do not add Aref Ruqaa since it is the default
      Font.whitelist = ['mirza', 'roboto'];
      Quill.register(Font, true);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      })
      q.disable()
      setQuill(q)
      q.setContents()
      q.enable()

    }, [])
   
 
    const handler = (delta, oldDelta, source) => {
           if (source !== "user") return
          setArticleData(quill.getContents())
    }
    useEffect(() => {
     quill?.on("text-change", handler)
    },[quill])
    // useEffect(() => {
    //   const s = io("http://localhost:5000")
    //   setSocket(s)
  
    //   return () => {
    //     s.disconnect()
    //   }
    // }, [])
  
    // useEffect(() => {
    //   if (socket == null || quill == null) return
  
    //   socket.once("load-Article", Article => {
    //     quill.setContents(Article)
    //     quill.enable()
    //   })
  
    //   socket.emit("get-Article", ArticleId)
    // }, [socket, quill, ArticleId])
  
    // useEffect(() => {
    //   if (socket == null || quill == null) return
  
    //   const interval = setInterval(() => {
    //     socket.emit("save-Article", quill.getContents())
    //   }, SAVE_INTERVAL_MS)
  
    //   return () => {
    //     clearInterval(interval)
    //   }
    // }, [socket, quill])
  
    // useEffect(() => {
    //   if (socket == null || quill == null) return
  
    //   const handler = delta => {
    //     quill.updateContents(delta)
    //   }
    //   socket.on("receive-changes", handler)
  
    //   return () => {
    //     socket.off("receive-changes", handler)
    //   }
    // }, [socket, quill])
  
    // useEffect(() => {
    //   if (socket == null || quill == null) return
  
    //   const handler = (delta, oldDelta, source) => {
    //     if (source !== "user") return
    //     socket.emit("send-changes", delta)
    //   }
    //   quill.on("text-change", handler)
  
    //   return () => {
    //     quill.off("text-change", handler)
    //   }
    // }, [socket, quill])
  
 
    return <div className="container" ref={wrapperRef}></div>
  }

