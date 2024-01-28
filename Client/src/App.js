import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";
import Register from "./components/admin/Register"
import { Navigate } from "react-router-dom";
import Table from "./Pages/Table"
import Cards from "./Pages/Cards";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Admin from "./Pages/Admin";
import Record from "./components/admin/Record";
import Query from "./components/admin/query";
import Student from "./components/admin/student";
import Courses from "./components/admin/courses";
import About from "./Pages/About";
function App() {
  const user = localStorage.getItem("token");
  const owner = localStorage.getItem("Admin");
  return (
    <Router>
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register-faculty" element={<Register />} />
          {user ? <Route path="/attendance-data" element={<Table />} /> : <Route path="/attendance-data" element={<Navigate replace to="/" />} />}
          {user && <Route path="/cards" element={<Cards />} />}
          <Route path="/update-Courses" element={<Courses />} />
          <Route path="/attendance-data" element={<Navigate replace to="/" />} />
          <Route path="/cards" element={<Navigate replace to="/" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/Record" element={<Record />} />
          <Route path="/Handling" element={<Query />} />
          <Route path="/update-student" element={<Student />} />
          {owner ? <Route path="/Admin" element={<Admin />} /> : <Route path="/Admin" element={<Navigate replace to="/" />} />}
          <Route path={"*" || "/*"} element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
