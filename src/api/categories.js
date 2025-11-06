'use client';

import axios, { endpoints } from 'src/utils/axios';

/* ************  Create Category **************** */
export const createCategory = async (data) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await axios.post(`${endpoints.categories.create}/${gymId}`, data);
    return res.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

/* ************  Read Categories **************** */
export const getCategories = async () => {
  const gymId = sessionStorage.getItem('gymId');
  if (!gymId) {
    throw new Error('Gym ID is not available in session storage');
  }
  try {
    const res = await axios.get(`${endpoints.categories.list}/${gymId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/* ************  Update Category **************** */
export const updateCategory = async (id, data) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await axios.put(`${endpoints.categories.update}/${gymId}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

/* ************  Delete Category **************** */
export const deleteCategory = async (id) => {
  const gymId = sessionStorage.getItem('gymId');
  try {
    const res = await axios.delete(`${endpoints.categories.delete}/${gymId}?id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}