import React from 'react';
import {collection, query, where, onSnapshot, doc, deleteDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../firebase";
import {Link} from "react-router-dom";
import {Post} from "./Home";

const MyPosts = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        const collectionPostsRef = collection(db, 'posts');
        const q = query(collectionPostsRef, where('author.uid', '==', auth.currentUser?.uid));
        onSnapshot(q, (snapShot) => {
            setPosts(snapShot.docs.map(doc => ({...doc.data(), postId:doc.id }) as Post))
        })
    });

    const deletePost = async (postId: string) => {
        const postDocRef = doc(db, 'posts', postId);
        await deleteDoc(postDocRef);
    }


    return (
        <div className='homePage'>
            {posts.map(item => (
                <div className='post'>
                    <div className="postHeader">
                        <h3 className="title">{item.title}</h3>
                        {item.author.uid === auth.currentUser?.uid && <div className="deletePost">
                            <button onClick={() => deletePost(item.postId)}>Delete</button>
                        </div>}
                        {item.author.uid === auth.currentUser?.uid && <div className="updatePost">
                            <Link to={`post/edit/${item.postId}`}>Update</Link>
                        </div>}
                    </div>
                    <div className="postTextContainer">{item.postText}</div>
                </div>
            ))}
        </div>
    )
}
export default MyPosts;