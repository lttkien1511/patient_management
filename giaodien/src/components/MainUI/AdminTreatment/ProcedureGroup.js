import React, { useState, useEffect} from "react";
import  Modal  from 'react-bootstrap/Modal';
//import "./thuthuat.css";
//import "../TreatmentFunction/thuthuat.css";
import Button from "react-bootstrap/esm/Button";
import Addnhom from "../TreatmentFunction/Nhomthuthuat/Addnhom";
import Addthuthuat from "../TreatmentFunction/Nhomthuthuat/Addthuthuat";
import { getProcedureGroup , getProcedure ,deleteProcedureGroup ,deleteProcedure } from "../../../model/thuthuat";


function ProcedureGroup (propdata) {
    
    const [data, setData] = useState([]);
    
    const [thuthuatdata, setThuthuatdata] = useState([]);
    const [thuthuatchosen, setThuthuatchosen] = useState([]);
    
    const [thuthuatid, setThuthuatid] = useState("");
    const [nhomthuthuat, setNhomthuthuat] = useState("");

    const onShow = () => {
        handleRefresh();
    }

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
        setClickednhomthuthuat(item._id);
        setPoints({ x: e.pageX, y: e.pageY });
        console.log('Right Click', e.pageX, e.pageY);
        console.log('Item info:', item);
      };

    const handleContextMenuThuthuat = (e, item) => {
        e.preventDefault();
        setClickthuthuat(item._id);
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

    const handleDeleteGroup = (id) => {
        deleteProcedureGroup(id).then((response) => {
            if (response) {
                console.log(response.data);
                window.makeAlert("success","Xóa nhóm thủ thuật thành công")
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error);
        })
    }

    const handleDelete = (id) => {
        deleteProcedure(id).then((response) => {
            if (response) {
                console.log(response.data);
                window.makeAlert("success","Xóa thủ thuật thành công")
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error);
        })
    }

    const handleRefresh = () => {
        getProcedureGroup().then((response) => {
            if (response) {
                console.log(response.data);
                setData(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error);
        })
    }

    const handleGetThuThuat = (id) => {
        getProcedure(id).then((response) => {
            if (response) {
                console.log(response.data);
                setThuthuatdata(response.data[0]);
                setThuthuat(id);
                setNhomthuthuat(response.data[1]);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error);
        })
    }
   
    // const handleChoosing = (chosenitem) => {
    //     console.log(chosenitem);
    //     axios
    //     .get(`http://127.0.0.1:8000/thuthuat/chosenData?id=${chosenitem}`)
    //     .then((response) => {
    //         console.log(response.data);
    //         setThuthuatchosen(response.data.data);
    //         setThuthuatid(chosenitem);
            
    //     })
    //     .catch((error) => {
    //         console.error('Chosen error:', error);
    //     })
    // }


    return (
    <Modal {...propdata} className="container-fluid thuthuatdieutri" onShow={() => {
        onShow()
    }}>
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
                <Addnhom show={addnhomthuthuat} onHide={() => setAddnhomthuthuat(false)} refreshNhom={handleRefresh}/>
                <Button className="thuthuatbutton" variant="primary">
                    SỬA
                </Button>
                <Button className="refreshbutton" variant="primary" onClick={handleRefresh}>
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
                                style={{cursor:"pointer"}}
                                onClick={()=>handleGetThuThuat(nhomthuthuatId)} 
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    handleContextMenuNhomThuthuat(e,item);
                                }}
                                >
                                    <td></td>
                                    <td>{item.procedureGroup}</td>

                                    {clickednhomthuthuat == item._id && (
                                        <div className="card" style={{width: "200px", top:points.y + "px", left:points.x + "px",position:"fixed"}}>
                                            <ul className="list-group list-group-flush">
                                                    <Button className="thuthuatbutton list-group-item" onClick={() => handleDeleteGroup(nhomthuthuatId)}  >
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
                <Button className="refreshbutton" variant="primary" >
                    REFRESH
                </Button>
                <div className="table-wrapper">
                    <table className="table table-bordered table-responsive-lg" style={{ overflowY:"auto"}}>
                        <thead>
                            <tr>
                                <th colSpan="3">THỦ THUẬT CỦA NHÓM: {nhomthuthuat}</th>
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
                                style={{cursor:"pointer"}}
                                // onClick={()=>handleChoosing(item._id)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    handleContextMenuThuthuat(e,item);
                                }}
                                
                                >
                                    <td></td>
                                    <td>{item.procedure}</td>
                                    <td>{item.don_gia}</td>
                                    
                                     {clickedthuthuat == item._id && (
                                        <div className="card" style={{width: "200px", top:points.y + "px", left:points.x + "px",position:"fixed"}}>
                                            <ul className="list-group list-group-flush">
                                                    <Button className="thuthuatbutton list-group-item" onClick={() => handleDelete(item._id)}  >
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