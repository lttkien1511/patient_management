import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";

export function count_unread_reminder() {
    return axios
        .post(`http://127.0.0.1:8000/count_unread_reminder`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        })
}




function AppointmentNoti ({reminder}) {

    const [appointment, setAppointment] = useState([]);
    const [badgeCount, setBadgeCount] = useState(0);
    const [showNoti, setShowNoti] = useState(false);
    
    const renderTooltip = (props) => {
        return (
        <Tooltip id="button-tooltip" {...props}>
            Xóa các thông báo đã đọc
        </Tooltip>
        );
    };
    
    useEffect(()=> {
        getAllAppointment();
    },[reminder]);


    const delete_read_reminder = () => {
        axios
        .post(`http://127.0.0.1:8000/delete_reminder`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) =>{
            console.error(error);
        });
        getAllAppointment();
        console.log(reminder);
    }

    const getAllAppointment = () => {
        axios
        .get(`http://127.0.0.1:8000/danhsachlichhen`)
        .then((response) => {
            setAppointment(response.data);
            setShowNoti(true);
        })
        .catch((error) => {
            console.error(error);
        })
    };

    const mark_reminder_as_read = (notiid) => {
        axios
        .post(`http://127.0.0.1:8000/mark_reminder_as_read?noti_id=${notiid}`)
        .then((response) => {
            const updatedReminder = appointment.map(item => {
                if (item._id === notiid) {
                    return {...item, read: true};
                }
                return item;
            });
            setAppointment(updatedReminder);
            count_unread_reminder()
            .then((unreadCount) => {
                setBadgeCount(unreadCount);
            })
            .catch((error) => {
                console.error(error);
            })
            ;
            console.log(reminder);
        })
        .catch((error) => {
            console.error(error);
        })
    }



    return (
        <Dropdown className="AppointmentNoti">
            <style>{`
                .AppointmentNoti .dropdown-menu{
                    left: auto !important;
                    right: 0px !important;
                }
            `}</style>
            <Dropdown.Toggle style={{backgroundColor:"transparent", border:"None"}}>
                <i class='bx bxs-calendar' style={{fontSize:"25px", color:"black"}}></i>
                {badgeCount > 0 &&
                <Badge className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger" bg="danger">
                    {badgeCount}
                </Badge>
                }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header>
                    <h4 style={{color:"black"}}>Lịch hẹn bệnh nhân</h4>
                    <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 300 }}
                    overlay={renderTooltip}
                    >
                        <Button style={{backgroundColor:"transparent", border:"None"}}
                        onClick={delete_read_reminder}
                        >
                            <i class='bx bxs-trash' style={{fontSize:"25px", color:"black"}}></i>
                        </Button>
                    </OverlayTrigger>
                </Dropdown.Header>
                <div className="content">
                {appointment.map((item) => (
                    <Dropdown.Item key={item._id}
                    onClick={() => mark_reminder_as_read(item._id)}
                    style={{ backgroundColor: item.read ? '' : 'lightblue' }}
                    >
                        Sắp đến lịch hẹn của bệnh nhân {item.tenbenhnhan} vào lúc {item.sendtime}
                    </Dropdown.Item>   
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AppointmentNoti