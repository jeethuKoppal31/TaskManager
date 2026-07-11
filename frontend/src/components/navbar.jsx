import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/");
    };

    return (
        <div className="navbar">
            <h2>📝 Task Manager</h2>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Navbar;