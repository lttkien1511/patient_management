import axios from "axios";

export const addTreatment = (inputData, item) => {
    let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
        method: 'post',
        url: `http://127.0.0.1:8000/treatmentDetail/insertData?idnumber=${item}`,
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

export const filterDate = (filter_type = 'and' , condition = {}) => {
    let data = JSON.stringify({
        filter_type: filter_type,
        condition: condition,

    });
    let config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/treatmentDetail/filter',
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

export const getDate = (idnumber) => {
  return axios.get(`http://127.0.0.1:8000/treatmentDetail/ngaykham?idnumber=${idnumber}`)
  .then((response) => {
    return response.data
  })
  .catch((error) => {
      console.log(error);
      window.makeAlert('error', 'Error', error)
  })
}