import axios from 'axios';



export const uploadAction = async (image) => {
    const fd = new FormData()
    fd.append('attachment',image)
    const config = {
        headers:{
            'Content-Type': 'maltipart/form-data',
            accessToken: localStorage.getItem("accessToken"),
        }
    }
    try {
        const res = 
        await axios.post("http://localhost:3001/posts" , fd, config)

        console.log(res.data);
    }catch(err){
        console.log(err);
    }
}


