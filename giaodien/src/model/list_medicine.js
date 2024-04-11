import axios from "axios";

export class Medicine {
    constructor() {
        this.donthuoc_id = null;
        this.donthuoc = null;
        this.donvi = null;
        this.soluong = null;
        this.huongdan = null;
        this.ngayke = null;
        this.nguoike = null;
    }

    static parse(data) {
        const med = new Medicine();
        med.donthuoc_id = data['donthuoc_id'] || '';
        med.donthuoc = data['donthuoc'] || '';
        med.donvi = data['donvi'] || '';
        med.soluong = data['soluong'] || '';
        med.huongdan = data['huongdan'] || '';
        med.ngayke  = data['ngayke'] || '';
        med.nguoike = data['nguoike'] || '';
        return med
    }

    toObject(){
        return {
            donthuoc_id: this.donthuoc_id,
            donthuoc: this.donthuoc,
            donvi: this.donvi,
            soluong: this.soluong,
            huongdan: this.huongdan,
            ngayke: this.ngayke,
            nguoike: this.nguoike,
        }
    }
}

export const getMedicineData = () => {
    return axios.get(`http://127.0.0.1:8000/donthuoc/getall`)
    .then((response)=>{
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}

export const addMedicineData = (inputData) => {
    let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/donthuoc/add',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    return axios.request(config)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}

export const dropMedicineData = (id) => {
    let data = JSON.stringify(id);
      let config = {
        method: 'delete',
        url: `http://127.0.0.1:8000/donthuoc/delete?id=${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data:data
      };
      
      return axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
      });
};

export const insertData = (inputData, id) => {
    let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
        method: 'post',
        url: `http://127.0.0.1:8000/donthuoc/insertData?idnumber=${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    return axios.request(config)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}



