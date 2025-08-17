import React, { useEffect,useState } from 'react'
import DiaryService from '../services/DiaryService';


const Images = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {DiaryService.getimages().then((res)=>{
        console.log(res.data);
        setImages(res.data);
      })}, []);

    const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append('file',file);
    DiaryService.addimage(formdata);
  }

    return (
      <>
        {images.map((image, index) => (
          <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Image ${index}`} />
        ))}

        <input type="file" class="form-control" id="image" name="image" aria-describedby="inputGroupFileAddon04" aria-label="Upload" required="required" onChange={handleFileChange}/>
        <button class="btn btn-outline-secondary" type="submit" onClick={handleSubmit}>Submit</button>
      </>
    );
}

export default Images
