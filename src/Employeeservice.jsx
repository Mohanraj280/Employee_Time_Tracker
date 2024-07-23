import axios from "axios";

const BASE_URL = 'http://localhost:8080/mohan/api/employees';

export const listEmployees = () => {
    return axios.get(`${BASE_URL}`);
}

export const AddEmployee = (emp) => {
    return axios.post(BASE_URL, emp);
}


export const GetEmployee = (id) =>
{
    return axios.get(`${BASE_URL}` +'/'+id);
}

export const UpdateEmployee = (id,employee) =>    {
    return axios.put(`${BASE_URL}/`+id,employee);
}

export const DeleteEmployee = (id) => {
    return axios.delete(`${BASE_URL}/`+id);
    }

    