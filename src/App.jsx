import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Createtasks from "./pages/Createtasks";
import EditTask from "./pages/EditTask";
import { useState } from "react";

const TEST_USER = {
  email: "elmaka@system.intern",
  password: "123456789",
  name: "Elmaka",
};

const INITIAL_TASKS = [
  {
    name: "Review project proposal",
    date: "2024-03-15",
    status: "inProgress",
  },
  {
    name: "Prepare presentation slides",
    date: "2024-03-20",
    status: "completed",
  },
  { name: "Schedule team meeting", date: "2024-03-22", status: "inProgress" },
  { name: "Update client report", date: "2024-03-25", status: "completed" },
  {
    name: "Follow up with vendors",
    date: "2024-03-28",
    status: "inProgress",
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const signIn = (email, password) => {
    if (email === TEST_USER.email && password === TEST_USER.password) {
      setIsAuthenticated(true);
      setCurrentUser(TEST_USER);
      return { success: true };
    }
    return { success: false, error: "Invalid enter" };
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} signOut={signOut} />
      <Routes>
        <Route
          path="/signin"
          element={
            <Signin onSignIn={signIn} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard currentUser={currentUser} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isAuthenticated ? (
              <Tasks
                currentUser={currentUser}
                tasks={tasks}
                setTasks={setTasks}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/createtask"
          element={
            isAuthenticated ? (
              <Createtasks
                currentUser={currentUser}
                tasks={tasks}
                setTasks={setTasks}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/edittask/:taskIndex"
          element={
            isAuthenticated ? (
              <EditTask
                currentUser={currentUser}
                tasks={tasks}
                setTasks={setTasks}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
