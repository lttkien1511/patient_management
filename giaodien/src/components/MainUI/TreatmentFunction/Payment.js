import React from "react";
import  Modal  from 'react-bootstrap/Modal';
import axios from 'axios';


function Payment (props) {
    return (
        <Modal {...props} className="treatment">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    PHIẾU THU
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <nav className='navinfo'>
                    <ul className='nav'>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='name' className='form-label'>Ngày thu</label>
                                <input type='text' 
                                className='form-control' 
                                id='name' 
                                name='name'
                                // value={add.name}
                                
                                // onChange={handleAdd}
                                > 
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='paytype' className='form-label'>Loại khoản thu</label>
                                <input type='text' 
                                className='form-control' 
                                id='paytype'
                                name='paytype'
                                // value={add.age}
                                // onChange={handleAdd} 
                                >
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='nguoinop' className='form-label'>Người nộp</label>
                                <input type='text' 
                                className='form-control' 
                                id='nguoinop' 
                                name='nguoinop'
                                // value={add.birthday}
                                // onChange={handleAdd}
                                >
                                </input>
                            </div>
                        </li>
                        {/* <li>
                            <div className='form-group-1'>
                                <label htmlFor='gender' className='form-label'>Số điện thoại</label>
                                <select className='form-control'
                                name='gender'
                                // value={add.gender}
                                // onChange={handleAdd}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                        </li> */}
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='telephone' className='form-label'>Số điện thoại</label>
                                <input type='tel' 
                                className='form-control' 
                                id='telephone' 
                                name='telephone'
                                // value={add.telephone}
                                // onChange={handleAdd}
                                >                                    
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-5'>
                                <label htmlFor='address' className='form-label'>ĐỊA CHỈ</label>
                                <input type='text' 
                                className='form-control' 
                                id='address' 
                                
                                name='address'
                                // value={add.address}
                                // onChange={handleAdd}
                                >                                    
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-5'>
                                <label htmlFor='email' className='form-label'>Nội dung</label>
                                <input type='email' 
                                className='form-control' 
                                id='email'
                                name='email'
                                // value={add.email} 
                                // onChange={handleAdd}
                                
                                >                                    
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-3'>
                                <label htmlFor='reason' className='form-label'>Số tiền</label>
                                <input type='text' 
                                className='form-control' 
                                id='reason'
                                name='reason'
                                // value={add.reason}
                                // onChange={handleAdd} 
                                >                                    
                                </input>
                            </div>
                            <div className='form-check-payment'>
                                <label>
                                    <input
                                    type="checkbox"
                                    id ='medical_history'
                                    name = 'medical_history'
                                    value="Chảy máu lâu"
                                    // checked={add.medical_history.includes("Chảy máu lâu")}
                                    // onChange={() => handleCheckboxChange("Chảy máu lâu")}
                                    />
                                    Sử dụng tiền tạm ứng
                                </label>
                            </div>
                            <div className='form-check-payment'>
                                <label>
                                    <input
                                    type="checkbox"
                                    id ='medical_history'
                                    name = 'medical_history'
                                    value="Chảy máu lâu"
                                    // checked={add.medical_history.includes("Chảy máu lâu")}
                                    // onChange={() => handleCheckboxChange("Chảy máu lâu")}
                                    />
                                    Thu tiền nợ
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-3'>
                                <label htmlFor='email' className='form-label'>Nhân viên thu</label>
                                <input type='email' 
                                className='form-control' 
                                id='email'
                                name='email'
                                // value={add.email} 
                                // onChange={handleAdd}
                                
                                >                                    
                                </input>
                            </div>
                        </li>
                    </ul>
                    
                </nav>
                <div className='form-group-2'>
                    <label htmlFor='name' className='form-label'>Ngày thu</label>
                    <input type='text' 
                    className='form-control' 
                    id='name' 
                    name='name'
                    // value={add.name}
                    
                    // onChange={handleAdd}
                    > 
                    </input>
                </div>
            </Modal.Body>

            <Modal.Footer>
                
                {/* <div className='form-footer'>
                    <label htmlFor='inputdate' className='form-label'>NGÀY NHẬP &nbsp;</label>
                    <input type='date' 
                    className='form-date' 
                    id='inputdate' 
                    name='inputdate'
                    // value={add.inputdate}
                    // onChange={handleAdd}
                    >
                    </input>
                </div> */}
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >LƯU</button> 
                <button type="submit" className="btn btn-info" data-bs-dismiss="modal" >LƯU VÀ IN</button> 
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>

                 {/* {showAlert && (
                    <Alert variant='success' onClose={() => setshowAlert(false)} dismissible>
                        {response}
                    </Alert>
                )}  */}
            </Modal.Footer>
        </Modal>
    )
}

export default Payment