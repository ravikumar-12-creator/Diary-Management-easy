import React, { useState } from 'react'
import DiaryService from '../services/DiaryService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const Navigate=useNavigate();
    const [user,setuser]= useState({email:"",password:""})

    const handleChange=(e)=>{
        setuser({...user,[e.target.name]:e.target.value});
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        let data={
            email:user.email,
            password:user.password
        }
        DiaryService.getUser(data).then((res)=>{
            if(res){
                localStorage.setItem("user_id",res.data);
                Navigate('/');
                console.log("Successfully logged in")
            }
            else{
                Navigate('/login');
                console.log("check the credentials");
            }
        })
    }
  return (
<div className='justify-center pt-6'>
            <br/><br/><br/>
            <center><h1 className="mess">Scribbles and Secrets !</h1>
            <h3 style={{fontFamily:'bradley hand itc',fontSize:30,fontWeight:'bold',marginLeft:450}}>Dear Diary......📔🤫❤️!</h3>
           
                <form onSubmit={handleSubmit} className="loginform">
                    <label>UserName : </label>
                    <input type="text" className="field" name="email" value={user.email} onChange={handleChange}/><br/><br/>
                    <label>Password : </label>
                    <input type="password" className="field" name="password" value={user.password} onChange={handleChange}/><br/><br/>
                    
                    <button type="Submit" className="fieldbutton mb-4 rounded px-3 py-1 " >Login</button>
                    
                </form>
                
            </center> 
            <Link to="/signup"><a href="" className='block px-2 pt-10'>Create a account</a></Link>
        </div>
  )
}

export default Login;
