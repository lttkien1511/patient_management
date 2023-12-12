import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import Payment from "./TreatmentFunction/Payment";
import Thuthuat from "./TreatmentFunction/Thuthuat";
import Sidebar from "./Sidebar";
import Donthuoc from "./TreatmentFunction/Donthuoc";
import Lichhen from "./TreatmentFunction/Lichhen";
import Notification from "./Function/Notification";
import AppointmentNoti from "./Function/AppointmentNoti";

function Treatment() {
    const {idnumber} = useParams();
    const [detailData, setDetailData] =useState({});
    const [payment, setPayment] = useState(false);
    const [thuthuat, setThuthuat] = useState(false);
    //const [dropdown, setDropdown] = useState(false);
    //const [chitiet, setChitiet] = useState([]);

    const [ngaykham, setNgaykham] = useState([]);
    const [filterType, setFilterType] = useState('and');
    const [filter, setFilter] = useState([]);
    const [nhomthuthuat, setNhomthuthuat] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    
    const [opendonthuoc, setOpendonthuoc] = useState(false);
    const [lichhen, setLichhen] = useState(false);
    const [lichhenData, setLichhenData] = useState(null);

    const handleLichhenData = (reminder) => {
        setLichhenData(reminder);
        console.log(reminder);
    }

    
    const handleDoubleClick = (ngaykham) => {
        //e.preventDefault();
        let data = JSON.stringify({
            filter_type: filterType,
            condition: {
                "idnumber":{
                    "logic": "=",
                    "value": idnumber
                },
                "ngaykham": {
                    "logic": "=",
                    "value": ngaykham
                }
            }

        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/filtertheongay/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            const result = response.data;
            console.log(JSON.stringify(result));
            setFilter(result.data);
            
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const refreshData = () => {
        console.log(idnumber);
        axios
        .get(`http://127.0.0.1:8000/ngaykham/${idnumber}`)
        .then((response)=>{
            console.log(response.data);
            setNgaykham(response.data);
        })
        .catch((error) => {
            console.error('Refresh error', error);
        });
    };

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/ngaykham/${idnumber}`)
        .then((response)=>{
            //console.log(response.data);
            setNgaykham(response.data);
            //setFilter(ngaykham);
        })
        .catch((error) => {
            console.error('Refresh error', error);
        });
    },[idnumber]);

    


    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/getAllData/${idnumber}`)
        .then((response) => {
            setDetailData(response.data);
            //setNgaykham(response.data.ngaykham);
          })
          .catch((error) => {
            console.error('Lỗi khi tải dữ liệu chi tiết: ', error);
          });
    }, [idnumber]);



    return (
    <div className='Treatment'>
        <nav className='navfunction'>
            <div className="container-fluid">
                <div className="nav navbar-nav">
                    <div className="d-flex">
                        <div className="SidebarBtn">
                            <button className="btn btnmenu-1"
                            onClick={()=> {setSidebar(true)}}
                            >
                                <i class='bx bx-menu' style={{fontSize:"25px"}}></i>
                            </button>
                            {sidebar && <Sidebar show={sidebar} onHide={()=> setSidebar(false)}/>}
                        </div>
                        
                        
                        <div className="title">
                            <h3>KHÁM BỆNH - ĐIỀU TRỊ</h3> 
                        </div>

                        <div className="NotiList">
                            <AppointmentNoti reminder = {lichhenData}/>
                        
                            <Notification/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        {/* <hr/> */}
        <div id = "hoso" className='container-fluid tab-pane active'>
            <div className="row">
                <div className="col-sm-7 thong-tin-benh-nhan">
                    <h5>Thông tin bệnh nhân</h5>
                    {/* <br/> */}
                    <ul className='nav'>
                    <li>
                        <div className='sohoso'>
                            <label htmlFor='idnumber' className='form-label'>SỐ HỒ SƠ</label>
                            <input type='text' 
                            className='form-control' 
                            id='idnumber' 
                            name='idnumber'
                            value={detailData.idnumber}
                            disabled
                            //onChange={handleAdd}
                            > 
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className='form-group-3'>
                            <label htmlFor='name' className='form-label'>HỌ VÀ TÊN</label>
                            <input type='text' 
                            className='form-control' 
                            id='name' 
                            name='name'
                            value={detailData.name}
                            disabled
                            //onChange={handleAdd}
                            > 
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className='form-group-4'>
                            <label htmlFor='age' className='form-label'>TUỔI</label>
                            <input type='number' 
                            className='form-control' 
                            id='age'
                            name='age'
                            value={detailData.age}
                            //onChange={handleAdd} 
                            disabled
                            >
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className='form-group-1'>
                            <label htmlFor='birthday' className='form-label'>NGÀY SINH</label>
                            <input type='text' 
                            className='form-control' 
                            id='birthday' 
                            name='birthday'
                            value={detailData.birthday}
                            //onChange={handleAdd}
                            disabled
                            >
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className='gioitinh'>
                            <label htmlFor='gender' className='form-label'>GIỚI TÍNH</label>
                            <input type="text"
                            className='form-control'
                            id="gender"
                            name='gender'
                            value={detailData.gender}
                            disabled
                            //onChange={handleAdd}
                            >
                                {/* <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option> */}
                            </input>
                        </div>
                    </li>
                    
                    <li>
                        <div className='diachi'>
                            <label htmlFor='address' className='form-label'>ĐỊA CHỈ</label>
                            <input type='text' 
                            className='form-control' 
                            id='address' 
                            name='address'
                            value={detailData.address}
                            disabled
                            //onChange={handleAdd}
                            >                                    
                            </input>
                        </div>
                    </li>
                    
                    <li>
                        <div className='lydokham'>
                            <label htmlFor='reason' className='form-label'>LÝ DO KHÁM</label>
                            <input type='text' 
                            className='form-control' 
                            id='reason'
                            name='reason'
                            value={detailData.reason}
                            disabled
                            //onChange={handleAdd} 
                            >                                    
                            </input>
                        </div>
                    </li>
                </ul>
                    
                </div>

                <div className="col-sm-5 tien-su-benh">
                <h5>Tiền sử bệnh</h5>
                <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Chảy máu lâu"
                            //checked={add.medical_history.includes("Chảy máu lâu")}
                            //onChange={() => handleCheckboxChange("Chảy máu lâu")}
                            />
                            Chảy máu lâu
                        </label>
                    </div>
                    

                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Dị ứng thuốc"
                            //checked={add.medical_history.includes("Dị ứng thuốc")}
                            //onChange={() => handleCheckboxChange("Dị ứng thuốc")}
                            />
                            Dị ứng thuốc
                        </label>
                    </div>

                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Thấp khớp"
                            //checked={add.medical_history.includes("Thấp khớp")}
                            //onChange={() => handleCheckboxChange("Thấp khớp")}
                            />
                            Thấp khớp
                        </label>
                    </div>

                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Huyết áp"
                            //checked={add.medical_history.includes("Huyết áp")}
                            //onChange={() => handleCheckboxChange("Huyết áp")}
                            />
                            Huyết áp
                        </label>
                    </div>
                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Tim mạch"
                            //checked={add.medical_history.includes("Tim mạch")}
                            //onChange={() => handleCheckboxChange("Tim mạch")}
                            />
                            Tim mạch
                        </label>
                    </div>
                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Tiểu đường"
                            //checked={add.medical_history.includes("Tiểu đường")}
                            //onChange={() => handleCheckboxChange("Tiểu đường")}
                            />
                            Tiểu đường
                        </label>
                    </div>
                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Dạ dày"
                            //checked={add.medical_history.includes("Dạ dày")}
                            //onChange={() => handleCheckboxChange("Dạ dày")}
                            />
                            Dạ dày
                        </label>
                    </div>
                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Phổi"
                            //checked={add.medical_history.includes("Phổi")}
                            //onChange={() => handleCheckboxChange("Phổi")}
                            />
                            Phổi
                        </label>
                    </div>
                    <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Truyền nhiễm"
                            //checked={add.medical_history.includes("Truyền nhiễm")}
                            //onChange={() => handleCheckboxChange("Truyền nhiễm")}
                            />
                            Truyền nhiễm
                        </label>
                    </div>
                        <div className='form-check'>
                        <label>
                            <input
                            type="checkbox"
                            id ='medical_history'
                            name = 'medical_history'
                            value="Thai sản"
                            //checked={add.medical_history.includes("Thai sản")}
                            //onChange={() => handleCheckboxChange("Thai sản")}
                            />
                            Thai sản
                        </label>
                    </div>
                
                </div>
            </div>
            <Row>
                <Col>
                <div className="chandoan">
                    <label htmlFor="sohoso" className="form-label">Chẩn đoán và điều trị</label>
                    <input type='text' 
                    className='form-control' 
                    id='chandoan' 
                    name='chandoan'
                    
                    > 
                    </input>
                </div>
                </Col>
                <Col>
                <div className="sohoso">
                    <label htmlFor="sohoso" className="form-label">Ngày khám</label>
                    <input type='date' 
                    className='form-control' 
                    id='ngaykham' 
                    name='ngaykham'
                    
                    > 
                    </input>
                </div>
                </Col>
                <Col>
                    <Row>
                        <Col >
                            <Button className="button" onClick={()=>setThuthuat(true)}>Khám bệnh</Button>
                            {<Thuthuat show={thuthuat} onHide={()=>setThuthuat(false)} nhomthuthuat={nhomthuthuat} />}

                            <Button className="button" onClick={()=> setPayment(true)}>Thanh toán</Button>
                            <Payment show={payment} onHide={()=>setPayment(false)}/>
                            
                            <Button className="button" onClick={()=>setOpendonthuoc(true)}>Đơn thuốc</Button>
                            <Donthuoc show={opendonthuoc} onHide={()=>setOpendonthuoc(false)}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Button className="button" onClick={()=>setLichhen(true)}>Lịch hẹn</Button>
                            <Lichhen show={lichhen} onHide={()=>setLichhen(false)} onLichhenData = {(reminder) => handleLichhenData(reminder)}/>

                            <Button className="button">In bệnh án</Button>
                            <Button className="button">Lưu</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr/>
            <div className="chi-tiet-kham-benh">
                <div className="header">
                    <h5>Chi tiết khám bệnh</h5>
                    <Button className="button" onClick={refreshData}>REFRESH</Button>
                </div>
                <div className="tablengaykham ">
                    <div className="table-wrapper">
                        <table className="ngaykham table-bordered">
                            <thead>
                                <tr>
                                    {/* <th>STT</th> */}
                                    <th>Ngày khám</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="tbody-wrapper">
                        <table className="ngaykham table-bordered">
                            <tbody>
                                {ngaykham ? (
                                    ngaykham.map((item, index) => {
                                        return (
                                            <tr key={index} onClick={()=> handleDoubleClick(item.ngaykham)} style={{cursor:"pointer"}}>
                                                {/* <td></td> */}
                                                <td>{item.ngaykham}</td>
                                            </tr>
                                        );
                                    })
                                ): null}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="table-wrapper-2">
                        <table className="thongtinkhac table-bordered">
                            <thead>
                                <tr>
                                    <th className="rang">Răng</th>
                                    <th className="tenthuthuat">Tên thủ thuật</th>
                                    <th className="noidungthuthuat">Nội dung thủ thuật</th>
                                    <th className="soluong">Số lượng</th>
                                    <th className="dongia">Đơn giá</th>
                                    <th className="thanhtien">Thành tiền</th>
                                    <th className="percent">%</th>
                                    <th className="giamgia">Giảm giá</th>
                                    <th className="lydogiam">Lý do giảm</th>
                                </tr> 
                            </thead>
                        </table>
                        <div className="tbody-wrapper">
                        <table className="thongtinkhac table-bordered">
                            <tbody>
                                {filter ? (
                                    filter.map((item)=> {
                                        let percent = item.thanh_tien * item.percent / 100;
                                        //console.log(item)
                                        return (
                                            <tr key={item._id}>
                                                <td className="rang"></td>
                                                <td className="tenthuthuat">{item.ten_thu_thuat}</td>
                                                <td className="noidungthuthuat"></td>
                                                <td className="soluong">{item.so_luong}</td>
                                                <td className="dongia">{item.don_gia}</td>
                                                <td className="thanhtien">{item.thanh_tien}</td>
                                                <td className="percent">
                                                    {/* <input
                                                    type="number"
                                                    name="percent"
                                                    value={item.percent}
                                                    onChange={(e)=>{
                                                        let val = e.target.value
                                                        item.percent = val
                                                        setFilter([...filter])
                                                        
                                                    }}
                                                    /> */}
                                                </td>
                                                <td className="giamgia"></td>
                                                <td className="lydogiam"></td>
                                            </tr>
                                        );
                                    })
                                ): null}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div className="footertest">
        <ul className="nav">
            <div className='totalprice' style={{paddingLeft:"20px"}}>
                <label htmlFor='totalprice' className='form-label'>TỔNG THANH TOÁN</label>
                <input type='text' 
                className='form-control' 
                > 
                </input>
            </div>
            <div className='totalsell' style={{paddingLeft:"20px"}}>
                <label htmlFor='totalprice' className='form-label'>TỔNG KHUYẾN MÃI</label>
                <input type='text' 
                className='form-control' 
                > 
                </input>
            </div>
            <div className='totalpay' style={{paddingLeft:"20px"}}>
                <label htmlFor='totalprice' className='form-label'>TỔNG SỐ TIỀN ĐÃ THANH TOÁN</label>
                <input type='text' 
                className='form-control' 
                > 
                </input>
            </div>
        </ul>
        
    </div>
    </div>)
}

export default Treatment;