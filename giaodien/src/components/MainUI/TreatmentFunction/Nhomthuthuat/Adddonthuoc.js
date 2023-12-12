import React, { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';

function Adddonthuoc (props) {

    const thongtindonthuoc = {
        donthuoc: "",
        donvi: ""
    };

    const [add, setAdd] = useState(thongtindonthuoc);

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
        url: 'http://127.0.0.1:8000/motdonthuoc',
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
                title: 'Đơn thuốc mới đã được thêm vào',
                showConfirmButton:false,
                timer:2000
            });
            props.refreshDT();
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
        <Modal {...props} className="adddonthuoc">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm đơn thuốc mới
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <label htmlFor='donthuoc' className='form-label'>Nhập đơn thuốc mới</label>
                <input type='text'
                className="form-control"
                name='donthuoc'
                value={add.donthuoc}
                onChange={handleAdd}
                />
                <label htmlFor='donvi' className='form-label'>Nhập đơn vị</label>
                <input type='text'
                className="form-control"
                name='donvi'
                value={add.donvi}
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
export default Adddonthuoc