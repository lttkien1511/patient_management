import React, {useState} from 'react';
import  Modal  from 'react-bootstrap/Modal';
import './info.css';

import GenericForm from '../../../helper/form';
import { addData, Patient } from '../../../model/patient';
import Button from "react-bootstrap/esm/Button";


function Add(props) {

    const [formData, setFormData] = useState({
        name: '', 
        medical_history: [],
        gender: '',
        age: '',
        telephone: '',
        address: '',
        reason: '',
        email: '',
        birthday: '',
        inputdate: '',
    });

    const handleSubmit = () => {
        const data = new Patient();
        data.name = formData.name;
        data.age = formData.age;
        data.gender = formData.gender;
        data.telephone = formData.telephone;
        data.address = formData.address;
        data.reason = formData.reason;
        data.email = formData.email;
        data.birthday = formData.birthday;
        data.inputdate = formData.inputdate;
        data.medical_history = formData.medical_history;
        addData(data.toObject()).then((response) => {
            if(response){
                console.log(JSON.stringify(response.data));
                window.makeAlert('success', 'Thêm bệnh nhân thành công');
            }
        })
    }

    const fields = [
        {id:'name', label:'HỌ VÀ TÊN', type:'text', name:'name', placeholder:'Nhập họ và tên', className:"custom-input name-input"},
        {id:'age', label:'TUỔI', type:'number', name:'age', placeholder:'Nhập tuổi', className:"custom-input"},
        {id:'birthday', label:'NGÀY THÁNG NĂM SINH', type:'date', name:'birthday', placeholder:'Nhập ngày tháng năm sinh', className:"custom-input"},
        {id:'gender', label:'GIỚI TÍNH', type:'select', name:'gender', options:[
            {label: 'Nam', value:'Nam'},
            {label: 'Nữ', value:'Nữ'},
            {label: 'Khác', value:'Khác'}
        ]},
        {id:'telephone', label:'SỐ ĐIỆN THOẠI', type:'tel', name:'telephone', placeholder:'Nhập số điện thoại', className:"custom-input"},
        {id:'address', label:'ĐỊA CHỈ', type:'text', name:'address', placeholder:'Nhập địa chỉ', className:'custom-input'},
        {id:'email', label:'EMAIL', type:'email', name:'email', placeholder:'Nhập email', className:'custom-input'},
        {id:'reason', label:'LÝ DO KHÁM', type:'text', name:'reason', placeholder:'Nhập lý do khám', className:'custom-input'},
        {id:'medical_history', label:'TIỀN SỬ BỆNH', type:'checkbox', name:'medical_history', options:[
            {label: 'Chảy máu lâu', value:'Chảy máu lâu'},
            {label: 'Dị ứng thuốc', value:'Dị ứng thuốc'},
            {label: 'Thấp khớp', value:'Thấp khớp'},
            {label: 'Huyết áp', value:'Huyết áp'},
            {label: 'Tim mạch', value:'Tim mạch'},
            {label: 'Tiểu đường', value:'Tiểu đường'},
            {label: 'Dạ dày', value:'Dạ dày'},
            {label: 'Phổi', value:'Phổi'},
            {label: 'Truyền nhiễm', value:'Truyền nhiễm'},
            {label: 'Thai sản', value:'Thai sản'}
        ]},
    ]
    
    return (
        <Modal {...props} className='addmodal' >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    THÔNG TIN BỆNH NHÂN
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <GenericForm fields={fields} 
                formData={formData}
                setFormData={setFormData}
                ></GenericForm>              
            </Modal.Body>

            <Modal.Footer>
                <Button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onHide}>ĐÓNG LẠI</Button>
                <Button  className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>THÊM</Button> 
            </Modal.Footer>
        </Modal>
        
    )
}

export default Add
