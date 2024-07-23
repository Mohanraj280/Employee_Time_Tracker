import axios from "axios";

const BASE_URL = 'http://localhost:8080/mohan/tasks';

export const AddTask = (emp) => {
    return axios.post(BASE_URL, emp);
}

export const listTasks = () => {
    return axios.get(`${BASE_URL}/allTasks`);
}

export const deleteTask = (id) =>
{
    return axios.delete(`${BASE_URL}/${id}`);
}