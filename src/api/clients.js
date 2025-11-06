'use client';

import axios, { endpoints } from 'src/utils/axios';

/* ************  Create Client **************** */
export const createClient = async (data) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await axios.post(`${endpoints.clients.new}/${gymId}`, data);
    return res.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

/* ************  Read Clients **************** */
export const getClients = async () => {
  const gymId = sessionStorage.getItem('gymId');
  if (!gymId) {
    throw new Error('Gym ID is not available in session storage');
  }
  try {
    const res = await axios.get(`${endpoints.clients.list}/${gymId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

/* ************  Get Client by ID **************** */
export const getClientById = async (id) => {
  const gymId = sessionStorage.getItem('gymId');
  if (!gymId) {
    throw new Error('Gym ID is not available in session storage');
  }
  try {
    const res = await axios.get(`${endpoints.clients.base}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

/* ************  Update Client **************** */
export const updateClient = async (id, data) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await axios.put(`${endpoints.clients.base}/${id}/edit/${gymId}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

/* ************  Delete Client **************** */
export const deleteClient = async (id) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await axios.delete(`${endpoints.clients.base}/${id}/${gymId}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

/* ************  Bulk Delete Clients **************** */
export const deleteClients = async (ids) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await Promise.all(
      ids.map(id => axios.delete(`${endpoints.clients.base}/${id}/${gymId}`))
    );
    return res.data;
  } catch (error) {
    console.error('Error deleting clients:', error);
    throw error;
  }
};