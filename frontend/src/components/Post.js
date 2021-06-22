import React , {useState} from 'react'
import './Login.css';
import axios from 'axios'


export default function Post(props) {

    const [title,settitle]=useState('')
    const [file,setfile]=useState('')
    const [body,setbody]=useState('')
    const [img,setimg]=useState('')

    function setdata(e){
        e.target.name=="title" && settitle(e.target.value)
        e.target.name=="body" && setbody(e.target.value)
        

    }




    function uplod(){
        const data=new FormData()
        data.append("title",title)
        data.append("body",body)

        data.append("file",file)
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };


axios.post("http://localhost:1000/createpost",data,config)
.then((data)=>{


if(data.data.success ===1){
 setimg(<img style={{width:"100px",height:"100px"}} src={`http://localhost:1000/${data.data.data.photo}`} />)

}
else{
    alert("error")
}
    
   
})
.catch((err) =>

alert(err)

)


    }

    return (
        <div>




<div className="container ">

        
            <form className="form">

            <h1>Add Post</h1>
            <br></br>
           
            
            
            <input type="text" required name="title" placeholder="Title" value={title} onChange={(e)=>{
                setdata(e)
            }} id="Title" className="one" />
            <br></br>
            
           
            
            <textarea id="w3review" required name="body" value={body} onChange={(e)=>{
                setdata(e)
            }}  rows="4" cols="50" className="one">
Add Description</textarea>          




<div class="end" style={{"marginTop":"5%"}}>
<input type="file" placeholder="add image" required id="add image" className="one" onChange={(e=>{
    setfile(e.target.files[0])
})}  style={{"marginTop":"10%"}} />
<div class="img-area" >
{img}

</div>

</div>


            <br></br>



            <input type="button" className="btn" onClick={uplod} value="Add Post"></input>
            <br></br>
          

           



        </form>

        </div>



        </div>
    )
}
