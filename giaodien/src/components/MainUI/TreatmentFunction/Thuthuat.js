import React, { useState, useEffect} from "react";
import  Modal  from 'react-bootstrap/Modal';
import "./thuthuat.css";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { getProcedureGroup , getProcedure } from "../../../model/thuthuat";
import { addTreatment } from "../../../model/treatmentFunction";


function Thuthuat (props) {
        
    const {idnumber} = useParams();
    const [thuthuatGroup, setThuthuatGroup] = useState([]);
    const [thuthuatdata, setThuthuatdata] = useState([]);
    const [thuthuatchosen, setThuthuatchosen] = useState([]);
    const [tennhom, setTennhom] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    

    const onShow = ()=>{
        getAllGroup()
    }
    
    const getAllGroup = () => {
        getProcedureGroup().then((response) => {
            if (response) {
                setThuthuatGroup(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error);
        })
    };

    const handleGetThuThuat = (id) => {
        getProcedure(id).then((response) => {
            if (response) {
                console.log(response.data);
                setThuthuatdata(response.data[0]);
                setTennhom(response.data[1]);
                setSelectedRow(id);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error);
        })
    }

    const handleSave = () => {
        addTreatment(thuthuatchosen, idnumber).then((response) => {
            if (response) {
                window.makeAlert('success', 'Thủ thuật mới cho bệnh nhân đã được thêm vào');
            }
        })
    }

    
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
                    <Table hover className="table table-striped table-borderless table-responsive-lg" style={{ overflowY: "auto", maxHeight: "300px"}}>
                        <thead>
                            <tr>
                                <th colSpan="2">NHÓM THỦ THUẬT</th>
                            </tr>
                            <tr>
                                <th colSpan="2">TÊN NHÓM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thuthuatGroup.map((item) => {
                            const nhomthuthuatId = item._id;
                            return (
                                <tr key={item._id} 
                                >
                                    <td 
                                    onClick={()=>handleGetThuThuat(nhomthuthuatId)} 
                                    style={{cursor:'pointer',textAlign:"center"
                                }}
                                    >
                                        {item.procedureGroup}
                                    </td>
                                    <td>
                                        <Form.Check aria-label={`Select row ${nhomthuthuatId}`} 
                                            checked={selectedRow === nhomthuthuatId}
                                            style={{ border: 'none' }}
                                        >

                                        </Form.Check>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className="nhomthuthuat">
                <div className="table-wrapper">
                    <Table hover className="table table-striped table-borderless table-responsive-lg" style={{ overflowY:"auto"}}>
                        <thead>
                            <tr>
                                <th colSpan="3">DANH SÁCH THỦ THUẬT CỦA NHÓM : {tennhom} </th>
                            </tr>
                            <tr>
                                {/* <th>STT</th> */}
                                <th>TÊN THỦ THUẬT</th>
                                <th>ĐƠN GIÁ</th>          
                            </tr>
                        </thead>
                        <tbody>
                            {thuthuatdata ? (
                                thuthuatdata.map((item) => (
                                <tr key={item._id} 
                                style={{cursor:"pointer",textAlign:"center"}} 
                                >
                                    {/* <td></td> */}
                                    <td onClick={()=>{
                                        setThuthuatchosen([...thuthuatchosen, {
                                            so_luong: 1,
                                            thuthuatid: item._id,
                                            procedure: item.procedure,
                                            don_gia: item.don_gia,
                                            thanh_tien: item.thanh_tien
                                            
                                        }])
                                    }}>{item.procedure}</td>
                                    <td>{item.don_gia}</td>
                                </tr>
                            )) ):null}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="thuthuatduocchon">
                {/* <div className="table-wrapper"> */}
                <Table hover className="table table-striped table-borderless table-responsive-lg">
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
                            <th colSpan="7">THỦ THUẬT ĐƯỢC LỰA CHỌN</th>
                        </tr>
                        <tr>
                            {/* <th>STT</th> */}
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
                            
                            style={{cursor:"pointer", textAlign:"center"}}
                            >
                                {/* <td></td> */}
                                <td onDoubleClick={() => handleRemove(item)}>{item.procedure}</td>
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
                                    style={{border:"none"}}
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
                </Table>
                {/* </div> */}
            </div>
            
        </Modal.Body>

        <Modal.Footer>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>LƯU</button> 
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
        </Modal.Footer>
    </Modal>
)}

export default Thuthuat