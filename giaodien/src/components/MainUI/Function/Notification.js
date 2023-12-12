import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import React, { useState , useEffect} from "react";
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export function count_unread_noti() {
    return axios
        .post(`http://127.0.0.1:8000/count_unread_noti`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        })
}


function Notification ({notificationData}) {
    const [badgeCount, setBadgeCount] = useState(0);
    const [showNoti, setShowNoti] = useState(false);

    const [getNoti, setGetNoti] = useState([]);
    const [animateNotification, setAnimateNotification] = useState(false);


    const renderTooltip = (props) => {
        return (
        <Tooltip id="button-tooltip" {...props}>
            Xóa các thông báo đã đọc
        </Tooltip>
        );
    };

    const deleteNotification = () => {
        axios
        .post(`http://127.0.0.1:8000/deleteNotification`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) =>{
            console.error(error);
        });
        getNotification();
    }

    useEffect(() => {
        count_unread_noti()
        .then((unreadCount) => {
            setBadgeCount(unreadCount);
        })
        .catch((error) => {
            console.error(error);
        })
        ;
        getNotification();
    }, [notificationData]);

    useEffect(() => {
        if (badgeCount > 0) {
            setAnimateNotification(true);
            const timer = setTimeout(() => {
                setAnimateNotification(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    },[badgeCount]);
    

    const mark_noti_as_read = (notiid) => {
        axios
        .post(`http://127.0.0.1:8000/mark_noti_as_read?noti_id=${notiid}`)
        .then((response) => {

            const updatedNoti = getNoti.map(item => {
                if (item._id === notiid) {
                    return { ...item, read: true };
                }
                return item;
            });
            setGetNoti(updatedNoti);

            count_unread_noti()
            .then((unreadCount) => {
                setBadgeCount(unreadCount);
            })
            .catch((error) => {
                console.error(error);
            });
            
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const getNotification = () => {
        axios
        .get(`http://127.0.0.1:8000/getNotification`)
        .then((response) => {
            setGetNoti(response.data);
            setShowNoti(true);
        })
        .catch((error) => {
            console.error('Lỗi load thông báo: ', error);
        })
    };

    

    return (
        <Dropdown className="Notification" >
            <style>{`
                .Notification .dropdown-menu{
                    left: auto !important;
                    right: 0px !important;
                }
            `}</style>
            <Dropdown.Toggle style={{backgroundColor:"transparent", border:"None"}}>
                <i className= {`bx bxs-bell${animateNotification ? ' bx-tada' : ''}`} style={{fontSize:"25px", color:"black"}}></i>
                {badgeCount > 0 &&
                <Badge className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger" bg="danger">
                    {badgeCount}
                </Badge>
                }
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
                <Dropdown.Header>
                    <h4 style={{color:"black"}}>Thông báo</h4>
                    <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 300 }}
                    overlay={renderTooltip}
                    >
                        <Button style={{backgroundColor:"transparent", border:"None"}}
                        onClick={deleteNotification}
                        >
                            <i class='bx bxs-trash' style={{fontSize:"25px", color:"black"}}></i>
                        </Button>
                    </OverlayTrigger>
                </Dropdown.Header>
                <div className="content">
                {getNoti.map((item) => (
                    <Dropdown.Item key={item._id}
                        onClick={() => mark_noti_as_read(item._id)}
                        style={{ backgroundColor: item.read ? '' : 'lightblue' }}
                    >
                        Bệnh nhân {item.tenbenhnhan} đã đến
                        <br />
                        {item.sendtime}
                    </Dropdown.Item>
                    ))}              
                </div>     
            </Dropdown.Menu>
            
        </Dropdown>
    )
}

export default Notification