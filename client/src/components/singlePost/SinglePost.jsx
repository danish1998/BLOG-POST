import { Link } from "react-router-dom";
import "./singlePost.css";
import {useContext,useEffect,useState} from "react";
import {useLocation} from "react-router";
import {Context} from "../../context/Context"
import axios from "axios";

export default function SinglePost() {
  const location=useLocation();
  const path=location.pathname.split("/")[2];
  const [post, setPost]=useState({});
  const {user} = useContext(Context);
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [updateMode,setUpdateMode]=useState(false)
  const PF="http://localhost:5000/images/";

  useEffect(()=>{
    const getPost=async () => {
      const res=await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path]);

  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${post._id}`,{
        data:{username: user.username},
      });
      window.location.replace("/")
    }catch(err){}
    console.log(user);
  };

  const handleUpdate = async () => {
    try{
      await axios.put(`/posts/${post._id}`,{
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    }catch(err){

    }
  };
  return (
    <div className="singlePost"> 
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={PF+post.photo}
            alt=""
          />
        )}
        {updateMode?(
        <input 
          type="text" 
          value={title} 
          className="singlePostTitleInput"
          autoFocus
          onChange={(e)=>setTitle(e.target.value)}
          />
          ):(
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username &&( 
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              )}
            </h1>
          )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                <b>{post.username}</b>
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode?(
        <textarea
        className="singlePostDescInput"
        value={desc}
        onChange={(e)=>setDesc(e.target.value)}
        />):(
          <p className="singlePostDesc">
            {desc}
          </p>
        )}
        {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        )}
      </div>
    </div>
  );
}
