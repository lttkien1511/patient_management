import React, { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';

function Addnhom(props) {
    

    const nhomthuthuat = {
        ten_nhom_thu_thuat: "",
    };

    const [add, setAdd] = useState(nhomthuthuat);

    const handleAdd = (e) => {
        setAdd({...add, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify(
            add
        );

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/addnhomthuthuat',
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
            title: 'Nhóm thủ thuật mới đã được thêm vào',
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
        <Modal {...props} className="addnhomthuthuat">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm nhóm thủ thuật mới
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <label htmlFor='nhomthuthuat' className='form-label'>Nhập nhóm thủ thuật mới</label>
                <input type='text'
                className="form-control"
                id='ten_nhom_thu_thuat'
                name='ten_nhom_thu_thuat'
                value={add.ten_nhom_thu_thuat}
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

export default Addnhom