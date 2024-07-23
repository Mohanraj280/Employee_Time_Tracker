import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addemp from './addemp';
import './App.css';
import Customer from './Customer';
import Employee from './employee';
import Login from './EmployeeLogin';
import TaskDashBoard from './taskDashboard';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/emp" element={<Employee/>}/>
      <Route path="/addEmployee" element={<Addemp/>}/>
      <Route path='/editEmployee/:id' element={<Addemp/>}/>
      <Route path='/editEmployee/' element={<Addemp/>}/>
      
      <Route path='/task' element={<Customer/>}/>
   
      <Route path="/" element={<Login />} />
      <Route path='/employeeTasks' element={<TaskDashBoard/>}/>
      <Route path='/employeeTasks/:id' element={<TaskDashBoard/>}/>
  
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
