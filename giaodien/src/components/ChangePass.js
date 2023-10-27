import React from "react";
import { Form } from "react-bootstrap";

function ChangePassword () {
    return (
        <div className="container changePassword">
            <Form className="loginform mb-3 mt-3">
                    
                        <div className="loginform mb-3 mt-3">
                            <h2>ĐỔI MẬT KHẨU</h2>
                            <div className="form-group">
                                <label htmlFor="text" className="form-label">MẬT KHẨU CŨ</label>
                                <input type='text' 
                                className="form-control"
                                name = 'username'
                                
                                placeholder="Nhập mật khẩu cũ"
                                
                                >

                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">MẬT KHẨU MỚI</label>
                                <input type='password' 
                                className="form-control"
                                name = 'password'
                                
                                placeholder = "Nhập mật khẩu mới"
                                
                                >

                                </input>
                            </div>

                            <button type="submit" className="btn btn-primary" >ĐĂNG NHẬP</button>
                            
                        </div>
                    
                </Form>
                </div>
    )
}

export default ChangePassword;