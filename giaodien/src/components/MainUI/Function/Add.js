import React, {useState} from 'react';
//import  Button  from 'react-bootstrap/Button';
import  Modal  from 'react-bootstrap/Modal';
import './info.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'




function Add(props) {
    // const today = new Date();
    // const month = today.getMonth();
    // const year = today.getFullYear();
    // const date = today.getDate();
    // const currentDate = month+"/"+date+"/"+year;
    //const currentDate = new Date().toLocaleDateString();
    const [showAlert, setshowAlert] = useState(false);
    //const [show, setShow] = useState(false);
    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const [response, setResponse] = useState("");
    const data = {
        //idnumber: null,
        name: "",
        age: "",
        gender: "Nam",
        telephone: "",
        address: "",
        reason: "",
        email: "",
        birthday: "",
        
        inputdate: "", 
        medical_history: []
        
    };
    const [add, setAdd] = useState(data);

    // const handleAlert = () => {
    //     setshowAlert(true);
    // };

    const handleAdd = (e) => {
        setAdd({...add, [e.target.name]: e.target.value});
    };

    const handleCheckboxChange = (e) => {
        if (add.medical_history.includes(e)) {
            setAdd ({
                ...add,
                medical_history: add.medical_history.filter((item) => item !== e),
            });
        }
        else {
            setAdd ({
                ...add,
                medical_history: [...add.medical_history, e],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify(
             add
        
        );
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/addpatient',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            //setResponse('Thêm bệnh nhân thành công!');
            //setshowAlert(true);
            // setTimeout(() => {
            //     setshowAlert(false);
            // }, 2000);
            Swal.fire({
                icon: 'success',
                title: 'Thêm bệnh nhân thành công!',
                showConfirmButton:false,
                timer:2000
            })
            
          })
          .catch((error) => {
            console.log(error);
            // setResponse('Yêu cầu thất bại')
            // setshowAlert(true);
            // setTimeout(() => {
            //     setshowAlert(false);
            // }, 2000);
            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                //text: 'Something went wrong!',
                //footer: '<a href="">Why do I have this issue?</a>'
              })
          });
    }


    

    return (
        <Modal {...props} className='addmodal' >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    THÔNG TIN BỆNH NHÂN
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <nav className='navinfo'>
                    <ul className='nav'>
                        <li>
                            <div className='form-group-3'>
                                <label htmlFor='name' className='form-label'>HỌ VÀ TÊN</label>
                                <input type='text' 
                                className='form-control' 
                                id='name' 
                                name='name'
                                value={add.name}
                                
                                onChange={handleAdd}
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
                                value={add.age}
                                onChange={handleAdd} 
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
                                value={add.birthday}
                                onChange={handleAdd}
                                >
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-1'>
                                <label htmlFor='gender' className='form-label'>GIỚI TÍNH</label>
                                <select className='form-control'
                                name='gender'
                                value={add.gender}
                                onChange={handleAdd}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='telephone' className='form-label'>ĐIỆN THOẠI</label>
                                <input type='tel' 
                                className='form-control' 
                                id='telephone' 
                                
                                name='telephone'
                                value={add.telephone}
                                onChange={handleAdd}
                                >                                    
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='address' className='form-label'>ĐỊA CHỈ</label>
                                <input type='text' 
                                className='form-control' 
                                id='address' 
                                
                                name='address'
                                value={add.address}
                                onChange={handleAdd}
                                >                                    
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='email' className='form-label'>EMAIL</label>
                                <input type='email' 
                                className='form-control' 
                                id='email'
                                name='email'
                                value={add.email} 
                                onChange={handleAdd}
                                
                                >                                    
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-2'>
                                <label htmlFor='reason' className='form-label'>LÝ DO KHÁM</label>
                                <input type='text' 
                                className='form-control' 
                                id='reason'
                                name='reason'
                                value={add.reason}
                                onChange={handleAdd} 
                                
                                
                                >                                    
                                </input>
                            </div>
                        </li>
                    </ul>
                    <div className='form-group-history'>
                        <label htmlFor='history' className='form-label'>TIỀN SỬ BỆNH</label>
                        <br/>

                        <div className='form-check'>
                            <label>
                                <input
                                type="checkbox"
                                id ='medical_history'
                                name = 'medical_history'
                                value="Chảy máu lâu"
                                checked={add.medical_history.includes("Chảy máu lâu")}
                                onChange={() => handleCheckboxChange("Chảy máu lâu")}
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
                                checked={add.medical_history.includes("Dị ứng thuốc")}
                                onChange={() => handleCheckboxChange("Dị ứng thuốc")}
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
                                checked={add.medical_history.includes("Thấp khớp")}
                                onChange={() => handleCheckboxChange("Thấp khớp")}
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
                                checked={add.medical_history.includes("Huyết áp")}
                                onChange={() => handleCheckboxChange("Huyết áp")}
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
                                checked={add.medical_history.includes("Tim mạch")}
                                onChange={() => handleCheckboxChange("Tim mạch")}
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
                                checked={add.medical_history.includes("Tiểu đường")}
                                onChange={() => handleCheckboxChange("Tiểu đường")}
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
                                checked={add.medical_history.includes("Dạ dày")}
                                onChange={() => handleCheckboxChange("Dạ dày")}
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
                                checked={add.medical_history.includes("Phổi")}
                                onChange={() => handleCheckboxChange("Phổi")}
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
                                checked={add.medical_history.includes("Truyền nhiễm")}
                                onChange={() => handleCheckboxChange("Truyền nhiễm")}
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
                                checked={add.medical_history.includes("Thai sản")}
                                onChange={() => handleCheckboxChange("Thai sản")}
                                />
                                Thai sản
                            </label>
                        </div>
                    </div>
                </nav>
                
            </Modal.Body>

            <Modal.Footer>
                <div className='form-footer'>
                    <label htmlFor='inputdate' className='form-label'>NGÀY NHẬP &nbsp;</label>
                    <input type='date' 
                    className='form-date' 
                    id='inputdate' 
                    name='inputdate'
                    value={add.inputdate}
                    onChange={handleAdd}
                    >
                    </input>
                </div>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>THÊM</button>
                 {showAlert && (
                    <Alert variant='success' onClose={() => setshowAlert(false)} dismissible>
                        {response}
                    </Alert>
                )} 
            </Modal.Footer>
        </Modal>
        
    )
}

export default Add






















