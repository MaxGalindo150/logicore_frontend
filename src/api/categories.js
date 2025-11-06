'use client';

import axios, { endpoints } from 'src/utils/axios';

/* ************  Create Category **************** */
export const createCategory = async (data) => {
  try {
    const res = await axios.post(`${endpoints.categories.new}`, data);
    return res.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

/* ************  Read Categories **************** */
export const getCategories = async () => {
  try {
    const res = await axios.get(`${endpoints.categories.list}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/* ************  Get Category by ID **************** */
export const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`${endpoints.categories.base}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

/* ************  Update Category **************** */
export const updateCategory = async (id, data) => {
  try {
    const res = await axios.put(`${endpoints.categories.base}/${id}/edit`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

/* ************  Delete Category **************** */
export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${endpoints.categories.base}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};