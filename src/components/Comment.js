import React from 'react'

function Comment({img,Text,name}) {
    return (
        <div className="flex mb-2">
                <img className="h-11 w-11 rounded-full mr-2" src={img} />
                <div className="flex flex-col" >
                    <h1 className="text-black font-bold">{name}</h1>
                    <p className="text-black">
                   { Text}
                    </p>
                </div>
            </div>
    )
}

export default Comment
