import React from 'react'
import { useState } from 'react';
import DiaryService from '../services/DiaryService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [user,setuser]= useState({email:"",password:""})

    const handleChange=(e)=>{
        setuser({...user,[e.target.name]:e.target.value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            await DiaryService.addUser(user).then((res)=>{
                navigate('/login');
            })   
        } catch (error) {
            navigate("/signup");
        }
    }
  return (
    <div className='justify-center pt-6'>
            <br/><br/><br/>
            <center><h1 className="mess">Scribbles and Secrets !</h1>
            <h3 style={{fontFamily:'bradley hand itc',fontSize:30,fontWeight:'bold',marginLeft:450}}>Dear Diary......📔🤫❤️!</h3>
                <form  className="loginform">
                    <label>UserName : </label>
                    <input type="text" className="field" name="email" value={user.email} onChange={handleChange}/><br/><br/>
                    <label>Password : </label>
                    <input type="password" className="field" name="password" value={user.password} onChange={handleChange}/><br/><br/>
                    <button type="Submit" className="fieldbutton mb-4 rounded px-3 py-1" onClick={handleSubmit} >SignUp</button>
                    
                </form>
                
            </center> 
        </div>
  )
}

export default Signup
