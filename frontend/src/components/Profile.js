import React ,{useEffect,useState}from 'react'
import './Login.css';
import axios from "axios"
import {useParams} from 'react-router-dom'
import './Profile.css';


import {
 
  Link,
} from "react-router-dom";


export default function Post() {
    const [error,seterror]=useState()
    const [post,setpost]=useState([])
    const [profile,setfile]=useState('')
    


    const [userprofile,setprofile]=useState([''])

useEffect(()=>{


    axios({
        method: 'get',
        url: `http://localhost:1000/user/${localStorage.getItem("id")}/`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`
    ,'content-type': 'application/json' 
    
    
    }
      })

      .then((data)=>{
          console.log(data)
          if(data.data.success==1){
            setprofile(data.data.user)
            setpost(data.data.post)

          }

          else{
            alert(data.data.error);
            seterror(data.data.error);
      
          }
      })

      .catch((err)=>{

          alert("error occur")
          seterror(err);
      })


},[])
function likes(postId){
axios({
  method: 'put',
  url: 'http://localhost:1000/likes/',
  data: {
    postId: postId,
  },
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
}).then((data)=>{

  if(data){
    const mydata=post.map((items)=>{
      if(data.data.data._id==items._id){
        return data.data.data

      }
      else{
        return items
      }
    })

    setpost(mydata)

  }
})
.catch((error)=>{

    alert(error)
})
}



function changepic(e){


    const data=new FormData()
    setfile(e.target.files[0])

    data.append("file",e.target.files[0])
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    axios.patch("http://localhost:1000/updateprofile/",data,config)
    .then((data)=>{

        if(data.data.success==1){
            setprofile(data.data.user)


        }
        else{
            alert("error")
        }

    })

    .catch((err)=>{
        alert("error occur")
    })


}





function dislike(postId){
axios({
  method: 'put',
  url: 'http://localhost:1000/dislikes/',
  data: {
    postId: postId,
  },
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
}).then((data)=>{

  if(data){
    console.log(data);
    const mydata=post.map((items)=>{
      if(data.data.data._id==items._id){
        return data.data.data

      }
      else{
        return items
      }
    })

    setpost(mydata)

  }
})
.catch((error)=>{
  console.log(error);

})
}








function comment(postId,text) {





axios({
  method: 'put',
  url: 'http://localhost:1000/comment/',
  data: {
    postId: postId,
    text:text
  },
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}`

}
}).then((data)=>{

  if(data){
    console.log(data,data.data.data._id);
    const mydata=post.map((items)=>{
      console.log(data.data.data._id,'--1--2');

      if(data.data.data._id==items._id){
        console.log(data.data.data._id,items._id,'12');

        return data.data.data

      }
      else{
        return items
      }
    })

    setpost(mydata)

  }
})
.catch((error)=>{
  console.log(error);

})
}















    return (



<div>








    

<div className="main main-two">
    <div className="">
    {
        userprofile.photo?

    <img src={`http://localhost:1000/${userprofile.photo}`} class="img-profile"></img>
    :
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" class="img-profile"></img>
    



    }


</div>



    
    <div className="two">

    <div className="two-one ">

    <h2>{userprofile ? userprofile.name: "Unknown"}</h2>
    <h2>{userprofile ? userprofile.email: "Unknown"}  </h2>
  



    </div>

    <div className="two-two same">
<h2>Post {post.length}</h2>
  <h2>follower 0</h2> 


<h2>following 0</h2> 
    </div>

    <h2 style={{display:"flex", }} class="change">
    
    <label for="files"  class="btn btn-primary">Select Image</label>
    <input id="files" style={{visibility:"hidden"}} name="profile" value={profile} onChange={(e)=>{
        changepic(e)
    }} type="file" />
  
  
  
  
  </h2>
</div>
</div>



<div className="home">















{
    post.length?

post.map((items)=>{
  console.log(items.postby.name)
  return (

    

    

<div style={{width: '50rem'}} class="card">
<img src=  {`http://localhost:1000/${userprofile.photo}`} class="header-img" alt="..." />

<h3 class="p">

{

items.postby._id==localStorage.getItem("id")?

<Link to={"/profile"}>{items.postby.name}</Link>:
<Link to={"/profile/" + items.postby._id}>{items.postby.name}</Link>


}
 </h3>
  <img src=  {`http://localhost:1000/${items.photo}`} class="card-img-top" alt="..." />

  <div class="card-body">
    <h5 class="card-title">{items.title}</h5>
    <p class="card-text">{items.body}</p>
    <div class="card-bottom">
    <i class="fa fa-heart like card-link" onClick={()=>likes(items._id)}></i>
    <i class="fa fa-thumbs-down card-link" onClick={()=>dislike()} ></i>
    </div>
    <h5 class="" style={{paddingTop:"10px"}}>{items.Likes.length} Likes</h5>

  

    <div id="welcomeDiv" >

    {


items.comment.map((i)=>{
  return (
    <h6  key={i._id}>

  
    <span >

    {i.postedby.name}

    </span>

    <span className="s-one">
    {i.text}

    </span>

    <hr style={{color:"blue"}}></hr>

    </h6>
    
  )
})
}
    
</div>
    <form onSubmit={(e)=>{
      e.preventDefault()
comment(items._id,e.target[0].value);

    }}>
      <input type="text" placeholder="Add Comment" className="comment" ></input>
    </form>
    
  </div>
</div>




    
  )
})
:

<h1 style={{marginTop:"5%"}}>No Post Yet</h1>

}



</div>
</div>
    )
}


