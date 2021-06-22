import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import './Profile.css';
import axios from 'axios'

export default function UserProfile() {
    const {id}=useParams()
    const [post,setpost]=useState([])

    const [userprofile,setprofile]=useState([''])
    const [lenfollower,setfollower]=useState()
    const [lenfollowing,setfollowing]=useState()
    const [follow,setfollow]=useState()








    useEffect(()=>{
       
        
axios({
    method: 'get',
    url: `http://localhost:1000/user/${id}/`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`
,'content-type': 'application/json' 


}
  })

.then((data) => {

    if(data.data.success==1){
        console.log(data,'---------------------')
       setprofile(data.data.user)
  

        
     

    }
})
.catch((err) => {
    alert(err)
})








axios({
    method: 'get',
    url: `http://localhost:1000/getpost/`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`
,'content-type': 'application/json' 


}
  })

  .then((data) => {

    if(data.data.success==1){
        // setpost(data.data.post)

        alert(post)

     
  

        
     

    }
})
.catch((err) => {
    alert(err)
})




    },[])





function follower(_id){
    alert(_id)

    axios({
        method: 'patch',
        url: `http://localhost:1000/follow/`,
        data: {
            id: _id,
          },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`
    ,'content-type': 'application/json' 
    
    
    }
      })

      .then((data)=>{
          console.log(data,'data')

          if(data.data.success==1){
              alert("ok")
              setfollower(data.data.data.follower.length)
              setfollowing(data.data.data.following.length)
              console.log(data.data.data.following, data.data.data.follower,'==================================================')
            
              

          }
      })

      .catch((err)=>{
        alert("not ok")


      })



}







function unfollower(_id){

    axios({
        method: 'patch',
        url: `http://localhost:1000/unfollow/`,
        data: {
            id: _id,
          },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`
    ,'content-type': 'application/x-www-form-urlencoded' 
    
    
    }
      })



}









   
    return (
        <div >



<div className="main main-two">
    <div className="">

    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Prime_Minister%2C_Shri_Narendra_Modi%2C_in_New_Delhi_on_August_08%2C_2019_%28cropped%29.jpg" class="img-profile"></img>
    <p  style={{textAlign : "center"}} >

{
    follow?


    <button class="follow-btn" onClick={
        ()=>{
            unfollower(userprofile._id)
        }
    }>UnFollow</button> 

   

    :

    <button class="follow-btn" onClick={
        ()=>{
            follower(userprofile._id)
        }
    }>Follow</button>




}


    </p>


    </div>
    <div className="two">

    <div className="two-one ">

    <h2>{userprofile ? userprofile.name: "Unknown"}</h2>
    <h2>{userprofile ? userprofile.email: "Unknown"}  </h2>



    </div>

    <div className="two-two same">
<h2>Post {post}</h2>
  {/* <h2>follower {userprofile.follower ? userprofile.follower.length:0 }</h2>  */}
<h2>follower {lenfollower?lenfollower:0}</h2>
<h2>following {lenfollowing?lenfollowing:0}</h2>

{/* <h2>following {userprofile.following ? userprofile.follower.length:0}</h2>  */}
    </div>
</div>
</div>




<div class="galary">

{/* {
    post?
    post.map((items)=>{

return (
    <div style={{width: '50rem'}} class="card">
<i class="fa fa-trash" ></i>
<img src=  {`http://localhost:1000/${items.photo}`} class="header-img" alt="..." />

<h3 class="p">{ items.postby ? items.postby : "Unknown"   } </h3>
  <img src=  {`http://localhost:1000/${items.photo}`} class="card-img-top" alt="..." />

  <div class="card-body">
    <h5 class="card-title">{items.title}</h5>
    <p class="card-text">{items.body}</p>
    <div class="card-bottom">
    <i class="fa fa-heart card-link" ></i>
    <i class="fa fa-thumbs-down card-link"  ></i>
    </div>
    <h5 class="" style={{paddingTop:"10px"}}>{items.Likes} Likes</h5>
    </div>
    </div>

)
})  


:  (<h1>No posy yet</h1>)

} */}


        </div>

        </div>
    )
}
