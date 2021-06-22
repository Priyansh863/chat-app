import React ,{useEffect,useState}from 'react'
import './Login.css';
import axios from "axios"
import {useParams} from 'react-router-dom'
import './Profile.css';


import {
 
  Link,
} from "react-router-dom";


export default function Otheruser() {
    const {id}=useParams()
    const [post,setpost]=useState([])

    const [userprofile,setprofile]=useState([''])

useEffect(()=>{


    axios({
        method: 'get',
        url: `http://localhost:1000/user/${id}/`,
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
              alert("error")
          }
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
    alert(error)

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
alert(error)
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
alert(error)
})
}















    return (



<div>






    

<div className="main main-two">
    <div className="">

    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Prime_Minister%2C_Shri_Narendra_Modi%2C_in_New_Delhi_on_August_08%2C_2019_%28cropped%29.jpg" class="img-profile"></img>
    <p  style={{textAlign : "center"}} >



    </p>


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
</div>
</div>



<div className="home">















{

post.map((items)=>{
  console.log(items.postby.name)
  return (

    

    

<div style={{width: '50rem'}} class="card">
<img src=  {`http://localhost:1000/${items.photo}`} class="header-img" alt="..." />

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

  

    <div id="welcomeDiv">

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

console.log(e.target[0].value,'pooo',items._id)
comment(items._id,e.target[0].value);

    }}>
      <input type="text" placeholder="Add Comment" className="comment" ></input>
    </form>
    
  </div>
</div>




    
  )
})


}



</div>
</div>
    )
}
