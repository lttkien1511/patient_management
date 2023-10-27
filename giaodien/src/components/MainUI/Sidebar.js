import React from "react";
import './Sidebar.css';
import avatar from './assets/avatar.jpg';
function Sidebar () {
    return (
        <div className="Sidebar">
            
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"  bis_skin_checked="1">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    {/* <span class="fs-4">THẨM MỸ VIỆN QUỲNH LAN</span> */}
                    <h6>THẨM MỸ VIỆN QUỲNH LAN</h6>
                </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                    Trang chủ
                    </a>
                </li>
                {/* <li>
                    <a href="#" class="nav-link text-white">
                    Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                    Customers
                    </a>
                </li> */}
            </ul>
            <hr/>
            <div className="dropdown" bis_skin_checked="1">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={avatar} alt="avatar" width="32" height="32" className="rounded-circle me-2"/>
                    <strong>hiển thị tên username</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    {/* <li><a class="dropdown-item" href="#"></a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li> */}
                    <li><a className="dropdown-item" href="#">Đổi mật khẩu</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                </ul>
            </div>
            </div>
            
        
        </div>
        
    )
};

export default Sidebar