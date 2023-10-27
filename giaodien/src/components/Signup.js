import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from 'react-bootstrap/Form'



function Signup(props) {
    
    const data = {username: "", password: ""};
    const [user, setUser] = useState(data)
    const handleUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/signup", user)
        .then((response)=> {
           console.log(response)
        })
        
          
          
    }



    




    return (
        <Form className="signupform mb-3 mt-3" >

        <Modal {...props}>
            <Modal.Header closeButton={true}>
                <Modal.Title>
                    ĐĂNG KÝ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">TÊN ĐĂNG NHẬP</label>
                        <input type='text' 
                            name="username"
                            value={user.username}
                            placeholder="Đặt tên đăng nhập" 
                            className="form-control"
                            onChange={handleUser}
                        />
                    </div>   
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">MẬT KHẨU</label>
                        <input type='password'  
                            name="password"
                            value={user.password}
                            placeholder="Đặt mật khẩu" 
                            className="form-control"
                            onChange={handleUser}
                        />    
                    </div>  
                   
            </Modal.Body>


            <Modal.Footer>
                <Button onClick={props.onHide}>ĐÓNG</Button>
                <Button variant="success" type='submit' onClick={handleSubmit}>ĐĂNG KÝ</Button>
            </Modal.Footer>
               
        </Modal>
        </Form>
    )
};

export default Signup;