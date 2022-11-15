import { useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [category, setCategory] = useState([
    { name: "동아리", color: "#3A4CA8" },
    { name: "대외활동", color: "#9d533c" },
    { name: "공모전", color: "#267d53" },
    { name: "학생회", color: "#ca7070" },
    { name: "수업", color: "#427563" },
    { name: "취미", color: "#3293a8" },
  ]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth")) === true) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, category, setCategory }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
