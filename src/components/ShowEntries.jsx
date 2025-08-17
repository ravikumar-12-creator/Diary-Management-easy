import React, { Component } from 'react'
import DiaryService from '../services/DiaryService';
import  Navigate  from '../services/Navigate';
import { Link } from 'react-router-dom';


export default class ShowEntries extends Component {
    constructor(props){
        super(props);
    this.state={
        entries:[],
        data:{
            title:"",
            content:""
        },
        success:false
        }
        this.deleteItem=this.deleteItem.bind(this);
        this.update=this.update.bind(this);
    }
    async componentDidMount(){
        const data=localStorage.getItem("user_id");
        console.log(data);
        if(data){
            DiaryService.getEntries(data).then((res)=>{ 
                this.setState({entries:res.data});
            })
        }
        else{
            alert("login to your account")
            console.log("login into the account");
        }

    }

    deleteItem = (id)=>{
         DiaryService.deleteEntry(id).then((res)=>{
            console.log(res);
            this.setState({entries:this.state.entries.filter(entry => entry.id!==id)});
        })
    }

    update=(id)=>{
        this.setState({success:true});
        let ti=prompt("enter a new title")
        let content=prompt("eneter a new content");
        if(ti){
            this.state.data.title=ti;
        }
        if(content){
            this.state.data.content=content;
        }
        const mail=localStorage.getItem("user_id");
        DiaryService.updateEntry(id,this.state.data).then((res)=>{
            console.log(res.data);
            const result=res.data.filter((ele)=>{
                return ele.user_id===mail;
            })
            this.setState({entries:result});  
        })
        this.state.data.title="";
        this.state.data.content="";
    }

    render() {
    return (

        <div className='container'>
        <h2 className='text-center'>Diary list</h2>
        <div className='row'>
        
        {this.state.entries.map(entry=>
            <div className="card w-25 mt-4 me-3">
            <div className="card-body">
                    <h5 className="card-title">{entry.title}</h5>
                    <p className="card-text">{entry.content}</p>
                    <img src={`data:image/jpeg;base64,${entry.image}`} alt="" />
                    <button className="btn btn-primary" onClick={() => this.deleteItem(entry.id)}>Delete</button>
                    <button className="btn btn-primary mx-2" onClick={() => this.update(entry.id)}>Update</button>
                </div>
                </div>
  
        )}
            <Link to="/"><button className="btn btn-primary my-5">AddEntries</button></Link>
        </div>
      </div>
    )
  }
}
