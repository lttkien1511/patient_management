// import React from "react";
// import { useState , useEffect} from "react";
// import Add from "./Function/Add";
// import Delete from "./Function/Delete";
// import Button from "react-bootstrap/esm/Button";
// import Sidebar from "./Sidebar";
// import axios from "axios";
// import Edit from "./Function/Edit";
// import { useNavigate } from "react-router-dom";
// import Notification from "./Function/Notification";
// import AppointmentNoti from "./Function/AppointmentNoti";
// import Table from 'react-bootstrap/Table';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
// import moment from "moment";


// function PatientInfo({}) {
//     const [addModal, setAddModal] = useState(false);
//     const [editModal, setEditModal] =useState(false);
//     const [deleteModal, setDeleteModal] = useState(false);

//     const [sidebar, setSidebar] = useState(false);
//     const navigate = useNavigate();

//     const [data, setData] = useState([]);

//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(5);
//     const [filterType, setFilterType] = useState('and');

//     const [sortField, setSortField] = useState(null);
//     const [sortDirect, setSortDirect] = useState(1);
//     const [searchNameQuery, setSearchNameQuery] = useState("");
//     const [searchTelQuery, setSearchTelQuery] = useState("");
//     const [sendNoti, setSendNoti] = useState(0);
//     const [notificationType, setNotificationType] = useState('arrive');

//     const [totalPages, setTotalPages] = useState(0);


//     //const [getdata, setGetdata] = useState([]);
//     const [clicked, setClicked] = useState(false);

//     const handleRowDoubleClick = (idnumber) => {
//         const treatmenturl = `/ho-so-benh-nhan/${idnumber}`;
//         navigate(treatmenturl);
//     }

//     const renderDelete = (props) => {
//         return (
//         <Tooltip id="button-tooltip" {...props}>
//             Xóa bệnh nhân
//         </Tooltip>
//         );
//     };
//     const renderEdit = (props) => {
//         return (
//         <Tooltip id="button-tooltip" {...props}>
//             Sửa thông tin bệnh nhân
//         </Tooltip>
//         );
//     };
//     const renderInfo = (props) => {
//         return (
//         <Tooltip id="button-tooltip" {...props}>
//             Chi tiết thông tin bệnh nhân
//         </Tooltip>
//         );
//     };
//     const renderSendInfo = (props) => {
//         return (
//         <Tooltip id="button-tooltip" {...props}>
//             Gửi thông báo lên tầng 2
//         </Tooltip>
//         );
//     };

//     const getAllData = () => {
//         axios
//         .get(`http://127.0.0.1:8000/patient/getall?page=${page}&limit=${limit}`)
//         .then((response)=>{
//             setData(response.data.data);
//             setTotalPages(Math.ceil(response.data.total / limit));
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }

//     useEffect(() => {
//         getAllData();
//     },[page]);

//     const handlePageChange = (currentpage) => {
//         setPage(currentpage);
//     }

//     const pages = Array.from({ length: totalPages}, (_, i) => i + 1);

//     const sendNotification = (item) => {
//         let data = JSON.stringify({
//             "idnumber": item,
//             "tenbenhnhan": "string",
//             "notificationType":{
//                 [notificationType]:{
//                     "sendtime":"string"
//                 }
//             },
//             "read":"False"   
//         });
//         //console.log(data);
//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://127.0.0.1:8000/thongbaotheoloai',
//             headers: { 
//                 'Content-Type': 'application/json'
//             },
//             data : data
//         };
        
//         axios.request(config)
//         .then((response) => {
//             console.log(JSON.stringify(response.data));
//             alert(`Đã gửi thông báo đối với bệnh nhân ${item}`);
//             setSendNoti(item);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     }


//     const handleClickDelete = (e, item) => {
//         e.preventDefault();
//         setClicked(item.idnumber);
//         console.log(item);
//     }

//      const handleFilter = () => {
//         // e.preventDefault();
//         let data = JSON.stringify({
//             page,
//             limit,
//             filter_type: filterType,
//             condition: {
//                 "name":{
//                     "logic": 'like',
//                     "value": searchNameQuery
//                 },
//                 "telephone":{
//                     "logic": "like",
//                     "value": searchTelQuery
//                 },
//             },
//             sort_field: sortField,
//             sort_direct: sortDirect,

//           });
          
//           let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://127.0.0.1:8000/patient/filter/',
//             headers: { 
//               'Content-Type': 'application/json'
//             },
//             data : data
//           };
          
//           axios.request(config)
//           .then((response) => {
//             const result = response.data;
//             //console.log(JSON.stringify(result));
//             setData(result.data);
//             //setTotal(result.total);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//     }
    
//     return (
//     <div className='PatientInfo'>
//         {/* Sidebar */}
//         <nav className="navfunction">
//             <div className="container-fluid">
//                 <div className="nav navbar-nav">
//                     <div className="d-flex">
//                         <div className="SidebarBtn">
//                             <button className="btn btnmenu-1"
//                             onClick={()=>  {setSidebar(true)}}
//                             >
//                                 <i class='bx bx-menu' style={{fontSize:"25px"}}></i>
//                             </button>
//                             {sidebar && <Sidebar show={sidebar} onHide={()=>setSidebar(false)}/>}
//                         </div>
                                           
//                         <div className="title">
//                             <h4>HỒ SƠ BỆNH NHÂN</h4> 
//                         </div>
                        
//                         <div className="NotiList">
//                             <AppointmentNoti />

//                             <Notification notificationData = {sendNoti}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//         <hr/>

