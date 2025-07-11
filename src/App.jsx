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
import { useState, useEffect, useCallback } from "react";
import apiService from "./services/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await apiService.getAllTasks();

      let tasksArray = [];
      if (Array.isArray(response)) {
        tasksArray = response;
      } else if (response && response.tasks && Array.isArray(response.tasks)) {
        tasksArray = response.tasks;
      } else if (response && response.data && Array.isArray(response.data)) {
        tasksArray = response.data;
      } else {
        tasksArray = [];
      }

      setTasks(tasksArray);
    } catch {
      setTasks([]);
    }
  }, []);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const token = apiService.getToken();
    if (token) {
      setIsAuthenticated(true);
      // Fetch tasks when user is authenticated
      fetchTasks();
    }
  }, [fetchTasks]);

  const signIn = async (email, password) => {
    try {
      const response = await apiService.login({ email, password });
      setIsAuthenticated(true);
      setCurrentUser(response.user || { email });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    apiService.removeToken();
  };

  const createTask = useCallback(
    async (taskData) => {
      try {
        const response = await apiService.createTask(taskData);
        await fetchTasks();
        return { success: true, data: response };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [fetchTasks]
  );

  const updateTask = useCallback(
    async (taskId, taskData) => {
      try {
        const updatedTaskData = {
          title: taskData.title || "",
          description: taskData.description || "",
          startDate: taskData.startDate || "",
          endDate: taskData.endDate || "",
          isCompleted: taskData.isCompleted || false,
        };

        const response = await apiService.updateTask(taskId, updatedTaskData);
        await fetchTasks();
        return { success: true, data: response };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [fetchTasks]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      try {
        await apiService.deleteTask(taskId);
        await fetchTasks();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [fetchTasks]
  );

  const completeTask = useCallback(
    async (taskId, taskData) => {
      try {
        const currentTask = tasks.find((task) => task._id === taskId);

        if (!currentTask) {
          throw new Error("Task not found");
        }

        const formatDate = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        const updatedTaskData = {
          title: currentTask.title || "",
          description: currentTask.description || "",
          startDate: formatDate(currentTask.startDate),
          endDate: formatDate(currentTask.endDate),
          isCompleted: taskData.isCompleted,
        };

        const response = await apiService.updateTask(taskId, updatedTaskData);
        await fetchTasks();
        return { success: true, data: response };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [fetchTasks, tasks]
  );

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
        <Route
          path="/signup"
          element={
            <Signup
              onSignUp={(userData) => {
                setIsAuthenticated(true);
                setCurrentUser(userData);
                // Fetch tasks after successful signup
                setTimeout(() => {
                  fetchTasks();
                }, 100);
              }}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard currentUser={currentUser} tasks={tasks} />
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
                deleteTask={deleteTask}
                completeTask={completeTask}
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
              <Createtasks currentUser={currentUser} createTask={createTask} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/edittask/:taskId"
          element={
            isAuthenticated ? (
              <EditTask
                currentUser={currentUser}
                updateTask={updateTask}
                tasks={tasks}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/tasks" : "/signin"} />}
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-[#121417] flex items-center justify-center">
              <div className="text-white text-center">
                <h1 className="text-2xl font-bold mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-[#9EABB8]">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
