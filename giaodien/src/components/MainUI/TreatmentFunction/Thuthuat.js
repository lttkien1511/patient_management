import React, { useState, useEffect } from "react";
import  Modal  from 'react-bootstrap/Modal';
import "./thuthuat.css";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Addnhom from "./Nhomthuthuat/Addnhom";
import Addthuthuat from "./Nhomthuthuat/Addthuthuat";




function Thuthuat (props) {
    
    const [data, setData] = useState([]);
    const {idnumber} = useParams();
    const [thuthuatdata, setThuthuatdata] = useState([]);
    const [thuthuatchosen, setThuthuatchosen] = useState([]);
    
    const [soluong, setSoluong] = useState("");
    const [thuthuatid, setThuthuatid] = useState("");
    const [ten_thu_thuat, setTenthuthuat] = useState("");
    

    const [don_gia, setDongia] =useState(0);
    const [thanh_tien, setThanhtien]= useState(0);

    const [addnhomthuthuat, setAddnhomthuthuat] = useState(false);
    const [addthuthuat, setAddthuthuat] = useState(false);

    const [thuthuat, setThuthuat] = useState("");

    const handleSave = () => {
        let data = JSON.stringify({
            "so_luong": soluong,
            "thuthuatid": thuthuatid,
            "ten_thu_thuat": ten_thu_thuat,
            "don_gia": don_gia,
            "thanh_tien": thanh_tien
        });      
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
        //setData(savedata.data);
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

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/getallnhomthuthuat`)
        .then((response) => {
            setData(response.data.allgroup);
            })
            .catch((error) => {
            console.error('Lỗi khi tải dữ liệu chi tiết: ', error);
            });
    },[]);

    const handleDoubleClick = (item) => {
        console.log(item);
        
        axios
        .get(`http://127.0.0.1:8000/getthuthuat/${item}`)
        .then((response) => {
            console.log(response.data);
            setThuthuatdata(response.data);
            setThuthuat(item);
        })
        .catch((error) => {
        console.error('Error when fetching group details: ', error);
        });
      };
    
    const handleChoosing = (chosenitem) => {
        console.log(chosenitem);
        axios
        .get(`http://127.0.0.1:8000/thuthuatduocluachon/${chosenitem}`)
        .then((response) => {
            console.log(response.data);
            setThuthuatchosen(response.data);
            setThuthuatid(chosenitem);
            
        })
        .catch((error) => {
            console.error('Chosen error:', error);
        })
    }


    return (
    <Modal {...props} className="container-fluid thuthuatdieutri">
        <Modal.Header>
            <Modal.Title>
                CHỌN THỦ THUẬT ĐIỀU TRỊ
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="nhomthuthuat">
                <Button className="button" variant="primary" onClick={() => setAddnhomthuthuat(true)}>
                    <i class='bx bx-plus'>THÊM</i>
                </Button>
                <Addnhom show={addnhomthuthuat} onHide={() => setAddnhomthuthuat(false)}/>
                <Button className="editbutton" variant="primary">
                    SỬA
                </Button>
                {/* <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber} /> */}
                <Button className="deletebutton" variant="danger" >
                    XÓA
                </Button>
                
                {/* <Delete show={deleteModal} onHide={() => setDeleteModal(false)} idnumber={item.idnumber} /> */}
                <table className="table table-bordered" style={{ overflowY: "auto", maxHeight: "100px"}}>
                    <thead>
                        <tr>
                            <th colSpan="2">NHÓM THỦ THUẬT</th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>TÊN NHÓM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                        <tr key={item._id} onDoubleClick={()=>handleDoubleClick(item._id)} 
                        // className={selectedRow === item ? "selected":  ""}
                        >
                            <td></td>
                            <td>{item.ten_nhom_thu_thuat}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="nhomthuthuat">
                <Button className="button" variant="primary" onClick={()=>setAddthuthuat(true)}>
                    <i class='bx bx-plus'>THÊM</i>
                </Button>
                <Addthuthuat show={addthuthuat} onHide={() => setAddthuthuat(false)} item={thuthuat} />
                <Button className="editbutton" variant="primary">
                    SỬA
                </Button>
                {/* <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber} /> */}
                <Button className="deletebutton" variant="danger" >
                    XÓA
                </Button>
                <table className="table table-bordered " >
                    <thead>
                        <tr>
                            {/* <th colSpan="4">THỦ THUẬT</th> */}
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
                            <tr key={item._id} onDoubleClick={()=>handleChoosing(item._id)}
                            >
                                <td></td>
                                <td>{item.ten_thu_thuat}</td>
                                <td>{item.don_gia}</td>
                                
                            </tr>
                        )) ):null}
                    </tbody>
                </table>
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
                        {/* {thuthuatchosen ? (
                            thuthuatchosen.map((item, index) => {
                            
                            //let totalPrice = item.quantity > 0 ? item.don_gia.replaceAll(',','') * item.quantity : 0;
                            let totalPrice = item.quantity > 0 ? item.don_gia * item.quantity : 0;
                            let quantity = item.quantity > 0 ? item.quantity : ''
                            console.log(item)
                            return (
                            <tr key={index}>
                                <td></td>
                                <td>{item.ten_thu_thuat}</td>
                                <td>
                                    <input 
                                    type='number'
                                    ref={inputRef}
                                    value={quantity}
                                    onChange={(e)=>{
                                        let val = e.target.value
                                        item.quantity = val
                                        setThuthuatchosen([...thuthuatchosen])
                                    }}
                                    />
                                    
                                </td>
                                <td>{item.don_gia}</td>
                                <td>
                                    {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} 
                                    
                                </td>
                                {/* <td>{item.giam_gia}</td> */}
                                {/* <td></td> 
                            </tr>
                        );}) ):null
                        } */}
                        {thuthuatchosen ? (
                            thuthuatchosen.map((item, index) => {
                            
                            //let totalPrice = item.quantity > 0 ? item.don_gia.replaceAll(',','') * item.quantity : 0;
                            let totalPrice = item.so_luong > 0 ? item.don_gia * item.so_luong : 0;
                            //let so_luong = item.so_luong > 0 ? item.so_luong : ''
                            console.log(item)
                            return (
                            <tr key={index}>
                                <td></td>
                                <td>{item.ten_thu_thuat}</td>
                                <td>
                                    <input 
                                    type='number'
                                    name="so_luong"
                                    //value={soluong}
                                    value = {item.so_luong}
                                    onChange={(e)=>{
                                        let val = e.target.value
                                        item.so_luong = val
                                        setThuthuatchosen([...thuthuatchosen])
                                        setSoluong(val)
                                    }}
                                    />
                                </td>
                                <td>{item.don_gia}</td>
                                <td>
                                    {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} 
                                    {/* {item.thanh_tien} */}
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