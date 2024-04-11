import axios from "axios";

export const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = `${login.username}:${login.password}`;
    const base64Credentials = btoa(credentials);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/login/login',
        headers: { 
        'Authorization': `Basic ${base64Credentials}`, 
        }
    };
    
    axios.request(config)
    .then((response) => {
        if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            setResponse("Đăng nhập thành công");
            
            navigate('/ho-so-benh-nhan');
            
        } else {
            setResponse("Đăng nhập thất bại");
        }
        
        
    })
    .catch((error) => {
        console.log(error);
    });
}