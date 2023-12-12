import React,{ useEffect, useState }  from "react";
import  Modal  from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Lichhen (props) {
    const {idnumber} = useParams();
    const [detailData, setDetailData] = useState({});
    const [lichhen, setLichhen] = useState("");
    const [notificationType, setNotificationType] = useState('reminder');
    const [sendNoti, setSendNoti] = useState(0);


    const handleSchedule = (item) => {
        const date = new Date(lichhen);
        console.log(idnumber);
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let year = date.getFullYear();

        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`

        let data = JSON.stringify({
            "idnumber": parseInt(item,10),
            "tenbenhnhan": "string",
            "notificationType": {
                [notificationType]: {
                    "sendtime": formattedDate
                }
            },
            "read": "False"
        });
        //console.log(data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/thongbaotheoloai',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios.request(config)
        .then((response) => {
            const dt =response.data;
            console.log(JSON.stringify(dt));
            const reminder = dt.reminder_time;
            //setReminderTime(reminder);
            console.log(reminder);
            Swal.fire({
                title: "Thành công!",
                text: `Đã cài đặt lịch hẹn cho bệnh nhân ${detailData.name} vào thời gian: ${formattedDate}`,
                icon: "success"
            });
            setSendNoti(item);
            props.onLichhenData(reminder);
            //onLichhenData(formattedDate);
            
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=> {
        axios
        .get(`http://127.0.0.1:8000/getAllData/${idnumber}`)
        .then((response) => {
            setDetailData(response.data);
        })
        .catch((error) => {
            console.error('Lỗi tải dữ liệu', error);
        });
    }, [idnumber]);

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <h5>ĐẶT LỊCH HẸN CHO BỆNH NHÂN: {detailData.name}</h5>
            </Modal.Header>
            <Modal.Body>
                <div>Thông tin chi tiết</div>
                <hr/>
                <div className="ngaygio">
                    <label htmlFor="ngaygio" className="form-label">Ngày giờ</label>
                    <input type='datetime-local' 
                    className='form-control' 
                    id='ngaygio' 
                    name='ngaygio'
                    value={lichhen}
                    onChange={(e) => setLichhen(e.target.value)}
                    style={{width:"220px"}}
                    > 
                    </input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className="btn btn-primary" onClick={()=>handleSchedule(idnumber)}>
                    <i class='bx bxs-printer'>&nbsp;LƯU LỊCH HẸN</i>
                </button> 
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>
                    ĐÓNG LẠI
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default Lichhen