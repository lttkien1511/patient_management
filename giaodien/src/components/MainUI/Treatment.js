import React from "react";
import { useState } from "react";
//import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/esm/Button";

function Treatment() {
    
    return (
    <div  className='Treatment'>

        <div className='tab-content'>
            <div id = "hoso" className='container-fluid tab-pane active'>
                <h3>KHÁM BỆNH - ĐIỀU TRỊ</h3> 
                <hr/>
                <div className="row">
                    <div className="col-sm-7 thong-tin-benh-nhan">
                        <h5>Thông tin bệnh nhân</h5>
                        {/* <br/> */}
                        <ul className='nav'>
                        <li>
                            <div className='sohoso'>
                                <label htmlFor='name' className='form-label'>SỐ HỒ SƠ</label>
                                <input type='text' 
                                className='form-control' 
                                id='name' 
                                name='name'
                                //value={add.name}
                                
                                //onChange={handleAdd}
                                > 
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-3'>
                                <label htmlFor='name' className='form-label'>HỌ VÀ TÊN</label>
                                <input type='text' 
                                className='form-control' 
                                id='name' 
                                name='name'
                                //value={add.name}
                                
                                //onChange={handleAdd}
                                > 
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-4'>
                                <label htmlFor='age' className='form-label'>TUỔI</label>
                                <input type='number' 
                                className='form-control' 
                                id='age'
                                name='age'
                                //value={add.age}
                                //onChange={handleAdd} 
                                >
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-1'>
                                <label htmlFor='birthday' className='form-label'>NGÀY SINH</label>
                                <input type='date' 
                                className='form-control' 
                                id='birthday' 
                                name='birthday'
                                //value={add.birthday}
                                //onChange={handleAdd}
                                >
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='gioitinh'>
                                <label htmlFor='gender' className='form-label'>GIỚI TÍNH</label>
                                <select className='form-control'
                                name='gender'
                                //value={add.gender}
                                //onChange={handleAdd}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                        </li>
                        
                        <li>
                            <div className='diachi'>
                                <label htmlFor='address' className='form-label'>ĐỊA CHỈ</label>
                                <input type='text' 
                                className='form-control' 
                                id='address' 
                                
                                name='address'
                                //value={add.address}
                                //onChange={handleAdd}
                                >                                    
                                </input>
                            </div>
                        </li>
                        
                        <li>
                            <div className='lydokham'>
                                <label htmlFor='reason' className='form-label'>LÝ DO KHÁM</label>
                                <input type='text' 
                                className='form-control' 
                                id='reason'
                                name='reason'
                                //value={add.reason}
                                //onChange={handleAdd} 
                                
                                
                                >                                    
                                </input>
                            </div>
                        </li>
                    </ul>
                        
                    </div>

                    <div className="col-sm-5 tien-su-benh">
                    <h5>Tiền sử bệnh</h5>
                    <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Chảy máu lâu"
                                //checked={add.medical_history.includes("Chảy máu lâu")}
                                //onChange={() => handleCheckboxChange("Chảy máu lâu")}
                                />
                                Chảy máu lâu
                            </label>
                        </div>
                        

                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Dị ứng thuốc"
                                //checked={add.medical_history.includes("Dị ứng thuốc")}
                                //onChange={() => handleCheckboxChange("Dị ứng thuốc")}
                                />
                                Dị ứng thuốc
                            </label>
                        </div>

                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Thấp khớp"
                                //checked={add.medical_history.includes("Thấp khớp")}
                                //onChange={() => handleCheckboxChange("Thấp khớp")}
                                />
                                Thấp khớp
                            </label>
                        </div>

                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Huyết áp"
                                //checked={add.medical_history.includes("Huyết áp")}
                                //onChange={() => handleCheckboxChange("Huyết áp")}
                                />
                                Huyết áp
                            </label>
                        </div>
                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Tim mạch"
                                //checked={add.medical_history.includes("Tim mạch")}
                                //onChange={() => handleCheckboxChange("Tim mạch")}
                                />
                                Tim mạch
                            </label>
                        </div>
                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Tiểu đường"
                                //checked={add.medical_history.includes("Tiểu đường")}
                                //onChange={() => handleCheckboxChange("Tiểu đường")}
                                />
                                Tiểu đường
                            </label>
                        </div>
                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Dạ dày"
                                //checked={add.medical_history.includes("Dạ dày")}
                                //onChange={() => handleCheckboxChange("Dạ dày")}
                                />
                                Dạ dày
                            </label>
                        </div>
                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Phổi"
                                //checked={add.medical_history.includes("Phổi")}
                                //onChange={() => handleCheckboxChange("Phổi")}
                                />
                                Phổi
                            </label>
                        </div>
                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Truyền nhiễm"
                                //checked={add.medical_history.includes("Truyền nhiễm")}
                                //onChange={() => handleCheckboxChange("Truyền nhiễm")}
                                />
                                Truyền nhiễm
                            </label>
                        </div>
                            <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Thai sản"
                                //checked={add.medical_history.includes("Thai sản")}
                                //onChange={() => handleCheckboxChange("Thai sản")}
                                />
                                Thai sản
                            </label>
                        </div>
                    
                    </div>
                </div>
                <Row>
                    <Col>
                    <div className="chandoan">
                        <label htmlFor="sohoso" className="form-label">Chẩn đoán và điều trị</label>
                        <input type='text' 
                        className='form-control' 
                        id='chandoan' 
                        name='chandoan'
                        
                        > 
                        </input>
                    </div>
                    </Col>
                    <Col>
                    <div className="sohoso">
                        <label htmlFor="sohoso" className="form-label">Ngày khám</label>
                        <input type='date' 
                        className='form-control' 
                        id='ngaykham' 
                        name='ngaykham'
                        
                        > 
                        </input>
                    </div>
                    </Col>
                    <Col>
                        <Row>
                            <Col >
                                <Button className="button">Khám bệnh</Button>
                                <Button className="button">Thanh toán</Button>
                                <Button className="button">Đơn thuốc</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <Button className="button">Lịch hẹn</Button>
                                <Button className="button">In bệnh án</Button>
                                <Button className="button">Lưu</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <div className="chi-tiet-kham-benh">
                    <h5>Chi tiết khám bệnh</h5>
                    <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ngày khám</th>
                                <th>Lịch liệu trình</th>
                                <th>Chẩn đoán chi tiết</th>
                                <th>Răng</th>
                                <th>Tên thủ thuật</th>
                                <th>Nội dung thủ thuật</th>
                                <th>Bác sỹ - trợ thủ</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>%</th>
                                <th>Giảm giá</th>
                                <th>Lý do giảm</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                        </tbody>
                    </table>
                    

                </div>
                </div>
            </div>
        </div>



    </div>)
}

export default Treatment;