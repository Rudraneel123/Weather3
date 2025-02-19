import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styleapp/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userRegister = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.find((user) => user.username === username)) {
      setError("Username exists");
      return;
    }

    storedUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>
      <form onSubmit={userRegister}>
        <input
          type="text"
          placeholder="Username"
          className="input-form"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br style={{ gap: "2px" }} />
        <input
          type="password"
          placeholder="Password"
          className="input-form"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="custom-button">
          Register
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")} className="custom-button">
          Login
        </button>
      </p>
    </div>
  );
};
export default Register;
