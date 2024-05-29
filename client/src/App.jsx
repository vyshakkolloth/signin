
import './App.css'
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup'; 
import Landing from './pages/landing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 



  return (
    <> <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light" />
   <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Login />} />
       <Route path="/signup/*" element={<Signup />} />
       <Route path="/landing/" element={<Landing />} />
       
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
