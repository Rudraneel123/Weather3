
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Input, Form, Typography } from "antd";
// const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load default credentials and stored users
  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers([...data.users, ...storedUsers]);
      })
      .catch((err) => console.error("Error loading config:", err));
  }, []);

  const userLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin(username); // Set login state
      navigate("/landing"); // Redirect to antd page
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={userLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Please Register if you don`t have an account{" "}
        <button onClick={() => navigate("/userregister")}>Register</button>
      </p>
    </div>
    
  );
};

export default Login;