import './App.css';
import Header from './components/Header';
import PatientInfo from './components/MainUI/PatientInfo';
import Login from './components/Login';
import ChangePassword from './components/ChangePass';
import Treatment from './components/MainUI/Treatment';


import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/ho-so-benh-nhan" element={<PatientInfo/>} />
          {/* <Route path='/doi-mat-khau' element={<ChangePassword/>}></Route> */}
          <Route path='/dieu-tri/:idnumber' element={<Treatment/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
