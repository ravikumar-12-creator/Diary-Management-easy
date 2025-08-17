import React, { Component } from 'react'
import DiaryService from '../services/DiaryService';
import { HistoryRouterProps, redirect ,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createElement } from 'react';

export default class AddItem extends Component {
    constructor(props){
        super(props)
        this.state={
          title:'',
          content:'',
          file:null,
          imageid:0
        }
        this.handleChange=this.handleChange.bind(this);
        this.saveItem=this.saveItem.bind(this);
        this.handleChange2=this.handleChange2.bind(this);
        this.handleFileChange=this.handleFileChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      }
      async saveItem(e) {
        e.preventDefault();
    
        try {
          let data = {
            title: this.state.title,
            content: this.state.content,
          };
    
          const mail = localStorage.getItem("user_id");
          console.log(mail);

          const formdata = new FormData(); //L E A R N
          formdata.append('file', this.state.file); //LEARN
    
          const response = await DiaryService.addEntry(data, mail);
          const imageId = response.data.id;

          console.log(imageId); // This should be a valid image ID
    
          this.setState({ imageid: imageId }, async () => {
            console.log(this.state.imageid);
            if(this.state.file!==null){
              const Response = await axios.post("http://localhost:8090/image/save", formdata, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'id': this.state.imageid.toString(),
                },
              });
              console.log(Response.data);
            }
            else{
              console.log("no image");
            }

          });
        } catch (error) {
          console.error(error);
        }
      }
    
    
    //title handler
    handleChange=(event)=>{
      this.setState({title:event.target.value})
    }

    //content handler
    handleChange2=(e)=>{
      this.setState({content:e.target.value})
    }


    
    //image handler
    handleFileChange = (event) => {
      this.setState({file:event.target.files[0]});
    };

    handleSubmit=async (e)=>{
      localStorage.removeItem('user_id');
    }

  render() {
    const mail=localStorage.getItem('user_id');
    return (
      <>
<div style={{backgroundImage:"url('diarymain9.jpg')",backgroundSize:"cover", backgroundRepeat: 'no-repeat'}} className='mt-5'>

<center>
    <Link to="/"><button className='rounded mx-4 px-2 py-1'>Home</button></Link>
    <Link to="/show"><button className='rounded px-2 py-1'>Show Entries</button></Link>
    {mail?(<Link to="/"><button className='btn btn-primary' onClick={this.handleSubmit}>Logout</button></Link>):<><Link to="/login"><button className='btn btn-primary'>LogIn</button></Link><Link to="/signup"><button className='btn btn-primary'>SignIn</button></Link></>}

    <br/>
   <h1 style={{fontFamily:'bradley hand itc', color:'black',fontSize:60}}>Let's Bind the Memorable Moments !</h1>

   {/* Title */}
   <input
    type="text"
    placeholder="Title"
    name="title"
    style={{width:550 , height:50,marginRight:50,marginTop:50,backgroundColor:'#F8E8EE',borderRadius:10}}
    onChange={this.handleChange}
  />

  <button onClick={this.saveItem} style={{height:40 , width:100,backgroundColor:"white",borderRadius:5}}>Add Entry</button><br/><br/>

  {/* Content */}
  <textarea
    placeholder="Content"
    name="content"
    style={{height:400 , width:700 , backgroundColor:'#F8E8EE' ,borderRadius:10,border:'2px solid black'}}
    onChange={this.handleChange2}
  />
  </center>
  {/* <Link to="/show">Show Entries</Link> */}
  <input type="file" class="form-control" id="image" name="image" aria-describedby="inputGroupFileAddon04" aria-label="Upload" required="required" onChange={this.handleFileChange}/>

</div>
      
        
        </>
    )
  }
}
