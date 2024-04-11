import axios from "axios";

export class DateTime {
  constructor() {
      this.sendtime = null;
      this.idnumber = null;
      this.name = null;
      this.read = null;
      this.notificationType = null;
      this.note = null;
      this.appointment_date = null;
      this.before_reminder = null;
  }

  static parse(data) {
      const dat = new DateTime();
      dat.sendtime = data['sendtime'] || '';
      dat.idnumber = data['idnumber'] || '';
      dat.name = data['name'] || '';
      dat.read = data['read'] || '';
      dat.notificationType = data['notificationType'] || '';
      dat.note = data['note'] || '';
      dat.appointment_date = data['appointment_date'] || '';
      dat.before_reminder = data['before_reminder'] || '';
      return dat
  }

  toObject(){
      return {
          sendtime: this.sendtime,
          idnumber: this.idnumber,
          name: this.name,
          read: this.read,
          notificationType: this.notificationType,
          note: this.note,
          appointment_date: this.appointment_date,
          before_reminder: this.before_reminder
      }
  }
}

export const getAppointmentData = (condition={}) => {
    let data = JSON.stringify({
      condition: condition
    });
    let config ={
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/reminder/reminder_list',
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

export const addReminder = (inputData, id) => {
  let data = JSON.stringify(inputData);
    console.log(data);
    let config = {
      method: 'post',
      url: `http://127.0.0.1:8000/reminder/add?id=${id}`,
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
