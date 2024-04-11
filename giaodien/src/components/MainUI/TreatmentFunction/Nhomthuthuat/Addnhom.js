import React, { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import { Procedure, addProcedureGroup } from "../../../../model/thuthuat";
import GenericForm from "../../../../helper/form";

function Addnhom(props) {
    
    const [formData, setFormData] = useState({
        procedureGroup: ""
    });

    const handleSubmit = () => {
        const data = new Procedure();
        data.procedureGroup = formData.procedureGroup;
        addProcedureGroup(data.toObject()).then((response) => {
            if(response){
                console.log(JSON.stringify(response.data));
                window.makeAlert('success', 'Thêm nhóm thủ thuật thành công');
                props.refreshNhom();
            }
        })
    };

    const fields = [
        {id:'procedureGroup', label:'Nhập nhóm thủ thuật mới', type:'text', name:'procedureGroup', placeholder:'', className:"custom-input name-input"},
    ]
    
    return (
        <Modal {...props} className="addnhomthuthuat">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm nhóm thủ thuật mới
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

export default Addnhom