import React from "react";
import  Modal  from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';

function Adddonthuoc (props) {
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
                //value={add.ten_nhom_thu_thuat}
                //onChange={handleAdd}
                />
                <label htmlFor='donvi' className='form-label'>Nhập đơn vị</label>
                <input type='text'
                className="form-control"
                name='donthuoc'
                //value={add.ten_nhom_thu_thuat}
                //onChange={handleAdd}
                />
                
            </Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">THÊM</button>

            </Modal.Footer>
        </Modal>
    )
};
export default Adddonthuoc