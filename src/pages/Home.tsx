import React from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import {auth, db} from "../firebase";
import {Link} from "react-router-dom";

export interface User {
    name: string
    uid: string
}

export interface Post {
    title: string;
    postText: string;
    author: User
    postId: string
}

const Home = () => {

    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        const getAllPosts = async () => {
            const allPostsRef = collection(db, 'posts');

            const unsubscribe = onSnapshot(allPostsRef, (querySnapshot) => {
                setPosts(querySnapshot.docs.map(doc => ({...doc.data(), postId: doc.id} as Post)));
            });
        }

        getAllPosts();
    }, []);


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
export default Home;