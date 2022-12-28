import React, { useReducer } from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const Com = () => {
    const [comment, setComment] = useState([])
    const [reducerValue,forcedUpdate] = useReducer(x=>x+1,0);
    const params = useParams()
    useEffect(() => {
        getComment()
    }, [reducerValue])
    const getComment = async () => {
        let com = await fetch(`http://localhost:5000/comment/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        com = await com.json()
        setComment(com.comments.comments)
        // console.log(com)
        forcedUpdate()
    }
    return (
        <div>
            {
             comment.slice(0).reverse().map((x) => (
                    <>
                        
                        <div id='avatar-comment' >
                            <div id='avatar-co'>{x.userId ? x.userId.username.charAt(0) : ''}</div>
                            <div ><p id='username-comment'><b>{x.userId.username}</b>                  {moment(x.createdAt).fromNow()}</p>
                                <p id='comment-c'>{x.comment}</p>
                               

                            </div>
                        </div>
                        <hr/>

                    </>


                ))
            }

        </div>
    )
}

export default Com