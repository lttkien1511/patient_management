import React from "react";
import { useState } from "react";
import Add from "./Function/Add";
import Delete from "./Function/Delete";
import Button from "react-bootstrap/esm/Button";
import Sidebar from "./Sidebar";
import axios from "axios";
import Edit from "./Function/Edit";
//import Treatment from "./Treatment";
import { useNavigate } from "react-router-dom";


function PatientInfo({}) {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] =useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [sidebar, setSidebar] = useState(true);
    const navigate = useNavigate();

    
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

    const handleRowDoubleClick = (idnumber) => {
        const treatmenturl = `/dieu-tri/${idnumber}`;
        navigate(treatmenturl);
        
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
            console.log(JSON.stringify(result));
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
                <ul className="nav navbar-nav">
                    <li className="nav-items">
                        <Button className="btnmenu btn-primary"
                        onClick={()=>  {setSidebar(true)}}
                        >
                            <i class='bx bx-menu'></i>
                        </Button>
                        {sidebar && <Sidebar show={sidebar} onHide={()=>setSidebar(false)}/>}
                    </li>

                    <li className="nav-items text-center">
                        <h3>HỒ SƠ BỆNH NHÂN</h3> 
                    </li>
                </ul>
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
                        <th>Các nút</th>
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
                                <Button className="editbutton" variant="primary" onClick={()=> setEditModal(true)}>
                                    SỬA
                                </Button>
                                <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber} />

                                <Button className="deletebutton" variant="danger" onClick={()=>setDeleteModal(true)}>
                                    XÓA
                                </Button>
                                <Delete show={deleteModal} onHide={() => setDeleteModal(false)} idnumber={item.idnumber} />

                                <Button variant="warning">
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