import React, { useState } from "react";
import Calendar from "react-calendar";
import Modal from 'react-bootstrap/Modal';
import 'react-calendar/dist/Calendar.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";

function AppointmentList (props) {
    const [date,setDate] = useState([]);
    
    const lichhentheongay = (item) => {
        let day = item.getDate();
        day = day < 10 ? "0" + day : day;
        let month = item.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let year = item.getFullYear();

        const formattedDate = `${day}/${month}/${year}`
        let data = JSON.stringify({
            "condition": {
                "sendtime": {
                    "logic": "=",
                    "value": formattedDate
                }
        }
        });
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/lichhentheongay',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            setDate(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Modal {...props} className="appointmentlist">
            <Modal.Header>
                <Modal.Title>
                    Danh sách lịch hẹn     
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="lich">
                    <Calendar 
                    calendarType="gregory"
                    value={date}
                    onChange={(newDate) => {
                        //setDate(newDate);
                        lichhentheongay(newDate);
                        console.log(newDate);
                    }}
                    />
                </div>
                <div className="lich">
                    <Table>
                        <thead>
                            <tr>
                                <td>Tên bệnh nhân</td>
                                <td>Ngày và giờ hẹn</td>
                            </tr>
                        </thead>

                        <tbody>
                            {date.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.tenbenhnhan}</td>
                                        <td>{item.sendtime}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AppointmentList