import './App.css'
import { Routes, Route } from "react-router-dom";
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './RegisterPage';
import axios from 'axios';


axios.defaults.baseURL = "http://localhost:4000";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
     
      </Route>
    </Routes>


  )
}

export default App
