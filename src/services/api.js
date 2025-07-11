const API_BASE_URL =
  import.meta.env.API_BASE_URL || "http://127.0.0.1:8001/api/v1";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    const token = localStorage.getItem("authToken");
    return token;
  }

  setToken(token) {
    localStorage.setItem("authToken", token);
  }

  removeToken() {
    localStorage.removeItem("authToken");
  }

  getHeaders() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = this.getHeaders();

      const config = {
        headers,
        ...options,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Cannot connect to server. Please make sure the backend server is running on port 8001."
        );
      }

      throw error;
    }
  }

  // auth
  async signup(userData) {
    const response = await this.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    // store token on sign
    if (response.data && response.data.token) {
      this.setToken(response.data.token);
    } else if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // store token on login
    if (response.data && response.data.token) {
      this.setToken(response.data.token);
    } else if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async deleteUser(userData) {
    return this.request("/auth/delete", {
      method: "DELETE",
      body: JSON.stringify(userData),
    });
  }

  // tasks metods
  async getAllTasks() {
    return this.request("/tasks/task");
  }

  async getTask(taskId) {
    return this.request(`/tasks/task/${taskId}`);
  }

  async createTask(taskData) {
    return this.request("/tasks/task", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(taskId, taskData) {
    return this.request(`/tasks/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(taskId) {
    return this.request(`/tasks/task/${taskId}`, {
      method: "DELETE",
    });
  }

  // dashboard methods
  async getDashboardData() {
    return this.request("/tasks/dashboard");
  }

  // check the server run
  async checkServerStatus() {
    try {
      await fetch(`${this.baseURL}/auth/signup`, {
        method: "OPTIONS",
      });
      return true;
    } catch (error) {
      console.error("Server not reachable:", error);
      return false;
    }
  }
}

export default new ApiService();
