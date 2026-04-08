import axios from 'axios';

const BASE = `${process.env.REACT_APP_API_URL}/department`;

export const getDepartments    = ()         => axios.get(BASE);
export const getDepartmentById = (id)       => axios.get(`${BASE}/${id}`);
export const addDepartment     = (data)     => axios.post(BASE, data);
export const updateDepartment  = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteDepartment  = (id)       => axios.delete(`${BASE}/${id}`);