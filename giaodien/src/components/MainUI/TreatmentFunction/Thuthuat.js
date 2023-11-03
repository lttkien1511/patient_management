import React, { useState, useEffect } from "react";
import  Modal  from 'react-bootstrap/Modal';
import "./thuthuat.css";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";




function Thuthuat (props) {
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    
    const [thuthuatdata, setThuthuatdata] = useState([]);
    const [thuthuatchosen, setThuthuatchosen] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const inputRef = React.useRef();
    
    
    

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
                <Button className="button" variant="primary" >
                    <i class='bx bx-plus'>THÊM</i>
                </Button>
                {/* <Add show={addModal} onHide={() => setAddModal(false)}/> */}
                <Button className="editbutton" variant="primary">
                    SỬA
                </Button>
                {/* <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber} /> */}
                <Button className="deletebutton" variant="danger" >
                    XÓA
                </Button>
                
                {/* <Delete show={deleteModal} onHide={() => setDeleteModal(false)} idnumber={item.idnumber} /> */}
                <table className="table table-bordered" >
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
                <Button className="button" variant="primary" >
                    <i class='bx bx-plus'>THÊM</i>
                </Button>
                {/* <Add show={addModal} onHide={() => setAddModal(false)}/> */}
                <Button className="editbutton" variant="primary">
                    SỬA
                </Button>
                {/* <Edit show={editModal}  onHide={() => setEditModal(false)} idnumber={item.idnumber} /> */}
                <Button className="deletebutton" variant="danger" >
                    XÓA
                </Button>
                <table className="table table-bordered" >
                    <thead>
                        <tr>
                            <th colSpan="4">THỦ THUẬT</th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>TÊN THỦ THUẬT</th>
                            <th>ĐƠN GIÁ</th>
                            <th>GIẢM GIÁ</th>
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
                                <td>{item.giam_gia}</td>
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
                            <th>GIẢM GIÁ</th>
                            <th>PHẢI THANH TOÁN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {thuthuatchosen ? (
                            thuthuatchosen.map((item, index) => {
                            
                            let totalPrice = item.quantity > 0 ? item.don_gia.replaceAll(',','') * item.quantity : 0;
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
                                <td>{item.giam_gia}</td>
                                <td></td>
                            </tr>
                        );}) ):null
                        }
                    </tbody>
                </table>
            </div>
            
        </Modal.Body>

        <Modal.Footer>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >LƯU</button> 
            {/* <button type="submit" className="btn btn-info" data-bs-dismiss="modal" >LƯU VÀ IN</button>  */}
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
        </Modal.Footer>
    </Modal>
)}


export default Thuthuat