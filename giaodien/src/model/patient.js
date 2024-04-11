import axios from "axios";

export class Patient {
  constructor() {
    this.name = null;
    this.age = null;
    this.gender = null;
    this.telephone = null;
    this.address = null;
    this.reason = null;
    this.email = null;
    this.birthday = null;
    this.inputdate = null;
    // this.idnumber = null;
    this.medical_history = [];
  }

  static parse(data){
      const pt = new Patient();
      pt.name = data['name'] || '';
      pt.age = data['age'] || '';
      pt.gender = data['gender'] || '';
      pt.telephone = data['telephone'] || '';
      pt.address = data['address'] || '';
      pt.reason = data['reason'] || '';
      pt.email = data['email'] || '';
      pt.birthday = data['birthday'] || '';
      pt.inputdate = data['inputdate'] || '';
      pt.medical_history = data['medical_history'] || [];
      // pt.idnumber = data['idnumber'] ;
      return pt
  }

  toObject(){
      return {
          name: this.name,
          age: this.age,
          gender: this.gender,
          telephone: this.telephone,
          address: this.address,
          reason: this.reason,
          email: this.email,
          birthday: this.birthday,
          inputdate: this.inputdate,
          medical_history: this.medical_history,
          idnumber: this.idnumber,
      }
  }

}

export const getAllData = (page, limit) => {
    return axios.get(`http://127.0.0.1:8000/patient/getall?page=${page}&limit=${limit}`)
    .then((response)=>{
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}

export const filter = (page, limit, filter_type='and', condition={}, sort_field=null, sort_direct=null) => {
    let data = JSON.stringify({
        page,
        limit,
        filter_type: filter_type,
        condition: condition,
        sort_field: sort_field,
        sort_direct: sort_direct,
      });
      let config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/patient/filter/',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      return axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
      });
}

export const sendNotification = (item, name='', notificationType= {}, read = "") => {
  let data = JSON.stringify({
    "idnumber": item,
    "tenbenhnhan": name,
    "notificationType": notificationType,
    "read":read
  });
  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/notification/sendNotification',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : data
  };
  return axios.request(config)
  .then((response) => {
      return response.data;
  })
  .catch((error) => {
      console.log(error);
  });
}


export const addData = (inputData ) => {
    let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/patient/add',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    return axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      window.makeAlert('error', 'Error', error)
    });
}




// export const update = (idnumber, inputdata) => {
//     /**
//      * input: data: {
//         "name": "string",
//         "age": "string",
//         "gender": "string",
//         "telephone": "string",
//         "address": "string",
//         "reason": "string",
//         "email": "string",
//         "birthday": "string",
//         "inputdate": "string",
//         "medical_history": [
//             "string"
//         ],
//         "idnumber": 0
//     }
//      */
//     let data = JSON.stringify(data);
      
//       let config = {
//         method: 'patch',
//         url: 'http://127.0.0.1:8000/patient/update/',
//         headers: { 
//           'Content-Type': 'application/json'
//         },
//         params: {idnumber: idnumber},
//         data : data
//       };
      
//       return axios.request(config)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         console.log(error);
//         window.makeAlert('error', 'Error', error)
//       });
// }


export const drop = (idnumber) => {
    
    let data = JSON.stringify(idnumber);
      
      let config = {
        method: 'delete',
        url: `http://127.0.0.1:8000/patient/delete?idnumber=${idnumber}`,
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
}


export const detail = (idnumber) => {
      return axios.get(`http://127.0.0.1:8000/patient/getDetailData?idnumber=${idnumber}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
      });
}
















