import React, {useState} from 'react';
import {collection, addDoc} from 'firebase/firestore'
import {auth, db} from "../firebase";
import {useNavigate} from "react-router";

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    const navigate = useNavigate();


    const submitNewPost = async () => {
        const collectionPostsRef = collection(db, 'posts');
        await addDoc(collectionPostsRef, {
            title,
            postText,
            author: {
                name: auth.currentUser?.displayName,
                uid: auth.currentUser?.uid
            }
        });

        navigate('/');
    }

    console.log('sdf')

    return (
        <div className='createPostPage'>
            <div className="cpContainer">
                <h1>Create a new Post</h1>
                <div className="inputGp">
                    <label htmlFor="">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="inputGp">
                    <label htmlFor="">Text:</label>
                    <textarea value={postText} onChange={(e) => setPostText(e.target.value)} />
                </div>
                <button className="" type={'submit'} onClick={submitNewPost}>Submit</button>
            </div>
        </div>
    )
}
export default CreatePost;