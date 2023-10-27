import React, {useState} from "react";
import  Modal  from 'react-bootstrap/Modal';
import axios from "axios";
import Swal from 'sweetalert2'

function Delete(props) {

    const handleDelete = (e) => {
        e.preventDefault();
        const idnumber = props.idnumber;
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/delete?idnumber=${idnumber}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            Swal.fire({
                icon: 'success',
                title: 'Xóa dữ liệu bệnh nhân thành công!',
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
        <Modal {...props} className='deletemodal' >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    LƯU Ý
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3>
                    Xóa dữ liệu bệnh nhân?
                </h3>
                
            </Modal.Body>

            <Modal.Footer>
                
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>XÓA</button>
                 
            </Modal.Footer>
        </Modal>
    )
}

export default Delete