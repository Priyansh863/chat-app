import React ,{useEffect,useState}from 'react'
import './Login.css';
import axios from "axios"
import {
 
  Link,
} from "react-router-dom";


export default function Home() {
  const [post,setpost]=useState([])
  const [error,seterror]=useState()
  const [error_response,seterror_response]=useState(false)


useEffect(()=>{


  axios.get("http://localhost:1000/getpost/")
  .then((data)=>{
    if(data.data.success==1){
      setpost(data.data.post)


    }

    else if(data.data.success==0){

      alert(data.data.error);
      seterror(data.data.error);

    }
  })

  .catch((error)=>{
    seterror_response(true)
    seterror("Soory , Something Wrong")


  })


},[])
function likes(postId){
  alert(postId)





axios({
  method: 'put',
  url: 'http://localhost:1000/likes/',
  data: {
    postId: postId,
  },
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
}).then((data)=>{

  if(data.data.success==1){
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


  else{
    alert("sorry something wrong")
  }












})
.catch((error)=>{
  alert("sorry something wrong")

})
}







function dislike(postId){
  alert(postId)
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



  else{
    alert("something wrong")
  }
})
.catch((error)=>{
alert("error")
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
return (


      


<div className="home">

{

  !error_response?

post.map((items)=>{
  console.log(items.postby.name)
  return (

    

    

<div style={{width: '50rem'}} class="card">
<img src=  {`http://localhost:1000/${items.photo}`} class="header-img" alt="..." />

<h3 class="p">

<Link to={"/profile/" + items.postby._id}>{items.postby.name}</Link>

 </h3>
  <img src=  {`http://localhost:1000/${items.photo}`} class="card-img-top" alt="..." />

  <div class="card-body">
    <h5 class="card-title">{items.title}</h5>
    <p class="card-text">{items.body}</p>
    <div class="card-bottom">

    
      <i class="fa fa-heart like card-link" onClick={()=>likes(items._id)}></i>
    <i class="fa fa-thumbs-down card-link" onClick={()=>dislike(items._id)} ></i>


 

    
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
comment(items._id,e.target[0].value);

    }}>
      <input type="text" placeholder="Add Comment" className="comment" ></input>
    </form>
    
  </div>
</div>




    
  )
})

: 
<h1>{error}</h1>

}



</div>
    )
}
