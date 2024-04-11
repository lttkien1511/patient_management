import React, { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import { Procedure, addProcedure } from "../../../../model/thuthuat";
import GenericForm from "../../../../helper/form";

function Addthuthuat(props) {

    const [formData, setFormData] = useState({
        procedure: "",
        don_gia: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = props.item;
        const data = new Procedure();
        data.procedure = formData.procedure;
        data.don_gia = formData.don_gia;
        addProcedure(data.toObject(), item).then((response) => {
            if(response){
                console.log(JSON.stringify(response.data));
                window.makeAlert('success', 'Thêm thủ thuật mới thành công');
            }
        })
    };

    const fields = [
        {id:'procedure', label:'Nhập thủ thuật mới', type:'text', name:'procedure', placeholder:'', className:"custom-input name-input"},
        {id:'don_gia', label:'Nhập đơn giá', type:'text', name:'don_gia', placeholder:'', className:"custom-input name-input"},
    ]

    return (
        <Modal {...props} className="addthuthuat">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm thủ thuật mới
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <GenericForm
                    fields={fields}
                    formData={formData}
                    setFormData={setFormData}
                />
            </Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>THÊM</button>

            </Modal.Footer>
        </Modal>
    )
};

export default Addthuthuat