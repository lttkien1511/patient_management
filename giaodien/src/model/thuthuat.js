import axios from "axios";

export class Procedure {
    constructor() {
        this.procedureGroup = null;
        this.procedure = null;
        this.don_gia = null;
        this.procedureGroup_id = null;
    }

    static parse(data) {
        const proc = new Procedure();
        proc.procedureGroup = data['procedureGroup'] || '';
        proc.procedure = data['procedure'] || '';
        proc.don_gia = data['don_gia'] || '';
        proc.procedureGroup_id = data['procedureGroup_id'] || '';
        return proc
    }

    toObject(){
        return {
            procedureGroup: this.procedureGroup,
            procedure: this.procedure,
            don_gia: this.don_gia,
            procedureGroup_id: this.procedureGroup_id,
        }
    }
}

export const getProcedureGroup = () => {
    return axios.get(`http://127.0.0.1:8000/nhomthuthuat/getall`)
    .then((response)=>{
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
};

export const getProcedure = (id) => {
    return axios.get(`http://127.0.0.1:8000/thuthuat/getall?id=${id}`)
    .then((response)=>{
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
};

export const addProcedureGroup = (inputData) => {
    let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/nhomthuthuat/add',
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

export const addProcedure = (inputData, item) => {
    // const item = props.item;
    let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
        method: 'post',
        url: `http://127.0.0.1:8000/thuthuat/add?id=${item}`,
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


export const deleteProcedureGroup = (id) => {
    return axios.delete(`http://127.0.0.1:8000/nhomthuthuat/delete?id=${id}`)
    .then((response)=>{
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}

export const deleteProcedure = (id) => {
    return axios.delete(`http://127.0.0.1:8000/thuthuat/delete?id=${id}`)
    .then((response)=>{
        return response.data
    })
    .catch((error) => {
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}