import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import Payment from "./TreatmentFunction/Payment";
import Thuthuat from "./TreatmentFunction/Thuthuat";
import Sidebar from "./Sidebar";
import Donthuoc from "./TreatmentFunction/Donthuoc";
import Lichhen from "./TreatmentFunction/Lichhen";
import Notification from "./Function/Notification";
import AppointmentNoti from "./Function/AppointmentNoti";
import MedicineInfo from "./Function/MedicineInfo";
import moment from "moment";


function Treatment(props) {
    const {idnumber} = useParams();
    const [detailData, setDetailData] =useState([]);
    const [payment, setPayment] = useState(false);
    const [thuthuat, setThuthuat] = useState(false);
    const navigate = useNavigate();

    const [ngaykham, setNgaykham] = useState([]);
    const [filterType, setFilterType] = useState('and');
    const [filterthuthuat, setFilterthuthuat] = useState([]);
    const [filterdonthuoc, setFilterdonthuoc] = useState([]);
    const [nhomthuthuat, setNhomthuthuat] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    
    const [opendonthuoc, setOpendonthuoc] = useState(false);
    const [lichhen, setLichhen] = useState(false);
    const [lichhenData, setLichhenData] = useState(null);

    const handleBacktoMainpage = () => {
        const mainpage = `/ho-so-benh-nhan`;
        navigate(mainpage);
    }

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
                },
                "ngayke": {
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
            setFilterthuthuat(result.datathuthuat);
            setFilterdonthuoc(result.datadonthuoc);            
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
            const formattedNgaykham = response.data.thuthuatcanhan_unique.map((ngay) => moment(ngay).format('DD/MM/YYYY'))
            setNgaykham(formattedNgaykham);
        })
        .catch((error) => {
            console.error('Refresh error', error);
        });
    };

    

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/ngaykham/${idnumber}`)
        .then((response)=>{
            setNgaykham(response.data);
        })
        .catch((error) => {
            console.error('Refresh error', error);
        });
    },[idnumber]);

    


    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/patient/getDetailData?idnumber=${idnumber}`)
        .then((response) => {
            setDetailData(response.data.data);
          })
          .catch((error) => {
            console.error('Lỗi khi tải dữ liệu chi tiết: ', error);
          });
    }, [idnumber]);

    const calcucateTotalPrice = () => {
        let totalPrice = 0;
        filterthuthuat.forEach((item) => {
            let sotiengiamgia = item.percent > 0 ? (item.thanh_tien * item.percent / 100) : 0;
            totalPrice += (item.thanh_tien - sotiengiamgia);
        });
        return totalPrice;
    };

    const calculateSale = () => {
        let Sale = 0;
        filterthuthuat.forEach((item) => {
            Sale += item.giam_gia;
        });
        return Sale;
    }

    return (
    <div className='Treatment'>
        <nav className='navfunction'>
            <div className="container-fluid">
                <div className="nav navbar-nav">
                    <div className="d-flex">
                        <div className="congcu">
                            <div className="backtomainpage">
                                <Button 
                                className="btn backtomainpage rounded-pill" 
                                variant="outline-success"
                                onClick={handleBacktoMainpage}
                                >
                                        <i class='bx bx-chevron-left' style={{fontSize:"25px"}} ></i>
                                        Về trang chủ
                                </Button>
                            </div>
                            <div className="SidebarBtn">
                                <button className="btn btnmenu-1"
                                onClick={()=> {setSidebar(true)}}
                                >
                                    <i class='bx bx-menu' style={{fontSize:"25px"}}></i>
                                </button>
                                {sidebar && <Sidebar show={sidebar} onHide={()=> setSidebar(false)}/>}
                            </div>
                        </div>
                        
                        <div className="title">
                            <h4>KHÁM BỆNH - ĐIỀU TRỊ</h4> 
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
                <div className="container-fluid thong-tin-benh-nhan">
                    <h5>Thông tin bệnh nhân</h5>
                    <Form>
                        <fieldset disabled>
                            {/* {detailData.map((item) => ( */}
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledTextInput">Số hồ sơ</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.idnumber} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledSelect">Họ và tên</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.name} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledSelect">Tuổi</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.age} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledSelect">Ngày tháng năm sinh</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.birthday} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledSelect">Giới tính</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.gender} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledTextInput">Địa chỉ</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.address} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledSelect">Lý do khám</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.reason} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="disabledSelect">Tiền sử bệnh</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder={detailData.medical_history} />
                                    </Form.Group>
                                </Row> 
                        </fieldset>
                    </Form>
                </div>
            </div>
            <br/>
            <Row>
                <Col>
                        <Button className="button" onClick={()=>setThuthuat(true)}>Khám bệnh</Button>
                        {<Thuthuat show={thuthuat} onHide={()=>setThuthuat(false)} nhomthuthuat={nhomthuthuat} />}

                        <Button className="button" onClick={()=> setPayment(true)}>Thanh toán</Button>
                        <Payment show={payment} onHide={()=>setPayment(false)}/>
                        
                        <Button className="button" onClick={()=>setOpendonthuoc(true)}>Đơn thuốc</Button>
                        <Donthuoc show={opendonthuoc} onHide={()=>setOpendonthuoc(false)}/>

                        <Button className="button" onClick={()=>setLichhen(true)}>Lịch hẹn</Button>
                        <Lichhen show={lichhen} onHide={()=>setLichhen(false)} onLichhenData = {(reminder) => handleLichhenData(reminder)}/>

                        <Button className="button">In bệnh án</Button>
                        <Button className="button">Lưu</Button>
                </Col>
            </Row>
            <hr/>
            <div className="chi-tiet-kham-benh">
                <div className="header">
                    <div className="header1">
                        <h5>Chi tiết khám bệnh</h5>
                        <button className="btn refreshbutton rounded-circle" variant="light" style={{color:"black"}} onClick={refreshData}>
                            <i class='bx bx-refresh' style={{fontSize:"25px"}}></i>
                        </button>
                    </div>
                    <div className="detailmedicine">
                        <MedicineInfo datadonthuoc={filterdonthuoc}/>
                    </div>
                </div>
                <div className="tablengaykham ">
                    <div className="table-wrapper">
                        <table className="ngaykham table-borderless table-responsive-lg">
                            <thead>
                                <tr>
                                    <th>Ngày khám</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="tbody-wrapper">
                        <table className="ngaykham table-striped table-borderless table-responsive-lg">
                            <tbody>
                                {ngaykham ? (
                                    ngaykham.map((item, index) => {
                                        return (
                                            <tr key={index} onClick={()=> handleDoubleClick(item.create_time)} style={{cursor:"pointer"}}>
                                                <td>{item.create_time}</td>
                                            </tr>
                                        );
                                    })
                                ): null}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="table-wrapper-2">
                        <table className="thongtinkhac table-borderless table-responsive-lg">
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
                        <table className="thongtinkhac table-hover table-striped table-borderless table-responsive-lg">
                            <tbody>
                                {filterthuthuat ? (
                                    filterthuthuat.map((item)=> {
                                        let sotiengiamgia = item.percent > 0 ? (item.thanh_tien * item.percent / 100 ) : 0;
                                        item.giam_gia = sotiengiamgia
                                        return (
                                            <tr key={item._id}>
                                                <td className="rang">
                                                    <input
                                                    type="text"
                                                    name="rang"
                                                    value = {item.tooth_number}
                                                    style={{width:"100%", border:"none"}}
                                                    />
                                                </td>
                                                <td className="tenthuthuat">{item.ten_thu_thuat}</td>
                                                <td className="noidungthuthuat">
                                                    <input
                                                    type="text"
                                                    name="noidungthuthuat"
                                                    value={item.noi_dung_thu_thuat}
                                                    style={{width:"100%", border:"none"}}
                                                    />
                                                </td>
                                                <td className="soluong">{item.so_luong}</td>
                                                <td className="dongia">{item.don_gia.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                <td className="thanhtien">{item.thanh_tien.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                <td className="percent">
                                                    <input
                                                    type="number"
                                                    name="percent"
                                                    value={item.percent}
                                                    onChange={(e) => {
                                                        let val = e.target.value;
                                                        item.percent = val;
                                                        setFilterthuthuat([...filterthuthuat])
                                                    }}
                                                    style={{width:"100%", border:"none"}}
                                                    />
                                                </td>
                                                <td className="giamgia">
                                                    <input
                                                    type="number"
                                                    name="percent"
                                                    value={sotiengiamgia}
                                                    style={{width:"100%", border:"none"}}
                                                    disabled
                                                    />
                                                </td>
                                                <td className="lydogiam">
                                                    <input
                                                    type="text"
                                                    name="lydogiam"
                                                    value={item.lydogiam}
                                                    style={{width:"100%", border:"none"}}
                                                    />
                                                </td>
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
            <div className='totalprice' style={{paddingLeft:"100px"}}>
                <label htmlFor='totalprice' className='form-label'>TỔNG THANH TOÁN</label>
                <input type='text' 
                className='form-control' 
                style={{
                    width:"200px"
                }}
                value={calcucateTotalPrice()}
                > 
                </input>
            </div>
            <div className='totalsell' style={{paddingLeft:"100px"}}>
                <label htmlFor='totalprice' className='form-label'>TỔNG KHUYẾN MÃI</label>
                <input type='text' 
                className='form-control' 
                value={calculateSale()}
                > 
                </input>
            </div>
            <div className='totalpay' style={{paddingLeft:"100px"}}>
                <label htmlFor='totalprice' className='form-label'>TỔNG SỐ TIỀN ĐÃ THANH TOÁN</label>
                <input type='text' 
                className='form-control'
                style={{
                    width:"200px"
                }} 
                > 
                </input>
            </div>
        </ul>
        
    </div>
    </div>)
}

export default Treatment;