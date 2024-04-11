import React from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function MedicineInfo ({datadonthuoc}) {
    return (
        <Dropdown className="MedicineInfo">
            <style>
                {
                    `.MedicineInfo .dropdown-menu {
                        left:auto !important;
                        right:0px !important;
                    }`
                }
            </style>
            <Dropdown.Toggle>
                Đơn thuốc chi tiết
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <table className="table-borderless table-striped" 
                
                >
                    <thead>
                        <tr>
                            <td 
                            
                            >Tên thuốc</td>
                            <td 
                            
                            >Đơn vị</td>
                            <td 
                            
                            >Hướng dẫn</td>    
                        </tr>
                    </thead>
                    <tbody>
                        {datadonthuoc.map((item) => {
                            return (
                                <tr key = {item._id}>
                                    <td>{item.donthuoc}</td>
                                    <td>{item.donvi}</td>
                                    <td>{item.huongdan}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MedicineInfo