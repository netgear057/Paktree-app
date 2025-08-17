import { useState } from "react";
import axios from "axios";
import {API} from '../config/apiCongig'
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/forgot-password`, { email });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
export default ForgotPassword;
