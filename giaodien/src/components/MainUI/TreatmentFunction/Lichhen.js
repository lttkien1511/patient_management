import React,{  useState }  from "react";
import  Modal  from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from "moment";
import { DateTime, addReminder } from "../../../model/date_and_time";
import GenericForm from "../../../helper/form";

function Lichhen (props) {
    const {idnumber} = useParams();
    // const [detailData, setDetailData] = useState([]);
    // const [lichhen, setLichhen] = useState("");
    // const [notificationType, setNotificationType] = useState('reminder');
    // const [sendNoti, setSendNoti] = useState(0);
    // const [note, setNote] = useState("");
    // const [beforereminder, setBeforereminder] = useState(0);

    const onShow = () => {
        // getAllData()
    };

    const [formData, setFormData] = useState({
        appointment_date: '',
        before_reminder: '',
        note: '',
        name: ''
    })

    const handleSchedule = () => {
        const data = new DateTime();
        data.appointment_date = moment(formData.appointment_date).format('DD/MM/YYYY HH:MM:SS');
        data.before_reminder = formData.before_reminder;
        data.note = formData.note;
        data.name = formData.name;
        addReminder(data.toObject(), idnumber).then((response) => {
            if(response) {
                console.log(JSON.stringify(response.data));
                // console.log(data.name);
                // console.log(formData.name);
                // console.log(data.appointment_date);
                window.makeAlert('success', `Đã cài đặt lịch hẹn cho bệnh nhân vào thời gian: ${data.appointment_date}`);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const fields = [
        {id:'appointment_date', label:'Ngày giờ', type:'datetime-local', name:'appointment_date', placeholder:'', className:"custom-input name-input"},
        {id:'before_reminder', label:'Thời gian nhắc trước lịch hẹn', type:'text', name:'before_reminder', placeholder:'', className:"custom-input name-input"},
        {id:'note', label:'Ghi chú', type:'text', name:'note', placeholder:'', className:"custom-input name-input"},

    ]

    // const handleSchedule = (item) => {
    //     const date = new Date(lichhen);
    //     console.log(idnumber);
    //     let day = date.getDate();
    //     day = day < 10 ? "0" + day : day;
    //     let month = date.getMonth() + 1;
    //     month = month < 10 ? "0" + month : month;
    //     let year = date.getFullYear();

    //     let hour = date.getHours();
    //     let minute = date.getMinutes();
    //     let second = date.getSeconds();

    //     const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`

    //     let data = JSON.stringify({
    //         "idnumber": parseInt(item,10),
    //         "tenbenhnhan": "string",
    //         "notificationType": {
    //             [notificationType]: {
    //                 "sendtime": formattedDate
    //             }
    //         },
    //         "note": note,
    //         "before_reminder": parseInt(beforereminder,10),
    //         "read": "False"
    //     });
    //     //console.log(data);
    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: 'http://127.0.0.1:8000/thongbaolichhen',
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         data : data
    //     };
    //     axios.request(config)
    //     .then((response) => {
    //         const dt =response.data;
    //         console.log(JSON.stringify(dt));
    //         const reminder = dt.reminder_time;
    //         console.log(reminder);
    //         Swal.fire({
    //             title: "Thành công!",
    //             text: `Đã cài đặt lịch hẹn cho bệnh nhân ${detailData.name} vào thời gian: ${formattedDate}`,
    //             icon: "success"
    //         });
    //         setSendNoti(item);
            
    //         props.onLichhenData(reminder);
            
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }


    return (
        <Modal {...props} onShow={()=> {
            onShow()
        }}>
            <Modal.Header closeButton>
                <h5>ĐẶT LỊCH HẸN CHO BỆNH NHÂN: </h5>
            </Modal.Header>
            <Modal.Body>
                <GenericForm
                    fields={fields}
                    formData={formData}
                    setFormData={setFormData}
                />
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className="btn btn-primary" 
                onClick={handleSchedule}
                >
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