//         <nav className="navfunction">
//             <div className="container-fluid">
//                 <ul className="nav justify-content-between">
//                     <li className="nav-items" >
//                         <Button className="clickbutton" variant="primary" onClick={()=> setAddModal(true)}>
//                             <i class='bx bx-plus'>THÊM</i>
//                         </Button>
//                         <Add show={addModal} onHide={() => setAddModal(false)}/>
//                     </li>
//                     <li className='nav-items' >
//                         <div className="search-form">
//                             <label className="form-label">Chọn ngày</label>
//                             <input type="datetime-local" className="dateform form-control" placeholder="Nhập ngày"></input>
//                         </div>
//                     </li>
//                     <li className='nav-items' >
//                         <div className="search-form">
//                             <label>Điện thoại</label>
//                             <input type="tel" 
//                             className="dienthoai form-control" 
//                             value={searchTelQuery}
//                             onChange={(e) => setSearchTelQuery(e.target.value)}
//                             ></input>
//                         </div>
//                     </li>
//                     <li className='nav-items' >
//                         <div className="search-form">
//                             <label>Họ tên</label>
//                             <input type="text" 
//                             className="hoten form-control" 
//                             value={searchNameQuery}
//                             onChange={(e) => setSearchNameQuery(e.target.value)}
//                             ></input>
//                         </div>
//                     </li>
//                     <li className='nav-items' >
//                         <Button className="clickbutton" variant="primary" onClick={handleFilter}>
//                             <i class='bx bx-search'>TÌM KIẾM</i>
//                         </Button>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//         <hr/>

//         <div className="table-responsive">
//             <Table hover className="table-borderless table-striped" >
//                 <thead>
//                     <tr>
//                         {/* <th style={{width:"100px"}}>Số hồ sơ</th> */}
//                         <th style={{width:"180px"}}>Họ tên</th>
//                         <th>Tuổi</th>
//                         <th>Giới tính</th>
//                         <th>Điện thoại</th>
//                         <th style={{width:"230px"}}>Địa chỉ</th>
//                         <th>Lý do khám</th>
//                         <th>Ngày nhập</th>
//                         <th style={{width:"210px"}}>Tùy chọn</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {data.map((item) =>(
//                         <tr key={item._id}
//                         >
//                             {/* <td>{item.idnumber}</td> */}
//                             <td>{item.name}</td>
//                             <td>{item.age}</td>
//                             <td>{item.gender}</td>
//                             <td>{item.telephone}</td>
//                             <td>{item.address}</td>
//                             <td>{item.reason}</td>
//                             <td>{item.input_date}</td>
//                             <td>
//                                 <OverlayTrigger
//                                 placement="bottom"
//                                 delay={{ show: 250, hide: 300 }}
//                                 overlay={renderEdit}
//                                 >
//                                     <Button className="editbutton funcbutton rounded-circle" 
//                                     variant="primary" 
//                                     onClick={()=> setEditModal(true)}
//                                     >
//                                         <i class='bx bx-edit-alt'></i>
//                                     </Button>
//                                 </OverlayTrigger>
//                                 <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber}/>

//                                 <OverlayTrigger
//                                 placement="bottom"
//                                 delay={{ show: 250, hide: 300 }}
//                                 overlay={renderDelete}
//                                 >
//                                     <Button className="deletebutton funcbutton rounded-circle" 
//                                     variant="danger" 
//                                     onClick={(e)=>{
//                                         setDeleteModal(true);
//                                         handleClickDelete(e,item);
//                                         }}
//                                         >
//                                         <i class='bx bx-trash' ></i>
//                                     </Button>
//                                 </OverlayTrigger>
//                                 {clicked == item.idnumber && (
//                                     <Delete show={deleteModal} onHide={() => setDeleteModal(false)} idnumber={item.idnumber} />
//                                 )}

//                                 <OverlayTrigger
//                                 placement="bottom"
//                                 delay={{ show: 250, hide: 300 }}
//                                 overlay={renderInfo}
//                                 >
//                                     <Button className="detail funcbutton rounded-circle" 
//                                     variant="info" 
//                                     onClick={() => handleRowDoubleClick(item.idnumber)}
//                                     >
//                                         <i class='bx bx-info-circle' ></i>
//                                     </Button>
//                                 </OverlayTrigger>

//                                 <OverlayTrigger
//                                 placement="bottom"
//                                 delay={{ show: 250, hide: 300 }}
//                                 overlay={renderSendInfo}
//                                 >
//                                     <Button className="notification funcbutton rounded-circle" 
//                                     variant="warning" 
//                                     onClick={() => sendNotification(item.idnumber)}
//                                     >
//                                         <i class='bx bx-send' ></i>
//                                     </Button>
//                                 </OverlayTrigger>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <nav aria-label="Page navigation">
//                 <ul className="pagination justify-content-center">
//                     <li className="page-item">
//                         <button
//                             className="page-link"
//                             onClick={() => handlePageChange(page - 1)}
//                             disabled = {page === 1}
//                         >
//                             <i class='bx bx-chevron-left' ></i>
//                         </button>
//                     </li>
//                     <li className="page-item active">
//                         <span
//                         className="page-link"
//                         >
//                             {page}
//                         </span>
//                     </li>
//                     {/* {pages.map((currentpage) => (
//                         <li key={currentpage} 
//                         // className={`page-item ${page === pagenumber ? "active": ""}`}
//                         >
//                             <button onClick={() => handlePageChange(currentpage)}>
//                                 {currentpage}
//                             </button>
//                         </li>
//                     ))} */}
//                     <li className="page-item">
//                         <button
//                             className="page-link"
//                             onClick={() => handlePageChange(page + 1)}
//                             disabled={page === totalPages}
//                         >
//                             <i class='bx bx-chevron-right' ></i>
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     </div>)
// }

// export default PatientInfo;