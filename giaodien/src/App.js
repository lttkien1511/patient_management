import './App.css';
// import PatientInfo from './components/MainUI/PatientInfo';
import PatientInfo from './pages/PatientInfo.js';
import Login from './components/Login';
// import ChangePassword from './components/ChangePass';
// import Treatment from './components/MainUI/Treatment';
import Treatment from './pages/Treatment.js';
import './helper/default.js';

import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/ho-so-benh-nhan" element={<PatientInfo/>} />
          <Route path='/ho-so-benh-nhan/:idnumber' element={<Treatment/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
