import React, { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';


function Addthuthuat(props) {

    

    const thuthuat = {
        ten_thu_thuat:"",
        don_gia: 0
    }

    const [add, setAdd] = useState(thuthuat);
    
    const handleAdd = (e) => {
        setAdd({...add, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = props.item;
        console.log(item);
        let data = JSON.stringify(
            add
        );
        
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/addthuthuat?id=${item}`,
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
                title: 'Thủ thuật mới đã được thêm vào',
                showConfirmButton:false,
                timer:2000
            });
            //props.refreshTT();
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
        <Modal {...props} className="addthuthuat">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm thủ thuật mới
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <label htmlFor='thuthuat' className='form-label'>Nhập thủ thuật mới</label>
                <input type='text'
                className="form-control"
                id='ten_thu_thuat'
                name='ten_thu_thuat'
                value={add.ten_thu_thuat}
                onChange={handleAdd}
                />
                <label htmlFor='dongia' className='form-label'>Nhập đơn giá</label>
                <input type='number'
                className="form-control"
                id='don_gia'
                name='don_gia'
                value={add.don_gia}
                onChange={handleAdd}
                />
                
            </Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>THÊM</button>

            </Modal.Footer>
        </Modal>
    )
};

export default Addthuthuat