import Button from "react-bootstrap/esm/Button";
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Swal from "sweetalert2";
import Adddonthuoc from "../TreatmentFunction/Nhomthuthuat/Adddonthuoc";

function Medicine (props) {
    const [adddonthuoc, setAdddonthuoc] = useState(false);
    const [data, setData] = useState([]);


    const [clickeddonthuoc, setClickeddonthuoc] = useState(false);
    const [selecteditem, setSelecteditem] = useState(null);
    const [points, setPoints] = useState({
        x:0,
        y:0,
    })

    const handleContextMenuDonthuoc = (e, item) => {
        e.preventDefault();
        setClickeddonthuoc(true);
        setSelecteditem(item);
        //console.log(selecteditem);
        setPoints({x:e.pageX, y:e.pageY});
        console.log('Right click', e.pageX, e.pageY);
        console.log('Item info:', item);
    }

    useEffect(()=>{
        const handleClick = () => setClickeddonthuoc(false);
        window.addEventListener("click",handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/danhsachtoanbodonthuoc`)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Lỗi khi tải dữ liệu chi tiết: ',error);
        })
    },[]);

    const refreshdonthuoc = () => {
        axios
        .get(`http://127.0.0.1:8000/danhsachtoanbodonthuoc`)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Refresh error', error);
        })
    }


    const deleteDonthuoc = () => {
        if (selecteditem) {
            const donthuocId = selecteditem._id;
            console.log(donthuocId);
            axios
            .delete(`http://127.0.0.1:8000/xoadonthuoc?id=${donthuocId}`)
            .then((response)=> {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Đơn thuốc đã được xóa',
                    showConfirmButton:false,
                    timer:2000
                });
                refreshdonthuoc();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
    
    <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>
                Danh mục đơn thuốc
            </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            <div className="donthuoc">
                <Button className="thuthuatbutton" variant="primary" onClick={()=>setAdddonthuoc(true)}>
                    <i className='bx bx-plus'>THÊM</i>
                </Button>
                <Adddonthuoc show={adddonthuoc} onHide={()=>setAdddonthuoc(false)} refreshDT={refreshdonthuoc}/>


                <Button className="thuthuatbutton" variant="primary">
                    SỬA
                </Button>
                <Button className="refreshbutton" variant="primary" onClick={refreshdonthuoc}>
                    REFRESH
                </Button>
            


                <div className="table-wrapper">
                    <table className="table table-bordered table-responsive-lg"
                    style={{ overflowY: "auto", maxHeight: "300px"}}
                    >
                        <thead>
                            <tr>
                                <th colSpan="2">Danh sách đơn thuốc</th>
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
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        handleContextMenuDonthuoc(e,item);
                                    }}
                                    >
                                        <td>{item.donthuoc}</td>
                                        <td>{item.donvi}</td>
                                        {selecteditem && selecteditem._id === item._id && (
                                        <div className="card" style={{width: "200px", top:points.y + "px", left:points.x + "px",position:"fixed"}}>
                                            <ul className="list-group list-group-flush">
                                                <Button className="thuthuatbutton list-group-item" onClick={deleteDonthuoc}>
                                                    Xóa đơn thuốc
                                                </Button>
                                            </ul>
                                        </div>
                        )}
                                    </tr>
                                )
                            })}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </Modal.Body>
    </Modal>

    )
}

export default Medicine