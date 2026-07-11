import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("register/", formData);

            alert("Registration Successful!");

            navigate("/");
        } catch (error) {
     console.log(error.response.data);

    alert(error.response.data.username?.[0] || JSON.stringify(error.response.data));
}
    };

    return (
      <div className="register-container">
        <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                

                <button type="submit">Register</button>
            </form>

           

            <p>
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Register;