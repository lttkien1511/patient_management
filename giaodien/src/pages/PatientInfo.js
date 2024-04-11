import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import moment from "moment";

import Add from "../components/MainUI/Function/Add";
import Delete from "../components/MainUI/Function/Delete";
import Sidebar from "../components/MainUI/Sidebar";
import Edit from "../components/MainUI/Function/Edit"
import Notification from "../components/MainUI/Function/Notification";
import AppointmentNoti from "../components/MainUI/Function/AppointmentNoti";

import { getAllData, filter, sendNotification } from "../model/patient";
import { tooltip, overlayTrigger } from "../helper/tooltips";
import { GenericTable } from "../helper/table";

function PatientInfo(props) {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] =useState(false);

    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [filterType] = useState('and');

    const [sortField] = useState(null);
    const [sortDirect] = useState(1);
    const [searchNameQuery, setSearchNameQuery] = useState("");
    const [searchTelQuery, setSearchTelQuery] = useState("");
    const [sendNoti, setSendNoti] = useState(0);
    const [notificationType] = useState('arrive');

    const [totalPages, setTotalPages] = useState(0);
    const [clicked, setClicked] = useState(null);

    
    const handleRowDoubleClick = (idnumber) => {
        const treatmenturl = `/ho-so-benh-nhan/${idnumber}`;
        navigate(treatmenturl);
    }

    const headers= ["Họ tên","Tuổi","Giới tính","Điện thoại","Địa chỉ","Lý do khám","Ngày nhập", "Tùy chọn"]
    const renderButton = (item) => [
        overlayTrigger(
            "bottom",
            {show: 250, hide: 300},
            tooltip('Sửa thông tin bệnh nhân'),
            <Button 
                className="editbutton funcbutton rounded-circle" 
                variant="primary" 
                onClick={() => setEditModal(true)}
            >
                <i className='bx bx-edit-alt'></i>
            </Button>
        ),
        
        overlayTrigger(
            "bottom",
            {show:250, hide:300},
            tooltip('Xóa bệnh nhân'),
            <Button className="deletebutton funcbutton rounded-circle" 
            variant="danger" 
            onClick={(e)=>{
                e.preventDefault();
                setClicked(item.idnumber);
                console.log(item.idnumber);
            }}
                >
                <i class='bx bx-trash' ></i>
            </Button>
        ),
        overlayTrigger(
            "bottom",
            {show:250, hide:300},
            tooltip('Chi tiết thông tin bệnh nhân'),
            <Button className="detail funcbutton rounded-circle" 
            variant="info" 
            onClick={(e) => {
                e.preventDefault();
                handleRowDoubleClick(item.idnumber);
            }}
            >
                <i class='bx bx-info-circle' ></i>
            </Button>
        ),
        overlayTrigger(
            "bottom",
            {show:250, hide:300},
            tooltip('Gửi thông báo lên tầng 2'),
            <Button className="notification funcbutton rounded-circle" 
            variant="warning" 
            onClick={() => sendnotification(item.idnumber)}
            >
                <i class='bx bx-send' ></i>
            </Button>
        ),
        <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber}/>,
        clicked == item.idnumber && (
            <Delete  idnumber={item.idnumber}/>
        )
    ];

    const getData = () => {
        getAllData(page, limit).then((response)=>{
            if(response){
                setData(response.data);
                setTotalPages(Math.ceil(response.data.total / limit));
            }
        })
    }
    useEffect(() => {
        getData();
    },[page]);

    const tableData = data.map(item => ([
            item.name,
            item.age,
            item.gender,
            item.telephone,
            item.address,
            item.reason,
            moment.unix(item.create_time).format('DD/MM/YYYY'),
            renderButton(item)
        ]));
    
    const handlePageChange = (currentpage) => {
        setPage(currentpage);
    }

    const sendnotification = (item) => {
        sendNotification(
            item,
            'string',
            {
                [notificationType]:{
                    "sendtime":"string"
                }
            },
            "False"
        ).then((response)=>{
            if(response){
                console.log(JSON.stringify(response.data));
                window.makeAlert('success', `Đã gửi thông báo đối với bệnh nhân ${item}`);
                setSendNoti(item);
            }
        })
    }
  
    const handleFilter = () => {
        filter(
            page, 
            limit, 
            filterType, 
            {
                "name":{
                    "logic": 'like',
                    "value": searchNameQuery
                },
                "telephone":{
                    "logic": "like",
                    "value": searchTelQuery
                },
            },
            sortField,
            sortDirect
            )
        .then((response) => {
            if(response) {
                setData(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error)
          });
    }
        
    return (
    <div className='PatientInfo'>
        {/* Sidebar */}
        <nav className="navfunction">
            <div className="container-fluid">
                <div className="nav navbar-nav">
                    <div className="d-flex">
                        <div className="SidebarBtn">
                            <button className="btn btnmenu-1"
                            onClick={()=>  {setSidebar(true)}}
                            >
                                <i class='bx bx-menu' style={{fontSize:"25px"}}></i>
                            </button>
                            {sidebar && <Sidebar show={sidebar} onHide={()=>setSidebar(false)}/>}
                        </div>
                                           
                        <div className="title">
                            <h4>HỒ SƠ BỆNH NHÂN</h4> 
                        </div>
                        
                        <div className="NotiList">
                            <AppointmentNoti />
                            <Notification notificationData = {sendNoti}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <hr/>

        <nav className="navfunction">
            <div className="container-fluid">
                <ul className="nav justify-content-between">
                    <li className="nav-items" >
                        <Button className="clickbutton" variant="primary" onClick={()=> setAddModal(true)}>
                            <i class='bx bx-plus'>THÊM</i>
                        </Button>
                        <Add show={addModal} onHide={() => setAddModal(false)}/>
                    </li>
                    <li className='nav-items' >
                        <div className="search-form">
                            <label className="form-label">Chọn ngày</label>
                            <input type="datetime-local" className="dateform form-control" placeholder="Nhập ngày"></input>
                        </div>
                    </li>
                    <li className='nav-items' >
                        <div className="search-form">
                            <label>Điện thoại</label>
                            <input type="tel" 
                            className="dienthoai form-control" 
                            value={searchTelQuery}
                            onChange={(e) => setSearchTelQuery(e.target.value)}
                            ></input>
                        </div>
                    </li>
                    <li className='nav-items' >
                        <div className="search-form">
                            <label>Họ tên</label>
                            <input type="text" 
                            className="hoten form-control" 
                            value={searchNameQuery}
                            onChange={(e) => setSearchNameQuery(e.target.value)}
                            ></input>
                        </div>
                    </li>
                    <li className='nav-items' >
                        <Button className="clickbutton" variant="primary" onClick={handleFilter}>
                            <i class='bx bx-search'>TÌM KIẾM</i>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
        <hr/>

        <div className="table-responsive">
            <GenericTable headers={headers} data={tableData}/>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(page - 1)}
                            disabled = {page === 1}
                        >
                            <i class='bx bx-chevron-left' ></i>
                        </button>
                    </li>
                    <li className="page-item active">
                        <span
                        className="page-link"
                        >
                            {page}
                        </span>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            <i class='bx bx-chevron-right' ></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>)
}

export default PatientInfo;