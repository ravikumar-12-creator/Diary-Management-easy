import axios from "axios";
// eslint-disable-next-line
const url="http://localhost:8090/api/notes";
const url2="http://localhost:8090/api/user";
const url3="http://localhost:8090/image/save";

class DiaryService{


    getEntries(mail){
        return axios.get(url,{headers:{
            'user_mail':mail
        }});
    }
    addEntry(data,mail){
        return axios.post(url,data,{headers:{
            'user_mail':mail,
        }});
    }
    deleteEntry(id){
        return axios.delete(url+'/'+id);
    }
    updateEntry(id,newtitle){
        return axios.post(url+'/'+id,newtitle);
    }
    getUser(data){
        return axios.post(url2, data);
    }

    addUser(data){
        return axios.put(url2,data);
    }

    addimage(formdata){
        axios
      .post(url3, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
}

var val=new DiaryService();
export default val;