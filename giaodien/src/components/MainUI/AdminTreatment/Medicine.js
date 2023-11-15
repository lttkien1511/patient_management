import Button from "react-bootstrap/esm/Button";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Swal from "sweetalert2";
import Adddonthuoc from "../TreatmentFunction/Nhomthuthuat/Adddonthuoc";

function Medicine (props) {
    const [adddonthuoc, setAdddonthuoc] = useState(false);



    return (
    
    <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>
                Danh mục đơn thuốc
            </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            <div className="donthuoc">
                <Button className="thuthuatbutton" variant="primary" onClick={()=>setAdddonthuoc(true)}>
                    <i className='bx bx-plus'>THÊM</i>
                </Button>
                <Adddonthuoc show={adddonthuoc} onHide={()=>setAdddonthuoc(false)}/>


                <Button className="thuthuatbutton" variant="primary">
                    SỬA
                </Button>
                <Button className="refreshbutton" variant="primary" >
                    REFRESH
                </Button>
            


                <div className="table-wrapper">
                    <table className="table table-bordered table-responsive-lg"
                    style={{ overflowY: "auto", maxHeight: "300px"}}
                    >
                        <thead>
                            <tr>
                                <th colSpan="2">Danh sách đơn thuốc</th>
                            </tr>
                            <tr>
                                <th>Tên thuốc</th>
                                <th>Đơn vị</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </Modal.Body>
    </Modal>

    )
}

export default Medicine