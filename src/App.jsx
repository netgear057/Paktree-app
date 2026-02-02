
import AppRoutes from "./routes/AppRoutes"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "./services/apiServices";
function App() {

   const dispatch =useDispatch()
useEffect(() => {
  dispatch(restoreSession());
}, []);
  return (
    <>
    
<AppRoutes />

 <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
    </>
  )
}

export default App
