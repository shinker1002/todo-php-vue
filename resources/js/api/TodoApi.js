// services/ApiService.js

import axios from 'axios';

const API_BASE_URL = '/api';

const TodoApi = {
  // Todo API
  getTodos() {
    return axios.get(`${API_BASE_URL}/todos`);
  },

  addTodo(todoData) {
    return axios.post(`${API_BASE_URL}/todos`, todoData);
  },

  updateTodo(todoId, todoData) {
    return axios.put(`${API_BASE_URL}/todos/${todoId}`, todoData);
  },

  deleteTodo(todoId) {
    return axios.delete(`${API_BASE_URL}/todos/${todoId}`);
  },
};

export default TodoApi;