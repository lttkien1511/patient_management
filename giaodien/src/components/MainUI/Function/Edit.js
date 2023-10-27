import React, {useState} from 'react';
//import  Button  from 'react-bootstrap/Button';
import  Modal  from 'react-bootstrap/Modal';
import './info.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'




function Edit(props) {
    const [showAlert, setshowAlert] = useState(false);
    const response = useState("");
    const data = {
        //idnumber: parseInt(props.idnumber, 10) ,
        //idnumber: "",
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

    const [update, setUpdate] = useState(data);

    const handleChange = (e) => {
        setUpdate({...update, [e.target.name]: e.target.value});
    };
    const handleCheckboxUpdate = (e) => {
        if (update.medical_history.includes(e)) {
            setUpdate ({
                ...update,
                medical_history: update.medical_history.filter((item) => item !== e),
            });
        }
        else {
            setUpdate ({
                ...update,
                medical_history: [...update.medical_history, e],
            });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const idnumber = props.idnumber;
        let data = JSON.stringify(
            update
       
       );
       let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/update?idnumber=${idnumber}`,
        headers: {
            'Content-Type': 'application/json'
         },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Swal.fire({
            icon: 'success',
            title: 'Sửa đổi thông tin bệnh nhân thành công!',
            showConfirmButton:false,
            timer:2000
        })
      })
      .catch((error) => {
        console.log(error);
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
                                value={update.name}
                                onChange={handleChange}
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
                                value={update.age}
                                onChange={handleChange} 
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
                                value={update.birthday}
                                onChange={handleChange}
                                >
                                </input>
                            </div>
                        </li>
                        <li>
                            <div className='form-group-1'>
                                <label htmlFor='gender' className='form-label'>GIỚI TÍNH</label>
                                <select className='form-control'
                                name='gender'
                                value={update.gender}
                                onChange={handleChange}
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
                                value={update.telephone}
                                onChange={handleChange}
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
                                value={update.address}
                                onChange={handleChange}
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
                                value={update.email} 
                                onChange={handleChange}
                                
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
                                value={update.reason}
                                onChange={handleChange} 
                                
                                
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
                                checked={update.medical_history.includes("Chảy máu lâu")}
                                onChange={() => handleCheckboxUpdate("Chảy máu lâu")}
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
                                checked={update.medical_history.includes("Dị ứng thuốc")}
                                onChange={() => handleCheckboxUpdate("Dị ứng thuốc")}
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
                                checked={update.medical_history.includes("Thấp khớp")}
                                onChange={() => handleCheckboxUpdate("Thấp khớp")}
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
                                checked={update.medical_history.includes("Huyết áp")}
                                onChange={() => handleCheckboxUpdate("Huyết áp")}
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
                                checked={update.medical_history.includes("Tim mạch")}
                                onChange={() => handleCheckboxUpdate("Tim mạch")}
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
                                checked={update.medical_history.includes("Tiểu đường")}
                                onChange={() => handleCheckboxUpdate("Tiểu đường")}
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
                                checked={update.medical_history.includes("Dạ dày")}
                                onChange={() => handleCheckboxUpdate("Dạ dày")}
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
                                checked={update.medical_history.includes("Phổi")}
                                onChange={() => handleCheckboxUpdate("Phổi")}
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
                                checked={update.medical_history.includes("Truyền nhiễm")}
                                onChange={() => handleCheckboxUpdate("Truyền nhiễm")}
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
                                checked={update.medical_history.includes("Thai sản")}
                                onChange={() => handleCheckboxUpdate("Thai sản")}
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
                    value={update.inputdate}
                    onChange={handleChange}
                    >
                    </input>
                </div>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>LƯU</button>
                 {showAlert && (
                    <Alert variant='success' onClose={() => setshowAlert(false)} dismissible>
                        {response}
                    </Alert>
                )} 
            </Modal.Footer>
        </Modal>
        
    )
}

export default Edit






















