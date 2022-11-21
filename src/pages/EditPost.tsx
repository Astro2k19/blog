import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

const EditPost = () => {

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    const navigate = useNavigate();
    const {postId} = useParams();

    React.useEffect(() => {

        const getPostToEdit = async () => {
            if (!postId) return;

            const postRefDoc = doc(db, 'posts', postId);
            const docSnap = await getDoc(postRefDoc);
            let postData;

            if (docSnap.exists()) {
                postData = docSnap.data();
                setTitle(postData.title);
                setPostText(postData.postText);
            } else {
                console.log('this post doesnt exist')
            }
        }

        getPostToEdit()

    }, []);

    console.log('tre')

    const saveEdit = async () => {

            const postRefDoc = doc(db, 'posts', postId);
            await updateDoc(postRefDoc, {
                title,
                postText
            });
            navigate('/');

    }

    return (
        <div className='createPostPage'>
            <div className="cpContainer">
                <h1>Edit post</h1>
                <div className="inputGp">
                    <label htmlFor="">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="inputGp">
                    <label htmlFor="">Text:</label>
                    <textarea value={postText} onChange={(e) => setPostText(e.target.value)} />
                </div>
                <button className="" type={'submit'} onClick={saveEdit}>Submit</button>
            </div>
        </div>
    )
}
export default EditPost;