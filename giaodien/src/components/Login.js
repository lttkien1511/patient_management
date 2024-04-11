import React from "react";
import './Login.css'
import { useState } from "react";
import axios from "axios";


import Form from 'react-bootstrap/Form'


import { useNavigate } from "react-router-dom";


function Login () {
    const navigate = useNavigate();
    
    const [response, setResponse] = useState("");
    

    const data = {username: "", password: ""};
    const [login, setLogin] = useState(data);
    
    const handleLogin = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = (e) => {
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

    const ChangePassword = (e) => {
        e.preventDefault();
        navigate("/doi-mat-khau");
    }


    return (
        <div className="container Login">
            <Form className="loginform mb-3 mt-3">
                    
                        <div className="loginform mb-3 mt-3">
                            <h2>ĐĂNG NHẬP</h2>
                            <div className="form-group">
                                <label htmlFor="text" className="form-label">TÊN ĐĂNG NHẬP</label>
                                <input type='text' 
                                className="form-control"
                                name = 'username'
                                value={login.username}
                                // placeholder="Nhập tên đăng nhập"
                                onChange={handleLogin}
                                >

                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">MẬT KHẨU</label>
                                <input type='password' 
                                className="form-control"
                                name = 'password'
                                value={login.password}
                                // placeholder = "Nhập mật khẩu"
                                onChange={handleLogin}
                                >

                                </input>
                            </div>

                            {/* <div className="form-group">
                                <a href='#' onClick={ChangePassword}>Đổi mật khẩu</a>
                                
                            </div> */}


                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>ĐĂNG NHẬP</button>
                            
                            
                        </div>
                    
                </Form>
      </div>



                
         

        
    )
};

export default Login;