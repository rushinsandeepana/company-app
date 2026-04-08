import axios from 'axios';

const BASE = `${process.env.REACT_APP_API_URL}/employee`;

export const getEmployees    = ()         => axios.get(BASE);
export const getEmployeeById = (id)       => axios.get(`${BASE}/${id}`);
export const addEmployee     = (data)     => axios.post(BASE, data);
export const updateEmployee  = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteEmployee  = (id)       => axios.delete(`${BASE}/${id}`);