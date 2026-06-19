import { useState } from "react";
import axios from "axios";

import "./RegisterPage.css";
import { useNavigate, Link } from "react-router-dom";
export function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="register-page">
      <h2>Create Account</h2>

      <form onSubmit={register}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  );
}
