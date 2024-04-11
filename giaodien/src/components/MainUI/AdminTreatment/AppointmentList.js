import React, { useState } from "react";
import Calendar from "react-calendar";
import Modal from 'react-bootstrap/Modal';
import 'react-calendar/dist/Calendar.css';
import {DateTime, getAppointmentData } from "../../../model/date_and_time";
import moment from "moment";
import { GenericTable } from "../../../helper/table";

function AppointmentList (props) {
    const [date,setDate] = useState([]);

    const headers = ["Tên bệnh nhân" , "Ngày và giờ hẹn"]
    const tableData = date.map(item => ([
        item.name,
        item.appointment_date,
    ]))

    const lichhentheongay = (item) => {
        let day = moment(item).format("DD/MM/YYYY");
        getAppointmentData(
            {
                "value": day
            }
        ).then((response) => {
            if (response) {
                console.log(JSON.stringify(response.data));
                setDate(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Error', error)
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
                    onChange={lichhentheongay}
                    />
                </div>
                <div className="lich">
                    <GenericTable
                        headers={headers}
                        data={tableData}
                    />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AppointmentList