import React, { useState, useEffect} from "react";
import  Modal  from 'react-bootstrap/Modal';
import "./thuthuat.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Thuthuat (props) {
        
    const {idnumber} = useParams();
    const [thuthuatGroup, setThuthuatGroup] = useState([]);
    const [thuthuatdata, setThuthuatdata] = useState([]);
    const [thuthuatchosen, setThuthuatchosen] = useState([]);
    
    const handleSave = () => {
        console.log(thuthuatchosen)
        
        let data = JSON.stringify(thuthuatchosen);      
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/thuthuatbenhnhan/${idnumber}`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios.request(config)
        .then((response) => {
        const savedata = response.data;
        console.log(JSON.stringify(savedata));
        Swal.fire({
            icon: 'success',
            title: 'Thủ thuật mới cho bệnh nhân đã được thêm vào',
            showConfirmButton:false,
            timer:2000
        })
        })
        .catch((error) => {
        console.log(error);
        });
    }

    const onShow = ()=>{
        getAllGroup()

    }
    

    const getAllGroup = () => {
        axios.get(`http://127.0.0.1:8000/getallnhomthuthuat`)
        .then((response) => {
            setThuthuatGroup(response.data.allgroup);
            })
            .catch((error) => {
            console.error('Lỗi khi tải dữ liệu chi tiết: ', error);
            });
    }

    const handleClick = (item) => {
        console.log(item);
        axios
        .get(`http://127.0.0.1:8000/getthuthuat/${item}`)
        .then((response) => {
            setThuthuatdata(response.data);
        })
        .catch((error) => {
        console.error('Error when fetching group details: ', error);
        });
      };
    
    const handleRemove = (item) => {
        const updatedselected = thuthuatchosen.filter((thuthuat) => thuthuat !== item);
        setThuthuatchosen(updatedselected);
    }

    return (
    <Modal show={props.show} onHide={props.onHide} onShow={()=>{
        onShow()
    }} className="container-fluid thuthuatdieutri">
        <Modal.Header>
            <Modal.Title>
                CHỌN THỦ THUẬT ĐIỀU TRỊ
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="nhomthuthuat">
                <div className="table-wrapper">
                    <table className="table table-bordered table-responsive-lg" style={{ overflowY: "auto", maxHeight: "300px"}}>
                        <thead>
                            <tr>
                                <th colSpan="2">NHÓM THỦ THUẬT</th>
                            </tr>
                            <tr>
                                <th style={{width:"15px"}}>STT</th>
                                <th>TÊN NHÓM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thuthuatGroup.map((item) => {
                            const nhomthuthuatId = item._id;
                            return (
                                <tr key={item._id} 
                                >
                                    <td></td>
                                    <td onClick={()=>handleClick(nhomthuthuatId)} style={{cursor:'pointer'}}>{item.ten_nhom_thu_thuat}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="nhomthuthuat">
                <div className="table-wrapper">
                    <table className="table table-bordered table-responsive-lg" style={{ overflowY:"auto"}}>
                        <thead>
                            <tr>
                                <th colSpan="3">THỦ THUẬT</th>
                            </tr>
                            <tr>
                                <th>STT</th>
                                <th>TÊN THỦ THUẬT</th>
                                <th>ĐƠN GIÁ</th>          
                            </tr>
                        </thead>
                        <tbody>
                            {thuthuatdata ? (
                                thuthuatdata.map((item) => (
                                <tr key={item._id} 
                                >
                                    <td></td>
                                    <td style={{cursor:"pointer"}} onClick={()=>{
                                        setThuthuatchosen([...thuthuatchosen, {
                                            so_luong: 1,
                                            thuthuatid: item._id,
                                            ten_thu_thuat: item.ten_thu_thuat,
                                            don_gia: item.don_gia,
                                            thanh_tien: item.thanh_tien,

                                        }])
                                    }}>{item.ten_thu_thuat}</td>
                                    <td>{item.don_gia}</td>
                                </tr>
                            )) ):null}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="thuthuatduocchon">
                <table className="table table-bordered" >
                    <thead>
                        <tr>
                            <th colSpan="7">THỦ THUẬT ĐƯỢC LỰA CHỌN</th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>TÊN THỦ THUẬT</th>
                            <th>SỐ LƯỢNG</th>
                            <th>ĐƠN GIÁ</th>
                            <th>THÀNH TIỀN</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {thuthuatchosen ? (
                            thuthuatchosen.map((item) => {
                            let totalPrice = item.so_luong > 0 ? item.don_gia * item.so_luong : 0;
                            item.thanh_tien = totalPrice;
                            console.log(item._id)
                            return (
                            <tr key={item._id} 
                            
                            style={{cursor:"pointer"}}
                            >
                                <td></td>
                                <td onDoubleClick={() => handleRemove(item)}>{item.ten_thu_thuat}</td>
                                <td>
                                    <input 
                                    type='number'
                                    name="so_luong"
                                    value = {item.so_luong}
                                    onChange={(e)=>{
                                        let val = e.target.value
                                        item.so_luong = val;
                                        setThuthuatchosen([...thuthuatchosen])
                                        
                                    }}
                                    />
                                </td>
                                <td>{item.don_gia}</td>
                                <td>
                                    {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} 
                                </td>
                                
                            </tr>
                        );}) ):null
                        }
                    </tbody>
                </table>
            </div>
            
        </Modal.Body>

        <Modal.Footer>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>LƯU</button> 
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
        </Modal.Footer>
    </Modal>
)}

export default Thuthuat