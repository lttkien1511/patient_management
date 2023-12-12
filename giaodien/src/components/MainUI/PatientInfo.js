import React from "react";
import { useState , useEffect} from "react";
import Add from "./Function/Add";
import Delete from "./Function/Delete";
import Button from "react-bootstrap/esm/Button";
import Sidebar from "./Sidebar";
import axios from "axios";
import Edit from "./Function/Edit";
import { useNavigate , useParams} from "react-router-dom";
import Notification from "./Function/Notification";
import Swal from "sweetalert2";
import AppointmentNoti from "./Function/AppointmentNoti";


function PatientInfo({}) {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] =useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();
    const [detailData, setDetailData] =useState({});

    //const [notificationData, setNotificationData] = useState(null);
    
    const [data, setData] = useState([]);
    //const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filterType, setFilterType] = useState('and');
    //const [conditions, setConditions] = useState({});
    const [sortField, setSortField] = useState(null);
    const [sortDirect, setSortDirect] = useState(1);
    const [searchNameQuery, setSearchNameQuery] = useState("");
    const [searchTelQuery, setSearchTelQuery] = useState("");
    const {idnumber} = useParams();
    const [sendNoti, setSendNoti] = useState(0);
    const [notificationType, setNotificationType] = useState('arrive');
    


    const [clicked, setClicked] = useState(false);

    const handleRowDoubleClick = (idnumber) => {
        const treatmenturl = `/dieu-tri/${idnumber}`;
        navigate(treatmenturl);
        
    }

    // useEffect(()=> {
    //     axios.get(`http://127.0.0.1:8000/getAllData/${idnumber}`)
    //     .then((response) => {
    //         setDetailData(response.data);
    //         //setNgaykham(response.data.ngaykham);
    //       })
    //       .catch((error) => {
    //         console.error('Lỗi khi tải dữ liệu chi tiết: ', error);
    //       });
    // }, [idnumber]);

    const sendNotification = (item) => {
        let data = JSON.stringify({
            "idnumber": item,
            "tenbenhnhan": "string",
            "notificationType":{
                [notificationType]:{
                    "sendtime":"string"
                }
            },
            "read":"False"   
        });
        //console.log(data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/thongbaotheoloai',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            alert(`Đã gửi thông báo đối với bệnh nhân ${item}`);
            setSendNoti(item);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const handleClickDelete = (e, item) => {
        e.preventDefault();
        setClicked(item.idnumber);
        console.log(item);
    }

     const handleFilter = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            page,
            limit,
            filter_type: filterType,
            condition: {
                "name":{
                    "logic": 'like',
                    "value": searchNameQuery
                },
                "telephone":{
                    "logic": "like",
                    "value": searchTelQuery
                },
            },
            sort_field: sortField,
            sort_direct: sortDirect,

          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/filter/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            const result = response.data;
            //console.log(JSON.stringify(result));
            setData(result.data);
            //setTotal(result.total);
          })
          .catch((error) => {
            console.log(error);
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
                            <h3>HỒ SƠ BỆNH NHÂN</h3> 
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
                            <label>Số hồ sơ cũ</label>
                            <input type="text" className="sohosocu form-control" ></input>
                        </div>
                    </li>
                    <li className='nav-items' >
                        <div className="search-form">
                            <label>Số hồ sơ</label>
                            <input type="text" className="sohoso form-control" ></input>
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Tùy chọn</th>
                        <th>Số hồ sơ</th>
                        <th>Họ tên</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                        <th>Điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Lý do khám</th>
                        <th>Ngày nhập</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} onDoubleClick={()=>handleRowDoubleClick(item.idnumber)}>
                            <td>
                                <Button className="editbutton funcbutton" variant="primary" onClick={()=> setEditModal(true)}>
                                    SỬA
                                </Button>
                                <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber}/>

                                <Button className="deletebutton funcbutton" 
                                variant="danger" 
                                onClick={(e)=>{
                                    setDeleteModal(true);
                                    handleClickDelete(e,item);
                                    }}>
                                    XÓA
                                </Button>
                                {clicked == item.idnumber && (
                                    <Delete show={deleteModal} onHide={() => setDeleteModal(false)} idnumber={item.idnumber} />
                                )}

                                <Button className="notification funcbutton" variant="warning" 
                                onClick={() => sendNotification(item.idnumber)}
                                >
                                    GỬI THÔNG BÁO
                                </Button>
                            </td>
                            <td>{item.idnumber}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.telephone}</td>
                            <td>{item.address}</td>
                            <td>{item.reason}</td>
                            <td>{item.input_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        
        
        {/* Hồ sơ bệnh nhân */}
        
        

        

    </div>)
}

export default PatientInfo;