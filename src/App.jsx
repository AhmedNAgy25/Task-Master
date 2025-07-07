import "./App.css";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Createtasks from "./pages/Createtasks";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} signOut={signOut} />
      <Routes>
        <Route path="/signin" element={<Signin onSignIn={signIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            // isAuthenticated ? <h1>Dashboard</h1> : <Navigate to="/signin" />
            <Dashboard></Dashboard>
          }
        />
        <Route
          path="/tasks"
          element={isAuthenticated ? <h1>Tasks</h1> : <Navigate to="/signin" />}
        />
        <Route
          path="/createtask"
          // element={isAuthenticated ? <h1>Tasks</h1> : <Navigate to="/signin" />}
          element={<Createtasks></Createtasks>}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />}
        />
      </Routes>
      {/* <h1 className="text-amber-200">hello</h1> */}
    </Router>
  );
}

export default App;
