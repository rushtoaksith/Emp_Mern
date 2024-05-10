import './App.css';
import {Routes,Route} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import ListEmp from "./components/ListEmp";
import EditEmp from './components/EditEmp';
import Home from './components/Home';
import CreateEmp from './components/CreateEmp';

function App() {
  return (
    <div>
      <div className='m-2'>
        Logo
      </div>

 
   <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/listemp" element={<ListEmp />}/>
        <Route path="/editemp" element={<EditEmp />}/>
        <Route path="/createemp" element={<CreateEmp />}/>
        <Route path="/home" element={<Home />}/>


   </Routes>
   </div>
  );
}

export default App;
