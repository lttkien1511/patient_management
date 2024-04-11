import React, { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import { Medicine, addMedicineData } from "../../../../model/list_medicine";
import GenericForm from "../../../../helper/form";

function Adddonthuoc (props) {

    const [formData, setFormData] = useState({
        donthuoc: '',
        donvi: ''
    });

    const handleSubmit = () => {
        const data = new Medicine();
        data.donthuoc = formData.donthuoc;
        data.donvi = formData.donvi;
        addMedicineData(data.toObject()).then((response) => {
            if (response){
                console.log(JSON.stringify(response.data));
                window.makeAlert('success', 'Thêm thuốc mới thành công');
                props.refreshDT();
            }
        })
        .catch((error) => {
            window.makeAlert('error', 'Error', error)
        })
    }

    const fields = [
        {id:'donthuoc', label:'Tên thuốc', type:'text', name:'donthuoc', placeholder:'Nhập thuốc mới', className:"custom-input name-input"},
        {id:'donvi', label:'Đơn vị', type:'text', name:'donvi', placeholder:'Nhập đơn vị (viên, mg, v.v.)', className:"custom-input"},
    ]

    return (
        <Modal {...props} className="adddonthuoc">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm đơn thuốc mới
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <GenericForm
                fields={fields}
                formData={formData}
                setFormData={setFormData}
                >
                </GenericForm>            
            </Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>THÊM</button>
            </Modal.Footer>
        </Modal>
    )
};
export default Adddonthuoc