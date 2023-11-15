import React, { useState } from "react";
import './Sidebar.css';
import avatar from './assets/avatar.jpg';
import Medicine from "./AdminTreatment/Medicine";
import ProcedureGroup from "./AdminTreatment/ProcedureGroup";
import Offcanvas from 'react-bootstrap/Offcanvas';

function Sidebar (props) {
    const [proceduregroup, setProceduregroup] = useState(false);
    const [medicine, setMedicine] = useState(false);


    return (
    
        <Offcanvas {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>THẨM MỸ VIỆN QUỲNH LAN</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark" onClick={()=>setProceduregroup(true)} >
                            Danh sách nhóm thủ thuật
                        </a>
                        {proceduregroup && <ProcedureGroup show={proceduregroup} onHide={() => setProceduregroup(false)}/>}
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark" onClick={()=>setMedicine(true)}>
                            Danh sách đơn thuốc
                        </a>
                        {medicine && <Medicine show={medicine} onHide={() => setMedicine(false)}/>}
                 </li> 
                </ul>
                <hr/>
                <div className="dropdown" bis_skin_checked="1">
                    <a href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={avatar} alt="avatar" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>hiển thị tên username</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">Đổi mật khẩu</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                    </ul>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        
    );

};

export default Sidebar