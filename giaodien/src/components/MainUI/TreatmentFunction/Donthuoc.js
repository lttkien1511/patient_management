import axios from "axios";
import React, { useEffect, useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import { insertData , getMedicineData} from "../../../model/list_medicine";
import { GenericTable } from "../../../helper/table";
import moment from "moment";

function Donthuoc (props) {
    const [detailData, setDetailData] = useState({});
    const [data, setData] = useState([]);
    const [donthuocdata, setDonthuocdata] = useState([]);
    const {idnumber} = useParams();

    const [nguoikevalue, setNguoikevalue] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const today = new Date();

    // const formatNgayke = (dt) => {
    //     //Format ngày kê theo định dạng %d/%m/%Y
    //     const date = new Date(dt);
    //     let day = date.getDate();
    //     day = day < 10 ? "0" + day : day;
    //     let month = date.getMonth() + 1;
    //     month = month < 10 ? "0" + month : month;
    //     let year = date.getFullYear();

    //     //return `${day}/${month}/${year}`;
    //     return `${year}-${month}-${day}`
    // }

    const handleDateChange = (e) => {
        const dateValue= e.target.value;
        setSelectedDate(dateValue ? dateValue : moment(today).format('DD/MM/YYYY'));
        const formattedDate = moment(dateValue).format('DD/MM/YYYY');
        console.log(formattedDate); 
    }
    

    const onShow = () => {
        getAllMedicine();
    } 
    
    const handleSave = () => {
        insertData(donthuocdata, idnumber).then((response) => {
            if (response) {
                window.makeAlert('success', 'Đơn thuốc mới cho bệnh nhân đã được thêm vào');
            }
        })
        .catch((error) => {
            console.log(error);
        });
        // console.log(donthuocdata);
        // let data = JSON.stringify(donthuocdata);
        // let config = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: `http://127.0.0.1:8000/donthuoc/insertData?idnumber=${idnumber}`,
        //     headers: { 
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        //     };
        //     axios.request(config)
        //     .then((response) => {
        //     const savedata = response.data;
        //     console.log(JSON.stringify(savedata));
            
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Đơn thuốc mới cho bệnh nhân đã được thêm vào',
        //         showConfirmButton:false,
        //         timer:2000
        //     })
        //     })
            // .catch((error) => {
            // console.log(error);
            // });
    }

    const getAllMedicine = () => {
        getMedicineData().then((response) => {
            if (response) {
                setData(response.data);
            }
        })
        // axios.get(`http://127.0.0.1:8000/donthuoc/getall`)
        // .then((response) => {
        //     setData(response.data.data);
        // })
        // .catch((error) => {
        //     console.error('Lỗi khi tải dữ liệu chi tiết: ',error);
        // })
    };
    
    
    const handleRemove = (item) => {
        const updatedselected = donthuocdata.filter((donthuoc) => donthuoc !== item);
        setDonthuocdata(updatedselected); 
    };

    useEffect(()=> {
        axios
        .get(`http://127.0.0.1:8000/patient/getDetailData?idnumber=${idnumber}`)
        .then((response) => {
            setDetailData(response.data);
        })
        .catch((error) => {
            console.error('Lỗi tải dữ liệu', error);
        });
    }, [idnumber]);
   

    const printDiv = (item) => {
        //handleSave();
        var a = window.open('', '','height=595, width = 420');
        a.document.write(`
        <html>
            <head>
                <style>
                    .header {
                        text-align: center;
                    }
                    h3 {
                        text-align: center;
                    }
                    .grid-container {
                        display:grid;
                    }
                    .item1 {
                        grid-
                    }
                </style>
            </head>

            <body>
                <div class = 'header'>
                    PHÒNG KHÁM NHA KHOA QUỲNH LAN
                    <br>
                    Địa chỉ: Số 05 Ngõ 26 Nguyên Hồng - Đống Đa - Hà Nội
                    <br>
                    Điện thoại: 0989 633 215
                    <br>
                    Giấy phép KCB:

                </div>
                <br>
                <h3 class = 'donthuoc'>
                    ĐƠN THUỐC
                </h3>
                
                <div class='grid-container'>
                    <div class='grid-item item1'>Họ và tên: ${detailData.name}</div>
                    <div class='grid-item item2'>Ngày sinh: ${detailData.birthday}</div>
                    <div class='grid-item item3'>Giới tính: ${detailData.gender}</div>
                    <div class='grid-item item4'>Địa chỉ: ${detailData.address}</div>
                    <div>Chẩn đoán: </div>
                </div>
                <div>Chỉ định dùng thuốc:</div>
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Tên thuốc</th>
                                <th>Số lượng</th>
                                <th>Hướng dẫn</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${donthuocdata.map(item => `
                                <tr>
                                    <td>${item.donthuoc}</td>
                                    <td>${item.soluong}</td>
                                    <td>${item.huongdan}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div>Chú ý: Lần sau đi khám lại nhớ mang theo đơn thuốc này!</div>
            </body>
        </html>
        `);
        a.document.close();
        a.print();
    }


    return (
        <Modal show={props.show} onHide={props.onHide} onShow={() => {
            onShow()
        }} className="donthuocchobenhnhan">
            <Modal.Header closeButton>
                <h5>Đơn thuốc cho bệnh nhân: {detailData.name}</h5>
                
            </Modal.Header>
            <Modal.Body>
                <div className="ngaykevanguoike">
                    <div className="ngayke">
                        <label htmlFor="todayDate" className="form-label">Ngày kê</label>
                        <input 
                        className='form-control' 
                        name='ngayke'
                        type="date" 
                        value={selectedDate}
                        onChange={handleDateChange}
                        /> 
                    </div>
                    
                    <div className='nguoike'>
                        <label htmlFor='nguoike' className='form-label'>Người kê</label>
                        <select className='form-control'
                        name='nguoike'
                        // value={}
                        
                        >
                            <option value="BS Lan">BS Lan</option>
                            <option value="BS Mỹ">BS Mỹ</option>
                        </select>
                    </div>
                </div>
                
                <div className="danhmucthuoc">
                    <div className="table-wrapper">
                        <Table hover className="table table-striped table-borderless table-responsive-lg" 
                        style={{ overflowY: "auto", maxHeight: "300px"}}>
                            <thead>
                                <tr>
                                    <th colSpan="2">Danh mục thuốc</th>
                                </tr>
                                <tr>
                                    <th>Tên thuốc</th>
                                    <th>Đơn vị</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => {
                                const dt = item._id;
                                return (
                                    <tr key={dt} 
                                    style={{cursor:"pointer"}}
                                    onClick={()=> {
                                        setDonthuocdata([...donthuocdata,{
                                            donthuoc_id: dt,
                                            donthuoc: item.donthuoc,
                                            donvi:  item.donvi,
                                            soluong: item.soluong,
                                            huongdan: item.huongdan,
                                            ngayke: item.ngayke,
                                            nguoike: item.nguoike
                                        }])
                                    }}
                                    >
                                        <td>{item.donthuoc}</td>
                                        <td>{item.donvi}</td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="donthuocduocchon">
                    <div className="table-wrapper">
                        <Table hover className="table-striped table-borderless table-responsive-lg" 
                            style={{ overflowY: "auto", maxHeight: "300px"}}>
                                <style>
                                    {`
                                    input::-webkit-outer-spin-button,
                                    input::-webkit-inner-spin-button {
                                        -webkit-appearance: none;
                                            margin: 0;
                                    }`
                                    }
                                </style>
                                <thead>
                                    <tr>
                                        <th colSpan="3">Đơn thuốc cho bệnh nhân</th>
                                    </tr>
                                    <tr>
                                        <th>Tên thuốc</th>
                                        <th>Số lượng</th>
                                        <th>Hướng dẫn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donthuocdata.map((item) => {
                                    const dt = item._id;
                                    //console.log(item);
                                    //console.log(donthuocdata);
                                    return (
                                        <tr key={dt} 
                                        >
                                            <td style={{width:"250px"}} onDoubleClick={()=> handleRemove(item)}>{item.donthuoc}</td>
                                            <td style={{width:"100px"}}>
                                                <input
                                                type='number'
                                                name="soluong"
                                                value={item.soluong}
                                                onChange={(e)=>{
                                                    let val = e.target.value;
                                                    item.soluong = val;
                                                    setDonthuocdata([...donthuocdata]);
                                                }}
                                                style={{border:"none"}}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type='text'
                                                name='huongdan'
                                                value={item.huongdan}
                                                onChange={(e)=> {
                                                    let val = e.target.value;
                                                    item.huongdan = val;
                                                    setDonthuocdata([...donthuocdata]);
                                                }}
                                                style={{width:"100%", border:"none"}}
                                                />
                                            </td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                    </div>
                </div>
                {/* </div> */}
            </Modal.Body>
            
            <Modal.Footer>
                <button type="submit" className="btn btn-primary" onClick={handleSave}>
                    LƯU
                </button>
                <button type="submit" className="btn btn-primary" onClick={printDiv}>
                    <i class='bx bxs-printer'>&nbsp;IN ĐƠN THUỐC </i>
                </button> 
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
            </Modal.Footer>
            
        </Modal>
        
    )
}

export default Donthuoc