import React, { useState, useEffect} from "react";
import  Modal  from 'react-bootstrap/Modal';
//import "./thuthuat.css";
//import "../TreatmentFunction/thuthuat.css";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Addnhom from "../TreatmentFunction/Nhomthuthuat/Addnhom";
import Addthuthuat from "../TreatmentFunction/Nhomthuthuat/Addthuthuat";



function ProcedureGroup (propdata) {
    
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

    const [clickednhomthuthuat, setClickednhomthuthuat] = useState(false);
    const [clickedthuthuat, setClickthuthuat] = useState(false);

    const [points, setPoints] = useState({
        x:0,
        y:0,
    });

    const handleContextMenuNhomThuthuat = (e, item) => {
        e.preventDefault();
        setClickednhomthuthuat(true);
        setPoints({ x: e.pageX, y: e.pageY });
        console.log('Right Click', e.pageX, e.pageY);
        console.log('Item info:', item);
      };

    const handleContextMenuThuthuat = (e, item) => {
        e.preventDefault();
        setClickthuthuat(true);
        setPoints({ x: e.pageX, y: e.pageY });
        console.log('Right Click', e.pageX, e.pageY);
        console.log('Item info:', item);
    }

    useEffect(()=>{
        const handleClick = () => setClickednhomthuthuat(false);
        window.addEventListener("click",handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    
    useEffect(()=>{
        const handleClick = () => setClickthuthuat(false);
        window.addEventListener("click",handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const deleteNhom = (nhomthuthuat) => {
        console.log(nhomthuthuat);
        axios
        .delete(`http://127.0.0.1:8000/xoanhomthuthuat?id=${nhomthuthuat}`)
        .then((response)=> {
            console.log(response.data);
            
            Swal.fire({
                icon: 'success',
                title: 'Nhóm thủ thuật đã được xóa',
                showConfirmButton:false,
                timer:2000
            });
            refreshnhomthuthuat(); 
        })
        .catch((error)=> {
            console.log(error);
        })
    }

    const deleteThuthuat = (tt) => {
        console.log(tt);
        axios
        .delete(`http://127.0.0.1:8000/xoathuthuat?id=${tt}`)
        .then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Thủ thuật đã được xóa',
                showConfirmButton:false,
                timer:2000
            });
        })
        .catch((error)=> {
            console.log(error);
        })
    }

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

    const refreshnhomthuthuat = () => {
        axios
        .get(`http://127.0.0.1:8000/getallnhomthuthuat`)
        .then((response)=> {
            console.log(response.data);
            setData(response.data.allgroup);
        })
        .catch((error) => {
            console.error('Refresh error',error);
        })
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
    <Modal {...propdata} className="container-fluid thuthuatdieutri">
        <Modal.Header>
            <Modal.Title>
                DANH SÁCH NHÓM THỦ THUẬT ĐIỀU TRỊ
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="nhomthuthuat">
                {/* <input placeholder="fwef" autoFocus></input> */}
                {/* <input placeholder="sldkfj"></input> */}
                <Button className="thuthuatbutton" variant="primary" onClick={() => setAddnhomthuthuat(true)}>
                    <i className='bx bx-plus'>THÊM</i>
                </Button>
                <Addnhom show={addnhomthuthuat} onHide={() => setAddnhomthuthuat(false)}/>
                <Button className="thuthuatbutton" variant="primary">
                    SỬA
                </Button>
                <Button className="refreshbutton" variant="primary" onClick={refreshnhomthuthuat}>
                    REFRESH
                </Button>
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
                            {data.map((item) => {
                            const nhomthuthuatId = item._id;
                            return (
                                <tr key={item._id} 
                                onDoubleClick={()=>handleDoubleClick(nhomthuthuatId)} 
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    handleContextMenuNhomThuthuat(e,item);
                                }}
                                >
                                    <td></td>
                                    <td>{item.ten_nhom_thu_thuat}</td>

                                    {clickednhomthuthuat && (
                                        <div className="card" style={{width: "200px", top:points.y + "px", left:points.x + "px",position:"fixed"}}>
                                            <ul className="list-group list-group-flush">
                                                    <Button className="thuthuatbutton list-group-item" onClick={() => deleteNhom(nhomthuthuatId)}  >
                                                        Xóa nhóm thủ thuật
                                                    </Button>
                                            </ul>
                                        </div>
                                    )}

                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="nhomthuthuat">
                <Button className="thuthuatbutton" variant="primary" onClick={()=>setAddthuthuat(true)}>
                    <i class='bx bx-plus'>THÊM</i>
                </Button>
                <Addthuthuat show={addthuthuat} onHide={() => setAddthuthuat(false)} item={thuthuat} />
                <Button className="thuthuatbutton" variant="primary">
                    SỬA
                </Button>
                {/* <Button className="thuthuatbutton" variant="danger" >
                    XÓA
                </Button> */}
                <Button className="refreshbutton" variant="primary" >
                    REFRESH
                </Button>
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
                                onDoubleClick={()=>handleChoosing(item._id)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    handleContextMenuThuthuat(e,item);
                                }}
                                
                                >
                                    <td></td>
                                    <td>{item.ten_thu_thuat}</td>
                                    <td>{item.don_gia}</td>
                                    
                                     {clickedthuthuat && (
                                        <div className="card" style={{width: "200px", top:points.y + "px", left:points.x + "px",position:"fixed"}}>
                                            <ul className="list-group list-group-flush">
                                                    <Button className="thuthuatbutton list-group-item" onClick={() => deleteThuthuat(item._id)}  >
                                                        Xóa thủ thuật
                                                    </Button>
                                            </ul>
                                        </div>
                                    )} 
                                </tr>
                            )) ):null}
                        </tbody>
                    </table>
                </div>
            </div>
            
            
        </Modal.Body>

        <Modal.Footer>
            {/* <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>LƯU</button>  */}
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={propdata.onHide}>ĐÓNG LẠI</button>
        </Modal.Footer>
    </Modal>
)}


export default ProcedureGroup