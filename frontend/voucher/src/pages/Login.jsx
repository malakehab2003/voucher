import { useState } from "react";
import axios from "axios";
import "./auth.css";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", form);
      alert("Login successful!");
      console.log(res.data);
      // Save token or user info in localStorage if backend returns JWT
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
