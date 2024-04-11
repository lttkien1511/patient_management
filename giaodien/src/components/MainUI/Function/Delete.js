import Swal from 'sweetalert2';
import { drop } from "../../../model/patient";

function Delete(props) {

    const handleDelete = () => {
        drop(props.idnumber).then((response) => {
            if(response) {
                window.makeAlert('success', 'Xóa bệnh nhân thành công', '', 2000);
            }
        })
        .catch((error) => {
            console.log(error);
            window.makeAlert('error', 'Thất bại',error,'')
    })   
    }

    const handleConfirmDelete = () => {
        Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn xóa dữ liệu bệnh nhân?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete();
            }
        });
    }

    return handleConfirmDelete()
    
}

export default Delete